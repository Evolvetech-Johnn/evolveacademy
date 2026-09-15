import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const COURSE_SLUG = 'marketing';
const MD_PATH = path.join(__dirname, '..', 'docs', 'curso-marketing.md');

const FIELD_LABELS = {
  objetivo: 'Objetivo',
  conceito: 'Conceito central',
  aprofundamento: 'Aprofundamento tático',
  exemplo_pratico: 'Exemplo prático',
  contraexemplo: 'Contraexemplo',
  erro_comum: 'Erro comum',
  exercicio: 'Exercício de fixação',
  para_ir_alem: 'Para ir além',
} as const;

function extractField(body: string, label: string): string {
  const pattern = new RegExp(
    `\\*\\*${label}:\\*\\*\\s*([\\s\\S]*?)(?=\\n\\*\\*[A-ZÀ-Ú][^*]*:\\*\\*|\\n---|$)`
  );
  const match = body.match(pattern);
  return match ? match[1].trim() : '';
}

interface ParsedLesson {
  order: number;
  slug: string;
  title: string;
  fields: Record<keyof typeof FIELD_LABELS, string>;
}

interface ParsedModule {
  order: number;
  title: string;
  lessons: ParsedLesson[];
}

function parseMarkdown(raw: string): ParsedModule[] {
  const glossaryIndex = raw.indexOf('\n# Glossário');
  const body = glossaryIndex === -1 ? raw : raw.slice(0, glossaryIndex);

  const moduleChunks = body.split(/\n(?=# Módulo )/g).filter((c) => c.startsWith('# Módulo'));

  return moduleChunks.map((chunk) => {
    const moduleHeaderMatch = chunk.match(/^# Módulo (\d+)\s*—\s*(.+)$/m);
    if (!moduleHeaderMatch) {
      throw new Error(`Não consegui parsear cabeçalho de módulo em: ${chunk.slice(0, 60)}`);
    }
    const moduleOrder = Number(moduleHeaderMatch[1]);
    const moduleTitle = moduleHeaderMatch[2].trim();

    const lessonChunks = chunk.split(/\n(?=## )/g).filter((c) => c.startsWith('## '));

    const lessons: ParsedLesson[] = lessonChunks.map((lessonChunk) => {
      const headerMatch = lessonChunk.match(/^## (\d+)\.(\d+) (.+)$/m);
      if (!headerMatch) {
        throw new Error(`Não consegui parsear cabeçalho de aula em: ${lessonChunk.slice(0, 60)}`);
      }
      const lessonOrder = Number(headerMatch[2]);
      const title = headerMatch[3].replace(/\s*\*\(.*?\)\*\s*$/, '').trim();

      const fields = Object.fromEntries(
        Object.entries(FIELD_LABELS).map(([key, label]) => [key, extractField(lessonChunk, label)])
      ) as Record<keyof typeof FIELD_LABELS, string>;

      for (const [key, value] of Object.entries(fields)) {
        if (!value) {
          throw new Error(`Campo "${key}" vazio na aula "${title}" (módulo ${moduleOrder})`);
        }
      }

      return {
        order: lessonOrder,
        slug: `${COURSE_SLUG}-${moduleOrder}-${lessonOrder}`,
        title,
        fields,
      };
    });

    return { order: moduleOrder, title: moduleTitle, lessons };
  });
}

async function seedCourse() {
  const { supabase } = await import('../lib/supabase');

  try {
    const raw = fs.readFileSync(MD_PATH, 'utf-8');
    const parsedModules = parseMarkdown(raw);
    const totalLessons = parsedModules.reduce((sum, m) => sum + m.lessons.length, 0);
    console.log(`Parsed ${parsedModules.length} módulos, ${totalLessons} aulas`);

    const { data: course, error: courseError } = await supabase
      .from('courses')
      .upsert(
        {
          slug: COURSE_SLUG,
          title: 'Curso de Marketing: do Zero ao Avançado',
          description:
            '7 módulos, 43 aulas e glossário de 26 termos — dos fundamentos de marketing ao growth avançado, com frameworks consagrados (Kotler, Cialdini, Ogilvy, Christensen) aplicados a exemplos reais.',
          is_published: true,
        },
        { onConflict: 'slug' }
      )
      .select()
      .single();

    if (courseError) throw courseError;

    for (const parsedModule of parsedModules) {
      const { data: existingModule } = await supabase
        .from('modules')
        .select('id')
        .eq('course_id', course.id)
        .eq('position', parsedModule.order)
        .maybeSingle();

      const { data: moduleRow, error: moduleError } = existingModule
        ? await supabase.from('modules').update({ title: parsedModule.title }).eq('id', existingModule.id).select().single()
        : await supabase
            .from('modules')
            .insert({ course_id: course.id, position: parsedModule.order, title: parsedModule.title })
            .select()
            .single();

      if (moduleError) throw moduleError;

      for (const lesson of parsedModule.lessons) {
        const { error: lessonError } = await supabase.from('lessons').upsert(
          {
            course_id: course.id,
            module_id: moduleRow.id,
            position: lesson.order,
            slug: lesson.slug,
            title: lesson.title,
            ...lesson.fields,
            is_free_preview: parsedModule.order === 1 && lesson.order === 1,
          },
          { onConflict: 'slug' }
        );

        if (lessonError) throw lessonError;
      }
    }

    console.log('Curso de marketing populado com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding course:', error);
    process.exit(1);
  }
}

seedCourse();
