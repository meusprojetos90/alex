"use client";

import { use, useState } from "react";
import { mockLeads, mockConversations, mockContracts } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LEAD_STATUS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Phone, Mail, Clock, ArrowLeft, Send, CheckCircle2, DollarSign, Calendar, CreditCard, Banknote, FileText, FileSignature } from "lucide-react";
import Link from "next/link";

export default function LeadDetailPage({
  params,
}: {
  params: Promise<{ escolaId: string; leadId: string }>;
}) {
  const { escolaId, leadId } = use(params);
  
  const lead = mockLeads.find((l) => l.id === leadId && l.tenantId === escolaId);
  const conv = mockConversations.find((c) => c.leadId === leadId);
  const contract = mockContracts.find((c) => c.leadId === leadId);

  // Inicializando estado para simular a baixa interativa das parcelas
  const isFechado = contract?.status === 'assinado' || lead?.status === 'matriculado';
  
  const [parcelas, setParcelas] = useState([
    { num: 1, valor: 300.00, vencimento: '10/07/2026', status: 'pendente' },
    { num: 2, valor: 300.00, vencimento: '10/08/2026', status: 'pendente' },
    { num: 3, valor: 300.00, vencimento: '10/09/2026', status: 'pendente' },
    { num: 4, valor: 300.00, vencimento: '10/10/2026', status: 'pendente' },
    { num: 5, valor: 300.00, vencimento: '10/11/2026', status: 'pendente' },
  ]);

  const marcarComoPago = (num: number) => {
    setParcelas(prev => prev.map(p => p.num === num ? { ...p, status: 'pago' } : p));
  };

  if (!lead) return <div className="p-6 text-white">Lead não encontrado ou não pertence a esta escola. (ID: {leadId})</div>;

  const statusConfig = LEAD_STATUS[lead.status];

  const financeiro = isFechado ? {
    valorTotal: 1850.00,
    formaPagamento: 'Boleto Bancário',
    entrada: { valor: 350.00, data: '03/06/2026', status: 'pago' },
    parcelas: parcelas
  } : null;

  return (
    <div className="space-y-6 pb-12 w-full max-w-7xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href={`/escola/${escolaId}/crm`}>
          <Button variant="outline" size="icon" className="rounded-xl border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-md">
            <ArrowLeft size={18} />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Perfil do Aluno: {lead.nome}</h2>
          <p className="text-muted-foreground mt-1 text-sm">Detalhes completos, histórico da IA e gestão financeira.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUNA ESQUERDA: DADOS PESSOAIS */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            <CardContent className="pt-0 relative px-6 pb-6">
              <div className="w-20 h-20 bg-zinc-900 border-4 border-background rounded-full absolute -top-10 left-6 flex items-center justify-center text-2xl font-bold text-white shadow-xl">
                {lead.nome.charAt(0)}
              </div>
              
              <div className="mt-12 space-y-1">
                <h3 className="text-xl font-bold text-foreground leading-tight">{lead.nome}</h3>
                <Badge variant="outline" className={`${statusConfig.color} border-current border-opacity-20 uppercase tracking-wider text-[10px]`}>
                  {statusConfig.label}
                </Badge>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Phone size={14} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">WhatsApp</p>
                    <p className="text-sm font-medium text-foreground">{lead.telefone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-purple-500" />
                  </div>
                  <div className="truncate">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">E-mail</p>
                    <p className="text-sm font-medium text-foreground truncate">{lead.email || "Não informado"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Calendar size={14} className="text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Capturado Em</p>
                    <p className="text-sm font-medium text-foreground">{new Date(lead.criadoEm).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm">Interesse Principal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center">
                <p className="text-xs text-indigo-400 font-medium uppercase tracking-wider mb-1">Categoria Desejada</p>
                <p className="text-2xl font-black text-indigo-500">Tipo {lead.categoriaInteresse}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* COLUNA CENTRAL: CHAT IA */}
        <div className="lg:col-span-5 flex flex-col h-[500px] lg:h-[800px]">
          <Card className="flex-1 flex flex-col border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl overflow-hidden">
            <CardHeader className="border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/[0.02] py-4">
              <CardTitle className="text-sm flex items-center justify-between">
                <span>Histórico de Negociação (IA)</span>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-normal">IA Ativa</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 flex flex-col relative" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
              <ScrollArea className="flex-1 p-4">
                {conv ? (
                  <div className="space-y-6 pb-4">
                    <div className="text-center">
                      <span className="text-[10px] bg-black/20 dark:bg-white/10 px-3 py-1 rounded-full text-muted-foreground uppercase tracking-wider">Início do Atendimento</span>
                    </div>
                    {conv.mensagens.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-md ${
                          msg.role === 'user' 
                            ? 'bg-blue-600 text-white rounded-br-sm' 
                            : 'bg-zinc-100 dark:bg-zinc-800 text-foreground border border-black/5 dark:border-white/5 rounded-bl-sm'
                        }`}>
                          <p className="leading-relaxed">{msg.content}</p>
                          <span className={`text-[9px] mt-2 block opacity-50 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>{msg.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
                    <Phone size={48} className="mb-4" />
                    <p>Nenhuma conversa registrada.</p>
                  </div>
                )}
              </ScrollArea>
              
              <div className="p-4 border-t border-black/5 dark:border-white/5 bg-background/50 backdrop-blur-md">
                <div className="flex gap-2">
                  <Input 
                    className="flex-1 rounded-full bg-black/5 dark:bg-white/5 border-none h-12 px-6" 
                    placeholder="Assuma o controle humano e digite..." 
                  />
                  <Button size="icon" className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shrink-0">
                    <Send size={18} className="ml-1" />
                  </Button>
                </div>
                <p className="text-[10px] text-center text-muted-foreground mt-2">Ao enviar, a IA será pausada automaticamente para este lead.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* COLUNA DIREITA: CONTRATO & FINANCEIRO */}
        <div className="lg:col-span-4 space-y-6">
          
          <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm flex items-center gap-2"><FileSignature size={16} className="text-purple-500" /> Contrato de Prestação</CardTitle>
            </CardHeader>
            <CardContent>
              {contract ? (
                <div className="space-y-5">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Status do Documento</p>
                      {contract.status === 'assinado' ? (
                        <p className="text-sm font-bold text-emerald-500 flex items-center gap-1.5"><CheckCircle2 size={16}/> Assinado Digitalmente</p>
                      ) : (
                        <p className="text-sm font-bold text-amber-500 flex items-center gap-1.5"><Clock size={16}/> Aguardando Assinatura</p>
                      )}
                    </div>
                  </div>

                  {contract.status === 'assinado' && contract.assinadoEm && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 size={18} />
                      <div className="text-xs">
                        <span className="font-bold block">Assinatura Verificada</span>
                        <span>{new Date(contract.assinadoEm).toLocaleString('pt-BR')} (IP Registrado)</span>
                      </div>
                    </div>
                  )}

                  {contract.linkAssinatura && (
                    <div className="pt-2">
                      <Button className="w-full rounded-xl bg-purple-600 hover:bg-purple-700 text-white" asChild>
                        <a href={contract.linkAssinatura} target="_blank">Abrir PDF do Contrato</a>
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText size={40} className="mx-auto text-muted-foreground opacity-20 mb-3" />
                  <p className="text-xs text-muted-foreground mb-4">Contrato não gerado pela IA.</p>
                  <Button variant="outline" className="w-full rounded-xl border-black/10 dark:border-white/10">Gerar Manualmente</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* PAINEL FINANCEIRO PREMIUM (Com Checkboxes) */}
          <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl overflow-hidden relative">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-[80px] pointer-events-none"></div>
            
            <CardHeader className="pb-4 relative z-10">
              <CardTitle className="text-sm flex items-center gap-2"><DollarSign size={16} className="text-emerald-500" /> Módulo Financeiro</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              {financeiro ? (
                <div className="space-y-6">
                  <div className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-5">
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Valor Negociado</p>
                        <p className="text-3xl font-black text-foreground">R$ {financeiro.valorTotal.toFixed(2)}</p>
                      </div>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">{financeiro.formaPagamento}</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/5 dark:border-white/5">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Entrada</p>
                        <p className="text-sm font-semibold text-emerald-500 flex items-center gap-1">
                          <CheckCircle2 size={12}/> R$ {financeiro.entrada.valor.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Restante</p>
                        <p className="text-sm font-semibold text-foreground">{financeiro.parcelas.length}x de R$ {financeiro.parcelas[0].valor.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Cronograma de Boletos</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <Banknote size={14} className="text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Entrada (Ato)</p>
                            <p className="text-[10px] text-emerald-600/70 dark:text-emerald-400/70">Pago em {financeiro.entrada.data}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">R$ {financeiro.entrada.valor.toFixed(2)}</span>
                      </div>

                      {financeiro.parcelas.map((parcela) => (
                        <div key={parcela.num} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                          parcela.status === 'pago' 
                            ? 'bg-emerald-500/5 border-emerald-500/20' 
                            : 'bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5'
                        }`}>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-zinc-500/10 flex items-center justify-center">
                              <span className="text-xs font-bold text-muted-foreground">{parcela.num}</span>
                            </div>
                            <div>
                              <p className="text-xs font-medium">Parcela {parcela.num}/{financeiro.parcelas.length}</p>
                              <p className={`text-[10px] flex items-center gap-1 ${parcela.status === 'pago' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}`}>
                                {parcela.status === 'pago' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                                {parcela.status === 'pago' ? 'Pago' : `Vence: ${parcela.vencimento}`}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <span className={`text-xs font-bold block ${parcela.status === 'pago' ? 'text-emerald-600 dark:text-emerald-400 line-through opacity-70' : 'text-foreground'}`}>
                                R$ {parcela.valor.toFixed(2)}
                              </span>
                            </div>
                            
                            {parcela.status !== 'pago' ? (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => marcarComoPago(parcela.num)}
                                className="h-7 px-2 text-[10px] border-emerald-500/50 text-emerald-600 hover:bg-emerald-500 hover:text-white dark:text-emerald-400"
                              >
                                Dar Baixa
                              </Button>
                            ) : (
                              <span className="text-[10px] font-bold text-emerald-500 pr-2">OK</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full rounded-xl bg-black dark:bg-white text-white dark:text-black hover:opacity-80">
                    <CreditCard size={16} className="mr-2" /> Gerenciar Cobranças
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <DollarSign size={40} className="mx-auto text-muted-foreground opacity-20 mb-3" />
                  <p className="text-xs text-muted-foreground mb-4">O aluno ainda não chegou na etapa de pagamento.</p>
                  <Button variant="outline" className="w-full rounded-xl border-black/10 dark:border-white/10">Emitir Cobrança Avulsa</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
