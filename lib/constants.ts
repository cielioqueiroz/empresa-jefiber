export const CONTATO = {
  whatsapp: "5519996063421",
  whatsappLabel: "+55 19 99606-3421",
  telefones: ["(19) 3537-1777", "(19) 3537-1786"],
  email: "comercial@jefiber.com.br",
  endereco: "Estrada Municipal do Biri (IPN-463), nº 230, Mini Distrito Industrial III, Ipeúna/SP, CEP 13.537-000",
  enderecoCurto: "Estrada Municipal do Biri, nº 230 — Ipeúna/SP",
  enderecos: [
    "Estrada Municipal do Biri (IPN-463), nº 230, Mini Distrito Industrial III, Ipeúna/SP, CEP 13.537-000",
    "Chácara Primavera, nº 05, Estrada da Lapa, Zona Rural, Ipeúna/SP, CEP 13.537-000",
  ],
} as const;

export type Rede = "instagram" | "linkedin" | "facebook";
export const REDES: readonly { nome: string; rede: Rede; url: string }[] = [
  { nome: "Instagram", rede: "instagram", url: "https://www.instagram.com/je.fiber/" },
  { nome: "LinkedIn", rede: "linkedin", url: "https://www.linkedin.com/in/je-fiber-7b956b140/" },
  { nome: "Facebook", rede: "facebook", url: "https://www.facebook.com/jefiber/" },
];

// Textos legais (LGPD / direitos) — fonte: site da empresa
export const LGPD_CONSENTIMENTO =
  "Ao selecionar esta caixa e enviar seus dados, você nos autoriza a te enviar e-mails. Você pode cancelar a qualquer momento.";
export const DIREITOS =
  "Todo o conteúdo deste site é de uso exclusivo da JE FIBER. Proibida reprodução ou utilização a qualquer título, sob as penas da lei.";

// Texto institucional (Nossa História) — fonte: site da empresa
export const SOBRE_TEXTO =
  "A JE FIBER é especialista na fabricação, instalação e manutenção de produtos em fibra de vidro, oferecendo soluções robustas e personalizadas para os setores de saneamento básico e industrial. Com forte atuação em tratamentos de água, esgoto e efluentes, além de áreas industriais como química, alimentícia, petroquímica e sucroalcooleira, trazemos ampla experiência e comprometimento com a qualidade em cada projeto.";

