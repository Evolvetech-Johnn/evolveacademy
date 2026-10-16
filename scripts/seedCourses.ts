import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const COURSES = {
  marketing: {
    md: 'curso-marketing.md',
    title: 'Curso de Marketing: do Zero ao Avançado',
    description:
      '7 módulos, 42 aulas e glossário de 26 termos — dos fundamentos de marketing ao growth avançado, com frameworks consagrados (Kotler, Cialdini, Ogilvy, Christensen) aplicados a exemplos reais.',
  },
  webdesign: {
    md: 'curso-webdesign.md',
    title: 'Curso de Web Design: do Zero ao Avançado',
    description:
      '7 módulos, 42 aulas e glossário de 27 termos — de HTML semântico e CSS a UI/UX, JavaScript, performance, acessibilidade e carreira, com frameworks consagrados aplicados a exemplos reais.',
  },
} as const;

type CourseSlug = keyof typeof COURSES;

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

function parseMarkdown(raw: string, courseSlug: string): ParsedModule[] {
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
        slug: `${courseSlug}-${moduleOrder}-${lessonOrder}`,
        title,
        fields,
      };
    });

    return { order: moduleOrder, title: moduleTitle, lessons };
  });
}

async function seedCourse(courseSlug: CourseSlug) {
  const { supabase } = await import('../lib/supabase');
  const config = COURSES[courseSlug];

  {
    const raw = fs.readFileSync(path.join(__dirname, '..', 'docs', config.md), 'utf-8');
    const parsedModules = parseMarkdown(raw, courseSlug);
    const totalLessons = parsedModules.reduce((sum, m) => sum + m.lessons.length, 0);
    console.log(`Parsed ${parsedModules.length} módulos, ${totalLessons} aulas`);
    if (process.env.DRY_RUN) return; // só valida o parser, sem tocar no banco

    const { data: course, error: courseError } = await supabase
      .from('courses')
      .upsert(
        {
          slug: courseSlug,
          title: config.title,
          description: config.description,
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

    console.log(`Curso ${courseSlug} populado com sucesso!`);
  }
}

// uso: npm run seed:course [-- marketing|webdesign] (sem argumento, popula todos); DRY_RUN=1 só valida o parse
async function main() {
  const arg = process.argv[2];
  const slugs = (arg ? [arg] : Object.keys(COURSES)) as CourseSlug[];
  try {
    for (const slug of slugs) {
      if (!(slug in COURSES)) throw new Error(`Curso desconhecido: ${slug}`);
      await seedCourse(slug);
    }
    process.exit(0);
  } catch (error) {
    console.error('Error seeding course:', error);
    process.exit(1);
  }
}

main();
