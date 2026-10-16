// Copy de landing por curso. O conteúdo das aulas vem do Supabase (seed de docs/*.md);
// aqui só vive o texto de marketing das páginas.
export interface CourseContent {
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroText: string;
  ctaTitle: string;
  ctaText: string;
  benefitsSubtitle: string;
  benefits: { iconPath: string; title: string; description: string }[];
  moduleHooks: Record<number, string>;
  modulesSubtitle: string;
  authorities: { name: string; note: string }[];
  trustText: string;
  faq: { question: string; answer: string }[];
}

const ICON_CHECK = 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
const ICON_EDIT =
  'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z';
const ICON_CHART = 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6';

const FAQ_ACCESS = {
  question: 'Preciso criar conta ou pagar para acessar?',
  answer: 'Não. O curso está em fase inicial de testes: todas as aulas estão abertas, sem login e sem custo.',
};
const FAQ_TIME = {
  question: 'Quanto tempo tenho acesso ao curso?',
  answer:
    'Acesso vitalício. Você estuda no seu ritmo e pode voltar a qualquer módulo sempre que precisar revisar um conceito.',
};

export const COURSE_CONTENT: Record<string, CourseContent> = {
  marketing: {
    metaTitle: 'Curso de Marketing: do Zero ao Avançado | Evolveacademy',
    metaDescription:
      '7 módulos, 42 aulas — os frameworks de Kotler, Cialdini, Ogilvy e Christensen aplicados em exercícios práticos para o marketing do seu negócio.',
    heroTitle: 'Marketing não é sorte nem talento artístico. É um sistema que dá para aprender — e aplicar amanhã.',
    heroText:
      'os frameworks de Kotler, Cialdini, Ogilvy e Christensen traduzidos em exercícios práticos. Do "o que é marketing de verdade" até o seu próprio plano de 90 dias.',
    ctaTitle: 'Você já sabe que marketing no instinto tem teto.',
    ctaText: 'A diferença entre continuar tentando e ter um sistema está em 7 módulos.',
    benefitsSubtitle: 'Não é lista de tópicos — é o que muda na prática do seu marketing.',
    benefits: [
      {
        iconPath: ICON_CHECK,
        title: 'Diagnóstico antes de campanha',
        description:
          'Pare de tratar marketing como "postar mais" e comece a diagnosticar o problema real antes de qualquer ação.',
      },
      {
        iconPath: ICON_EDIT,
        title: 'Copy com estrutura, não sorte',
        description: 'Escreva anúncios, e-mails e páginas de venda com AIDA, PAS e StoryBrand em vez de tentar improvisar.',
      },
      {
        iconPath: ICON_CHART,
        title: 'Métrica pela lucratividade real',
        description:
          'Leia CPA, ROAS e LTV:CAC pelo que realmente importa para o caixa, não pelo número bonito no relatório.',
      },
    ],
    modulesSubtitle: '42 aulas organizadas numa sequência que vai dos fundamentos ao plano de 90 dias de execução.',
    moduleHooks: {
      1: 'Antes de escrever um anúncio, entenda por que a maioria deles falha: o problema quase nunca é a campanha, é não ter respondido "que problema real isso resolve, para quem".',
      2: 'Marca não é logo bonito. É o espaço que você ocupa na cabeça do cliente — e aqui você aprende a construir esse espaço de propósito, não por acaso.',
      3: 'As mesmas estruturas usadas por Ogilvy, Cialdini e Donald Miller para transformar atenção em desejo e desejo em ação — sem depender de sorte na hora de escrever.',
      4: 'SEO, conteúdo, e-mail e redes sociais param de ser tarefas soltas e viram um sistema conectado, cada canal fazendo o trabalho que só ele faz bem.',
      5: 'Meta Ads e Google Ads deixam de ser caixa-preta: você entende o leilão, o funil e por que cortar campanha cedo demais é o erro mais caro do tráfego pago.',
      6: 'A diferença entre achismo e decisão: como ler métrica, rodar teste A/B de verdade e otimizar conversão sem precisar de mais tráfego.',
      7: 'IA, GEO e tendências de mercado, filtradas pela pergunta certa — e o fechamento do curso: seu próprio plano de marketing de 90 dias, pronto para executar.',
    },
    authorities: [
      { name: 'Philip Kotler & David Aaker', note: '4 Ps, marca e posicionamento' },
      { name: 'Robert Cialdini', note: 'gatilhos de persuasão' },
      { name: 'David Ogilvy', note: 'headline e copy de resposta direta' },
      { name: 'Clayton Christensen', note: 'Jobs to Be Done' },
      { name: 'Donald Miller', note: 'StoryBrand aplicado a vendas' },
      { name: 'Dave McClure', note: 'AARRR e métricas de growth' },
    ],
    trustText:
      'O curso não inventa teoria nova — organiza, num sistema único, os frameworks que sustentam decisões de marketing profissional há décadas e continuam validados. Cada aula segue a mesma estrutura: conceito central com a fonte original, aprofundamento tático, exemplo prático, contraexemplo real, erro comum e exercício de fixação.',
    faq: [
      {
        question: 'Eu não tenho nenhuma experiência com marketing. Consigo acompanhar?',
        answer:
          'Sim. O Módulo 1 parte do zero conceitual — o que é marketing, os 4 Ps, segmentação — antes de qualquer aula tática. A sequência dos 7 módulos foi desenhada para quem nunca formalizou o que já faz no instinto.',
      },
      {
        question: 'Isso serve para o meu tipo de negócio, ou é só para e-commerce/SaaS?',
        answer:
          'Os exemplos e contraexemplos cobrem categorias variadas — varejo, serviço local, B2B, infoproduto, franquia. O método se aplica a qualquer PME; os exercícios pedem que você aplique com os dados do seu próprio negócio.',
      },
      FAQ_TIME,
      FAQ_ACCESS,
    ],
  },
  webdesign: {
    metaTitle: 'Curso de Web Design: do Zero ao Avançado | Evolveacademy',
    metaDescription:
      '7 módulos, 42 aulas — HTML semântico, CSS, UI/UX, JavaScript, performance e acessibilidade com frameworks consagrados e exercícios práticos.',
    heroTitle: 'Web design não é deixar bonito. É resolver o problema de quem usa — e saber construir a solução.',
    heroText:
      'de HTML semântico e CSS a UI/UX, JavaScript, performance e acessibilidade, com frameworks consagrados traduzidos em exercícios práticos. Do "o que é web design de verdade" até a carreira.',
    ctaTitle: 'Site bonito que ninguém consegue usar não vende.',
    ctaText: 'A diferença entre decorar uma página e projetar uma experiência está em 7 módulos.',
    benefitsSubtitle: 'Não é lista de ferramentas — é o que muda na qualidade dos sites que você constrói.',
    benefits: [
      {
        iconPath: ICON_CHECK,
        title: 'Decisão antes de pixel',
        description: 'Pare de abrir o editor sem saber quem usa a página e qual é a ação principal dela.',
      },
      {
        iconPath: ICON_EDIT,
        title: 'Código que funciona em qualquer tela',
        description: 'HTML semântico, Flexbox, Grid e mobile-first em vez de tentativa e erro até "parecer certo".',
      },
      {
        iconPath: ICON_CHART,
        title: 'Rápido, acessível e publicado',
        description: 'Meça performance e acessibilidade com critérios reais e coloque o site no ar com segurança.',
      },
    ],
    modulesSubtitle: '42 aulas organizadas numa sequência que vai dos fundamentos à estratégia e carreira.',
    moduleHooks: {
      1: 'Entenda web design como a construção de uma experiência que resolve um problema, e como a web funciona por baixo: navegador, servidor, HTML, CSS e JavaScript.',
      2: 'HTML semântico não é detalhe: é a base de acessibilidade, SEO e manutenção. Aprenda a estruturar páginas que fazem sentido para pessoas e máquinas.',
      3: 'Box model, Flexbox, Grid, especificidade e responsividade: o CSS deixa de ser tentativa e erro e vira um sistema previsível.',
      4: 'Hierarquia, tipografia, cor, componentes e usabilidade: como decidir o que o usuário vê, entende e clica.',
      5: 'JavaScript no ponto certo: DOM, eventos, formulários e dados, sem transformar cada página em um projeto gigante.',
      6: 'Core Web Vitals, acessibilidade (WCAG), SEO técnico e deploy: o que separa um site que funciona na sua máquina de um que funciona para todos.',
      7: 'Processo, portfólio, precificação e carreira: como transformar o que você aprendeu em projetos reais e renda.',
    },
    authorities: [
      { name: 'Don Norman', note: 'affordance e design centrado no usuário' },
      { name: 'Steve Krug', note: 'usabilidade: "Don\'t Make Me Think"' },
      { name: 'Jakob Nielsen', note: '10 heurísticas de usabilidade' },
      { name: 'W3C / WCAG', note: 'padrões de acessibilidade na web' },
      { name: 'Brad Frost', note: 'Atomic Design e sistemas de design' },
      { name: 'Google Web Vitals', note: 'métricas de performance e experiência' },
    ],
    trustText:
      'O curso não inventa teoria nova — organiza, num sistema único, os frameworks e padrões que sustentam o trabalho profissional de web design há anos. Cada aula segue a mesma estrutura: conceito central com a fonte original, aprofundamento tático, exemplo prático, contraexemplo real, erro comum e exercício de fixação.',
    faq: [
      {
        question: 'Nunca programei nem desenhei um site. Consigo acompanhar?',
        answer:
          'Sim. O Módulo 1 parte do zero — o que é web design e como a web funciona — antes de qualquer código. A sequência dos 7 módulos foi desenhada para quem está começando.',
      },
      {
        question: 'Preciso instalar ou comprar alguma ferramenta?',
        answer:
          'Não. Um editor de texto gratuito e um navegador bastam para os exercícios; as ferramentas opcionais são indicadas nas aulas.',
      },
      FAQ_TIME,
      FAQ_ACCESS,
    ],
  },
};
