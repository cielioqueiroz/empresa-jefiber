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

// Texto institucional (Nossa História) — fonte: site da empresa
export const SOBRE_TEXTO =
  "A JE FIBER é especialista na fabricação, instalação e manutenção de produtos em fibra de vidro, oferecendo soluções robustas e personalizadas para os setores de saneamento básico e industrial. Com forte atuação em tratamentos de água, esgoto e efluentes, além de áreas industriais como química, alimentícia, petroquímica e sucroalcooleira, trazemos ampla experiência e comprometimento com a qualidade em cada projeto.";

export const NAV = [
  { label: "Sobre", href: "#sobre" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Serviços", href: "#servicos" },
  { label: "Áreas", href: "#areas" },
  { label: "Infraestrutura", href: "#infraestrutura" },
  { label: "Projetos", href: "#projetos" },
  { label: "Contato", href: "#contato" },
] as const;

export type Solucao = {
  id: string; titulo: string; imagem: string; resumo: string;
  funcoes: string; fabricacao: string; manutencao: string;
};

export const SOLUCOES: readonly Solucao[] = [
  {
    id: "tubos", titulo: "Tubos e conexões RPVC / PRFV", imagem: "/images/jeFiber_16.png",
    resumo: "Tubulação de alta resistência química e mecânica para adução e transporte.",
    funcoes: "Adução de água bruta/tratada, efluentes e fluidos químicos; alta resistência à corrosão.",
    fabricacao: "Enrolamento filamentar (filament winding) e laminação, sob medida por diâmetro e pressão.",
    manutencao: "Reparo laminado, inspeção e substituição de trechos com mínima parada operacional.",
  },
  {
    id: "reservatorios", titulo: "Reservatórios PRFV", imagem: "/images/jeFiber_10.png",
    resumo: "Reservatórios verticais e horizontais para água e produtos químicos.",
    funcoes: "Armazenamento de água potável, efluentes e produtos químicos; longa vida útil.",
    fabricacao: "Corpo em PRFV por enrolamento, com bocais, escadas e acessórios sob projeto.",
    manutencao: "Recuperação de paredes, bocais e revestimento interno; laudo de integridade.",
  },
  {
    id: "eta", titulo: "Estações de Tratamento de Água (ETA)", imagem: "/images/jeFiber_08.png",
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
    id: "tampas", titulo: "Tampas", imagem: "/images/jeFiber_09.png",
    resumo: "Tampas em fibra de vidro para tanques e reservatórios, sob medida.",
    funcoes: "Vedação e acesso de inspeção para tanques, reservatórios e estações.",
    fabricacao: "Laminação em PRFV com reforços e bocais conforme o projeto.",
    manutencao: "Substituição e recuperação de tampas e vedações desgastadas.",
  },
  {
    id: "pecas", titulo: "Peças Especiais", imagem: "/images/jeFiber_05.png",
    resumo: "Componentes e conexões especiais em PRFV fabricados sob demanda.",
    funcoes: "Flanges, curvas, reduções e peças técnicas para sistemas em fibra.",
    fabricacao: "Fabricação sob medida a partir do desenho ou da necessidade do cliente.",
    manutencao: "Reposição de peças e adequação de sistemas existentes.",
  },
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
