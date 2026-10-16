# Curso de web design: do zero ao avançado

7 módulos · 42 aulas · glossário de 27 termos. Cada aula: objetivo, conceito central (com framework consagrado), aprofundamento tático, exemplo prático, contraexemplo, erro comum, exercício de fixação, para ir além.

---

# Módulo 1 — Fundamentos de web design

## 1.1 O que é web design (e o que não é)

**Objetivo:** Entender web design como a construção de uma experiência que resolve um problema do usuário, não como "deixar bonito".

**Conceito central:** Web design é frequentemente confundido com estética — escolher cores bonitas, fontes elegantes, ícones modernos. Isso é só a camada visível. A definição mais precisa, herdada do design de produto, é: web design é o processo de estruturar informação e interação de forma que uma pessoa consiga atingir um objetivo (comprar, entender, se cadastrar, ler) com o menor esforço e a maior clareza possíveis. Don Norman, no clássico "The Design of Everyday Things", chama isso de affordance: um bom design comunica, sem precisar de instrução, o que pode ser feito com ele. Um site pode ser visualmente impecável e, mesmo assim, ser um péssimo design — se o botão de comprar está escondido, se o texto não responde à pergunta que trouxe a pessoa até ali, a estética não salva a função. Por isso, antes de pensar em paleta de cores, a pergunta certa é sempre "quem chega aqui, com que objetivo, e o que precisa acontecer na tela para que esse objetivo seja alcançado?".

**Aprofundamento tático:** Antes de abrir qualquer ferramenta de design ou editor de código, responda três perguntas, nessa ordem: (1) Quem é a pessoa que vai usar essa página, e o que ela sabe (ou não sabe) ao chegar? (2) Qual é a única ação mais importante que ela deve conseguir fazer nessa tela? (3) O que, na estrutura da página, está competindo pela atenção dela e atrapalhando essa ação? Um erro recorrente de quem está começando é desenhar a homepage inteira antes de decidir qual é a ação prioritária — o resultado são páginas com cinco CTAs diferentes competindo entre si, nenhum vencendo.

**Exemplo prático:** A página inicial do Linear (linear.app) é um exemplo de design reduzido à função: título curto explicando o produto, uma imagem do produto em uso, e um único botão de ação principal. Não existe menu com quinze itens, não existe carrossel de banners — porque a equipe decidiu qual era a única ação que importava (experimentar o produto) e removeu tudo que competia com ela.

**Contraexemplo:** Sites institucionais de empresas de médio porte frequentemente têm homepages com seis seções, três chamadas para ação diferentes ("fale conosco", "baixe nosso catálogo", "assine a newsletter") e nenhuma hierarquia clara entre elas. O visitante não sabe o que fazer primeiro, e a taxa de conversão sofre — não porque o design é "feio", mas porque ele não decidiu por que existe.

**Erro comum:** Tratar web design como sinônimo de ferramenta ("aprender Figma", "aprender CSS") em vez de tratá-lo como raciocínio sobre usuário e objetivo. A ferramenta é só o meio de expressar uma decisão — sem a decisão certa, a ferramenta mais avançada do mundo produz um site bonito e ineficaz.

**Exercício de fixação:** Escolha um site que você usa com frequência. Identifique qual é a ação principal que a página quer que você tome, e liste três elementos na tela que reforçam essa ação e um elemento que compete com ela.

**Para ir além:** Leia os capítulos iniciais de "The Design of Everyday Things", de Don Norman, sobre affordance e feedback. Pesquise também sobre "Don't Make Me Think", de Steve Krug — um dos livros mais citados sobre usabilidade web.

---

## 1.2 Como a web funciona: HTML, CSS, JS, navegador e servidor

**Objetivo:** Entender o papel de cada camada técnica da web antes de escrever a primeira linha de código.

**Conceito central:** Toda página web é composta por três linguagens com papéis bem definidos, e confundir esses papéis é a raiz de boa parte da confusão de quem está começando. HTML (HyperText Markup Language) define o conteúdo e a estrutura — o "o que existe" na página: títulos, parágrafos, imagens, formulários. CSS (Cascading Style Sheets) define a apresentação — o "como aparece": cores, espaçamento, layout, tipografia. JavaScript define o comportamento — o "o que acontece" quando alguém interage: cliques, animações, validações, dados carregados dinamicamente. Quando você digita um endereço no navegador, ele faz uma requisição a um servidor, que devolve arquivos HTML, CSS e JS; o navegador interpreta esses arquivos, monta o DOM (Document Object Model, a representação em árvore da página) e renderiza o resultado na tela. Entender essa separação de papéis evita um erro comum: tentar resolver com CSS um problema que é de estrutura (HTML) ou tentar resolver com JavaScript um problema que o CSS já resolve de forma mais simples e performática.

**Aprofundamento tático:** Ao construir qualquer elemento de interface, pergunte, nessa ordem: primeiro, "isso é conteúdo ou estrutura?" — se for, é HTML. Depois, "isso muda a aparência de algo que já existe?" — se for, é CSS. Só por último, "isso exige reagir a uma ação do usuário ou buscar dados de fora?" — aí, e só aí, é JavaScript. Um menu que abre e fecha ao clicar, por exemplo, pode ser feito majoritariamente com CSS puro (usando `:checked` ou `:focus-within`) sem precisar de uma linha de JavaScript — mais leve, mais rápido, com menos chance de quebrar.

**Exemplo prático:** Um formulário de contato usa HTML para os campos (`<input>`, `<textarea>`), CSS para deixá-los visualmente alinhados e com espaçamento adequado, e JavaScript apenas para validar em tempo real se o e-mail digitado tem formato válido antes de enviar — cada camada fazendo exatamente o que ela faz melhor.

**Contraexemplo:** É comum ver projetos onde toda a estilização é feita via JavaScript, manipulando `style` diretamente no elemento a cada interação, quando um simples toggle de classe CSS resolveria com muito menos código e melhor performance — sintoma de não ter internalizado qual camada resolve qual problema.

**Erro comum:** Aprender as três linguagens isoladamente, sem entender como elas se conectam no navegador — o que leva a copiar códigos prontos sem saber por que funcionam, e a travar na primeira vez que algo quebra.

**Exercício de fixação:** Abra as ferramentas de desenvolvedor do navegador (F12) em um site que você goste, vá na aba "Elements" e identifique: um trecho de HTML puro, uma regra de CSS aplicada a ele, e (na aba "Sources") um arquivo JavaScript carregado pela página.

**Para ir além:** Pesquise "critical rendering path" para entender, em detalhe técnico, a sequência exata que o navegador segue entre receber os arquivos e pintar a tela.

---

## 1.3 Estrutura de um documento HTML

**Objetivo:** Escrever a estrutura mínima correta de um documento HTML e entender o papel de cada parte.

**Conceito central:** Todo documento HTML válido segue um esqueleto fixo: a declaração `<!DOCTYPE html>` informa ao navegador qual versão de HTML interpretar; a tag `<html>` envolve todo o documento; `<head>` contém metadados que não aparecem visualmente (título da aba, charset, links para CSS, meta tags de SEO); `<body>` contém tudo que é visível na página. Dentro do `<body>`, o conteúdo é organizado em uma árvore de elementos aninhados — um `<div>` pode conter um `<h1>`, que pode conter um `<span>`, e assim por diante — e é essa árvore que forma o DOM que o navegador renderiza. A tag `<meta charset="UTF-8">` evita que acentos e caracteres especiais apareçam corrompidos; a tag `<meta name="viewport">` é o que faz o site se comportar corretamente em celular, em vez de aparecer minúsculo como se fosse desktop.

**Aprofundamento tático:** Antes de escrever qualquer conteúdo, garanta que o `<head>` tenha, no mínimo: charset UTF-8, viewport configurado para mobile, um `<title>` descritivo (que aparece na aba do navegador e nos resultados de busca) e uma `<meta name="description">` — ela não afeta ranking diretamente, mas é frequentemente o texto que aparece embaixo do link nos resultados do Google, e influencia diretamente a taxa de clique.

**Exemplo prático:** Um esqueleto mínimo correto:
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nome da página</title>
  <meta name="description" content="Resumo de uma frase sobre a página.">
</head>
<body></body>
</html>
```
Esse esqueleto, sozinho, já resolve renderização correta em qualquer navegador e dispositivo, mesmo antes de qualquer conteúdo ser adicionado.

**Contraexemplo:** Páginas sem a meta viewport configurada aparecem, em celulares, como uma versão "encolhida" da versão desktop, forçando o usuário a dar zoom constantemente — um dos motivos mais comuns (e mais fáceis de evitar) de abandono em sites mal configurados.

**Erro comum:** Deixar o atributo `lang` do `<html>` ausente ou errado — isso prejudica leitores de tela (acessibilidade) e a forma como buscadores entendem o idioma do conteúdo.

**Exercício de fixação:** Crie um arquivo `.html` do zero, sem copiar de nenhum template, contendo o esqueleto completo acima mais um `<h1>` com seu nome dentro do `<body>`. Abra no navegador e confira, pela aba, se o título aparece corretamente.

**Para ir além:** Consulte a documentação do MDN Web Docs sobre a tag `<head>` para conhecer outras meta tags relevantes (Open Graph, para quando o link é compartilhado em redes sociais).

---

## 1.4 Caixa, fluxo e o modelo de caixas (box model)

**Objetivo:** Entender o box model como a lógica fundamental por trás de todo espaçamento e layout em CSS.

**Conceito central:** Todo elemento HTML, ao ser renderizado, é tratado pelo navegador como uma caixa retangular — mesmo elementos com aparência arredondada ou de texto corrido. Essa caixa tem quatro camadas, de dentro para fora: content (o conteúdo em si), padding (espaço interno entre o conteúdo e a borda), border (a borda da caixa) e margin (espaço externo, entre essa caixa e as caixas vizinhas). Entender essas quatro camadas resolve, sozinho, a maior parte das dúvidas de "por que esse espaçamento está estranho" que travam iniciantes. Por padrão, o navegador calcula a largura de um elemento somando content + padding + border (chamado `box-sizing: content-box`) — o que significa que adicionar padding a um elemento com largura fixa faz ele ficar maior do que o esperado. Por isso, a prática quase universal hoje é aplicar `box-sizing: border-box` a todos os elementos logo no início do CSS, o que faz padding e border serem incluídos dentro da largura definida, em vez de somados a ela — muito mais previsível.

**Aprofundamento tático:** Sempre que um elemento estiver com tamanho ou posição "errados" e você não souber por quê, abra as ferramentas de desenvolvedor do navegador, selecione o elemento e olhe o diagrama de box model exibido — ele mostra visualmente, com números, cada uma das quatro camadas, e resolve em segundos um problema que poderia levar minutos de tentativa e erro.

**Exemplo prático:**
```css
* { box-sizing: border-box; }
.card {
  padding: 16px;
  border: 1px solid #ccc;
  margin: 8px;
}
```
Com `border-box`, um `.card` com `width: 300px` ocupa exatamente 300px totais na tela, com padding e borda descontados internamente — sem essa regra, ele ocuparia 300px de conteúdo mais 32px de padding mais 2px de borda, totalizando 334px, o que raramente é o que se pretendia.

**Contraexemplo:** Sem `box-sizing: border-box`, é comum ver layouts que "estouram" — elementos que deveriam caber lado a lado em uma linha e acabam quebrando para a linha seguinte, porque a soma real de cada caixa é maior do que a largura definida sugeria.

**Erro comum:** Tentar ajustar layout inteiro mexendo em `margin` quando o problema real está no `padding`, ou vice-versa, sem antes diagnosticar qual das quatro camadas está causando o espaçamento indesejado.

**Exercício de fixação:** Crie três `<div>` com classes diferentes, cada uma com padding, border e margin visivelmente diferentes, e desenhe à mão (papel ou ferramenta de desenho) o diagrama de box model de cada uma antes de conferir no navegador se acertou.

**Para ir além:** Pesquise a diferença entre `box-sizing: content-box` e `border-box` na documentação do MDN, incluindo por que `border-box` se tornou o padrão de facto na indústria.

---

## 1.5 Tipografia e hierarquia visual na web

**Objetivo:** Usar tipografia para guiar o olho do usuário pela ordem de importância da informação, não apenas para "escolher uma fonte bonita".

**Conceito central:** Hierarquia visual é o princípio de que elementos mais importantes devem se destacar visualmente mais que elementos menos importantes — e tipografia é a ferramenta mais poderosa e mais barata para isso. Isso se constrói através de quatro variáveis principais: tamanho (texto maior chama mais atenção), peso (negrito versus regular), cor/contraste (texto mais escuro ou mais saturado se destaca sobre um fundo neutro) e espaçamento (mais respiro ao redor de um elemento aumenta sua importância percebida, mesmo sem mudar tamanho ou cor). Uma escala tipográfica consistente — por exemplo, títulos em 32px, subtítulos em 20px, corpo de texto em 16px, texto secundário em 14px — evita o efeito de "sopa de tamanhos" onde nada parece mais importante que o resto porque tudo tem uma variação aleatória de tamanho. A regra prática mais citada em design de interface é: se você precisa que a pessoa entenda a ordem de leitura em menos de dois segundos, sem ler nada, só olhando os tamanhos e pesos, a hierarquia está funcionando.

**Aprofundamento tático:** Defina uma escala tipográfica fixa antes de desenhar qualquer tela — geralmente entre 4 e 6 tamanhos (ex.: 12, 14, 16, 20, 28, 40px) — e use exclusivamente esses valores em todo o projeto, nunca tamanhos arbitrários escolhidos "no olho" tela por tela. Combine no máximo duas famílias tipográficas por projeto (uma para títulos, outra para corpo, ou a mesma família em pesos diferentes) — mais que isso cria ruído visual sem ganho de clareza.

**Exemplo prático:** O site da Apple usa uma escala tipográfica extremamente disciplinada: títulos gigantes (60px+) com peso leve, corpo de texto em torno de 17-19px com alto contraste, e quase nenhuma variação fora dessa escala — o resultado é uma leitura confortável mesmo em páginas de produto com muito texto.

**Contraexemplo:** Sites institucionais com CSS acumulado ao longo dos anos, sem padronização, costumam ter dezenas de tamanhos de fonte diferentes espalhados (15px aqui, 15.5px ali, 16px acolá) — a diferença é imperceptível ao olho, mas o excesso de valores diferentes é sintoma de ausência de sistema, e dificulta manutenção.

**Erro comum:** Usar apenas negrito ou apenas tamanho para criar hierarquia, ignorando cor e espaçamento — o que limita as combinações possíveis e frequentemente resulta em textos "gritando" (tudo em negrito) sem hierarquia real.

**Exercício de fixação:** Pegue um texto qualquer com título, subtítulo, dois parágrafos e uma citação, e aplique uma escala tipográfica de sua criação (defina os tamanhos antes de aplicar) usando apenas HTML e CSS, sem nenhuma imagem.

**Para ir além:** Pesquise sobre "modular scale" (escala modular tipográfica), técnica que usa proporções matemáticas (como a razão áurea) para gerar escalas tipográficas harmônicas automaticamente.

---

## 1.6 Cor, contraste e acessibilidade visual *(aula avançada)*

**Objetivo:** Escolher paletas de cor com base em contraste e acessibilidade, não apenas em preferência estética.

**Conceito central:** Cor comunica significado (vermelho para erro, verde para sucesso, por convenção cultural amplamente compartilhada) e cria hierarquia — mas seu uso na web tem uma restrição técnica frequentemente ignorada: contraste. A WCAG (Web Content Accessibility Guidelines), o padrão internacional de acessibilidade web, exige uma razão de contraste mínima de 4.5:1 entre texto e fundo para o nível AA (o mais comumente exigido) em texto normal, e 3:1 para texto grande. Isso não é burocracia — cerca de 8% dos homens têm algum grau de daltonismo, e um número relevante de usuários navega em telas de baixa qualidade, sob luz solar direta, ou com visão reduzida por idade. Um texto cinza claro sobre fundo branco pode parecer "elegante e minimalista" no Figma, numa tela calibrada, e ser literalmente ilegível para uma parte real da audiência. Ferramentas como o WebAIM Contrast Checker calculam essa razão automaticamente a partir dos códigos hexadecimais das cores.

**Aprofundamento tático:** Construa a paleta do projeto testando cada combinação texto/fundo que será usada de fato contra o WCAG AA antes de aprovar o design — não depois. Uma prática comum e eficaz: nunca depender apenas de cor para comunicar um estado (erro, sucesso, alerta) — sempre combine cor com um segundo indicador, como ícone ou texto, para que pessoas com daltonismo não percam a informação.

**Exemplo prático:** Formulários bem desenhados marcam um campo com erro em vermelho (cor), mas também adicionam um ícone de alerta e uma mensagem de texto explicando o erro — assim, mesmo alguém que não distingue vermelho de verde entende exatamente o que está errado.

**Contraexemplo:** Gráficos que usam apenas cor para diferenciar categorias (linha vermelha vs. linha verde, sem legenda textual nem padrão de traço diferente) são ilegíveis para uma fração relevante dos usuários com daltonismo — problema comum em dashboards e relatórios visuais.

**Erro comum:** Escolher a paleta de cores olhando apenas para a estética em uma tela de alta qualidade, sem nunca testar contraste real ou simular visão com daltonismo (ferramentas do Chrome DevTools permitem essa simulação diretamente).

**Exercício de fixação:** Pegue a paleta de cores do seu projeto atual (ou de um site que admire) e teste, uma a uma, as combinações de texto sobre fundo usadas na prática, usando o WebAIM Contrast Checker. Liste quais combinações falham no nível AA.

**Para ir além:** Leia a seção de "Contraste mínimo" (Success Criterion 1.4.3) da WCAG 2.1 diretamente na especificação, e explore o simulador de daltonismo integrado ao Chrome DevTools (aba Rendering → Emulate vision deficiencies).

---

# Módulo 2 — HTML semântico e estrutura

## 2.1 Tags semânticas e por que importam

**Objetivo:** Usar tags HTML que descrevem o significado do conteúdo, não apenas sua aparência.

**Conceito central:** HTML semântico é a prática de escolher tags que comunicam o propósito do conteúdo — `<nav>` para navegação, `<article>` para conteúdo autocontido, `<header>` e `<footer>` para cabeçalho e rodapé, `<button>` para ações clicáveis — em vez de usar `<div>` genérico para tudo e depender só de classes CSS para diferenciar. Isso importa por três motivos concretos: leitores de tela (usados por pessoas cegas ou com baixa visão) dependem da semântica para anunciar corretamente a estrutura da página; buscadores usam a semântica como sinal de relevância e estrutura de conteúdo; e desenvolvedores que mantêm o código depois de você entendem a intenção de cada trecho muito mais rápido. Um `<div class="button" onclick="...">` visualmente idêntico a um `<button>` não recebe foco de teclado automaticamente, não é anunciado como botão por leitores de tela, e não responde à tecla Enter/Espaço sem JavaScript adicional — o elemento semântico correto resolve tudo isso de graça.

**Aprofundamento tático:** Antes de escrever `<div>`, pergunte "existe uma tag semântica que já descreve exatamente isso?" — HTML5 oferece `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<figure>`, `<time>`, entre outras, cobrindo a maioria dos casos de estrutura de página. Reserve `<div>` e `<span>` para agrupamentos puramente visuais, sem significado semântico próprio.

**Exemplo prático:**
```html
<header>
  <nav>
    <a href="/">Início</a>
    <a href="/sobre">Sobre</a>
  </nav>
