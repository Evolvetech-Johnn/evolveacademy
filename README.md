# Evolveacademy - Sistema de Gestão de Academias

Sistema completo de gestão para academias, com área do dono/professor e área do aluno.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes + NextAuth.js
- **Database**: MongoDB (MongoDB Atlas)
- **ODM**: Mongoose
- **File Storage**: Cloudinary
- **Auth**: NextAuth.js (Credentials Provider)
- **Forms**: React Hook Form + Zod
- **Hosting**: Render

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

### 3. Criar usuário administrador inicial

```bash
npm run seed
```

Isso criará um usuário com:
- Email: `admin@evolveacademy.com`
- Senha: `admin123`

⚠️ **Altere a senha imediatamente após o primeiro login!**

### 4. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Funcionalidades Implementadas

### Autenticação
- Login com email e senha
- Roles: Dono, Professor, Aluno
- Proteção de rotas por role

### Módulo 1 - Cadastro e CRM de Alunos
- Listagem de alunos
- Cadastro de novo aluno completo
  - Dados pessoais
  - Foto (upload para Cloudinary)
  - Contato de emergência
- Ficha de Saúde (Anamnese)
  - Comorbidades
  - Medicações controladas
  - Restrições físicas
  - Lesões
  - Consentimento LGPD

## Estrutura do Projeto

```
evolveacademy/
├── app/
│   ├── (admin)/          # Área administrativa (Dono/Professor)
│   │   ├── dashboard/
│   │   ├── students/
│   │   ├── programs/
│   │   ├── plans/
│   │   └── settings/
│   ├── (auth)/           # Rotas de autenticação
│   │   └── login/
│   ├── api/              # API Routes
│   │   ├── auth/
│   │   ├── students/
│   │   └── upload/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
├── lib/
│   ├── auth/
│   │   └── options.ts    # Configuração do NextAuth
│   ├── db/
│   │   ├── models/       # Schemas Mongoose
│   │   └── mongoose.ts   # Conexão com MongoDB
│   └── cloudinary.ts     # Configuração do Cloudinary
├── scripts/
│   └── seed.ts           # Script para criar usuário admin
├── types/                # Tipos TypeScript
├── package.json
└── ...
```

## Próximos Passos

- [ ] Área do Aluno
- [ ] Programas de Treino
- [ ] Biblioteca de Exercícios
- [ ] Acompanhamento de Evolução
- [ ] Financeiro
- [ ] Planos
