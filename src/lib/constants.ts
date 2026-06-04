export const LEAD_STATUS = {
  novo: { label: 'Novo', color: 'bg-slate-100 text-slate-700 border-slate-200' },
  qualificado: { label: 'Qualificado', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  proposta: { label: 'Proposta', color: 'bg-violet-50 text-violet-700 border-violet-200' },
  aguardando: { label: 'Aguardando', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  fechado: { label: 'Fechado', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  perdido: { label: 'Perdido', color: 'bg-rose-50 text-rose-700 border-rose-200' },
} as const;

export const CONTRATO_STATUS = {
  gerado: { label: 'Gerado', color: 'bg-slate-100 text-slate-700 border-slate-200' },
  enviado: { label: 'Enviado', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  assinado: { label: 'Assinado', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  expirado: { label: 'Expirado', color: 'bg-rose-50 text-rose-700 border-rose-200' },
} as const;

export const CATEGORIAS_CNH = ['A', 'B', 'AB', 'ACC', 'D', 'E'] as const;

export const PERFIS_USUARIO = {
  agencia_admin: 'Admin Agência',
  escola_admin: 'Admin Escola',
  atendente: 'Atendente',
  gerente: 'Gerente',
} as const;

export const FOLLOWUP_ETAPAS = [
  { id: 1, label: 'Imediato', intervaloHoras: 0 },
  { id: 2, label: 'Dia 1', intervaloHoras: 24 },
  { id: 3, label: 'Dia 3', intervaloHoras: 72 },
  { id: 4, label: 'Dia 7', intervaloHoras: 168 },
  { id: 5, label: 'Dia 14', intervaloHoras: 336 },
] as const;

export const TIPOS_CONHECIMENTO = {
  processo: 'Processo da CNH',
  faq: 'FAQ',
  preco: 'Preços',
  diferencial: 'Diferenciais',
} as const;