</header>
<main>
  <article>
    <h1>Título do post</h1>
    <p>Conteúdo...</p>
  </article>
</main>
<footer>© 2026</footer>
```
Essa estrutura, sem nenhuma linha de CSS, já é navegável e compreensível por um leitor de tela — um usuário cego consegue pular direto para `<main>` ou `<nav>` usando atalhos do próprio leitor.

**Contraexemplo:** Páginas construídas inteiramente com `<div>` aninhados (o chamado "div soup") funcionam visualmente, mas são uma caixa-preta para leitores de tela e para qualquer ferramenta automatizada — incluindo os próprios bots de busca, que têm mais dificuldade em entender a hierarquia de importância do conteúdo.

**Erro comum:** Usar `<h1>` a `<h6>` pela aparência visual desejada (escolher `<h3>` porque o tamanho de fonte padrão "ficou bom") em vez de pela hierarquia real do conteúdo — hierarquia de cabeçalho deve refletir estrutura lógica, e o tamanho visual deve ser ajustado depois, via CSS.

**Exercício de fixação:** Pegue uma página HTML que você tenha escrito usando `<div>` para tudo e reescreva a estrutura usando as tags semânticas apropriadas, sem mudar a aparência visual final.

**Para ir além:** Consulte a "HTML5 sectioning elements" no MDN Web Docs e teste sua própria página com um leitor de tela gratuito (NVDA no Windows, VoiceOver no Mac) para sentir na prática a diferença entre HTML semântico e não semântico.

---

## 2.2 Formulários e inputs

**Objetivo:** Construir formulários que sejam fáceis de preencher, validáveis nativamente e acessíveis por teclado.

**Conceito central:** Formulários são o ponto de maior atrito em qualquer site — é onde o usuário precisa parar de navegar passivamente e começar a fazer esforço ativo (digitar, escolher, decidir). HTML oferece tipos de input especializados (`type="email"`, `type="tel"`, `type="date"`, `type="number"`) que, além de ativarem teclados otimizados em dispositivos móveis (teclado numérico para telefone, por exemplo), trazem validação nativa do navegador sem precisar de JavaScript. O elemento `<label>`, associado corretamente a um input via atributo `for` (ou envolvendo o input diretamente), é o que permite que leitores de tela anunciem o propósito do campo e que clicar no texto do label foque automaticamente o campo — um ganho de usabilidade e acessibilidade que custa uma linha de código. Atributos como `required`, `minlength`, `pattern` adicionam validação declarativa, sem lógica customizada.

**Aprofundamento tático:** Toda vez que criar um campo de formulário, garanta três coisas antes de estilizar: (1) um `<label>` associado corretamente, nunca apenas um placeholder fazendo esse papel (placeholder desaparece ao digitar, e a pessoa perde a referência do que estava preenchendo); (2) o `type` mais específico disponível para aquele dado; (3) mensagens de erro que aparecem próximas ao campo com problema, não só no topo do formulário, onde é fácil de perder o contexto.

**Exemplo prático:**
```html
<label for="email">E-mail</label>
<input type="email" id="email" name="email" required>
```
Esse par label/input já garante: teclado de e-mail em mobile, validação nativa de formato, foco automático ao clicar no texto "E-mail", e anúncio correto por leitores de tela — sem uma linha de JavaScript.

**Contraexemplo:** Formulários que usam apenas placeholder como identificação do campo ("Digite seu nome" desaparecendo ao clicar) obrigam quem tem dificuldade de memória de curto prazo, ou que foi interrompido no meio do preenchimento, a apagar o que digitou para lembrar o que aquele campo pedia.

**Erro comum:** Depender exclusivamente de validação via JavaScript, ignorando os atributos nativos do HTML — o que duplica trabalho e ainda falha silenciosamente se o JavaScript não carregar por algum motivo (conexão instável, bloqueador de script).

**Exercício de fixação:** Construa um formulário de cadastro com nome, e-mail, telefone e data de nascimento, usando os tipos de input corretos para cada campo e labels associados corretamente — sem nenhum JavaScript de validação.

**Para ir além:** Consulte a lista completa de tipos de `<input>` no MDN Web Docs e teste, no seu celular, como cada tipo altera o teclado exibido.

---

## 2.3 Imagens, mídia e atributos essenciais

**Objetivo:** Usar imagens de forma performática e acessível, com os atributos corretos.

**Conceito central:** A tag `<img>` tem dois atributos que são frequentemente esquecidos e que carregam responsabilidades importantes: `alt`, que descreve textualmente o conteúdo da imagem para leitores de tela e para quando a imagem falha ao carregar, e `width`/`height` (ou `aspect-ratio` via CSS), que informam ao navegador o espaço que a imagem vai ocupar antes mesmo dela terminar de carregar — evitando o efeito de "pulo de layout" (layout shift) quando a imagem chega depois do texto. Imagens são, na maioria dos sites, o maior peso em bytes transferidos — por isso formatos modernos como WebP e AVIF, que comprimem com muito mais eficiência que JPEG ou PNG tradicionais, e o atributo `loading="lazy"` (que adia o carregamento de imagens fora da tela inicial) têm impacto direto e mensurável na velocidade de carregamento.

**Aprofundamento tático:** Escreva o `alt` pensando em "o que essa imagem comunica, no contexto da página, para alguém que não pode vê-la?" — imagens puramente decorativas (sem informação relevante) devem ter `alt=""` vazio, não omitido, para que leitores de tela as ignorem explicitamente em vez de tentar descrever um nome de arquivo genérico. Aplique `loading="lazy"` em toda imagem que não aparece na primeira tela visível (above the fold).

**Exemplo prático:**
```html
<img src="produto.webp" alt="Tênis de corrida azul, vista lateral"
     width="600" height="400" loading="lazy">
```
Esse `<img>` já resolve: formato leve (WebP), descrição acessível, reserva de espaço evitando layout shift, e carregamento adiado se estiver fora da primeira tela.

**Contraexemplo:** Sites de e-commerce com dezenas de fotos de produto em JPEG não comprimido, sem `width`/`height` definidos, costumam sofrer de "pulo de layout" visível — o usuário começa a ler um preço e o texto salta para baixo quando a imagem termina de carregar, um dos fatores que mais prejudicam a métrica CLS (Cumulative Layout Shift) do Core Web Vitals.

**Erro comum:** Deixar `alt` vazio (ou ausente) em imagens que carregam informação real, como gráficos ou fotos de produto — isso torna esse conteúdo completamente invisível para quem usa leitor de tela.

**Exercício de fixação:** Pegue cinco imagens de um projeto seu (ou baixadas de um banco gratuito) e escreva, para cada uma, um `alt` que descreva o conteúdo de forma útil em uma frase — depois compare com o que um colega escreveria para as mesmas imagens.

**Para ir além:** Pesquise sobre o elemento `<picture>` e o atributo `srcset`, que permitem servir imagens de resolução diferente conforme o tamanho da tela do dispositivo, economizando dados em mobile.

---

## 2.4 Links, navegação e arquitetura de informação

**Objetivo:** Estruturar a navegação de um site para que qualquer página esteja a poucos cliques de distância de qualquer outra.

**Conceito central:** Arquitetura de informação é a disciplina de organizar o conteúdo de um site em uma estrutura que faça sentido para quem usa, não apenas para quem construiu. Uma boa arquitetura segue geralmente a "regra dos três cliques" (mais um guia informal que uma lei rígida): a maioria dos conteúdos importantes deve ser alcançável em no máximo três cliques a partir da homepage. Links devem ter texto descritivo do destino — "clique aqui" não diz nada fora de contexto, enquanto "veja nossos planos de assinatura" já comunica o destino mesmo isolado do resto da frase, o que importa tanto para SEO quanto para leitores de tela (que frequentemente navegam listando todos os links da página fora de contexto). O atributo `rel="noopener"` em links que abrem em nova aba (`target="_blank"`) evita uma vulnerabilidade de segurança onde a página aberta pode manipular a página de origem.

**Aprofundamento tático:** Antes de desenhar o menu de navegação, mapeie todas as páginas do site em uma lista simples e agrupe-as por tema — o menu deve refletir esse agrupamento, não a ordem em que as páginas foram criadas. Limite o menu principal a 5-7 itens: mais que isso sobrecarrega a memória de curto prazo do usuário (o número mágico de Miller, "sete mais ou menos dois", segue sendo uma referência útil mesmo décadas depois do estudo original).

**Exemplo prático:** Um site de e-commerce bem estruturado organiza o menu por categoria de produto (não por data de cadastro ou por departamento interno da empresa), com breadcrumbs (trilha de navegação, ex. "Início > Roupas > Camisetas") em cada página de produto, permitindo que o usuário entenda instantaneamente onde está e volte facilmente um nível acima.

**Contraexemplo:** Sites institucionais grandes frequentemente têm menus com quinze ou mais itens de primeiro nível, refletindo a estrutura de departamentos internos da empresa em vez da forma como um visitante externo pensa sobre o conteúdo — o resultado é um visitante perdido, que não sabe em qual item clicar.

**Erro comum:** Usar texto genérico em links ("clique aqui", "saiba mais", "veja") sem contexto que sobreviva fora da frase — prejudica SEO e torna a navegação por leitor de tela (que lista links soltos) praticamente inutilizável.

**Exercício de fixação:** Liste todas as páginas de um site seu (ou de um projeto fictício) em uma planilha simples, agrupe-as por tema, e desenhe a estrutura de menu resultante — depois verifique se qualquer página está a mais de três cliques da home.

**Para ir além:** Pesquise sobre "card sorting", técnica de pesquisa de UX onde usuários reais agrupam conteúdos em categorias, usada para validar arquitetura de informação com dados em vez de suposição.

---

## 2.5 Tabelas: quando usar (e quando não usar)

**Objetivo:** Reconhecer quando uma tabela HTML é a estrutura correta — e quando ela é usada por hábito, indevidamente, para layout.

**Conceito central:** No início da web, tabelas (`<table>`) eram usadas para tudo, inclusive layout geral de página — prática hoje considerada obsoleta e problemática, porque tabelas de layout confundem leitores de tela (que tentam interpretar cada célula como dado tabular) e são rígidas para responsividade. A regra moderna é simples: use `<table>` exclusivamente para dados genuinamente tabulares — informação que faz sentido ser lida em linhas e colunas, como uma planilha de preços, um calendário, resultados esportivos. Para qualquer outro tipo de layout (menus, cards, grids de produto), Flexbox e CSS Grid (assunto do Módulo 3) são as ferramentas corretas. Dentro de uma tabela de dados de verdade, `<th>` (table header) marca semanticamente os cabeçalhos de linha ou coluna, e o atributo `scope` (`scope="col"` ou `scope="row"`) informa a leitores de tela a qual eixo aquele cabeçalho se refere — sem isso, uma tabela complexa se torna difícil de navegar por áudio.

**Aprofundamento tático:** Antes de usar `<table>`, pergunte: "se eu imprimisse esse conteúdo e cortasse cada célula em um pedaço de papel separado, ainda faria sentido comparar linha com linha e coluna com coluna?" Se sim, é tabela de verdade. Se a resposta for "não, isso é só um jeito de alinhar coisas na tela", a estrutura correta é outra.

**Exemplo prático:**
```html
<table>
  <caption>Planos de assinatura</caption>
  <thead>
    <tr><th scope="col">Plano</th><th scope="col">Preço</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Básico</th><td>R$ 29/mês</td></tr>
  </tbody>
