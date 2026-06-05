export const CONTATO = {
  whatsapp: "5519996063421",
  whatsappLabel: "+55 19 99606-3421",
  telefones: ["(19) 3537-1777", "(19) 3537-1786"],
  email: "comercial@jefiber.com.br",
  endereco: "Estrada Municipal do Biri (IPN-463), nº 230, Mini Distrito Industrial III, Ipeúna/SP, CEP 13.537-000",
  enderecoCurto: "Estrada Municipal do Biri, nº 230 — Ipeúna/SP",
} as const;

export const REDES = [
  { nome: "Instagram", url: "https://www.instagram.com/je.fiber/" },
  { nome: "LinkedIn", url: "https://www.linkedin.com/in/je-fiber-7b956b140/" },
  { nome: "Facebook", url: "https://www.facebook.com/jefiber/" },
] as const;

export const NAV = [
  { label: "Sobre", href: "#sobre" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Serviços", href: "#servicos" },
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
];

export const VALORES = ["Qualidade", "Segurança", "Experiência", "Excelência", "Comprometimento"] as const;

// TODO: confirmar números reais com o cliente
export const NUMEROS = [
  { valor: 15, sufixo: "+", label: "anos de jornada de excelência" },
  { valor: 100, sufixo: "+", label: "projetos entregues" }, // TODO placeholder
  { valor: 3, sufixo: "", label: "setores atendidos" },
] as const;
