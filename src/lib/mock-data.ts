import {
  Tenant,
  User,
  Lead,
  Conversation,
  Contract,
  FollowupJob,
  TrainingExample,
  ContractTemplate,
  FormField,
  KnowledgeBase,
  PricingCategory,
  AiConfig,
  Integration
} from './types';

export const mockTenants: Tenant[] = [
  { id: "tenant_1", nome: "Autoescola Piloto", cnpj: "11.111.111/0001-11", nomeFantasia: "Piloto", endereco: "Rua 1, 100", telefone: "11999991111", email: "contato@piloto.com", horarios: "Seg-Sex 8-18", ativo: true, criadoEm: "2024-01-01T10:00:00Z" },
  { id: "tenant_2", nome: "Autoescola Volante", cnpj: "22.222.222/0001-22", nomeFantasia: "Volante", endereco: "Av 2, 200", telefone: "11999992222", email: "contato@volante.com", horarios: "Seg-Sex 8-18", ativo: true, criadoEm: "2024-01-05T10:00:00Z" },
  { id: "tenant_3", nome: "Autoescola Direção", cnpj: "33.333.333/0001-33", nomeFantasia: "Direção", endereco: "Praça 3, 300", telefone: "11999993333", email: "contato@direcao.com", horarios: "Seg-Sex 8-18", ativo: true, criadoEm: "2024-02-01T10:00:00Z" },
];

export const mockLeads: Lead[] = Array.from({ length: 20 }).map((_, i) => {
  const tenantIds = ["tenant_1", "tenant_2", "tenant_3"];
  const statuses = ['novo', 'qualificado', 'proposta', 'aguardando', 'fechado', 'perdido'] as const;
  const cats = ['A', 'B', 'AB', 'D'] as const;
  
  return {
    id: `lead_${i + 1}`,
    tenantId: tenantIds[i % 3],
    nome: `Lead ${i + 1} Silva`,
    telefone: `119888800${i < 10 ? '0' + i : i}`,
    email: `lead${i+1}@teste.com`,
    status: statuses[i % statuses.length],
    categoriaInteresse: cats[i % cats.length],
    criadoEm: new Date(Date.now() - i * 86400000).toISOString(),
    atualizadoEm: new Date().toISOString(),
    diasNoStatus: i % 5,
  };
});

export const mockContracts: Contract[] = Array.from({ length: 8 }).map((_, i) => {
  const statuses = ['gerado', 'enviado', 'assinado', 'expirado'] as const;
  return {
    id: `contract_${i + 1}`,
    leadId: `lead_${i + 1}`,
    tenantId: "tenant_1", // majority on tenant 1 for preview
    status: statuses[i % statuses.length],
    valor: 1500 + i * 100,
    dadosCliente: { nome: `Lead ${i + 1} Silva`, cpf: `123.456.789-0${i}` },
    criadoEm: new Date(Date.now() - i * 86400000).toISOString(),
    assinadoEm: i % 4 === 2 ? new Date().toISOString() : undefined,
    linkAssinatura: "https://autentique.com.br/assinatura/mock",
  };
});

export const mockConversations: Conversation[] = Array.from({ length: 5 }).map((_, i) => ({
  id: `conv_${i + 1}`,
  leadId: `lead_${i + 1}`,
  tenantId: "tenant_1",
  mensagens: [
    { id: "m1", role: "user", content: "Olá, queria saber o valor da CNH B", timestamp: "10:00" },
    { id: "m2", role: "assistant", content: "Olá! O valor é R$ 1500 à vista. Como prefere pagar?", timestamp: "10:01" }
  ],
  criadoEm: new Date().toISOString(),
  resultado: i % 2 === 0 ? "fechou" : "nao_fechou"
}));

export const mockKnowledgeBase: KnowledgeBase[] = [
  { id: "kb_1", tenantId: "tenant_1", tipo: "processo", titulo: "Aulas Teóricas", conteudo: "São 45h/aula", ativo: true },
  { id: "kb_2", tenantId: "tenant_1", tipo: "faq", titulo: "Pode parcelar?", conteudo: "Sim, em até 12x", ativo: true }
];

export const mockPricing: PricingCategory[] = [
  { id: "p_1", tenantId: "tenant_1", categoria: "A", valor: 1200, descricao: "Moto", incluso: ["Exames", "Aulas"], prazoEstimado: "60 dias", ativo: true },
  { id: "p_2", tenantId: "tenant_1", categoria: "B", valor: 1500, descricao: "Carro", incluso: ["Exames", "Aulas", "Simulador"], prazoEstimado: "90 dias", ativo: true },
  { id: "p_3", tenantId: "tenant_1", categoria: "AB", valor: 2500, descricao: "Carro e Moto", incluso: ["Exames", "Aulas"], prazoEstimado: "120 dias", ativo: true }
];

export const mockAiConfig: AiConfig = {
  id: "ai_1", tenantId: "tenant_1", nomeAgente: "Ana", tomDeVoz: "Amigável e direto", mensagemBoasVindas: "Olá, sou a Ana, assistente virtual da Autoescola Piloto!", modelo: "gpt-4o-mini", temperatura: 0.7, maxMensagens: 20, transferirParaHumano: "Apos 10 mensagens"
};

export const mockFollowupJobs: FollowupJob[] = [
  { id: "job_1", contractId: "contract_1", tenantId: "tenant_1", etapa: 1, agendadoPara: "2024-06-03", executado: false, cancelado: false, mensagem: "Oi, viu o contrato?" }
];

export const mockUsers: User[] = [
  { id: "u1", tenantId: null, nome: "Admin Geral", email: "admin@agencia.com", perfil: "agencia_admin" },
  { id: "u2", tenantId: "tenant_1", nome: "Dono Piloto", email: "dono@piloto.com", perfil: "escola_admin" },
];

export const mockTemplates: ContractTemplate[] = [
  { id: "tpl_1", tenantId: "tenant_1", nome: "Contrato Padrão", conteudo: "Eu, {{nome_cliente}}, portador do CPF {{cpf}}...", variaveis: ["nome_cliente", "cpf"], ativo: true, versao: 1 }
];