</table>
```
Essa tabela de comparação de planos é um caso legítimo de dado tabular, e o `scope` garante que um leitor de tela anuncie corretamente "Plano: Básico, Preço: R$29/mês" ao navegar célula por célula.

**Contraexemplo:** Sites antigos que ainda usam `<table>` aninhadas para posicionar logotipo, menu e conteúdo lado a lado sofrem para se adaptar a telas menores — a tabela não "quebra linha" de forma fluida como um layout Flexbox ou Grid faria, exigindo scroll horizontal incômodo em mobile.

**Erro comum:** Usar `<div>` estilizado como se fosse tabela para dados genuinamente tabulares (evitando `<table>` por achar a tag "antiquada") — isso remove a semântica que leitores de tela e ferramentas de acessibilidade dependem para interpretar dados em grade corretamente.

**Exercício de fixação:** Pegue um conjunto de dados reais (por exemplo, uma tabela de preços ou horários) e marque corretamente com `<table>`, `<thead>`, `<tbody>`, `<th scope="col">` e `<caption>`.

**Para ir além:** Consulte o guia de acessibilidade de tabelas do WebAIM, que detalha padrões para tabelas complexas com múltiplos níveis de cabeçalho.

---

## 2.6 SEO on-page e HTML acessível (aria, alt, landmarks) *(aula avançada)*

**Objetivo:** Usar a estrutura semântica do HTML como base tanto de SEO quanto de acessibilidade — porque, na maioria dos casos, é a mesma estrutura que serve às duas coisas.

**Conceito central:** SEO on-page (dentro da própria página, em oposição a fatores externos como backlinks) e acessibilidade compartilham uma base técnica comum: ambos dependem de a página comunicar claramente sua estrutura e significado através do HTML, não apenas da aparência visual. Um único `<h1>` por página, hierarquia de cabeçalhos sem pular níveis (de `<h2>` direto para `<h4>`, por exemplo, sem `<h3>` no meio), `<title>` e meta description descritivos, URLs legíveis (`/produtos/tenis-corrida` em vez de `/p?id=8827`) — tudo isso ajuda tanto buscadores a entender do que a página trata quanto leitores de tela a navegar de forma lógica. Landmarks ARIA (`role="navigation"`, `role="main"`, ou simplesmente o uso correto de `<nav>`, `<main>`, que já carregam esses papéis implicitamente) permitem que usuários de leitor de tela pulem diretamente para a seção que precisam, em vez de ouvir a página inteira do topo.

**Aprofundamento tático:** ARIA deve ser usado como último recurso, não como primeira escolha — a regra de ouro da acessibilidade web é "no ARIA is better than bad ARIA": se existe uma tag HTML semântica nativa que já carrega o papel necessário (como `<nav>` em vez de `<div role="navigation">`), use a tag nativa. Reserve atributos ARIA (`aria-label`, `aria-expanded`, `aria-hidden`) para casos onde o HTML puro não é suficiente — como um menu que abre/fecha, onde `aria-expanded="true/false"` comunica o estado atual ao leitor de tela.

**Exemplo prático:** Um menu mobile do tipo "hamburguer" bem construído usa `<button aria-expanded="false" aria-controls="menu-mobile">` no ícone de abrir, atualizando `aria-expanded` para `"true"` via JavaScript quando o menu abre — isso permite que um usuário de leitor de tela saiba se o menu está aberto ou fechado, informação que seria invisível olhando só o HTML visual.

**Contraexemplo:** Sites otimizados apenas para SEO técnico (título, meta description, palavras-chave) mas com HTML não semântico e sem nenhum atributo ARIA aparecem bem no Google, mas são praticamente inutilizáveis por usuários de leitor de tela — SEO e acessibilidade não são a mesma coisa, mas compartilham fundação, e ignorar uma enquanto se otimiza a outra deixa metade do trabalho pela metade.

**Erro comum:** Adicionar `aria-label` em excesso, em elementos que já têm texto visível claro — ARIA mal aplicado pode piorar a experiência de leitor de tela, sobrepondo ou contradizendo informação que já estava correta no HTML nativo.

**Exercício de fixação:** Audite uma página sua com a ferramenta Lighthouse do Chrome DevTools (aba Accessibility e aba SEO) e corrija os três problemas de maior prioridade apontados em cada categoria.

**Para ir além:** Consulte o guia "Using ARIA" do W3C, especialmente a seção de regras de uso, e o checklist de SEO on-page do Google Search Central.

---

# Módulo 3 — CSS: layout e estilo

## 3.1 Seletores, especificidade e cascata

**Objetivo:** Entender por que uma regra CSS "não está funcionando" — quase sempre é uma questão de especificidade, não de sintaxe errada.

**Conceito central:** CSS significa Cascading Style Sheets — a palavra "cascata" descreve exatamente o mecanismo que determina qual regra vence quando duas ou mais regras tentam estilizar o mesmo elemento. Essa decisão é feita por especificidade, um sistema de pontuação: seletores de ID (`#header`) pesam mais que seletores de classe (`.header`), que pesam mais que seletores de tag (`header`). Regras `!important` sobrepõem qualquer especificidade normal (e por isso devem ser evitadas na maioria dos casos — usá-las em excesso torna o CSS imprevisível e difícil de sobrescrever depois). Quando duas regras têm a mesma especificidade, a que aparece por último no código vence — daí "cascata". Entender essa hierarquia resolve o problema mais comum de iniciantes: escrever uma regra CSS correta que simplesmente não aparece, porque outra regra mais específica (às vezes vinda de um framework CSS ou de um reset) está vencendo silenciosamente.

**Aprofundamento tático:** Ao debugar um estilo que "não aplica", abra as ferramentas de desenvolvedor, selecione o elemento e olhe o painel de estilos aplicados: o navegador mostra todas as regras que competem pelo elemento, com as vencedoras em destaque e as perdedoras riscadas — isso elimina 90% do tempo gasto adivinhando o motivo. Como prática geral, prefira seletores de classe (`.card`) a seletores de ID ou tag para estilização, reservando ID para casos únicos de página (como âncoras de navegação) e evitando `!important` como primeira solução.

**Exemplo prático:**
```css
.botao { background: blue; }
#cta-principal { background: red; }
```
Um elemento com `class="botao" id="cta-principal"` fica vermelho, não azul — porque o seletor de ID tem especificidade maior que o de classe, independente da ordem no arquivo.

**Contraexemplo:** Projetos com CSS acumulado ao longo do tempo, cheios de `!important` espalhados para "forçar" estilos a funcionarem, acabam numa situação onde novas mudanças exigem `!important` sobre `!important`, tornando o arquivo praticamente impossível de prever ou manter sem testar cada mudança diretamente no navegador.

**Erro comum:** Usar `!important` como primeira solução para um estilo que "não funciona", em vez de investigar qual regra está realmente vencendo e por quê — isso mascara o sintoma sem resolver a causa, e acumula dívida técnica.

**Exercício de fixação:** Escreva três regras CSS conflitantes (uma por tag, uma por classe, uma por ID) para a mesma propriedade no mesmo elemento, preveja qual vai vencer antes de testar, e confira no navegador se sua previsão estava certa.

**Para ir além:** Pesquise a "calculadora de especificidade CSS" (specificity calculator) — ferramentas online que mostram visualmente a pontuação de qualquer seletor.

---

## 3.2 Flexbox na prática

**Objetivo:** Usar Flexbox para resolver o problema mais comum de layout: alinhar e distribuir elementos em uma linha ou coluna.

**Conceito central:** Flexbox (Flexible Box Layout) é um sistema de layout unidimensional — ele organiza elementos em uma única direção por vez, linha (`row`) ou coluna (`column`). O container que recebe `display: flex` se torna o "pai flex", e seus filhos diretos se tornam "itens flex", que passam a se comportar de forma coordenada em vez de empilhados isoladamente. As duas propriedades mais usadas no dia a dia são `justify-content` (alinhamento no eixo principal — geralmente horizontal) e `align-items` (alinhamento no eixo cruzado — geralmente vertical); a combinação `justify-content: center; align-items: center;` no container pai é, sozinha, a forma mais simples de centralizar qualquer elemento vertical e horizontalmente — um problema que, antes do Flexbox, exigia gambiarras conhecidas (como posicionamento absoluto combinado com transform) que boa parte dos desenvolvedores memorizava sem entender de fato.

**Aprofundamento tático:** Ao montar qualquer barra de navegação, linha de botões, ou lista de cards que precisa se distribuir horizontalmente, comece perguntando: "isso é uma sequência em uma única direção?" Se sim, Flexbox provavelmente é suficiente — reserve o CSS Grid (próxima aula) para layouts que exigem controle simultâneo de linhas E colunas. `flex-wrap: wrap` permite que os itens "quebrem linha" automaticamente quando não cabem mais na largura disponível, tornando o layout responsivo sem media queries adicionais em muitos casos.

**Exemplo prático:**
```css
.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
```
Esse container `.menu` distribui seus filhos com espaço igual entre eles, alinhados verticalmente ao centro, com 16px de respiro entre cada item — o CSS que resolve a maioria dos menus horizontais de sites reais.

**Contraexemplo:** Layouts feitos com `float` (técnica pré-Flexbox, ainda encontrada em código legado) exigem "clearfix" — hacks de CSS para evitar que o container pai "colapse" e perca a altura — um sintoma de estar usando a ferramenta errada para o problema, resolvido de forma muito mais simples com Flexbox.

**Erro comum:** Aplicar `display: flex` no elemento errado — a propriedade transforma o comportamento dos filhos diretos de quem a recebe, não do próprio elemento; um erro comum é aplicar em um elemento que já é filho de outro flex container, esperando efeito no avô, não no pai.

**Exercício de fixação:** Construa uma barra de navegação com logotipo à esquerda e três links à direita, usando `display: flex` e `justify-content: space-between`, sem usar `float` ou posicionamento absoluto.

**Para ir além:** Explore o "Flexbox Froggy" (flexboxfroggy.com), jogo gratuito que ensina Flexbox de forma interativa, resolvendo puzzles visuais.

---

## 3.3 CSS Grid na prática

**Objetivo:** Usar CSS Grid para layouts bidimensionais — quando é preciso controlar linhas e colunas ao mesmo tempo.

**Conceito central:** Enquanto Flexbox organiza elementos em uma única direção, CSS Grid é um sistema bidimensional: ele permite definir explicitamente uma grade de linhas e colunas, e posicionar elementos dentro dela com precisão. `display: grid` no container pai, combinado com `grid-template-columns`, define quantas colunas existem e qual a largura de cada uma — a unidade `fr` (fraction) é especialmente útil, porque distribui o espaço disponível proporcionalmente (`grid-template-columns: 1fr 1fr 1fr` cria três colunas de largura exatamente igual, ajustando-se automaticamente ao espaço total). A propriedade `gap` (compartilhada com Flexbox) define o espaçamento entre células, sem precisar de margin manual em cada item. Grid é a ferramenta certa para layouts de página inteira (cabeçalho, menu lateral, conteúdo, rodapé) e para grids de produto ou galeria de imagens, onde tanto linhas quanto colunas precisam ser controladas de forma coordenada.

**Aprofundamento tático:** Ao decidir entre Flexbox e Grid, use a regra prática: se o layout é uma lista que "flui" em uma direção (mesmo que quebre linha), Flexbox; se o layout é uma grade estruturada onde você precisa alinhar itens tanto na horizontal quanto na vertical simultaneamente (como um dashboard ou uma grade de fotos), Grid. Em muitos projetos reais, os dois são usados juntos: Grid para a estrutura macro da página, Flexbox para organizar o conteúdo dentro de cada célula do Grid.

**Exemplo prático:**
```css
.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
```
Essa regra cria uma galeria de exatamente três colunas de largura igual, com 12px de espaço entre cada item — a função `repeat()` evita escrever `1fr 1fr 1fr` manualmente, e escala facilmente para mais colunas apenas mudando um número.

**Contraexemplo:** Tentar construir uma grade de produtos com Flexbox puro, sem Grid, geralmente exige calcular manualmente a largura de cada item em porcentagem e lidar com espaçamentos que não "fecham" perfeitamente — um problema que o Grid resolve nativamente com `grid-template-columns`.

**Erro comum:** Usar `grid-template-columns: 300px 300px 300px` com valores fixos em pixels, em vez de `1fr 1fr 1fr` ou `minmax()`, o que quebra o layout em telas menores que a soma das larguras fixas, exigindo media queries que poderiam ser evitadas com unidades flexíveis.

**Exercício de fixação:** Construa uma grade de seis cards de produto (imagem, nome, preço) que se organiza em três colunas em desktop, usando `display: grid` e `grid-template-columns: repeat(3, 1fr)`, com `gap` para o espaçamento.

**Para ir além:** Explore o "CSS Grid Garden" (cssgridgarden.com), jogo interativo equivalente ao Flexbox Froggy, mas para Grid, e o Grid Generator do CSS-Tricks.

---

## 3.4 Responsividade e media queries

**Objetivo:** Fazer um layout se adaptar corretamente a diferentes tamanhos de tela, do celular ao monitor grande.

**Conceito central:** Design responsivo é a prática de construir um único layout que se adapta ao espaço disponível, em vez de construir versões separadas para desktop e mobile. Media queries são a ferramenta central desse trabalho — blocos de CSS que só se aplicam quando uma condição sobre a tela é verdadeira, mais comumente a largura da janela (`@media (max-width: 768px) { ... }`). A abordagem recomendada pela indústria hoje é "mobile-first": escrever o CSS base pensando primeiro na tela pequena (mais restritiva, forçando priorização do essencial), e usar media queries com `min-width` para adicionar complexidade progressivamente conforme a tela cresce — em vez do caminho inverso (desktop-first, com `max-width` removendo elementos conforme a tela encolhe), que tende a produzir mobile como "sobra" mal pensada. Unidades relativas (`%`, `rem`, `vw`, `vh`) em vez de fixas (`px`) para dimensões que devem se adaptar, combinadas com `max-width: 100%` em imagens, resolvem boa parte da responsividade antes mesmo de qualquer media query.

**Aprofundamento tático:** Defina de 2 a 4 breakpoints (pontos de quebra) fixos para o projeto inteiro — por exemplo, mobile (até 480px), tablet (481-768px), desktop (769px+) — e use exclusivamente esses valores em todas as media queries do projeto, nunca valores arbitrários decididos tela a tela, o que gera inconsistência visual entre páginas diferentes do mesmo site.

**Exemplo prático:**
```css
.grid-produtos {
  display: grid;
  grid-template-columns: 1fr;
}
@media (min-width: 768px) {
  .grid-produtos { grid-template-columns: repeat(3, 1fr); }
}
```
Mobile-first: por padrão, uma coluna (empilhado, ideal para telas estreitas); a partir de 768px, três colunas — a lógica cresce junto com a tela, em vez de "desmontar" um layout desktop complexo.

**Contraexemplo:** Sites construídos desktop-first, onde o layout completo (com sidebar, múltiplas colunas, menu horizontal extenso) é escondido em partes via `display: none` conforme a tela encolhe, frequentemente carregam recursos desnecessários em mobile (imagens grandes, scripts de funcionalidades escondidas) mesmo quando o elemento não é visível — desperdiçando dados e velocidade de carregamento no dispositivo onde isso mais importa.

**Erro comum:** Testar responsividade apenas redimensionando a janela do navegador desktop, sem nunca testar em um dispositivo real ou no modo de emulação de dispositivo do DevTools — a experiência real de toque, zoom e teclado virtual é diferente da simulação por redimensionamento de janela.

**Exercício de fixação:** Pegue um layout de três colunas já pronto e reescreva-o mobile-first: comece definindo o CSS para uma coluna, depois adicione uma media query `min-width` que expande para três colunas a partir de 768px.

**Para ir além:** Pesquise sobre "container queries" (`@container`), tecnologia mais recente que permite estilizar um elemento com base no tamanho do seu contêiner pai, não apenas da tela inteira — útil para componentes verdadeiramente reutilizáveis.

---

## 3.5 Variáveis CSS e design tokens

**Objetivo:** Centralizar valores repetidos (cores, espaçamentos, fontes) em variáveis, para que uma mudança em um lugar se propague pelo projeto inteiro.

**Conceito central:** CSS Custom Properties (popularmente chamadas de "variáveis CSS") permitem definir um valor uma única vez e reutilizá-lo em qualquer lugar do projeto, com a sintaxe `--nome-da-variavel: valor;` na definição e `var(--nome-da-variavel)` no uso. Definidas geralmente no seletor `:root` (que representa o elemento raiz do documento, tornando a variável acessível globalmente), elas resolvem um problema real de manutenção: sem variáveis, mudar a cor principal de uma marca exige encontrar e substituir manualmente o mesmo código hexadecimal em dezenas de arquivos; com variáveis, muda-se um único valor e o efeito se propaga automaticamente por todo o CSS que referencia aquela variável. Esse conceito se conecta diretamente a "design tokens" — a prática, mais ampla que CSS puro, de nomear valores de design (cores, espaçamentos, tamanhos de fonte, sombras) de forma sistemática e compartilhada entre design (Figma) e código, garantindo que "azul primário" signifique exatamente o mesmo hexadecimal nas duas pontas.

**Aprofundamento tático:** Ao iniciar qualquer projeto, defina no `:root` um conjunto mínimo de variáveis antes de escrever qualquer outro CSS: cores principais (`--cor-primaria`, `--cor-texto`, `--cor-fundo`), espaçamentos em escala (`--espaco-sm`, `--espaco-md`, `--espaco-lg`) e talvez raio de borda (`--raio-padrao`). Nomeie por função ("--cor-primaria"), não por valor literal ("--azul") — isso permite trocar a cor real sem que o nome da variável fique enganoso.

**Exemplo prático:**
```css
:root {
  --cor-primaria: #2563eb;
  --espaco-md: 16px;
  --raio-padrao: 8px;
}
.botao {
  background: var(--cor-primaria);
  padding: var(--espaco-md);
  border-radius: var(--raio-padrao);
}
```
Se a marca muda de azul para verde, uma única linha (`--cor-primaria`) muda — todo o resto do CSS que usa `var(--cor-primaria)` se atualiza automaticamente, sem busca e substituição manual.

**Contraexemplo:** Projetos sem variáveis, com o mesmo código hexadecimal (`#2563eb`) espalhado literalmente em dezenas de arquivos CSS diferentes, tornam uma simples mudança de cor de marca em uma tarefa arriscada — é fácil esquecer uma ocorrência, resultando em inconsistência visual sutil que só é percebida depois.

**Erro comum:** Criar variáveis demais, cedo demais, para valores que na prática nunca se repetem ou nunca mudam — o ganho de variáveis vem de reuso real, não de "por precaução"; um projeto pequeno com poucas variáveis bem escolhidas é mais fácil de manter que um com cinquenta variáveis pouco usadas.

**Exercício de fixação:** Pegue um arquivo CSS seu com cores e espaçamentos "hardcoded" (valores literais repetidos) e refatore-o para usar variáveis CSS centralizadas no `:root`.

**Para ir além:** Pesquise sobre "design tokens" no contexto de design systems (Módulo 4) e como ferramentas como o plugin "Tokens Studio" no Figma sincronizam tokens entre design e código.

