"use client";

import { use } from "react";
import { mockLeads, mockContracts } from "@/lib/mock-data";
import { Users, FileText, TrendingUp, CheckCircle, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { LEAD_STATUS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Bot, MessageCircle, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const chartData = [
  { name: 'Seg', leads: 4 },
  { name: 'Ter', leads: 7 },
  { name: 'Qua', leads: 5 },
  { name: 'Qui', leads: 8 },
  { name: 'Sex', leads: 12 },
  { name: 'Sáb', leads: 6 },
  { name: 'Dom', leads: 3 },
];

export default function DashboardPage({ params }: { params: Promise<{ escolaId: string }> }) {
  const { escolaId } = use(params);
  const leads = mockLeads;
  const contracts = mockContracts;
  
  const leadsHoje = leads.filter(l => new Date(l.criadoEm).toDateString() === new Date().toDateString()).length;
  const leadsAtend = leads.filter(l => ['qualificado', 'proposta', 'aguardando'].includes(l.status)).length;
  const contratosGerados = contracts.length;
  const txConversao = leads.length > 0 ? Math.round((leads.filter(l => l.status === 'fechado').length / leads.length) * 100) : 0;
  
  const pipelineValue = leadsAtend * 1800; // Mock average ticket R$ 1.800

  const ultimosLeads = [...leads].sort((a,b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()).slice(0, 5);

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Dashboard da Autoescola</h2>
        <p className="text-muted-foreground mt-2">Visão geral do desempenho do seu funil e da Inteligência Artificial.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Card: Novos Leads Hoje */}
        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Leads Hoje</CardTitle>
            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
              <Users className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{leadsHoje}</div>
            <p className="text-xs text-blue-500 mt-1 flex items-center font-medium">
              <ArrowUpRight size={12} className="mr-1" /> +2 desde ontem
            </p>
          </CardContent>
        </Card>

        {/* Card: Leads em Atendimento */}
        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Atendimento</CardTitle>
            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{leadsAtend}</div>
            <p className="text-xs text-muted-foreground mt-1">Sendo aquecidos pela IA</p>
          </CardContent>
        </Card>

        {/* Card: Contratos Gerados */}
        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contratos Assinados</CardTitle>
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
              <FileText className="h-4 w-4 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{contratosGerados}</div>
            <p className="text-xs text-emerald-500 mt-1 flex items-center font-medium">
              <CheckCircle size={12} className="mr-1" /> +{contratosGerados} neste mês
            </p>
          </CardContent>
        </Card>

        {/* Card: Taxa de Conversão */}
        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversão de IA</CardTitle>
            <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
              <CheckCircle className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{txConversao}%</div>
            <p className="text-xs text-muted-foreground mt-1">Média de fechamento</p>
          </CardContent>
        </Card>

      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        
        {/* Gráfico de Leads */}
        <Card className="col-span-1 lg:col-span-4 border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl flex flex-col">
          <CardHeader>
            <CardTitle>Captação de Leads (Últimos 7 dias)</CardTitle>
            <CardDescription>Volume de novos alunos recebidos e processados pela IA</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} className="text-muted-foreground" dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} className="text-muted-foreground" />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.8)', color: '#fff' }}
                  cursor={{stroke: 'currentColor', strokeWidth: 1, strokeDasharray: '3 3', opacity: 0.2}}
                />
                <Line type="monotone" name="Leads Recebidos" dataKey="leads" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#3b82f6' }} activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Últimos Leads (Lista) */}
        <Card className="col-span-1 lg:col-span-3 border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>Últimos alunos que entraram no funil</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ultimosLeads.map(lead => (
                <div key={lead.id} className="flex items-center justify-between p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 transition-colors hover:bg-black/10 dark:hover:bg-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center font-bold text-xs text-blue-500 uppercase">
                      {lead.nome.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{lead.nome}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5 tracking-wider uppercase font-bold">{lead.telefone}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`${LEAD_STATUS[lead.status].color} border-current border-opacity-20`}>
                    {LEAD_STATUS[lead.status].label}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Novas Informações (Mais Dados) */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Pipeline Value */}
        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Valor em Negociação
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Wallet className="h-4 w-4 text-emerald-500" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">R$ {(pipelineValue / 1000).toFixed(1)}k</div>
            <p className="text-xs text-muted-foreground mt-1">Estimativa de fechamento (Ticket R$ 1.800)</p>
          </CardContent>
        </Card>

        {/* AI Performance */}
        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Desempenho da IA
              <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Bot className="h-4 w-4 text-purple-500" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1.2s</div>
            <p className="text-xs text-muted-foreground mt-1">Tempo médio de resposta no WhatsApp</p>
          </CardContent>
        </Card>

        {/* WhatsApp Status */}
        <Card className="border-black/5 dark:border-white/10 bg-emerald-50 dark:bg-emerald-950/20 backdrop-blur-3xl shadow-lg rounded-3xl border-emerald-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between text-emerald-700 dark:text-emerald-400">
              Conexão WhatsApp
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div className="text-xl font-bold text-emerald-700 dark:text-emerald-400">Conectado</div>
            </div>
            <div className="mt-3">
              <Button variant="outline" size="sm" className="h-7 text-xs border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 w-full rounded-xl">Reconectar Aparelho</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
