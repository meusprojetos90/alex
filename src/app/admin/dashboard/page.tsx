"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, CreditCard, MessageSquare, TrendingUp, Calendar, Filter, CheckCircle2, AlertCircle, Zap } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { month: 'Jan', comissoes: 12000, pendente: 2000 },
  { month: 'Fev', comissoes: 14500, pendente: 3500 },
  { month: 'Mar', comissoes: 18000, pendente: 4000 },
  { month: 'Abr', comissoes: 24000, pendente: 5500 },
  { month: 'Mai', comissoes: 29000, pendente: 6000 },
  { month: 'Jun', comissoes: 38500, pendente: 8500 },
];

const topEscolas = [
  { id: 1, nome: "Autoescola Modelo", contratos: 142, repasse: 21300, status: "ativo" },
  { id: 2, nome: "CFC Liderança", contratos: 98, repasse: 14700, status: "ativo" },
  { id: 3, nome: "Autoescola Rápida", contratos: 85, repasse: 12750, status: "ativo" },
  { id: 4, nome: "Centro de Trânsito SP", contratos: 72, repasse: 10800, status: "ativo" },
];

const recentSignups = [
  { id: 1, nome: "CFC Direção Certa", plano: "Comissão 15%", date: "Hoje, 14:30" },
  { id: 2, nome: "Autoescola Volante", plano: "Comissão 15%", date: "Ontem, 09:15" },
  { id: 3, nome: "CFC Acelera", plano: "Comissão 10%", date: "01 Jun, 16:45" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Dashboard da Agência</h2>
          <p className="text-muted-foreground mt-2">Acompanhe as comissões geradas pelos contratos fechados na rede.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-md">
            <Calendar size={16} className="mr-2 text-muted-foreground" />
            <span>Últimos 6 meses</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-xl border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-md">
            <Filter size={16} className="text-muted-foreground" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comissões Recebidas (Mês)</CardTitle>
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 38.500</div>
            <p className="text-xs text-emerald-500 flex items-center mt-1 font-medium">
              <TrendingUp className="h-3 w-3 mr-1" /> +32% em relação a Mai
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comissões Pendentes</CardTitle>
            <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
              <AlertCircle className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 8.500</div>
            <p className="text-xs text-orange-500 mt-1">Aguardando repasse de 3 clientes</p>
          </CardContent>
        </Card>

        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contratos Fechados (Rede)</CardTitle>
            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">428</div>
            <p className="text-xs text-muted-foreground mt-1">Total de matrículas via IA no mês</p>
          </CardContent>
        </Card>

        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Autoescolas Ativas</CardTitle>
            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Building2 className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground mt-1">Gerando contratos diários</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        
        <Card className="col-span-1 lg:col-span-4 border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl flex flex-col">
          <CardHeader>
            <CardTitle>Crescimento de Comissões</CardTitle>
            <CardDescription>Receita gerada por contratos fechados vs repasses pendentes</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorComissoes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPendentes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12}} className="text-muted-foreground" dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} className="text-muted-foreground" tickFormatter={(value) => `R$ ${value/1000}k`} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.8)', color: '#fff' }}
                  cursor={{stroke: 'currentColor', strokeWidth: 1, strokeDasharray: '3 3', opacity: 0.2}}
                />
                <Area type="monotone" name="Comissões Pagas" dataKey="comissoes" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorComissoes)" />
                <Area type="monotone" name="Aguardando Repasse" dataKey="pendente" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorPendentes)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3 border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader>
            <CardTitle>Top Parceiros (Performance)</CardTitle>
            <CardDescription>Autoescolas com mais contratos fechados pela IA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topEscolas.map((escola, i) => (
                <div key={escola.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center font-bold text-xs text-purple-500">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-foreground">{escola.nome}</h4>
                      <p className="text-xs text-muted-foreground">{escola.contratos} contratos fechados</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm text-emerald-500">R$ {(escola.repasse / 1000).toFixed(1)}k</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">Nossa Parte</div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6 rounded-xl border-black/5 dark:border-white/10">Ver relatório de comissões</Button>
          </CardContent>
        </Card>

      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        
        {/* Novas Assinaturas */}
        <Card className="col-span-1 lg:col-span-3 border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader>
            <CardTitle>Últimas Adesões</CardTitle>
            <CardDescription>Autoescolas que assinaram recentemente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentSignups.map((signup) => (
                <div key={signup.id} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Zap className="text-emerald-500" size={16} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{signup.nome}</h4>
                    <p className="text-xs text-emerald-500">Novo Assinante - {signup.plano}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{signup.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status dos Serviços (SaaS Monitor) */}
        <Card className="col-span-1 lg:col-span-4 border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader>
            <CardTitle>Status da Infraestrutura</CardTitle>
            <CardDescription>Monitoramento das APIs e instâncias do WhatsApp</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500" size={20} />
                <div>
                  <h4 className="font-medium text-sm">Cluster WhatsApp Baileys</h4>
                  <p className="text-xs text-muted-foreground">42/42 instâncias conectadas e operantes</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">100% Uptime</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500" size={20} />
                <div>
                  <h4 className="font-medium text-sm">OpenAI API (GPT-4o-mini)</h4>
                  <p className="text-xs text-muted-foreground">Latência média: 850ms</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">Operacional</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20">
              <div className="flex items-center gap-3">
                <AlertCircle className="text-orange-500" size={20} />
                <div>
                  <h4 className="font-medium text-sm text-orange-600 dark:text-orange-400">Webhook de Pagamentos (Kiwify)</h4>
                  <p className="text-xs text-orange-600/70 dark:text-orange-400/70">2 falhas detectadas na última hora</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="h-7 text-xs border-orange-500/50 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg">Verificar</Button>
            </div>
          </CardContent>
        </Card>

      </div>

    </div>
  );
}