---

## 3.6 Animações e microinterações com CSS *(aula avançada)*

**Objetivo:** Usar animação com propósito — para dar feedback e guiar atenção, não para decorar.

**Conceito central:** Microinterações são pequenas respostas visuais a uma ação do usuário — um botão que muda sutilmente de cor ao passar o mouse, um campo que treme levemente ao receber um erro de validação, um item que desliza suavemente para dentro da tela. Bem aplicadas, elas comunicam causalidade ("isso que eu fiz teve esse efeito") e guiam a atenção sem exigir texto adicional. CSS oferece duas ferramentas principais: `transition`, que anima suavemente a mudança entre dois estados de uma propriedade (útil para hover, foco, mudança de classe), e `@keyframes` combinado com `animation`, que define sequências de animação mais complexas e independentes de interação direta. Do ponto de vista de performance, animar `transform` e `opacity` é significativamente mais barato para o navegador do que animar propriedades como `width`, `height` ou `top/left`, porque as primeiras não forçam o navegador a recalcular o layout inteiro da página a cada frame (um processo chamado "reflow") — apenas a repintar a camada visual já posicionada.

**Aprofundamento tático:** Antes de adicionar qualquer animação, pergunte: "isso está comunicando algo útil (que uma ação teve efeito, que algo mudou de estado) ou é decoração pura?" Movimento sem propósito cansa e distrai. Prefira durações curtas (150-300ms para a maioria das microinterações) — animações longas fazem a interface parecer lenta, mesmo quando o processamento real é instantâneo. Respeite a preferência de sistema `prefers-reduced-motion`, que alguns usuários ativam por sensibilidade a movimento (incluindo motivos vestibulares/de saúde) — CSS permite desativar ou reduzir animações condicionalmente com essa media feature.

**Exemplo prático:**
```css
.botao {
  transition: transform 200ms ease, background 200ms ease;
}
.botao:hover {
  transform: translateY(-2px);
  background: var(--cor-primaria-escura);
}
@media (prefers-reduced-motion: reduce) {
  .botao { transition: none; }
}
```
Essa transição sutil de "levantar" o botão ao passar o mouse, combinada com respeito à preferência de movimento reduzido, é um exemplo de microinteração funcional e responsável.

**Contraexemplo:** Interfaces com animações de entrada em cascata (cada elemento da página "voando" de uma direção diferente ao carregar) que duram mais de um segundo são um exemplo comum de animação decorativa que ativamente atrapalha — o usuário precisa esperar o "show" terminar antes de conseguir interagir com o conteúdo que já queria ler.

**Erro comum:** Animar `width`, `height` ou propriedades de posição (`top`, `left`) em vez de `transform`, causando reflow constante do layout durante a animação — perceptível como "engasgos" (jank) em dispositivos mais fracos, mesmo quando a animação parece fluida em um computador potente de desenvolvimento.

**Exercício de fixação:** Adicione uma transição de hover a um card de produto (leve elevação com sombra e `translateY`) usando apenas `transform` e `box-shadow`, garantindo que a animação respeite `prefers-reduced-motion`.

**Para ir além:** Explore o site "cubic-bezier.com" para entender curvas de easing personalizadas, e pesquise sobre a propriedade `will-change` — útil, mas frequentemente usada incorretamente por otimização prematura.

---

# Módulo 4 — UI/UX e design de interface

## 4.1 Princípios de UX: usabilidade e heurísticas de Nielsen

**Objetivo:** Avaliar (e corrigir) uma interface usando um checklist consagrado, em vez de opinião estética isolada.

**Conceito central:** As "10 heurísticas de usabilidade" de Jakob Nielsen, publicadas originalmente em 1994 e ainda amplamente usadas hoje como base de avaliação de UX, descrevem princípios gerais que qualquer boa interface deve seguir — entre as mais citadas: "visibilidade do status do sistema" (o usuário sempre sabe o que está acontecendo, como um indicador de carregamento), "consistência e padrões" (elementos com a mesma função devem parecer e se comportar da mesma forma em todo o produto), "prevenção de erros" (melhor impedir um erro de acontecer do que exibir uma boa mensagem depois que ele já ocorreu) e "reconhecimento em vez de memorização" (o usuário não deveria precisar lembrar informação de uma tela para usar em outra — ela deveria estar visível quando necessária). Essas heurísticas não são regras absolutas de design visual, mas um checklist de avaliação: elas servem para testar se uma interface já desenhada tem problemas estruturais de usabilidade, independentemente de ela ser "bonita".

**Aprofundamento tático:** Ao revisar qualquer tela antes de considerá-la pronta, rode mentalmente as heurísticas mais relevantes para aquele contexto — para um formulário, foque especialmente em "prevenção de erros" (validação em tempo real) e "visibilidade do status" (o usuário sabe se o envio está processando); para uma navegação, foque em "consistência" e "controle e liberdade do usuário" (existe um jeito óbvio de "desfazer" ou voltar, sem se sentir preso em um fluxo?).

**Exemplo prático:** Um checkout de e-commerce bem desenhado mostra, a cada etapa, em qual das três ou quatro etapas totais o usuário está ("Etapa 2 de 4: Entrega") — isso é visibilidade do status do sistema aplicada diretamente, reduzindo a ansiedade de "quanto falta ainda" e a taxa de abandono de carrinho.

**Contraexemplo:** Formulários que só mostram todos os erros de validação depois que o usuário clica em "enviar" — sem feedback em tempo real enquanto preenche — violam diretamente o princípio de prevenção de erros, forçando o usuário a descobrir problemas só no fim, depois de já ter investido tempo preenchendo tudo.

**Erro comum:** Confundir "seguir uma heurística" com "copiar literalmente a interface de outro site que a segue bem" — as heurísticas são princípios a interpretar no contexto do seu produto, não um template visual a replicar sem adaptação.

**Exercício de fixação:** Escolha um app ou site que você usa e ache frustrante, e identifique explicitamente qual das 10 heurísticas de Nielsen ele está violando — escreva em uma frase o que mudaria para corrigir.

**Para ir além:** Leia o artigo original "10 Usability Heuristics for User Interface Design" no site do Nielsen Norman Group, com exemplos visuais de cada princípio.

---

## 4.2 Hierarquia visual e grid systems

**Objetivo:** Usar uma grade (grid system) de layout para trazer ordem e alinhamento consistente a qualquer composição visual.

**Conceito central:** Um grid system é uma estrutura invisível de colunas (e às vezes linhas) que guia o posicionamento e alinhamento de elementos em uma página — o padrão mais comum na web é a grade de 12 colunas, porque 12 é divisível por 2, 3, 4 e 6, permitindo combinações flexíveis de largura (uma seção pode ocupar 6 de 12 colunas — metade — ou 4 de 12 — um terço, e assim por diante) sem quebrar o alinhamento geral. Grids trazem dois benefícios simultâneos: consistência (elementos alinhados entre si parecem parte de um mesmo sistema, mesmo em páginas diferentes) e velocidade de decisão (em vez de decidir a posição exata de cada elemento do zero, você decide "isso ocupa 4 colunas" e o alinhamento acontece automaticamente). Margens e "gutters" (o espaço entre colunas) consistentes em todo o site reforçam essa sensação de coesão, mesmo quando o conteúdo de cada página é completamente diferente.

**Aprofundamento tático:** Ao iniciar o design de uma nova página, defina a grade (número de colunas, largura máxima do conteúdo, gutter) antes de posicionar qualquer elemento — isso evita a tentação de alinhar "no olho", que produz inconsistências sutis, mas perceptíveis, entre seções diferentes da mesma página.

**Exemplo prático:** Um site de conteúdo bem estruturado usa uma grade de 12 colunas onde o artigo principal ocupa 8 colunas (correspondendo a uma largura de leitura confortável) e uma barra lateral de conteúdo relacionado ocupa as 4 colunas restantes — a proporção não é arbitrária, é derivada da grade definida antes do conteúdo específico daquela página.

**Contraexemplo:** Páginas construídas sem grade formal frequentemente têm seções com larguras de conteúdo ligeiramente diferentes entre si (720px aqui, 740px ali) — imperceptível isoladamente, mas perceptível como "desalinhamento" ao rolar a página inteira, mesmo que o usuário não consiga articular exatamente o motivo do desconforto visual.

**Erro comum:** Aplicar a mesma grade de 12 colunas rigidamente em desktop e mobile, sem adaptar — em telas estreitas, uma grade de 12 colunas geralmente colapsa para 4 ou até 1 coluna efetiva, e insistir na estrutura original produz colunas absurdamente estreitas.

**Exercício de fixação:** Pegue uma página com múltiplas seções de larguras "no olho" e realinhe todo o conteúdo usando uma grade explícita de 12 colunas com CSS Grid, documentando quantas colunas cada seção ocupa.

**Para ir além:** Explore o "8-point grid system", convenção de espaçamento (não confundir com grade de colunas) onde todos os valores de espaçamento são múltiplos de 8px, amplamente adotada em design systems de produtos digitais.

---

## 4.3 Wireframes e prototipagem (Figma)

**Objetivo:** Usar wireframes de baixa fidelidade para validar estrutura e fluxo antes de investir tempo em estética.

**Conceito central:** Wireframe é uma representação esquemática de uma tela — caixas, linhas e texto placeholder no lugar de conteúdo real, sem cor, sem tipografia refinada, sem imagens finais — usada para validar estrutura, hierarquia e fluxo de navegação antes de qualquer investimento em design visual detalhado. A lógica por trás disso é económica: é muito mais barato descobrir, em um wireframe, que a ordem de informação de um checkout está confusa do que descobrir o mesmo problema depois que uma tela final, polida, já foi construída e mostrada a stakeholders — mudanças estruturais em fidelidade baixa custam minutos; a mesma mudança em fidelidade alta pode custar dias de retrabalho, e frequentemente gera resistência ("já está pronto, deixa assim") mesmo quando o problema é real. Figma se tornou a ferramenta padrão da indústria para esse trabalho por combinar wireframing, design visual de alta fidelidade e prototipagem interativa (conectar telas com transições clicáveis, simulando o fluxo real do produto) em uma única ferramenta colaborativa baseada em navegador.

**Aprofundamento tático:** Ao começar um projeto novo, resista ao impulso de abrir o Figma direto em alta fidelidade (cores finais, fontes decididas) — comece com wireframes literalmente em escala de cinza, usando apenas retângulos e texto placeholder, e valide a estrutura com quem vai usar ou aprovar o produto antes de investir em qualquer decisão visual. Só avance para fidelidade média (tipografia real, mas cores ainda neutras) depois que a estrutura estiver validada, e só para fidelidade alta depois disso.

**Exemplo prático:** Uma equipe validando o fluxo de checkout de um e-commerce apresenta primeiro um protótipo em wireframe, clicável (usando os recursos de prototipagem do Figma), testando com usuários reais se a sequência de etapas faz sentido — só depois de confirmar que o fluxo funciona é que o design visual final (cores, imagens, microinterações) é aplicado.

**Contraexemplo:** Times que pulam direto para alta fidelidade descobrem problemas estruturais (uma etapa desnecessária no checkout, um campo confuso) só depois de o design "bonito" já estar pronto e aprovado por várias pessoas — nesse ponto, sugerir uma mudança estrutural encontra resistência política, mesmo quando os dados de usabilidade mostram claramente que é necessária.

**Erro comum:** Tratar wireframe como uma etapa burocrática obrigatória a ser feita rápido e mal, em vez de usá-lo de fato para pensar e testar estrutura — um wireframe feito sem cuidado real não cumpre sua função e só adiciona uma etapa sem benefício.

**Exercício de fixação:** Desenhe, em wireframe (papel ou Figma, sem cor nem fonte especial), o fluxo completo de cadastro de um usuário em três telas, e peça para alguém "navegar" pelas telas descrevendo em voz alta o que espera que aconteça em cada clique.

**Para ir além:** Explore os recursos de prototipagem interativa do Figma (conectar frames com transições) e pesquise sobre "Crazy Eights", técnica rápida de esboço de wireframes em grupo usada em sprints de design.

---

## 4.4 Design system: componentes reutilizáveis

**Objetivo:** Construir uma biblioteca de componentes reutilizáveis em vez de redesenhar o mesmo botão de formas ligeiramente diferentes em cada tela.

**Conceito central:** Um design system é uma coleção documentada de componentes reutilizáveis (botões, campos de formulário, cards, modais) junto com as regras de quando e como usar cada um — o objetivo é que qualquer pessoa da equipe, ao precisar de um botão, use o componente já existente em vez de criar um novo do zero, garantindo consistência visual e economia de tempo simultaneamente. Em ferramentas como Figma, isso é implementado através de "componentes" e "variantes" — um componente de botão pode ter variantes para estado primário, secundário, desabilitado, com ícone, sem ícone — todas derivadas de uma única fonte, de forma que uma mudança no componente principal (por exemplo, arredondar mais as bordas) se propaga automaticamente para todos os lugares onde aquele botão é usado, exatamente como as variáveis CSS do Módulo 3 se propagam no código. O paralelo entre design tokens (cor, espaçamento, tipografia definidos uma vez) e componentes (combinações desses tokens em padrões reutilizáveis) forma a base de qualquer design system maduro.

**Aprofundamento tático:** Ao identificar que o mesmo elemento visual (um card de produto, por exemplo) está sendo desenhado do zero em mais de uma tela, esse é o sinal de que ele deveria virar um componente — a regra prática é: na segunda vez que você for redesenhar algo visualmente idêntico ou quase idêntico a algo que já existe, pare e componentize antes de continuar.

**Exemplo prático:** Um design system básico e funcional para um projeto pequeno pode conter apenas: um componente de botão (com variantes primário/secundário/desabilitado), um componente de campo de input (com variante de erro), e uma paleta de cores e escala tipográfica documentadas — já suficiente para eliminar a maior parte das inconsistências visuais em um produto pequeno a médio.

**Contraexemplo:** Produtos que crescem sem design system frequentemente acumulam, ao longo do tempo, dezenas de variações do "mesmo" botão — cantos com raios ligeiramente diferentes, sombras diferentes, paddings diferentes — cada um criado por uma pessoa diferente, em um momento diferente, sem referência a um padrão compartilhado; o retrabalho de unificar isso depois é significativamente mais caro do que teria sido estabelecer o padrão desde o início.

**Erro comum:** Criar um design system extenso e detalhado antes de o produto ter validado seu design básico — investir semanas documentando componentes que ainda vão mudar completamente depois dos primeiros testes com usuários é esforço prematuro; design systems devem crescer organicamente conforme padrões reais emergem, não ser especificados inteiramente do zero no início.

**Exercício de fixação:** Audite um projeto seu (ou um site real) e liste quantas variações visuais diferentes de "botão" você consegue encontrar — depois desenhe uma versão unificada, com variantes claras, que cobriria todos os casos de uso encontrados.

**Para ir além:** Explore design systems públicos e documentados, como o Material Design (Google) ou o Human Interface Guidelines (Apple), observando como eles documentam não só a aparência, mas as regras de uso de cada componente.

---

## 4.5 Mobile-first e design responsivo

**Objetivo:** Projetar pensando primeiro na experiência mais restritiva (mobile), não como um afterthought do desktop.

**Conceito central:** Mobile-first não é apenas uma técnica de CSS (já vista no Módulo 3) — é primeiro uma filosofia de design: mais da metade do tráfego da maioria dos sites hoje vem de dispositivos móveis, e a tela pequena impõe uma disciplina saudável, forçando a priorizar o que realmente importa, porque simplesmente não há espaço para tudo. Um site desenhado mobile-first tende a ter hierarquia mais clara mesmo na versão desktop, porque as decisões difíceis de priorização já foram feitas cedo. Na prática de design (não só de código), isso significa desenhar primeiro o wireframe e o protótipo da versão mobile, validar que ela funciona e comunica o essencial, e só depois expandir para tablet e desktop — adicionando elementos que fazem sentido no espaço extra (uma barra lateral, colunas adicionais), nunca simplesmente "esticando" o layout mobile.

**Aprofundamento tático:** Ao desenhar qualquer tela nova, comece literalmente redimensionando o frame do Figma para a largura de um celular comum (375px, por exemplo) antes de pensar em desktop — essa restrição artificial mas útil força decisões de priorização que, se adiadas para depois de desenhar em desktop, tendem a nunca acontecer (é sempre mais fácil "cortar" de um design mobile já disciplinado do que "adicionar" disciplina a um design desktop que já cresceu sem restrição).

**Exemplo prático:** Um app de delivery bem desenhado mobile-first mostra, na tela principal de celular, apenas a busca, categorias essenciais e os restaurantes mais relevantes — na versão desktop, o mesmo conteúdo ganha uma barra lateral de filtros adicionais e mais itens visíveis por linha, mas a hierarquia de prioridade (busca e categoria antes de qualquer outra coisa) permanece idêntica entre as duas versões.

