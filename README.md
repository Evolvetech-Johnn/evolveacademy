# Evolveacademy

Plataforma de cursos online da **EvolveTech Solutions**. O primeiro curso publicado é o **Curso de Marketing: do Zero ao Avançado** (7 módulos, 42 aulas), com conteúdo em [docs/curso-marketing.md](docs/curso-marketing.md).

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (Postgres)
- **Hosting**: Vercel

## Primeiros Passos

### 1. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase (Project Settings → API — use a service role key, nunca a anon key, em variável server-only)
SUPABASE_URL=https://<seu-projeto>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Criar as tabelas no Supabase

Rode o conteúdo de [supabase/schema.sql](supabase/schema.sql) no SQL editor do seu projeto Supabase (cria `users`, `courses`, `modules`, `lessons`, `enrollments` com RLS habilitado — todo acesso passa pela service role key no servidor).

### 4. Popular o curso

```bash
npm run seed:course
```

Popula o Curso de Marketing a partir de `docs/curso-marketing.md`.

### 5. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Funcionalidades

### Cursos
- `/` — home institucional com cursos em destaque
- `/cursos/marketing` — landing de vendas do curso
- `/cursos/marketing/aulas/[slug]` — aula, com conteúdo completo aberto para qualquer visitante
- `/meus-cursos` — lista todos os módulos/aulas do curso
- `/dashboard`, `/cursos-admin`, `/settings` — painel administrativo

Conteúdo de curso é modelado em `courses` → `modules` → `lessons` (ver `supabase/schema.sql` e `lib/types.ts`). Cada aula segue uma estrutura fixa: objetivo, conceito central, aprofundamento tático, exemplo prático, contraexemplo, erro comum, exercício de fixação e "para ir além" — populada pelo parser em `scripts/seedCourseMarketing.ts`.

**Fase inicial de testes: sem pagamento, sem login, acesso aberto a qualquer visitante.** O sistema de autenticação (NextAuth) foi removido por completo — `/dashboard`, `/cursos-admin` e `/settings` também estão abertos. Se/quando o produto passar a ser pago, será necessário reintroduzir auth e o gate de matrícula (`Enrollment`) que ainda existe em `lib/courses.ts` (`ensureEnrollment`/`hasActiveEnrollment`), além de proteger o painel administrativo.

## Estrutura do Projeto

```
evolveacademy/
├── app/
│   ├── (admin)/          # Painel administrativo
│   │   ├── dashboard/
│   │   ├── cursos-admin/
│   │   └── settings/
│   ├── (student)/
│   │   └── meus-cursos/
│   ├── cursos/
│   │   └── marketing/    # Landing + aulas do curso
│   ├── api/
│   │   └── dashboard/    # Estatísticas do painel admin
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx           # Home institucional
├── lib/
│   ├── courses.ts         # Leitura de curso/aula (+ matrícula, hoje desligada)
│   ├── supabase.ts        # Cliente Supabase (service role, server-only)
│   └── types.ts           # Tipos das tabelas (User, Course, CourseModule, Lesson, Enrollment)
├── docs/
│   └── curso-marketing.md # Conteúdo-fonte do primeiro curso
├── supabase/
│   └── schema.sql         # DDL das tabelas + RLS
├── scripts/
│   └── seedCourseMarketing.ts  # Parseia o .md e popula o curso
├── types/
└── package.json
```

## Deploy na Vercel

Configurar no dashboard da Vercel as mesmas env vars do `.env.local`: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`. Rodar `npm run build` localmente antes do deploy para garantir que compila sem erros.

## Roadmap

- [x] Split 1 — Motor de cursos + Curso de Marketing publicado
- [x] Split "pivot" — remoção do sistema de gestão de academia, rebrand completo para plataforma de cursos
- [x] Split "infra" — migração de MongoDB/Mongoose para Supabase (Postgres)
- [x] Split "acesso aberto" — remoção do login/auth para fase de testes
- [ ] Split 2 — Login + checkout/pagamento (Mercado Pago ou Stripe, Pix)
- [ ] Split 3 — Multi-curso, progresso do aluno, certificado
- [ ] Split 4 — SEO, analytics e growth sobre o catálogo de cursos
