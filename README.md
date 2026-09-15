# Evolveacademy

Plataforma de cursos online da **EvolveTech Solutions**. O primeiro curso publicado é o **Curso de Marketing: do Zero ao Avançado** (7 módulos, 42 aulas), com conteúdo em [docs/curso-marketing.md](docs/curso-marketing.md).

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes + NextAuth.js
- **Database**: Supabase (Postgres)
- **File Storage**: Cloudinary
- **Auth**: NextAuth.js (Credentials Provider)
- **Forms**: React Hook Form + Zod
- **Hosting**: Vercel

## Primeiros Passos

### 1. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase (Project Settings → API — use a service role key, nunca a anon key, em variável server-only)
SUPABASE_URL=https://<seu-projeto>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=seu-segredo-super-segredo-aqui-gerado-aleatoriamente

# Cloudinary
CLOUDINARY_CLOUD_NAME=seu-cloud-name
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=sua-api-secret
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Criar as tabelas no Supabase

Rode o conteúdo de [supabase/schema.sql](supabase/schema.sql) no SQL editor do seu projeto Supabase (cria `users`, `courses`, `modules`, `lessons`, `enrollments` com RLS habilitado — todo acesso passa pela service role key no servidor).

### 4. Popular o banco

```bash
npm run seed        # cria o usuário admin (admin@evolveacademy.com / admin123)
npm run seed:course  # popula o Curso de Marketing a partir de docs/curso-marketing.md
```

⚠️ **Altere a senha do admin imediatamente após o primeiro login!**

### 5. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Funcionalidades

### Autenticação
- Login com email e senha (NextAuth, Credentials Provider)
- Roles: `owner`, `professor`, `student`
- Proteção de rotas por role

### Cursos
- `/` — home institucional com cursos em destaque
- `/cursos/marketing` — landing de vendas do curso
- `/cursos/marketing/aulas/[slug]` — aula, com conteúdo completo aberto para qualquer visitante
- `/meus-cursos` — área do aluno logado (opcional), lista todos os módulos/aulas do curso
- `/dashboard`, `/cursos-admin`, `/settings` — painel administrativo (`owner`/`professor`)

Conteúdo de curso é modelado em `courses` → `modules` → `lessons` (ver `supabase/schema.sql` e `lib/types.ts`). Cada aula segue uma estrutura fixa: objetivo, conceito central, aprofundamento tático, exemplo prático, contraexemplo, erro comum, exercício de fixação e "para ir além" — populada pelo parser em `scripts/seedCourseMarketing.ts`.

**Fase inicial de testes: sem pagamento e sem login obrigatório.** Todas as aulas estão abertas a qualquer visitante — o gate por login/matrícula (`Enrollment`) já existe em `lib/courses.ts` (`ensureEnrollment`/`hasActiveEnrollment`) e fica pronto para reativar quando o curso passar a ser pago (ver comentário `ponytail:` em `app/cursos/marketing/aulas/[slug]/page.tsx`).

## Estrutura do Projeto

```
evolveacademy/
├── app/
│   ├── (admin)/          # Painel administrativo (Dono/Professor)
│   │   ├── dashboard/
│   │   ├── cursos-admin/
│   │   └── settings/
│   ├── (student)/        # Área do aluno logado
│   │   └── meus-cursos/
│   ├── cursos/
│   │   └── marketing/    # Landing + aulas do curso
│   ├── login/
│   ├── api/              # API Routes (auth, dashboard, upload)
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx           # Home institucional
│   └── providers.tsx
├── lib/
│   ├── auth/options.ts    # Configuração do NextAuth
│   ├── courses.ts         # Leitura de curso/aula + matrícula automática
│   ├── supabase.ts        # Cliente Supabase (service role, server-only)
│   ├── types.ts           # Tipos das tabelas (User, Course, CourseModule, Lesson, Enrollment)
│   └── cloudinary.ts
├── docs/
│   └── curso-marketing.md # Conteúdo-fonte do primeiro curso
├── supabase/
│   └── schema.sql         # DDL das tabelas + RLS
├── scripts/
│   ├── seed.ts             # Cria o usuário admin
│   └── seedCourseMarketing.ts  # Parseia o .md e popula o curso
├── types/
└── package.json
```

## Deploy na Vercel

Configurar no dashboard da Vercel as mesmas env vars do `.env.local`: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXTAUTH_URL` (URL de produção), `NEXTAUTH_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`. Rodar `npm run build` localmente antes do deploy para garantir que compila sem erros.

## Roadmap

- [x] Split 1 — Motor de cursos + Curso de Marketing publicado
- [x] Split "pivot" — remoção do sistema de gestão de academia, rebrand completo para plataforma de cursos
- [x] Split "infra" — migração de MongoDB/Mongoose para Supabase (Postgres)
- [ ] Split 2 — Checkout/pagamento (Mercado Pago ou Stripe, Pix), liberação automática de acesso
- [ ] Split 3 — Multi-curso, progresso do aluno, certificado
- [ ] Split 4 — SEO, analytics e growth sobre o catálogo de cursos
