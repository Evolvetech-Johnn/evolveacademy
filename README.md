# Evolveacademy

Plataforma de cursos online da **EvolveTech Solutions**. O primeiro curso publicado é o **Curso de Marketing: do Zero ao Avançado** (7 módulos, 43 aulas), com conteúdo em [docs/curso-marketing.md](docs/curso-marketing.md).

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes + NextAuth.js
- **Database**: MongoDB (MongoDB Atlas)
- **ODM**: Mongoose
- **File Storage**: Cloudinary
- **Auth**: NextAuth.js (Credentials Provider)
- **Forms**: React Hook Form + Zod
- **Hosting**: Vercel

## Primeiros Passos

### 1. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<seu-usuario>:<sua-senha>@cluster.mongodb.net/evolveacademy

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

### 3. Popular o banco

```bash
npm run seed        # cria o usuário admin (admin@evolveacademy.com / admin123)
npm run seed:course  # popula o Curso de Marketing a partir de docs/curso-marketing.md
```

⚠️ **Altere a senha do admin imediatamente após o primeiro login!**

### 4. Iniciar o servidor de desenvolvimento

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
- `/cursos/marketing/aulas/[slug]` — aula (a primeira é liberada sem login como isca; as demais exigem login)
- `/meus-cursos` — área do aluno logado, lista todos os módulos/aulas do curso
- `/dashboard`, `/cursos-admin`, `/settings` — painel administrativo (`owner`/`professor`)

Conteúdo de curso é modelado em `Course` → `Module` → `Lesson` (ver `lib/db/models/`). Cada aula segue uma estrutura fixa: objetivo, conceito central, aprofundamento tático, exemplo prático, contraexemplo, erro comum, exercício de fixação e "para ir além" — populada pelo parser em `scripts/seedCourseMarketing.ts`.

**Pagamento ainda não está integrado.** Enquanto isso, qualquer usuário autenticado que abre uma aula recebe matrícula (`Enrollment`) automática — ver o comentário `ponytail:` em `lib/courses.ts`.

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
│   ├── db/
│   │   ├── models/        # Schemas Mongoose (User, Profile, Course, Module, Lesson, Enrollment)
│   │   └── mongoose.ts    # Conexão com MongoDB
│   └── cloudinary.ts
├── docs/
│   └── curso-marketing.md # Conteúdo-fonte do primeiro curso
├── scripts/
│   ├── seed.ts             # Cria o usuário admin
│   └── seedCourseMarketing.ts  # Parseia o .md e popula o curso
├── types/
└── package.json
```

## Deploy na Vercel

Configurar no dashboard da Vercel as mesmas env vars do `.env.local`: `MONGODB_URI`, `NEXTAUTH_URL` (URL de produção), `NEXTAUTH_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`. Rodar `npm run build` localmente antes do deploy para garantir que compila sem erros.

## Roadmap

- [x] Split 1 — Motor de cursos + Curso de Marketing publicado
- [x] Split "pivot" — remoção do sistema de gestão de academia, rebrand completo para plataforma de cursos
- [ ] Split 2 — Checkout/pagamento (Mercado Pago ou Stripe, Pix), liberação automática de acesso
- [ ] Split 3 — Multi-curso, progresso do aluno, certificado
- [ ] Split 4 — SEO, analytics e growth sobre o catálogo de cursos
