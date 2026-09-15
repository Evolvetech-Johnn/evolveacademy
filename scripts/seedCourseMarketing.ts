import mongoose from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import Course from '../lib/db/models/Course';
import Module from '../lib/db/models/Module';
import Lesson from '../lib/db/models/Lesson';

dotenv.config({ path: '.env.local' });

const COURSE_SLUG = 'marketing';
const MD_PATH = path.join(__dirname, '..', 'docs', 'curso-marketing.md');

const FIELD_LABELS = {
  objetivo: 'Objetivo',
  conceito: 'Conceito central',
  aprofundamento: 'Aprofundamento tático',
  exemploPratico: 'Exemplo prático',
  contraexemplo: 'Contraexemplo',
  erroComum: 'Erro comum',
  exercicio: 'Exercício de fixação',
  paraIrAlem: 'Para ir além',
} as const;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

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
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    const raw = fs.readFileSync(MD_PATH, 'utf-8');
    const parsedModules = parseMarkdown(raw);
    const totalLessons = parsedModules.reduce((sum, m) => sum + m.lessons.length, 0);
    console.log(`Parsed ${parsedModules.length} módulos, ${totalLessons} aulas`);

    const course = await Course.findOneAndUpdate(
      { slug: COURSE_SLUG },
      {
        slug: COURSE_SLUG,
        title: 'Curso de Marketing: do Zero ao Avançado',
        description:
          '7 módulos, 43 aulas e glossário de 26 termos — dos fundamentos de marketing ao growth avançado, com frameworks consagrados (Kotler, Cialdini, Ogilvy, Christensen) aplicados a exemplos reais.',
        isPublished: true,
      },
      { upsert: true, new: true }
    );

    for (const parsedModule of parsedModules) {
      const moduleDoc = await Module.findOneAndUpdate(
        { courseId: course._id, order: parsedModule.order },
        { courseId: course._id, order: parsedModule.order, title: parsedModule.title },
        { upsert: true, new: true }
      );

      for (const lesson of parsedModule.lessons) {
        await Lesson.findOneAndUpdate(
          { slug: lesson.slug },
          {
            courseId: course._id,
            moduleId: moduleDoc._id,
            order: lesson.order,
            slug: lesson.slug,
            title: lesson.title,
            ...lesson.fields,
            isFreePreview: parsedModule.order === 1 && lesson.order === 1,
          },
          { upsert: true, new: true }
        );
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