**Contraexemplo:** Sites institucionais adaptados de uma versão desktop antiga, "espremendo" o mesmo conteúdo denso (menu de quinze itens, três colunas de texto, sidebar completa) para caber em uma tela de celular, resultam em experiências mobile visivelmente inferiores — não porque a tecnologia falhou, mas porque as decisões de priorização nunca foram feitas de fato, apenas comprimidas.

**Erro comum:** Tratar "responsivo" como sinônimo de "funciona sem quebrar visualmente em qualquer tamanho de tela" — responsividade técnica sem repensar prioridade de conteúdo produz um site que não quebra, mas também não é bom em nenhum tamanho de tela específico.

**Exercício de fixação:** Pegue uma homepage desktop existente (sua ou de um site que admire) e redesenhe a versão mobile do zero, decidindo ativamente o que cortar, o que simplificar e o que manter — sem apenas encolher os elementos existentes.

**Para ir além:** Leia "Mobile First", de Luke Wroblewski, o livro que popularizou o termo e a filosofia por trás dele.

---

## 4.6 Microcopy e UX writing *(aula avançada)*

**Objetivo:** Escrever os pequenos textos de interface (botões, mensagens de erro, textos vazios) com a mesma intenção estratégica de qualquer outro elemento de design.

**Conceito central:** Microcopy é o texto curto e funcional espalhado pela interface — o texto de um botão, uma mensagem de erro, o placeholder de um campo, o texto de um estado vazio ("você ainda não tem nenhum pedido") — e frequentemente é a última parte do design considerada, quando deveria ser tratada com a mesma intenção que a hierarquia visual ou a paleta de cores. Um botão que diz apenas "Enviar" comunica menos e converte pior do que um que diz "Finalizar pedido" ou "Criar minha conta" — texto específico sobre o resultado da ação reduz a incerteza e a hesitação do usuário no momento de decisão. Mensagens de erro que dizem apenas "Erro" ou "Algo deu errado" frustram porque não dizem o que fazer a seguir; uma boa mensagem de erro explica o que aconteceu, em linguagem humana (não um código de erro técnico), e, sempre que possível, o que a pessoa pode fazer para resolver.

**Aprofundamento tático:** Para cada texto de botão, substitua verbos genéricos ("Enviar", "Confirmar", "OK") por verbos que descrevem especificamente o resultado da ação ("Criar conta", "Finalizar compra", "Agendar horário") — o texto do botão deveria, sozinho, completar a frase "eu quero ___" de forma clara. Para mensagens de erro, siga a estrutura: o que aconteceu (em linguagem simples) + o que fazer a seguir — nunca apenas um dos dois.

**Exemplo prático:** Em vez de "Erro 422: campo inválido", uma mensagem de erro bem escrita diz "Esse e-mail não parece válido — confira se não falta o @ ou o final (.com)" — específica, sem jargão técnico, e já sugerindo a correção mais provável.

**Contraexemplo:** Estados vazios genéricos ("Nenhum resultado encontrado") desperdiçam uma oportunidade de orientar o próximo passo — comparado a "Nenhum pedido ainda. Que tal explorar nossos produtos em destaque?" (com um link para a ação sugerida), a primeira versão deixa o usuário sem saber o que fazer a seguir, aumentando a chance de ele simplesmente sair.

**Erro comum:** Escrever microcopy só no fim do projeto, como um preenchimento rápido de texto genérico ("Lorem ipsum" nunca deveria chegar à versão final, mas frequentemente textos igualmente genéricos como "Clique aqui" tomam esse lugar) — microcopy deveria ser escrito com a mesma antecedência e cuidado que o layout.

**Exercício de fixação:** Pegue cinco textos de botão genéricos de um projeto seu ("Enviar", "OK", "Confirmar") e reescreva cada um para descrever especificamente o resultado da ação.

**Para ir além:** Leia "Nicely Said", de Nicole Fenton e Kate Kiefer Lee, referência prática sobre escrita de interface, e explore o guia de voz e tom do Mailchimp (Content Style Guide), um dos mais citados publicamente na indústria.

---

# Módulo 5 — JavaScript para web design

## 5.1 Lógica de JS: variáveis, funções, eventos

**Objetivo:** Entender os três blocos fundamentais de JavaScript necessários para dar interatividade a qualquer interface.

**Conceito central:** JavaScript, no contexto de web design, se resume na prática a três blocos fundamentais que se combinam para criar qualquer interação. Variáveis (`let`, `const`) armazenam valores que podem mudar ao longo do tempo — o estado de um menu (aberto ou fechado), o conteúdo digitado em um campo. Funções agrupam um conjunto de instruções sob um nome reutilizável, evitando repetir o mesmo código toda vez que uma ação precisa acontecer. Eventos são a ponte entre a ação do usuário (clicar, digitar, rolar a página) e o código que deve reagir a ela — `addEventListener` é o método central para "escutar" esses eventos e disparar uma função em resposta. A lógica geral de praticamente qualquer interatividade de interface segue o mesmo padrão: algo acontece (evento) → uma função reage → o estado (variável) muda → a interface é atualizada para refletir o novo estado.

**Aprofundamento tático:** Ao planejar qualquer interação (um menu que abre, um contador que incrementa, um formulário que valida), escreva primeiro em português simples a sequência lógica antes de escrever código: "quando o usuário clica no botão do menu (evento), a variável que guarda se o menu está aberto muda de valor (estado), e a interface adiciona ou remove uma classe CSS que mostra ou esconde o menu (atualização visual)." Só depois de ter essa lógica clara em palavras, traduza para JavaScript — isso evita o erro comum de começar a escrever código sem ter pensado na lógica completa antes.

**Exemplo prático:**
```javascript
let menuAberto = false;
const botao = document.querySelector('.botao-menu');
botao.addEventListener('click', () => {
  menuAberto = !menuAberto;
  document.querySelector('.menu').classList.toggle('aberto', menuAberto);
});
```
Esse trecho segue exatamente o padrão descrito: evento (clique) → função (o callback do addEventListener) → estado (a variável `menuAberto`) → atualização visual (toggle da classe CSS).

**Contraexemplo:** Código que manipula diretamente o estilo inline de um elemento a cada clique (`elemento.style.display = 'block'`), sem nenhuma variável guardando o estado atual, torna difícil saber, em qualquer ponto do código, se o menu está aberto ou fechado sem consultar o DOM diretamente — o estado vive "escondido" na aparência visual, em vez de explícito em uma variável, dificultando manutenção conforme a lógica cresce.

**Erro comum:** Usar `var` em vez de `let`/`const` (uma convenção antiga do JavaScript com comportamento de escopo menos previsível), ou usar `let` para valores que nunca deveriam mudar (que deveriam ser `const`) — pequenos hábitos que, cedo, evitam bugs difíceis de rastrear conforme o código cresce.

**Exercício de fixação:** Construa um botão de "curtir" simples: ao clicar, ele alterna entre os estados "curtido" e "não curtido", mudando de cor e do texto do botão (de "Curtir" para "Curtido"), usando uma variável para guardar o estado atual.

**Para ir além:** Explore o MDN Web Docs sobre `addEventListener` e a diferença entre `let`, `const` e `var`, incluindo o conceito de "hoisting" que explica por que `var` tem comportamento menos previsível.

---

## 5.2 DOM: selecionar e manipular elementos

**Objetivo:** Selecionar elementos HTML via JavaScript e modificar seu conteúdo, classes e atributos de forma confiável.

**Conceito central:** O DOM (Document Object Model) é a representação do HTML como uma estrutura de objetos que o JavaScript pode ler e modificar diretamente — quando o JavaScript muda algo no DOM, o navegador atualiza a tela imediatamente para refletir essa mudança, sem precisar recarregar a página. Os métodos mais usados para selecionar elementos são `document.querySelector()` (retorna o primeiro elemento que casa com um seletor CSS) e `document.querySelectorAll()` (retorna todos os elementos que casam, como uma lista) — a vantagem de usar sintaxe de seletor CSS é reaproveitar o mesmo conhecimento de seletores já visto no Módulo 3, em vez de aprender uma sintaxe de seleção completamente separada. Uma vez selecionado, um elemento pode ter seu conteúdo alterado (`textContent` para texto puro, `innerHTML` para inserir HTML, com o cuidado de que `innerHTML` pode ser um risco de segurança se o conteúdo vier de uma fonte não confiável), suas classes manipuladas (`classList.add`, `.remove`, `.toggle`) e seus atributos modificados (`setAttribute`).

**Aprofundamento tático:** Prefira manipular classes CSS (`classList.toggle`) em vez de estilos inline diretos (`element.style.propriedade`) sempre que possível — isso mantém a definição visual centralizada no CSS (onde ela pertence) e o JavaScript responsável apenas por decidir QUANDO aplicar aquele visual, mantendo a separação de responsabilidades vista na aula 1.2. Prefira `textContent` a `innerHTML` sempre que o conteúdo inserido for texto simples, sem necessidade de HTML — reduz superfície de risco de segurança sem custo de funcionalidade.

**Exemplo prático:**
```javascript
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('selecionado');
  });
});
```
Esse trecho seleciona todos os elementos `.card` da página, e adiciona a cada um um listener que alterna a classe `.selecionado` ao clicar — o CSS, separadamente, define a aparência de `.card.selecionado`, mantendo JavaScript e CSS com responsabilidades claras.

**Contraexemplo:** Código que usa `innerHTML` para inserir texto vindo diretamente de um campo de formulário do próprio usuário, sem nenhum tratamento, abre uma vulnerabilidade de XSS (Cross-Site Scripting) — se o usuário digitar código HTML/JavaScript malicioso, ele pode ser executado na página; usar `textContent` para esse caso elimina o risco automaticamente.

**Erro comum:** Selecionar o mesmo elemento repetidamente dentro de um loop ou de uma função chamada com frequência (`document.querySelector` toda vez), em vez de selecionar uma única vez e guardar em uma variável — impacto de performance perceptível em páginas com muita interatividade, e código desnecessariamente repetitivo.

**Exercício de fixação:** Construa uma lista de tarefas simples: um input de texto, um botão de "adicionar", e uma lista onde cada item adicionado pode ser marcado como concluído (classe CSS riscando o texto) ao ser clicado.

**Para ir além:** Pesquise sobre "event delegation" (delegação de eventos) — técnica de adicionar um único listener no elemento pai em vez de um listener em cada filho individual, mais eficiente para listas que crescem dinamicamente.

---

## 5.3 Interatividade: menus, modais, sliders

**Objetivo:** Construir os três componentes interativos mais comuns de interfaces web usando os fundamentos já vistos.

**Conceito central:** Menu mobile (hamburguer), modal (janela sobreposta) e slider/carrossel são os três componentes interativos mais reutilizados em projetos reais, e todos seguem o mesmo padrão fundamental visto na aula 5.1: um evento dispara uma mudança de estado, que é refletida via toggle de classe CSS. Um modal bem construído precisa, além da abertura/fechamento básica, de alguns cuidados de acessibilidade frequentemente esquecidos: mover o foco do teclado para dentro do modal ao abrir (para que usuários de teclado não continuem navegando "por trás" do modal invisível), permitir fechar com a tecla Esc, e devolver o foco ao elemento que abriu o modal quando ele fecha. Sliders, embora visualmente atraentes, têm uma reputação mista em UX — estudos de eye-tracking mostram que a maioria dos usuários interage apenas com o primeiro slide de um carrossel automático, tornando conteúdo nos slides seguintes praticamente invisível na prática, mesmo estando tecnicamente presente.

**Aprofundamento tático:** Antes de construir um modal do zero, considere usar o elemento nativo `<dialog>` do HTML, que já resolve boa parte da acessibilidade (foco, fechamento com Esc) de graça, exigindo bem menos JavaScript customizado do que uma implementação manual com `<div>`. Antes de adicionar um carrossel automático à página, pergunte se o conteúdo dos slides seguintes é realmente importante — se for, considere se uma lista estática visível de uma vez não comunicaria melhor do que escondê-lo atrás de um slide que a maioria nunca vê.

**Exemplo prático:**
```html
<dialog id="modal-contato">
  <p>Conteúdo do modal</p>
  <button onclick="document.getElementById('modal-contato').close()">Fechar</button>
</dialog>
<script>
document.querySelector('.abrir-modal').addEventListener('click', () => {
  document.getElementById('modal-contato').showModal();
});
</script>
```
O elemento `<dialog>` com `showModal()` já lida automaticamente com foco preso dentro do modal e fechamento via tecla Esc — comportamentos que, implementados manualmente com `<div>`, exigiriam dezenas de linhas adicionais de JavaScript.

**Contraexemplo:** Modais construídos manualmente com `<div>` e `display: block/none`, sem gerenciamento de foco, permitem que um usuário navegando por teclado continue tabulando por elementos "atrás" do modal, invisíveis mas ainda tecnicamente presentes na página — uma armadilha de acessibilidade comum mesmo em produtos maduros.

**Erro comum:** Adicionar carrossel automático com rotação rápida (menos de 5-6 segundos por slide) sem controle manual de pausa — usuários que ainda estão lendo o primeiro slide veem o conteúdo trocar antes de terminar, uma fonte comum e evitável de frustração.

**Exercício de fixação:** Construa um modal simples de confirmação ("Tem certeza que deseja excluir?") usando a tag `<dialog>` nativa, com botões de "Confirmar" e "Cancelar", testando que a tecla Esc fecha o modal corretamente.

**Para ir além:** Consulte a documentação do MDN sobre `<dialog>` e pesquise sobre os padrões ARIA Authoring Practices para modais (APG Dialog Pattern), referência de acessibilidade para quem precisa construir modais customizados sem a tag nativa.

---

## 5.4 Formulários dinâmicos e validação

**Objetivo:** Validar formulários em tempo real com JavaScript, complementando (não substituindo) a validação nativa do HTML vista no Módulo 2.

**Conceito central:** Validação de formulário existe em três camadas complementares, não excludentes: validação nativa do HTML (atributos como `required`, `type="email"`, vista na aula 2.2), validação client-side via JavaScript (feedback em tempo real, mensagens customizadas, lógica mais complexa que HTML puro não cobre, como "senha e confirmação de senha precisam ser iguais") e validação server-side (a única realmente confiável para segurança, porque JavaScript no navegador pode sempre ser contornado por alguém mal-intencionado). A API de Constraint Validation do JavaScript (`checkValidity()`, `setCustomValidity()`) permite construir mensagens de erro customizadas em cima da validação nativa do HTML, em vez de reescrever toda a lógica de validação do zero — combinando o melhor dos dois mundos: robustez nativa mais controle de apresentação.

**Aprofundamento tático:** Valide em tempo real (no evento `input`, conforme a pessoa digita, ou no `blur`, quando sai do campo) em vez de validar só no envio do formulário — feedback imediato, próximo ao campo com problema, segue diretamente o princípio de "prevenção de erros" das heurísticas de Nielsen visto na aula 4.1. Nunca remova a validação nativa do HTML ao adicionar JavaScript — trate JavaScript como uma camada adicional de refinamento de mensagem e experiência, com a validação HTML como base de segurança que funciona mesmo se o script falhar.

**Exemplo prático:**
```javascript
const senha = document.querySelector('#senha');
const confirmacao = document.querySelector('#confirmar-senha');
confirmacao.addEventListener('input', () => {
  if (confirmacao.value !== senha.value) {
    confirmacao.setCustomValidity('As senhas não coincidem');
  } else {
    confirmacao.setCustomValidity('');
  }
});
```
Esse trecho usa `setCustomValidity` para adicionar uma regra que o HTML nativo não cobre (comparar dois campos entre si), enquanto ainda se apoia na infraestrutura nativa de validação do navegador para exibir a mensagem.

**Contraexemplo:** Formulários que reescrevem toda a validação do zero em JavaScript, ignorando a Constraint Validation API nativa, tendem a duplicar lógica (checar formato de e-mail manualmente com expressão regular customizada, por exemplo) que o navegador já resolve de forma mais robusta e testada com `type="email"`.

**Erro comum:** Validar apenas no evento de envio (`submit`) do formulário inteiro, mostrando todos os erros de uma vez no topo — obriga o usuário a rolar a página para cima, entender qual campo corresponde a qual erro, e só então corrigir, um fluxo mais lento e frustrante que feedback próximo ao campo em tempo real.

**Exercício de fixação:** Adicione validação em tempo real a um formulário de cadastro com campo de senha e confirmação de senha, exibindo uma mensagem próxima ao campo assim que os dois valores não coincidem — sem esperar o envio do formulário.

