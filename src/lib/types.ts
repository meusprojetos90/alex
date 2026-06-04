export type PerfilUsuario = 'agencia_admin' | 'escola_admin' | 'atendente' | 'gerente';
export type StatusLead = 'novo' | 'qualificado' | 'proposta' | 'aguardando' | 'fechado' | 'perdido';
export type CategoriaCNH = 'A' | 'B' | 'AB' | 'ACC' | 'D' | 'E';
export type StatusContrato = 'gerado' | 'enviado' | 'assinado' | 'expirado';
export type TipoConhecimento = 'processo' | 'faq' | 'preco' | 'diferencial';
export type StatusIntegracao = 'conectado' | 'desconectado' | 'aguardando_qr' | 'erro';
export type TipoIntegracao = 'falazap' | 'autentique' | 'openai';

export interface Tenant {
  id: string;
  nome: string;
  cnpj: string;
  nomeFantasia: string;
  logo?: string;
  endereco: string;
  telefone: string;
  email: string;
  horarios: string;
  ativo: boolean;
  criadoEm: string;
}

export interface User {
  id: string;
  tenantId: string | null; // null = agência admin
  nome: string;
  email: string;
  senhaHash?: string;
  perfil: PerfilUsuario;
  ultimoAcesso?: string;
}

export interface Lead {
  id: string;
  tenantId: string;
  nome: string;
  telefone: string;
  email?: string;
  status: StatusLead;
  categoriaInteresse: CategoriaCNH;
  criadoEm: string;
  atualizadoEm: string;
  diasNoStatus?: number; // Para ajudar no UI
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  leadId: string;
  tenantId: string;
  mensagens: Message[];
  resultado?: 'fechou' | 'nao_fechou';
  criadoEm: string;
}

export interface Contract {
  id: string;
  leadId: string;
  tenantId: string;
  autentiqueId?: string;
  status: StatusContrato;
  linkAssinatura?: string;
  valor: number;
  dadosCliente: Record<string, string | number>;
  assinadoEm?: string;
  criadoEm: string;
}

export interface FollowupJob {
  id: string;
  contractId: string;
  tenantId: string;
  etapa: number; // 1-4
  agendadoPara: string;
  executado: boolean;
  cancelado: boolean;
  mensagem: string; // Adicionado para o mock ser mais util
}

export interface TrainingExample {
  id: string;
  tenantId: string;
  conversationId: string;
  aprovado: boolean;
  aprovadoPor: string; // userId
  criadoEm: string;
}

export interface ContractTemplate {
  id: string;
  tenantId: string;
  nome: string;
  conteudo: string; // Pode ser texto rico ou markdown
  variaveis: string[]; // ex: ['nome_cliente', 'cpf']
  ativo: boolean;
  versao: number;
}

export interface FormField {
  id: string;
  tenantId: string;
  nomeCampo: string;
  label: string;
  tipo: 'texto' | 'numero' | 'data' | 'selecao';
  obrigatorio: boolean;
  ordem: number;
  fixo: boolean;
}

export interface KnowledgeBase {
  id: string;
  tenantId: string;
  tipo: TipoConhecimento;
  titulo: string;
  conteudo: string;
  ativo: boolean;
  ordem?: number;
}

export interface PricingCategory {
  id: string;
  tenantId: string;
  categoria: CategoriaCNH;
  valor: number;
  descricao: string;
  incluso: string[];
  prazoEstimado: string;
  ativo: boolean;
}

export interface AiConfig {
  id: string;
  tenantId: string;
  nomeAgente: string;
  tomDeVoz: string;
  mensagemBoasVindas: string;
  modelo: string;
  temperatura: number;
  maxMensagens: number;
  apiKeyEnc?: string;
  transferirParaHumano: string; // Ex: 'Apos 10 mensagens'
}

export interface Integration {
  id: string;
  tenantId: string;
  tipo: TipoIntegracao;
  config: Record<string, any>; // JSON criptografado na real, mas record no mock
  status: StatusIntegracao;
  ultimoTeste?: string;
}
