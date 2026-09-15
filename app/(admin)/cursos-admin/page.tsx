import { getCourseWithModules } from '@/lib/courses';

export const dynamic = 'force-dynamic';

export default async function CursosAdminPage() {
  const data = await getCourseWithModules('marketing');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base">Cursos</h1>
        <p className="text-text mt-1">Conteúdo publicado na plataforma</p>
      </div>

      {!data ? (
        <div className="p-6 border border-gray-100 rounded-xl bg-surface">
          <p className="text-text">
            Nenhum curso encontrado. Rode <code>npm run seed:course</code> para popular o curso de marketing
            a partir de <code>docs/curso-marketing.md</code>.
          </p>
        </div>
      ) : (
        <div className="p-6 border border-gray-100 rounded-xl bg-surface">
          <h2 className="text-xl font-semibold text-base mb-1">{data.course.title}</h2>
          <p className="text-text mb-6">{data.course.description}</p>

          <div className="space-y-4">
            {data.modules.map((mod) => (
              <div key={mod._id} className="border border-gray-100 rounded-lg p-4">
                <p className="font-medium text-base">
                  Módulo {mod.order} — {mod.title}
                </p>
                <p className="text-sm text-text mt-1">{mod.lessons.length} aula(s)</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