**Para ir além:** Consulte a documentação do MDN sobre "Constraint Validation API" e sobre `:invalid`/`:valid`, pseudo-classes CSS que permitem estilizar campos automaticamente conforme seu estado de validação nativo.

---

## 5.5 Fetch API e dados externos

**Objetivo:** Buscar e exibir dados vindos de fora da página (uma API) sem recarregar a página inteira.

**Conceito central:** A Fetch API é o mecanismo nativo do JavaScript para fazer requisições HTTP a partir do navegador — buscar dados de uma API externa (ou do próprio backend do site) e usá-los para atualizar a página dinamicamente, sem o recarregamento completo que uma navegação tradicional exigiria. Uma requisição via `fetch()` retorna uma Promise (um objeto que representa um valor que ainda não está disponível, mas estará no futuro, quando a resposta chegar) — o padrão moderno para trabalhar com Promises de forma legível é `async/await`, que permite escrever código assíncrono com uma sintaxe parecida com código síncrono comum, evitando o aninhamento excessivo de `.then()` encadeados que dificultava a leitura em código JavaScript mais antigo. Dados vindos de uma API geralmente chegam no formato JSON (JavaScript Object Notation), que precisa ser convertido (`response.json()`) antes de ser usado como um objeto JavaScript comum.

**Aprofundamento tático:** Sempre trate os três estados possíveis de uma requisição de dados externos na interface: carregando (mostre um indicador visual enquanto espera, nunca deixe a tela "parada" sem explicação), sucesso (exiba os dados) e erro (a requisição pode falhar por conexão, servidor fora do ar, ou dados inválidos — trate isso explicitamente com `try/catch`, mostrando uma mensagem útil, nunca deixando a interface simplesmente travada silenciosamente sem explicação para o usuário).

**Exemplo prático:**
```javascript
async function carregarProdutos() {
  const container = document.querySelector('.produtos');
  container.textContent = 'Carregando...';
  try {
    const resposta = await fetch('/api/produtos');
    const produtos = await resposta.json();
    container.innerHTML = produtos.map(p => `<div class="card">${p.nome}</div>`).join('');
  } catch (erro) {
    container.textContent = 'Não foi possível carregar os produtos. Tente novamente.';
  }
}
```
Esse trecho cobre os três estados explicitamente: mensagem de carregamento antes da requisição, atualização com os dados reais em caso de sucesso, e mensagem de erro amigável em caso de falha — nenhum dos três estados deixa o usuário sem informação sobre o que está acontecendo.

**Contraexemplo:** Interfaces que fazem `fetch()` sem nenhum tratamento de erro (`try/catch` ausente) simplesmente "travam" silenciosamente quando a requisição falha — sem indicador de carregamento nem mensagem de erro, o usuário não sabe se deve esperar, recarregar a página, ou se algo quebrou.

**Erro comum:** Esquecer de tratar o estado de carregamento, fazendo a interface parecer "travada" ou vazia durante o tempo — geralmente breve, mas perceptível — entre o clique que dispara a requisição e a chegada da resposta.

**Exercício de fixação:** Construa uma pequena interface que busca dados de uma API pública gratuita (como a PokéAPI ou uma API de piadas) ao clicar em um botão, exibindo claramente os três estados: carregando, sucesso e erro (simule o erro desconectando a internet momentaneamente).

**Para ir além:** Explore a documentação do MDN sobre `async/await` e Promises, e pesquise sobre "loading skeletons" (esqueletos de carregamento) como alternativa visual mais sofisticada a um simples texto "Carregando...".

---

## 5.6 Frameworks modernos: React, Vue, mapa mental de quando usar cada um *(aula avançada)*

**Objetivo:** Entender o que um framework JavaScript resolve, e quando HTML/CSS/JS puro (vanilla) ainda é a escolha certa.

**Conceito central:** Frameworks como React e Vue existem para resolver um problema específico que cresce junto com a complexidade de um projeto: quando uma interface tem muitos estados interdependentes (um carrinho de compras que afeta contador, subtotal, disponibilidade de frete, tudo ao mesmo tempo), manter tudo sincronizado manualmente com JavaScript puro, seleção manual de elementos e atualização manual do DOM se torna cada vez mais difícil de manter sem bugs. Frameworks resolvem isso através de um modelo declarativo: em vez de descrever passo a passo como atualizar o DOM quando algo muda (o modelo imperativo do JavaScript puro), você descreve como a interface deveria parecer para um dado estado, e o framework se encarrega de calcular e aplicar as mudanças necessárias no DOM automaticamente. React usa uma sintaxe chamada JSX (HTML dentro de JavaScript) e um modelo baseado em componentes reutilizáveis com estado próprio; Vue tem uma proposta similar, com uma sintaxe geralmente considerada mais próxima do HTML tradicional, e uma curva de aprendizado frequentemente descrita como mais suave para quem vem de HTML/CSS puro.

**Aprofundamento tático:** Não escolha um framework por padrão de mercado — avalie a complexidade real do projeto. Para um site institucional, uma landing page, um blog, ou qualquer projeto onde a interatividade é limitada a alguns componentes isolados (menu, modal, formulário), HTML/CSS/JS puro (chamado "vanilla") continua sendo a escolha mais simples, mais leve e mais rápida de carregar — adicionar um framework inteiro para resolver um menu que abre e fecha é usar uma ferramenta desproporcional ao problema. Reserve frameworks para projetos com múltiplas telas interconectadas, estado complexo compartilhado entre partes distantes da interface, ou aplicações que se comportam mais como "programas" do que como "documentos".

**Exemplo prático:** Um dashboard interno de gestão, com múltiplos filtros que afetam simultaneamente tabelas, gráficos e contadores na mesma tela, é um caso de uso claro para React ou Vue — a complexidade de manter tudo sincronizado manualmente cresceria descontroladamente sem um framework. Já uma página de portfólio pessoal, com algumas animações de scroll e um formulário de contato, não precisa de nenhum framework — HTML, CSS e um pouco de JavaScript vanilla resolvem com muito menos peso de código para carregar.

**Contraexemplo:** É comum ver sites institucionais simples, de poucas páginas e baixa interatividade, construídos inteiramente em React com toda a infraestrutura de build associada — o resultado costuma ser um site mais pesado, mais lento para carregar e mais complexo de manter do que a mesma página feita em HTML/CSS/JS puro teria sido, sem nenhum ganho real de funcionalidade que justifique o custo.

**Erro comum:** Aprender um framework antes de dominar os fundamentos de HTML, CSS e JavaScript puro que este curso cobriu até aqui — frameworks são abstrações sobre esses fundamentos, e tentar aprendê-los sem essa base gera dependência de "receitas prontas" sem entender o que está de fato acontecendo por baixo, dificultando debugar qualquer problema que fuja do padrão comum.

**Exercício de fixação:** Pegue um projeto que você construiu neste curso usando JavaScript vanilla e escreva, em texto, se ele se beneficiaria de um framework — justificando com a complexidade real de estado envolvida, não com "porque é mais moderno".

**Para ir além:** Explore os tutoriais oficiais de introdução do React (react.dev) e do Vue (vuejs.org) — ambos hoje têm documentação com exemplos interativos direto no navegador, sem precisar instalar nada para começar a experimentar.

---

## 5.7 Bibliotecas de animação (GSAP, Framer Motion) *(aula avançada)*

**Objetivo:** Reconhecer quando animações CSS puras (Módulo 3) não são suficientes, e uma biblioteca especializada se justifica.

**Conceito central:** Animações CSS (`transition`, `@keyframes`, vistas na aula 3.6) resolvem bem microinterações simples e estados de dois pontos (hover, foco, abrir/fechar). Quando a necessidade cresce — sequências complexas encadeadas, animações sincronizadas com a posição de scroll da página, controle fino de timing entre múltiplos elementos — bibliotecas especializadas como GSAP (GreenSock Animation Platform, agnóstica de framework, amplamente usada em sites de alta produção visual) ou Framer Motion (voltada especificamente para projetos React) oferecem controle programático que CSS puro não alcança com a mesma facilidade, como animações "scroll-triggered" (que disparam conforme o usuário rola a página até um ponto específico) ou sequências com timing preciso entre dezenas de elementos diferentes.

**Aprofundamento tático:** Antes de adicionar uma biblioteca de animação ao projeto (o que adiciona peso de código a ser baixado pelo usuário), confirme que o efeito desejado realmente não é alcançável com CSS puro — muitas animações que parecem exigir JavaScript avançado (fade-in ao entrar na viewport, por exemplo) hoje são alcançáveis com a API nativa `IntersectionObserver` combinada com `transition` CSS simples, sem nenhuma biblioteca externa. Reserve GSAP ou Framer Motion para projetos onde animação é parte central da proposta de valor visual (portfólios criativos, sites de produto de alto impacto visual), não para todo projeto por padrão.

**Exemplo prático:** Um site de portfólio de designer, onde elementos aparecem com animações elaboradas e sincronizadas conforme o usuário rola a página (uma imagem que gira levemente enquanto aparece, um texto que se monta letra por letra), é um caso de uso legítimo para GSAP — o nível de controle e sincronização necessário ultrapassa o que `transition`/`@keyframes` conseguem coordenar de forma prática.

**Contraexemplo:** Adicionar GSAP (uma biblioteca de peso considerável) a um site institucional simples apenas para animar um botão ao passar o mouse é desproporcional — o mesmo efeito é alcançado com poucas linhas de CSS puro, sem o custo adicional de carregamento de uma biblioteca inteira para um efeito que não precisa dela.

**Erro comum:** Aprender uma biblioteca de animação antes de entender os fundamentos de `transition` e `@keyframes` do CSS puro — como frameworks JavaScript, bibliotecas de animação são construídas sobre os mesmos princípios (easing, duração, propriedades animáveis) vistos na aula 3.6, e pular essa base dificulta usar a biblioteca de forma intencional, em vez de copiar exemplos prontos sem entender o que cada parâmetro faz.

**Exercício de fixação:** Escolha uma animação de scroll (elementos que aparecem conforme a página rola) e implemente primeiro usando apenas `IntersectionObserver` nativo mais `transition` CSS — só depois pesquise como a mesma animação seria feita em GSAP, comparando a complexidade das duas abordagens.

**Para ir além:** Explore a documentação oficial do GSAP, especialmente o plugin ScrollTrigger, e observe sites de portfólio premiados (Awwwards.com é uma boa fonte de referência) analisando quais efeitos usam bibliotecas versus CSS puro através das ferramentas de desenvolvedor.

---

# Módulo 6 — Performance, acessibilidade e publicação

## 6.1 Performance web: Core Web Vitals

**Objetivo:** Entender as três métricas que o Google usa para medir a experiência real de velocidade e estabilidade de uma página.

**Conceito central:** Core Web Vitals são um conjunto de três métricas definidas pelo Google para medir experiência de carregamento de forma centrada no usuário real, não apenas em números técnicos abstratos. LCP (Largest Contentful Paint) mede quanto tempo leva até o maior elemento visível da tela (geralmente uma imagem principal ou título grande) terminar de carregar — a referência de "bom" é até 2.5 segundos. INP (Interaction to Next Paint, que substituiu o antigo FID em 2024) mede a responsividade da página a interações do usuário — quanto tempo leva entre um clique e a página reagir visualmente a ele — com referência de bom abaixo de 200 milissegundos. CLS (Cumulative Layout Shift) mede a estabilidade visual — quanto os elementos da página "pulam" de posição durante o carregamento (o problema de imagens sem `width`/`height` visto na aula 2.3 é uma das causas mais comuns de CLS ruim) — com referência de bom abaixo de 0.1. Essas três métricas, juntas, são hoje um fator de ranking direto no Google, tornando performance não apenas uma questão de experiência, mas de SEO mensurável.

**Aprofundamento tático:** Meça Core Web Vitals regularmente usando o PageSpeed Insights (que combina dados de laboratório com dados reais de usuários do Chrome, quando disponíveis) em vez de confiar apenas na sensação subjetiva de "o site parece rápido no meu computador" — sua máquina de desenvolvimento, com conexão rápida, não representa a experiência real da maioria dos visitantes, especialmente em celular com conexão móvel mais lenta.

**Exemplo prático:** Um site de e-commerce que reduziu o LCP de 4.2s para 1.8s — otimizando o formato e tamanho da imagem principal do produto (a causa mais comum de LCP ruim) e adicionando `width`/`height` explícitos em todas as imagens (eliminando CLS) — reportou aumento mensurável em taxa de conversão, um padrão consistente na indústria: cada segundo a menos de carregamento tende a se traduzir em conversão maior.

**Contraexemplo:** Sites que investem pesado em SEO de conteúdo (palavras-chave, backlinks) mas ignoram Core Web Vitals competem em desvantagem contra concorrentes tecnicamente mais rápidos, mesmo com conteúdo de qualidade equivalente ou superior — desde que Core Web Vitals se tornaram fator de ranking, performance técnica deixou de ser "só uma boa prática" e passou a ter impacto direto e mensurável na posição de busca.

**Erro comum:** Otimizar Core Web Vitals olhando apenas para a média geral do site, sem segmentar por dispositivo — um site pode ter excelente performance em desktop (onde a equipe testa) e péssima performance em mobile (de onde vem a maior parte do tráfego real), porque os dois ambientes têm capacidade de processamento e velocidade de conexão muito diferentes.

**Exercício de fixação:** Rode o PageSpeed Insights em um site seu (ou de um projeto que você admire) e identifique qual das três métricas está pior, e qual elemento específico da página é o principal responsável por isso.

**Para ir além:** Consulte a documentação oficial "web.dev/vitals" do Google, que detalha a metodologia exata de cada métrica e as técnicas de otimização recomendadas para cada uma.

---

## 6.2 Otimização de imagens e assets

**Objetivo:** Reduzir o peso de imagens, fontes e outros arquivos sem perder qualidade visual perceptível.

**Conceito central:** Imagens são, na maioria dos sites, o maior contribuinte para o peso total de bytes transferidos — otimizá-las é geralmente a alavanca de maior impacto sobre performance. Formatos modernos (WebP, e mais recentemente AVIF) comprimem com significativamente mais eficiência que JPEG ou PNG tradicionais, frequentemente reduzindo o tamanho de arquivo em 30-50% sem perda visível de qualidade. Compressão "lossy" (com perda) é adequada para a maioria das fotos, onde pequenas perdas de detalhe são imperceptíveis ao olho; compressão "lossless" (sem perda) é necessária para imagens onde precisão exata importa, como logotipos com texto pequeno. Fontes customizadas, se carregadas sem cuidado, também impactam performance — usar `font-display: swap` no `@font-face` garante que o texto apareça imediatamente com uma fonte de sistema enquanto a fonte customizada ainda carrega, em vez de deixar o texto invisível (o problema conhecido como "flash of invisible text") até a fonte estar pronta.

**Aprofundamento tático:** Antes de subir qualquer imagem ao projeto, passe por um processo mínimo: redimensione para o tamanho máximo real em que será exibida (nunca suba uma imagem de 4000px de largura para um espaço que exibe 800px), converta para WebP, e comprima com uma ferramenta de otimização (Squoosh.app é gratuita e roda no navegador). Limite o número de pesos e estilos de fonte customizada carregados — cada peso adicional (regular, bold, italic, cada um como arquivo separado) é um arquivo a mais para baixar; a maioria dos projetos precisa de no máximo 2-3 pesos.

**Exemplo prático:** Uma imagem de banner de 4000x2000px, 3.2MB em JPEG original, redimensionada para 1600x800px (tamanho real de exibição) e convertida para WebP com o Squoosh, cai para aproximadamente 120KB — uma redução de mais de 95% no peso, sem perda visível de qualidade na tela.

**Contraexemplo:** É comum encontrar sites onde a imagem de fundo do cabeçalho (hero) tem resolução e peso de uma foto pronta para impressão profissional, quando a tela do usuário nunca vai exibir mais que 1920px de largura — o excesso de resolução é peso desperdiçado, baixado inteiramente pelo usuário sem nenhum benefício visual correspondente.

**Erro comum:** Carregar todas as fontes de um projeto de design (às vezes seis ou mais pesos diferentes de uma família) sem revisar quais são realmente usadas na versão final — cada peso não utilizado ainda é baixado pelo navegador se declarado no CSS, mesmo que nunca apareça visualmente na página.

**Exercício de fixação:** Pegue três imagens de um projeto seu, meça o peso atual de cada uma, e otimize-as (redimensionar para o tamanho real de exibição, converter para WebP, comprimir) usando o Squoosh — compare o peso antes e depois.

**Para ir além:** Explore o Squoosh.app (ferramenta do Google Chrome Labs) em detalhe, testando diferentes níveis de compressão para entender o ponto de equilíbrio entre peso de arquivo e qualidade visual perceptível.