export const NAV = [
  { label: "Sobre", href: "/#sobre" },
  { label: "Soluções", href: "/#solucoes" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Áreas", href: "/#areas" },
  { label: "Infraestrutura", href: "/#infraestrutura" },
  { label: "Projetos", href: "/#projetos" },
  { label: "Contato", href: "/#contato" },
] as const;

export type Solucao = {
  id: string; titulo: string; imagem: string; resumo: string;
  funcoes: string; fabricacao: string; manutencao: string;
};

export const SOLUCOES: readonly Solucao[] = [
  {
    id: "tubos", titulo: "Tubos e conexões RPVC / PRFV", imagem: "/images/site-tubos.png",
    resumo: "Tubulação de alta resistência química e mecânica para adução e transporte.",
    funcoes: "Adução de água bruta/tratada, efluentes e fluidos químicos; alta resistência à corrosão.",
    fabricacao: "Enrolamento filamentar (filament winding) e laminação, sob medida por diâmetro e pressão.",
    manutencao: "Reparo laminado, inspeção e substituição de trechos com mínima parada operacional.",
  },
  {
    id: "reservatorios", titulo: "Reservatórios PRFV", imagem: "/images/site-reservatorios.png",
    resumo: "Reservatórios verticais e horizontais para água e produtos químicos.",
    funcoes: "Armazenamento de água potável, efluentes e produtos químicos; longa vida útil.",
    fabricacao: "Corpo em PRFV por enrolamento, com bocais, escadas e acessórios sob projeto.",
    manutencao: "Recuperação de paredes, bocais e revestimento interno; laudo de integridade.",
  },
  {
    id: "eta", titulo: "Estações de Tratamento de Água (ETA)", imagem: "/images/site-eta.png",
    resumo: "Soluções completas em PRFV para tratamento de água.",
    funcoes: "Floculação, decantação e filtração em módulos de fibra resistentes à corrosão.",
    fabricacao: "Tanques e tubulações em PRFV integrados ao processo da estação.",
    manutencao: "Manutenção preventiva e corretiva dos módulos e tubulações.",
  },
  {
    id: "ete", titulo: "Estações de Tratamento de Esgoto (ETE)", imagem: "/images/jeFiber_14.png",
    resumo: "Tratamento de efluentes com equipamentos em fibra de vidro.",
    funcoes: "Tratamento biológico e físico-químico de efluentes; resistência a meios agressivos.",
    fabricacao: "Reatores, tanques e tubulações PRFV dimensionados por vazão.",
    manutencao: "Inspeção, reparo e modernização de unidades existentes.",
  },
  {
    id: "tampas", titulo: "Tampas", imagem: "/images/site-tampas.png",
    resumo: "Tampas em fibra de vidro para tanques e reservatórios, sob medida.",
    funcoes: "Vedação e acesso de inspeção para tanques, reservatórios e estações.",
    fabricacao: "Laminação em PRFV com reforços e bocais conforme o projeto.",
    manutencao: "Substituição e recuperação de tampas e vedações desgastadas.",
  },
  {
    id: "pecas", titulo: "Peças Especiais", imagem: "/images/site-pecas-especiais.png",
    resumo: "Componentes e conexões especiais em PRFV fabricados sob demanda.",
    funcoes: "Flanges, curvas, reduções e peças técnicas para sistemas em fibra.",
    fabricacao: "Fabricação sob medida a partir do desenho ou da necessidade do cliente.",
    manutencao: "Reposição de peças e adequação de sistemas existentes.",
  },
];

// ---------- Produtos (subpáginas /produtos/[slug]) ----------
export type Produto = {
  slug: string; titulo: string; imagem: string; galeria: readonly string[];
  resumo: string; descricao: string;
  projeto: readonly string[]; montagem: readonly string[]; supervisao: readonly string[];
};

export const PRODUTOS: readonly Produto[] = [
  {
    slug: "reservatorios", titulo: "Reservatórios PRFV", imagem: "/images/site-reservatorios.png",
    galeria: ["/images/site-reservatorios.png", "/images/jeFiber_30.png", "/images/jeFiber_08.png"],
    resumo: "Reservatórios verticais e horizontais para água e produtos químicos.",
    descricao: "Reservatórios fabricados em Plástico Reforçado com Fibra de Vidro (PRFV) para armazenamento de água potável, efluentes e produtos químicos. Alta resistência à corrosão, longa vida útil e baixíssima manutenção, com projeto sob medida para cada aplicação.",
    projeto: ["Dimensionamento conforme volume, pressão e produto armazenado", "Definição de bocais, costados, escadas e acessórios", "Memorial de cálculo e desenho técnico de fabricação"],
    montagem: ["Fabricação por enrolamento filamentar e laminação", "Instalação no local com nivelamento e ancoragem", "Conexão de tubulações, bocais e acessórios"],
    supervisao: ["Acompanhamento técnico durante a instalação", "Testes de estanqueidade e laudo de integridade", "Manutenção preventiva e corretiva programada"],
  },
  {
    slug: "tubos", titulo: "Tubos e Conexões RPVC / PRFV", imagem: "/images/site-tubos.png",
    galeria: ["/images/site-tubos.png", "/images/jeFiber_27.png", "/images/jeFiber_28.png"],
    resumo: "Tubulação de alta resistência química e mecânica para adução e transporte.",
    descricao: "Tubos e conexões em RPVC e PRFV com alta resistência química e mecânica, indicados para adução e transporte de água bruta e tratada, efluentes e fluidos químicos, com fabricação sob medida por diâmetro e pressão de trabalho.",
    projeto: ["Definição de diâmetro, classe de pressão e tipo de fluido", "Projeto de traçado, conexões, curvas e reduções", "Especificação da resina conforme agressividade do meio"],
    montagem: ["Fabricação por enrolamento filamentar (filament winding)", "Junções por laminação ou sistemas de vedação", "Assentamento e alinhamento da rede no local"],
    supervisao: ["Inspeção de juntas e testes de pressão", "Reparo laminado e substituição de trechos", "Manutenção com mínima parada operacional"],
  },
  {
    slug: "eta", titulo: "Estações de Tratamento de Água (ETA)", imagem: "/images/site-eta.png",
    galeria: ["/images/site-eta.png", "/images/jeFiber_08.png", "/images/jeFiber_26.png"],
    resumo: "Soluções completas em PRFV para tratamento de água.",
    descricao: "Estações de Tratamento de Água compactas e modulares em PRFV, integrando floculação, decantação e filtração em equipamentos resistentes à corrosão, dimensionados conforme a vazão e a qualidade da água desejada.",
    projeto: ["Dimensionamento por vazão e parâmetros de qualidade", "Definição dos módulos de floculação, decantação e filtração", "Integração de tanques e tubulações em PRFV"],
    montagem: ["Fabricação dos módulos e tanques em fibra de vidro", "Montagem e integração ao processo da estação", "Comissionamento e partida assistida"],
    supervisao: ["Acompanhamento de operação e ajustes de processo", "Manutenção preventiva e corretiva dos módulos", "Modernização e ampliação de unidades existentes"],
  },
  {
    slug: "ete", titulo: "Estações de Tratamento de Esgoto (ETE)", imagem: "/images/jeFiber_30.png",
    galeria: ["/images/jeFiber_30.png", "/images/jeFiber_26.png", "/images/jeFiber_08.png"],
    resumo: "Tratamento de efluentes com equipamentos em fibra de vidro.",
    descricao: "Estações de Tratamento de Esgoto em PRFV para tratamento biológico e físico-químico de efluentes sanitários e industriais, com reatores, tanques e tubulações resistentes a meios agressivos e dimensionados por vazão.",
    projeto: ["Dimensionamento por vazão e carga orgânica", "Definição de reatores, tanques e tubulações", "Especificação de resinas para meios agressivos"],
    montagem: ["Fabricação de reatores e tanques em PRFV", "Instalação e integração das unidades de tratamento", "Comissionamento e partida assistida"],
    supervisao: ["Inspeção, reparo e modernização das unidades", "Manutenção preventiva e corretiva programada", "Acompanhamento dos parâmetros de descarte"],
  },
];

// ---------- Serviços / Outros Projetos (subpáginas /servicos/[slug]) ----------
export type ServicoDetalhe = { slug: string; titulo: string; imagem: string; descricao: readonly string[] };

export const SERVICOS_DETALHE: readonly ServicoDetalhe[] = [
  {
    slug: "calha-vertedora", titulo: "Calha Vertedora", imagem: "/images/jeFiber_14.png",
    descricao: [
      "Calhas vertedoras em PRFV utilizadas no controle e na medição de fluxo em estações de tratamento de água e esgoto, garantindo distribuição uniforme e leitura precisa de vazão.",
      "Fabricadas sob medida, são resistentes à corrosão e a meios agressivos, com baixa manutenção e longa vida útil.",
    ],
  },
  {
    slug: "comporta", titulo: "Comporta", imagem: "/images/jeFiber_30.png",
    descricao: [
      "Comportas em fibra de vidro para controle e bloqueio de fluxo em canais, tanques e estações de tratamento, com vedação eficiente e operação suave.",
      "Resistentes à corrosão e a produtos químicos, são fabricadas sob medida conforme a necessidade de cada projeto.",
    ],
  },
  {
    slug: "guarda-corpo", titulo: "Guarda-corpo", imagem: "/images/jeFiber_26.png",
    descricao: [
      "Guarda-corpos em PRFV para proteção e segurança em passarelas, plataformas e áreas industriais, combinando leveza, resistência mecânica e durabilidade.",
      "Não conduzem eletricidade e resistem à corrosão, sendo ideais para ambientes agressivos onde o aço sofre desgaste acelerado.",
    ],
  },
  {
    slug: "pecas-especiais", titulo: "Peças Especiais", imagem: "/images/site-pecas-especiais.png",
    descricao: [
      "Peças e componentes especiais em PRFV fabricados sob demanda — flanges, curvas, reduções e conexões técnicas para sistemas em fibra de vidro.",
      "Produzidas a partir do desenho ou da necessidade do cliente, garantem o ajuste perfeito a sistemas novos ou existentes.",
    ],
  },
  {
    slug: "tampas", titulo: "Tampas", imagem: "/images/site-tampas.png",
    descricao: [
      "Tampas em PRFV indicadas para ambientes altamente corrosivos, oferecendo vedação e acesso de inspeção para tanques, reservatórios e estações de tratamento.",
      "Fabricadas sob medida com reforços e bocais conforme o projeto, podem ser removidas com facilidade para acompanhamento de funções, pinos, vedações e visores.",
    ],
  },
];

// ---------- Downloads (catálogos em PDF) ----------
export type Download = { nome: string; arquivo: string; tamanho: string };
export const DOWNLOADS: readonly Download[] = [
  { nome: "Estações de Tratamento", arquivo: "/downloads/estacoes-de-tratamento.pdf", tamanho: "4,9 MB" },
  { nome: "Reservatórios", arquivo: "/downloads/reservatorios.pdf", tamanho: "6,0 MB" },
  { nome: "Tubos e Conexões", arquivo: "/downloads/tubos-e-conexoes.pdf", tamanho: "2,9 MB" },
];

export type Area = { nome: string; itens: readonly string[] };
export const AREAS: readonly Area[] = [
  {
    nome: "Açúcar e Álcool",
    itens: [
      "Armazenagem de água e produtos químicos: bissulfato de cálcio, ácido fosfórico, melaço, caldo de cana e vinhaça",
      "Vasos de processo, reatores e misturadores",
      "Condução de água bruta, vinhaça e efluente industrial",
    ],
  },
  {
    nome: "Indústrias Químicas",
    itens: [
      "Armazenagem de ácidos, bases, sulfatos, cloretos, etc.",
      "Vasos de processo, reatores e misturadores",
      "Condução de água bruta, de chuva, de reuso, efluente industrial e químicos sob consulta",
    ],
  },
  {
    nome: "Indústria de Alimentos",
    itens: [
      "Armazenagem de produtos alimentícios: glucose, vinho, melaço, açúcar líquido, vinagre, água potável, molhos, óleos e sucos",
      "Condução de água bruta, de chuva, de reuso e efluente industrial",
      "Produtos químicos sob consulta",
    ],
  },
  {
    nome: "Papel e Celulose",
    itens: [
      "Armazenagem de ácidos, bases, sulfatos, cloretos, etc.",
      "Vasos de processo, reatores e armazenagem de produtos acabados",
      "Condução de água bruta, de chuva, de reuso e efluente industrial",
    ],
  },
  {
    nome: "Indústrias Petroquímicas",
    itens: [
      "Armazenagem de ácidos, bases, sulfatos, cloretos, etc.",
      "Vasos de processo, reatores e armazenagem de produtos acabados",
      "Condução de água bruta, de chuva, de reuso e efluente industrial",
    ],
  },
  {
    nome: "Saneamento",
    itens: [
      "Reservatórios e tubulações para água potável e tratada",
      "Estações de tratamento de água (ETA) e esgoto (ETE)",
      "Adução e transporte de efluentes",
    ],
  },
];

export const VALORES = ["Qualidade", "Segurança", "Experiência", "Excelência", "Comprometimento"] as const;

// TODO: confirmar números reais com o cliente
export const NUMEROS = [
  { valor: 15, sufixo: "+", label: "anos de jornada de excelência" },
  { valor: 100, sufixo: "+", label: "projetos entregues" }, // TODO placeholder
  { valor: 3, sufixo: "", label: "setores atendidos" },
] as const;