---

## 6.3 Acessibilidade (WCAG) na prática

**Objetivo:** Consolidar, em um checklist prático, os princípios de acessibilidade já vistos ao longo do curso.

**Conceito central:** A WCAG (Web Content Accessibility Guidelines) organiza acessibilidade em quatro princípios, conhecidos pelo acrônimo POUR: Perceptível (a informação deve estar disponível de forma que qualquer sentido consiga perceber — texto alternativo para imagens, legendas para vídeo), Operável (a interface deve ser utilizável por diferentes formas de interação — teclado, não apenas mouse ou toque), Compreensível (conteúdo e operação da interface devem ser claros e previsíveis) e Robusto (o conteúdo deve funcionar de forma confiável em diferentes tecnologias assistivas, atuais e futuras). Os níveis de conformidade A, AA e AAA representam rigor crescente — AA é o padrão mais comumente exigido, tanto por boas práticas de mercado quanto por legislação em diversos países (incluindo, no Brasil, a Lei Brasileira de Inclusão, que exige acessibilidade em serviços digitais de diversos setores). Acessibilidade não é um recurso "extra" adicionado no fim do projeto — como este curso mostrou desde o Módulo 1, ela nasce de decisões tomadas em cada camada: HTML semântico, contraste de cor adequado, navegação por teclado funcional, formulários com labels corretos.

**Aprofundamento tático:** Rode um checklist mínimo antes de considerar qualquer página pronta: (1) toda a página é navegável usando apenas o teclado (Tab, Shift+Tab, Enter, Esc), sem nenhuma armadilha de foco? (2) toda imagem com informação relevante tem `alt` descritivo? (3) todo texto tem contraste suficiente contra seu fundo (WCAG AA)? (4) todo campo de formulário tem label associado corretamente? (5) a página tem hierarquia de cabeçalhos lógica, sem pular níveis?

**Exemplo prático:** Um teste rápido e revelador: desconecte o mouse (ou simplesmente não o use) e tente completar a tarefa principal de uma página — cadastrar-se, comprar um produto, enviar um formulário — usando apenas o teclado. Se em algum ponto o foco "desaparece" (você não consegue ver visualmente qual elemento está focado) ou fica preso em um loop, esse é exatamente o tipo de problema que usuários reais de teclado e leitor de tela enfrentam diariamente.

**Contraexemplo:** Elementos clicáveis construídos com `<div onclick="...">` em vez de `<button>` ou `<a>` não recebem foco de teclado automaticamente e não respondem a Enter/Espaço sem JavaScript adicional específico para simular esse comportamento — um problema evitável desde a aula 2.1, escolhendo a tag semântica correta desde o início.

**Erro comum:** Tratar acessibilidade como uma auditoria final feita com uma ferramenta automatizada (como o Lighthouse) e considerar "resolvida" assim que a pontuação numérica melhora — ferramentas automatizadas capturam talvez 30-40% dos problemas reais de acessibilidade; testes manuais com teclado e leitor de tela continuam sendo necessários para os demais.

**Exercício de fixação:** Navegue uma página sua inteira usando apenas o teclado (sem tocar no mouse) e documente cada ponto onde você ficou "preso" ou perdeu a noção de qual elemento estava focado.

**Para ir além:** Consulte o "WCAG 2.1 Quick Reference" do W3C (filtrável por nível de conformidade), e experimente navegar a web inteira por alguns minutos usando um leitor de tela real (NVDA, gratuito, no Windows) para sentir a experiência diretamente.

---

## 6.4 Testes cross-browser e responsivo

**Objetivo:** Garantir que o site funciona corretamente em diferentes navegadores e dispositivos reais, não apenas no ambiente de desenvolvimento.

**Conceito central:** Navegadores diferentes (Chrome, Safari, Firefox, Edge) implementam padrões web com pequenas diferenças de comportamento — uma propriedade CSS relativamente nova pode ter suporte completo no Chrome e suporte parcial ou ausente no Safari, por exemplo. Testar exclusivamente no navegador de desenvolvimento (geralmente Chrome, o mais usado por desenvolvedores) cria um ponto cego real: funcionalidades que parecem perfeitas podem quebrar silenciosamente para uma parcela significativa dos usuários que navegam em outro navegador. Sites como o "Can I Use" (caniuse.com) mostram, para qualquer funcionalidade CSS ou JavaScript, exatamente quais navegadores e versões a suportam, permitindo decidir conscientemente se vale a pena usar um recurso mais recente (com fallback para navegadores antigos) ou evitá-lo. Safari, em particular, historicamente atrasa a adoção de algumas funcionalidades web modernas em relação ao Chrome, tornando-o um dos navegadores mais importantes de testar especificamente, especialmente considerando o predomínio de iPhones em determinados mercados.

**Aprofundamento tático:** Estabeleça uma lista mínima de navegadores e dispositivos para testar antes de publicar qualquer projeto: pelo menos Chrome e Safari (cobrindo tanto motores de renderização Blink quanto WebKit), em desktop e em pelo menos um dispositivo mobile real (não apenas o modo de emulação do DevTools, que simula tamanho de tela mas não o comportamento real de toque e performance do dispositivo).

**Exemplo prático:** Uma funcionalidade CSS relativamente recente, como `:has()` (seletor que permite estilizar um elemento com base em seus filhos), teve suporte incompleto no Safari por um período depois de já funcionar no Chrome — um projeto que dependia dela sem verificar o Can I Use antes teria uma funcionalidade quebrada silenciosamente para uma parcela de usuários, sem nenhum erro visível durante o desenvolvimento no Chrome.

**Contraexemplo:** Times que testam exclusivamente no Chrome, em uma única resolução de tela de desktop grande (1920px), frequentemente só descobrem problemas de layout ou funcionalidade quebrada depois que usuários reais reportam — quando o teste em múltiplos navegadores e tamanhos de tela reais, antes de publicar, teria identificado o mesmo problema em minutos.

**Erro comum:** Confiar apenas no modo de emulação de dispositivo do Chrome DevTools como substituto completo de teste em dispositivo real — a emulação simula corretamente o tamanho de tela, mas não replica com precisão a performance real, o comportamento de toque, nem eventuais diferenças de renderização específicas do navegador mobile real (Safari no iOS, por exemplo, é significativamente diferente do Chrome mesmo em modo de emulação "Safari" no DevTools).

**Exercício de fixação:** Abra um projeto seu em pelo menos dois navegadores diferentes (por exemplo, Chrome e Safari, ou Chrome e Firefox) e compare visualmente lado a lado, procurando ativamente por qualquer diferença de espaçamento, fonte ou comportamento.

**Para ir além:** Explore o "Can I Use" (caniuse.com) em detalhe, e pesquise sobre BrowserStack, ferramenta paga (com plano gratuito limitado) que permite testar em navegadores e dispositivos reais remotamente sem precisar possuir fisicamente cada aparelho.

---

## 6.5 Deploy: domínio, hospedagem e CI/CD (Vercel/Netlify) *(aula avançada)*

**Objetivo:** Entender o caminho técnico entre "site pronto no computador" e "site acessível publicamente por um domínio real".

**Conceito central:** Publicar um site envolve três peças que frequentemente se confundem para quem está começando: o domínio (o endereço, como "meusite.com.br", registrado junto a um registrador como Registro.br) é apenas um "apelido" legível que aponta para um endereço técnico real; a hospedagem é onde os arquivos do site efetivamente residem e são servidos ao mundo; e o DNS (Domain Name System) é o sistema que traduz o domínio legível para o endereço técnico da hospedagem, através de registros configurados no painel do domínio. Plataformas modernas como Vercel e Netlify simplificaram drasticamente esse processo para sites estáticos ou baseados em frameworks modernos: conectando o repositório de código (geralmente no GitHub) diretamente à plataforma, cada alteração enviada (`git push`) dispara automaticamente um novo deploy — esse fluxo automatizado é chamado CI/CD (Continuous Integration/Continuous Deployment), e elimina a necessidade de upload manual de arquivos via FTP, prática comum e mais propensa a erro em décadas anteriores da web.

**Aprofundamento tático:** Ao configurar um domínio próprio para um projeto hospedado em Vercel ou Netlify, o fluxo típico é: registrar o domínio em um registrador (Registro.br para domínios .com.br, ou outros para domínios internacionais), e então adicionar os registros DNS fornecidos pela plataforma de hospedagem no painel do domínio — a propagação desses registros pelo mundo pode levar de minutos a algumas horas, então testar imediatamente após configurar nem sempre reflete o resultado final.

**Exemplo prático:** Um fluxo comum e moderno: código em um repositório GitHub → conectado à Vercel → cada `git push` para a branch principal dispara automaticamente build e deploy → o site atualizado fica no ar em minutos, sem nenhuma etapa manual de upload — esse é o mesmo tipo de fluxo de CI/CD usado por equipes profissionais de desenvolvimento em produção.

**Contraexemplo:** Fluxos antigos de publicação via FTP manual (arrastar arquivos atualizados para um servidor via um cliente FTP) são propensos a erro humano — esquecer de subir um arquivo alterado, subir uma versão desatualizada por engano — problemas que o deploy automatizado via Git elimina, porque o que está no repositório é sempre, por definição, o que será publicado.

**Erro comum:** Confundir "comprar um domínio" com "ter um site no ar" — um domínio sozinho, sem hospedagem configurada e sem os registros DNS apontando corretamente, não exibe nada; essa confusão é comum entre quem está publicando o primeiro projeto.

**Exercício de fixação:** Suba um projeto HTML/CSS/JS simples a um repositório no GitHub e conecte-o à Vercel ou Netlify (ambas com planos gratuitos generosos para projetos pessoais), publicando-o com uma URL gratuita da própria plataforma (sem precisar comprar domínio ainda) — depois faça uma pequena alteração e observe o deploy automático acontecer.

**Para ir além:** Explore a documentação oficial da Vercel sobre "Custom Domains" para entender o processo completo de conectar um domínio próprio, e pesquise sobre a diferença entre hospedagem de site estático e hospedagem que exige servidor (necessária para certas funcionalidades de backend).

---

## 6.6 SEO técnico para sites *(aula avançada)*

**Objetivo:** Aplicar, de forma técnica e sistemática, os fundamentos de SEO on-page já vistos ao longo do curso.

**Conceito central:** SEO técnico é a camada de otimização que garante que buscadores consigam efetivamente encontrar, entender e indexar o conteúdo de um site — complementando (não substituindo) o SEO on-page de conteúdo já visto na aula 2.6. Um arquivo `sitemap.xml` lista todas as páginas importantes do site, facilitando que buscadores as descubram sem depender apenas de seguir links internamente; um arquivo `robots.txt` instrui quais partes do site buscadores podem ou não rastrear. Dados estruturados (Schema.org, geralmente implementados via JSON-LD) são um vocabulário padronizado que descreve explicitamente o tipo de conteúdo de uma página (um produto, um artigo, uma receita, um evento) de forma que buscadores possam exibir resultados enriquecidos (rich snippets) — como estrelas de avaliação, preço, ou disponibilidade diretamente no resultado de busca, sem precisar visitar a página. URLs canônicas (`<link rel="canonical">`) resolvem o problema de conteúdo duplicado acessível por mais de um endereço, informando ao buscador qual versão é a "oficial" a ser indexada.

**Aprofundamento tático:** Ao publicar qualquer site novo, garanta minimamente: um `sitemap.xml` gerado (muitos frameworks modernos, incluindo Next.js, geram isso automaticamente), meta tags Open Graph (`og:title`, `og:description`, `og:image`) para que links compartilhados em redes sociais exibam prévia visual correta, e verificação de indexação através do Google Search Console, ferramenta gratuita que mostra exatamente como o Google enxerga o site, incluindo erros de rastreamento que não são visíveis de nenhuma outra forma.

**Exemplo prático:** Uma página de produto de e-commerce com dados estruturados Schema.org do tipo "Product", incluindo preço e disponibilidade, pode aparecer no Google com estrelas de avaliação e preço diretamente no resultado de busca — aumentando significativamente a taxa de clique em relação a um resultado de busca puramente textual, sem nenhuma mudança no ranking em si, apenas na apresentação visual do resultado.

**Contraexemplo:** Sites tecnicamente bem construídos, mas sem nenhum arquivo `sitemap.xml` e com páginas órfãs (não linkadas de nenhum outro lugar do site), podem ter conteúdo relevante que o Google simplesmente nunca descobre — não por penalização, mas por ausência total de caminho de descoberta.

**Erro comum:** Bloquear acidentalmente páginas importantes no `robots.txt` (uma regra `Disallow: /` genérica, por exemplo, esquecida de um ambiente de testes) — um erro de configuração simples que pode remover o site inteiro dos resultados de busca sem nenhum aviso óbvio, até que alguém note a queda de tráfego.

**Exercício de fixação:** Verifique se um site seu tem `sitemap.xml` e `robots.txt` configurados corretamente (acessando `/sitemap.xml` e `/robots.txt` diretamente no navegador), e cadastre-o no Google Search Console se ainda não estiver, verificando quantas páginas estão de fato indexadas.

**Para ir além:** Consulte o Google Search Central (documentação oficial de SEO do Google) e explore o "Rich Results Test", ferramenta gratuita do Google que valida se dados estruturados Schema.org estão implementados corretamente.

---

# Módulo 7 — Estratégia avançada e carreira

## 7.1 Design systems em escala e Figma-to-code

**Objetivo:** Entender como design systems maduros conectam diretamente o trabalho de design ao código, reduzindo retrabalho de tradução manual.

**Conceito central:** Em produtos maduros, o design system (visto de forma introdutória na aula 4.4) evolui de uma biblioteca de componentes no Figma para uma infraestrutura compartilhada entre design e engenharia: os mesmos tokens (cores, espaçamentos, tipografia) definidos no Figma são exportados e sincronizados diretamente com as variáveis CSS ou variáveis de tema usadas no código, eliminando a etapa manual (e propensa a erro) de um desenvolvedor "adivinhar" o valor hexadecimal exato de uma cor olhando o design. Ferramentas de "Figma-to-code" (incluindo a própria funcionalidade de inspeção do Figma, que gera CSS diretamente de qualquer elemento selecionado, e plugins mais avançados que geram componentes React ou HTML completos) reduzem — mas não eliminam completamente — a distância entre a intenção de design e a implementação real; ainda exigem revisão humana, especialmente para comportamento responsivo e interatividade, que ferramentas automatizadas historicamente têm dificuldade de inferir corretamente a partir de um design estático.

**Aprofundamento tático:** Ao trabalhar em um projeto com design system estabelecido, priorize sempre usar o token ou componente já existente antes de criar um novo valor ou elemento visual do zero — mesmo quando a diferença pareça pequena ("esse cinza está quase igual ao cinza do sistema, mas um pouco diferente"), pequenas variações não documentadas acumuladas ao longo do tempo são exatamente o que corrói a consistência de um design system maduro.

**Exemplo prático:** Um fluxo de trabalho maduro comum: designers definem tokens (cor, espaçamento, tipografia) no Figma usando "Variables" nativas do Figma; esses tokens são exportados (manualmente ou via plugin/API) para um arquivo JSON ou diretamente para variáveis CSS no código; desenvolvedores consomem exclusivamente essas variáveis, nunca valores hardcoded — garantindo que uma mudança de token no Figma, uma vez sincronizada, se propague corretamente para a implementação real, sem intervenção manual repetida.

**Contraexemplo:** Times onde design e código evoluem de forma desconectada — o Figma é atualizado, mas o código não é revisado contra ele com regularidade — acumulam "drift" (desvio) visual ao longo do tempo: o produto real, em produção, gradualmente deixa de corresponder ao que está documentado no Figma, e ninguém tem certeza de qual dos dois é a "fonte da verdade" real.

**Erro comum:** Tratar a exportação Figma-to-code como um processo totalmente automatizado e confiável sem revisão — o código gerado automaticamente frequentemente ignora nuances de responsividade, acessibilidade semântica e performance que exigem julgamento humano, e publicar esse código sem revisão é um risco real de qualidade.

**Exercício de fixação:** Se você tem acesso ao Figma, selecione um componente qualquer e use o painel de inspeção (Inspect) para ver o CSS gerado automaticamente — compare com como você mesmo escreveria esse CSS manualmente, e identifique diferenças.

**Para ir além:** Explore a documentação sobre "Variables" no Figma (a funcionalidade nativa de design tokens) e pesquise sobre ferramentas como Tokens Studio, que expandem essa sincronização entre design e código.

---

## 7.2 IA no fluxo de web design (geração, código assistido)

**Objetivo:** Integrar ferramentas de IA generativa ao fluxo de trabalho de web design como acelerador — sem abdicar do julgamento aprendido ao longo do curso.

**Conceito central:** Ferramentas de IA aplicadas a web design operam hoje em duas frentes principais: geração de código assistida (assistentes de IA integrados a editores de código, capazes de escrever HTML/CSS/JS a partir de descrição em linguagem natural ou de completar trechos de código) e geração de design visual (ferramentas que produzem layouts, variações de componente, ou até protótipos completos a partir de um prompt de texto). O ganho real dessas ferramentas está em velocidade de primeira versão e redução de trabalho repetitivo (escrever o esqueleto de um componente comum, gerar variações de um layout para escolher entre elas) — não em substituir o julgamento sobre hierarquia, usabilidade e acessibilidade construído ao longo deste curso. Um código gerado por IA que "parece funcionar" visualmente pode conter os mesmos problemas estruturais discutidos em módulos anteriores (HTML não semântico, contraste insuficiente, ausência de labels em formulários) — a IA aprendeu a partir de código real da internet, que inclui tanto boas quanto más práticas, sem necessariamente distinguir entre elas de forma consistente.

**Aprofundamento tático:** Use IA generativa como ponto de partida acelerado, nunca como entrega final sem revisão — depois de gerar código ou design com IA, rode o mesmo checklist de qualidade que se aplicaria a qualquer trabalho humano: a estrutura HTML é semântica? O contraste passa WCAG AA? A hierarquia visual comunica a ordem de importância correta? Formulários têm labels? Trate a IA como um assistente júnior rápido, cujo trabalho sempre passa por revisão de alguém que entende os princípios — exatamente o papel que este curso construiu.

**Exemplo prático:** Um fluxo produtivo comum: pedir a uma ferramenta de IA para gerar três variações de layout para uma seção de "depoimentos de clientes", revisar as três contra os princípios de hierarquia visual e acessibilidade vistos no Módulo 4, escolher a melhor base, e refinar manualmente os detalhes que a IA não acertou (geralmente espaçamento fino, contraste de cor específico, ou semântica HTML).

**Contraexemplo:** Publicar diretamente código gerado por IA sem nenhuma revisão é uma prática cada vez mais comum e arriscada — projetos assim frequentemente acumulam os mesmos problemas de acessibilidade e semântica vistos em código humano descuidado, apenas gerados em maior volume e mais rapidamente, tornando a auditoria posterior mais trabalhosa, não menos.

**Erro comum:** Depender de IA para gerar código antes de entender os fundamentos que este curso cobriu — sem essa base, é impossível avaliar criticamente se o código gerado está correto, ou apenas "parece" correto visualmente na primeira olhada, sem revisão real de estrutura e acessibilidade.

**Exercício de fixação:** Gere um componente simples (um card de produto, por exemplo) usando uma ferramenta de IA de sua escolha, e audite o resultado usando os critérios das aulas 2.1 (semântica) e 6.3 (acessibilidade) — documente o que precisou ser corrigido.

**Para ir além:** Acompanhe a Skill "product-self-knowledge" e a documentação oficial de assistentes de IA de código para entender as capacidades e limitações específicas de cada ferramenta, que evoluem rapidamente.

---

## 7.3 Tendências de design (2026) e o que não muda

**Objetivo:** Diferenciar tendências estéticas passageiras de princípios fundamentais que seguem válidos independente da moda visual do momento.

**Conceito central:** Tendências visuais em web design mudam em ciclos relativamente curtos — o "flat design" dos anos 2010, o "neumorfismo" de curta duração, o "glassmorphism" mais recente, cada um com seu momento de popularidade e posterior arrefecimento. O que não muda, e é exatamente o conteúdo dos Módulos 1 a 6 deste curso, são os princípios fundamentais: hierarquia visual clara, contraste adequado, usabilidade testada, performance de carregamento, acessibilidade — esses fundamentos permanecem relevantes independentemente de qual estética visual estiver em alta no momento. Isso não significa ignorar tendências: entender a estética contemporânea (no momento deste curso, tendências incluem tipografia mais expressiva e grande, uso extensivo de gradientes suaves, micro-animações discretas, e um retorno a densidades de informação um pouco maiores após anos de minimalismo extremo) mantém o trabalho visualmente relevante — mas aplicar uma tendência sem os fundamentos de usabilidade por trás dela produz sites que parecem atuais e funcionam mal, exatamente o padrão discutido na aula 1.1.

**Aprofundamento tático:** Ao avaliar se incorporar uma tendência visual nova a um projeto, pergunte: "essa tendência resolve ou piora a hierarquia visual e a usabilidade que já defini para esse projeto?" — tendências que reforçam clareza (tipografia expressiva usada para reforçar hierarquia, por exemplo) valem a pena adotar; tendências que a prejudicam (excesso de efeito visual competindo com o conteúdo principal) devem ser usadas com moderação ou evitadas, independente de quão populares estejam no momento.

**Exemplo prático:** O "glassmorphism" (elementos com efeito de vidro fosco translúcido) pode reforçar hierarquia visual quando usado com moderação, para destacar um elemento flutuante sobre o conteúdo (um modal, um card de destaque) — mas aplicado indiscriminadamente por toda a interface, o mesmo efeito reduz contraste e legibilidade, contrariando diretamente os princípios de acessibilidade da aula 6.3.

**Contraexemplo:** Sites que adotam a tendência visual mais recente de forma completa e sem filtro, sem avaliar se ela serve ao conteúdo específico daquele projeto, frequentemente envelhecem mal — ficam visualmente datados assim que a tendência perde popularidade, e nesse meio-tempo, se a tendência prejudicava usabilidade, o site sofreu com isso durante todo o período em que esteve no ar.

**Erro comum:** Redesenhar um site inteiro só para "acompanhar tendência", sem nenhum dado real (métricas de uso, feedback de usuário) indicando que o design anterior tinha problema funcional — mudança visual por si só não é garantia de melhoria, e redesigns motivados puramente por estética têm alto risco de piorar métricas que o design anterior, mesmo visualmente "datado", vinha resolvendo bem.

**Exercício de fixação:** Escolha uma tendência visual atual (pesquise sites premiados em Awwwards ou similar) e analise criticamente: ela reforça ou compete com a hierarquia visual e legibilidade do conteúdo? Escreva sua avaliação em algumas frases.

**Para ir além:** Acompanhe publicações como Smashing Magazine e o próprio Awwwards.com regularmente — não para copiar tendências cegamente, mas para manter repertório visual atualizado e treinar o julgamento crítico sobre quando uma tendência serve ao conteúdo e quando compete com ele.

---

## 7.4 Precificação e proposta para clientes de web design

**Objetivo:** Estruturar uma proposta comercial de web design que comunique valor, não apenas horas trabalhadas.

**Conceito central:** Precificar trabalho de web design apenas por hora trabalhada tende a subvalorizar o resultado entregue — um site que aumenta conversão de um cliente em 20% vale, para esse cliente, muito mais do que o número de horas gastas para construí-lo sugere. Uma proposta comercial eficaz começa não pelo preço, mas pelo diagnóstico do problema do cliente (o mesmo princípio da aula 1.1, aplicado agora ao próprio negócio de quem constrói sites): que problema de negócio esse projeto resolve, e que valor mensurável isso representa? Estruturar a proposta em pacotes com escopo claro (o que está incluído, o que não está, quantas rodadas de revisão) evita o problema comum de "escopo infinito", onde o cliente pede ajustes indefinidamente porque o contrato nunca definiu limites claros. Cobrar por valor entregue, quando aplicável (por exemplo, um percentual sobre aumento de conversão mensurado), é uma prática mais sofisticada, mas exige métricas de baseline bem definidas antes do projeto começar — sem elas, não há como provar o valor gerado depois.

**Aprofundamento tático:** Ao montar uma proposta, defina explicitamente por escrito: escopo exato (quais páginas, quais funcionalidades), quantidade de rodadas de revisão incluídas, prazo de entrega, e o que conta como "fora de escopo" (e como isso será cobrado se solicitado) — a ausência dessas definições é a causa mais comum de atrito e prejuízo de margem em projetos de web design para clientes externos.

**Exemplo prático:** Uma proposta bem estruturada para um site institucional pequeno pode ser dividida em: diagnóstico e arquitetura de informação (uma etapa isolada, entregue e aprovada antes de avançar), design visual (com duas rodadas de revisão incluídas, adicional cobrado à parte), e desenvolvimento e publicação — cada etapa com entrega e aprovação clara antes de avançar para a próxima, reduzindo o risco de retrabalho em cascata se algo mudar no meio do caminho.

**Contraexemplo:** Propostas vagas do tipo "faço o site por R$X" sem especificar quantas páginas, quantas revisões, ou o que está incluído tendem a gerar projetos que se arrastam indefinidamente, com o cliente pedindo mudança após mudança sem custo adicional claro, e o profissional perdendo margem real a cada rodada não prevista.

**Erro comum:** Competir por preço mais baixo contra concorrentes, sem nunca comunicar o valor de negócio real do trabalho (conversão, credibilidade, tempo economizado) — quando a conversa é só sobre preço, ela tende a ser vencida por quem cobra menos, não por quem entrega mais valor.

**Exercício de fixação:** Escreva uma proposta de projeto (mesmo hipotética) para um pequeno negócio, incluindo diagnóstico do problema, escopo explícito, quantidade de revisões incluídas, prazo e preço — revise se ela comunica valor de negócio ou apenas lista tarefas técnicas.

**Para ir além:** Pesquise sobre "value-based pricing" (precificação baseada em valor) aplicado a serviços criativos e de tecnologia, e compare com o modelo tradicional de cobrança por hora.

---

## 7.5 Seu plano de portfólio de 90 dias *(aula avançada — fechamento do curso)*

**Objetivo:** Transformar todo o conteúdo do curso em um plano de ação concreto de 90 dias para construir (ou fortalecer) um portfólio real de web design.

**Conceito central:** Conhecimento técnico sem um portfólio visível para o mercado tem valor comercial limitado — para quem busca clientes, vaga ou reconhecimento como web designer, o portfólio é a prova concreta de que os princípios estudados neste curso (dos Módulos 1 a 7) foram de fato aplicados, não apenas compreendidos em teoria. Um plano estruturado em três fases de 30 dias cada, no mesmo espírito do planejamento em fases visto no curso de marketing, organiza esse trabalho: fase 1 (dias 1-30), fundação — escolher de 2 a 3 projetos de portfólio que demonstrem amplitude (um projeto mais visual/UI, um mais funcional/interativo, um de estudo de caso completo com processo documentado); fase 2 (dias 31-60), execução — construir esses projetos aplicando explicitamente os princípios de cada módulo (arquitetura de informação do Módulo 2, layout e responsividade do Módulo 3, UX do Módulo 4, interatividade do Módulo 5, performance e acessibilidade do Módulo 6); fase 3 (dias 61-90), visibilidade — publicar o portfólio (Módulo 6.5), documentar o processo de cada projeto (não só o resultado final, mas as decisões tomadas), e começar a distribuí-lo ativamente (redes profissionais, comunidades de design, candidaturas ou prospecção direta de clientes).

**Aprofundamento tático:** Para cada projeto de portfólio, documente não apenas o resultado visual final, mas o processo de decisão por trás dele — qual problema o projeto resolve, que alternativas de layout foram consideradas e por que a escolhida venceu, que testes de acessibilidade ou performance foram feitos. Estudos de caso com processo documentado comunicam muito mais competência real a um potencial cliente ou empregador do que apenas a imagem final polida, porque demonstram exatamente o tipo de raciocínio ensinado ao longo deste curso, não apenas o resultado estético.

**Exemplo prático:** Um portfólio eficaz de web designer iniciante pode conter: um redesign completo e documentado de um site real existente (mostrando antes/depois com justificativa de cada mudança, ancorada em princípios específicos como os deste curso), um projeto interativo original (demonstrando domínio de JavaScript do Módulo 5), e uma página de "sobre" bem escrita (aplicando microcopy do Módulo 4.6) explicando a filosofia de trabalho — três peças, cada uma demonstrando uma dimensão diferente de competência, em vez de dez peças superficiais e repetitivas.

**Contraexemplo:** Um portfólio composto por dez projetos idênticos em complexidade e escopo (todos landing pages simples de uma página, por exemplo) demonstra domínio de um único tipo de problema repetido, e não convence um cliente ou recrutador de que o profissional consegue lidar com complexidade maior — variedade de tipo de problema resolvido comunica mais competência do que volume de peças semelhantes.

**Erro comum:** Tratar o plano de portfólio como um documento estático, escrito uma vez e nunca revisado — assim como o plano de marketing de 90 dias visto no outro curso, este também deve ser revisado semanalmente contra o progresso real, ajustando prazos e escopo conforme a realidade do tempo disponível se revela.

**Exercício de fixação:** Escreva seu próprio plano de portfólio de 90 dias, seguindo a estrutura de três fases descrita nesta aula, definindo para cada fase: objetivo central, de 2 a 3 ações concretas (citando explicitamente qual módulo/conceito específico deste curso cada ação aplica), e como você vai medir se aquela fase funcionou antes de avançar para a próxima.

**Para ir além:** Explore portfólios de web designers reconhecidos no Awwwards e observe especificamente como eles estruturam estudos de caso — que informação de processo incluem, como equilibram texto explicativo com imagens do resultado final.

---

# Glossário

1. **DOM** — Document Object Model: representação em árvore do HTML que o navegador constrói e que o JavaScript pode ler e modificar.
2. **Box model** — Modelo de quatro camadas (content, padding, border, margin) que descreve como o navegador calcula o espaço de qualquer elemento.
3. **Box-sizing: border-box** — Regra CSS que inclui padding e border dentro da largura definida de um elemento, em vez de somá-los a ela.
4. **Flexbox** — Sistema de layout CSS unidimensional para organizar elementos em linha ou coluna.
5. **CSS Grid** — Sistema de layout CSS bidimensional, com controle simultâneo de linhas e colunas.
6. **Media query** — Bloco de CSS que se aplica condicionalmente conforme características da tela, como largura da janela.
7. **Mobile-first** — Abordagem de design e código que prioriza a experiência em tela pequena antes de expandir para telas maiores.
8. **Especificidade CSS** — Sistema de pontuação que determina qual regra CSS vence quando duas regras conflitam sobre o mesmo elemento.
9. **CSS Custom Properties (variáveis CSS)** — Valores reutilizáveis definidos uma vez e referenciados em múltiplos lugares do CSS via `var()`.
10. **Design tokens** — Valores de design (cor, espaçamento, tipografia) nomeados e compartilhados entre design e código.
11. **Heurísticas de Nielsen** — Conjunto de 10 princípios consagrados de usabilidade usados para avaliar interfaces.
12. **Wireframe** — Representação esquemática de baixa fidelidade de uma tela, usada para validar estrutura antes do design visual.
13. **Design system** — Coleção documentada de componentes reutilizáveis e regras de uso compartilhadas em um produto.
14. **WCAG** — Web Content Accessibility Guidelines: padrão internacional de acessibilidade web, com níveis A, AA e AAA.
15. **POUR** — Perceptível, Operável, Compreensível, Robusto: os quatro princípios centrais da WCAG.
16. **ARIA** — Accessible Rich Internet Applications: atributos HTML que comunicam papel e estado de elementos a tecnologias assistivas.
17. **Alt text** — Texto alternativo de uma imagem, lido por leitores de tela e exibido se a imagem falhar ao carregar.
18. **Contraste (WCAG)** — Razão mínima entre cor de texto e cor de fundo exigida para legibilidade acessível (4.5:1 para texto normal em nível AA).
19. **Core Web Vitals** — Métricas de experiência técnica do Google: LCP (carregamento), INP (responsividade) e CLS (estabilidade visual).
20. **LCP** — Largest Contentful Paint: tempo até o maior elemento visível da tela terminar de carregar.
21. **CLS** — Cumulative Layout Shift: medida de quanto os elementos da página se deslocam inesperadamente durante o carregamento.
22. **Lazy loading** — Técnica de adiar o carregamento de recursos (como imagens) até que estejam prestes a entrar na área visível da tela.
23. **Fetch API** — Interface nativa do JavaScript para fazer requisições HTTP a partir do navegador.
24. **Async/await** — Sintaxe do JavaScript para escrever código assíncrono (como requisições de rede) de forma legível e sequencial.
25. **CI/CD** — Continuous Integration/Continuous Deployment: fluxo automatizado que publica uma nova versão do site a cada alteração enviada ao repositório.
26. **Dados estruturados (Schema.org)** — Vocabulário padronizado que descreve o tipo de conteúdo de uma página para buscadores, possibilitando resultados enriquecidos.
27. **Figma-to-code** — Processo (parcialmente automatizado) de traduzir um design feito no Figma em código HTML/CSS/JS real.
