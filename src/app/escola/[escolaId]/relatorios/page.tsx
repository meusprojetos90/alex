"use client";

import { use } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { DollarSign, TrendingUp, Users, Target, Calendar, Filter, Funnel, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const revenueData = [
  { month: 'Jan', revenue: 15000 },
  { month: 'Fev', revenue: 18500 },
  { month: 'Mar', revenue: 22000 },
  { month: 'Abr', revenue: 21000 },
  { month: 'Mai', revenue: 26000 },
  { month: 'Jun', revenue: 32000 },
];

const conversionData = [
  { category: 'Primeira Hab. B', leads: 120, sales: 45 },
  { category: 'Primeira Hab. A', leads: 80, sales: 25 },
  { category: 'Adição de Cat.', leads: 50, sales: 20 },
  { category: 'Reciclagem', leads: 30, sales: 15 },
];

const funnelData = [
  { stage: 'Leads Gerados', count: 450, percentage: 100, color: 'bg-indigo-500' },
  { stage: 'Em Atendimento (IA)', count: 380, percentage: 84, color: 'bg-blue-500' },
  { stage: 'Qualificados', count: 210, percentage: 46, color: 'bg-purple-500' },
  { stage: 'Proposta Enviada', count: 150, percentage: 33, color: 'bg-pink-500' },
  { stage: 'Matrículas Fechadas', count: 85, percentage: 18, color: 'bg-emerald-500' },
];

export default function RelatoriosPage({ params }: { params: Promise<{ escolaId: string }> }) {
  const { escolaId } = use(params);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Relatórios Financeiros</h2>
          <p className="text-muted-foreground mt-2">Acompanhe as métricas de conversão e faturamento da unidade.</p>
        </div>
        
        {/* Filtro de Data */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-md">
            <Calendar size={16} className="mr-2 text-muted-foreground" />
            <span>Últimos 30 dias</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-xl border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-md">
            <Filter size={16} className="text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Cards Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Mês</CardTitle>
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 32.000,00</div>
            <p className="text-xs text-emerald-500 flex items-center mt-1 font-medium">
              <TrendingUp className="h-3 w-3 mr-1" /> +23% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Target className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 1.850,00</div>
            <p className="text-xs text-muted-foreground mt-1">Por matrícula efetuada</p>
          </CardContent>
        </Card>

        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contratos (Mês/Semana)</CardTitle>
            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-baseline gap-2">
              85 <span className="text-sm font-medium text-muted-foreground">/ mês</span>
            </div>
            <p className="text-xs text-emerald-500 flex items-center mt-1 font-medium">
              <TrendingUp className="h-3 w-3 mr-1" /> 18 contratos fechados nesta semana
            </p>
          </CardContent>
        </Card>

        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversão Global (Funil)</CardTitle>
            <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.8%</div>
            <p className="text-xs text-muted-foreground mt-1">Visitantes vs Matrículas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        
        {/* Gráfico de Área (Crescimento) */}
        <Card className="md:col-span-4 border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl flex flex-col">
          <CardHeader>
            <CardTitle>Crescimento de Faturamento</CardTitle>
            <CardDescription>Evolução financeira nos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12}} className="text-muted-foreground" dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} className="text-muted-foreground" tickFormatter={(value) => `R$ ${value/1000}k`} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.8)', color: '#fff' }}
                  cursor={{stroke: 'currentColor', strokeWidth: 1, strokeDasharray: '3 3', opacity: 0.2}}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Funil de Vendas Customizado */}
        <Card className="md:col-span-3 border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ArrowRight className="text-indigo-500" size={18} /> Funil de Conversão do CRM</CardTitle>
            <CardDescription>Quantidade de leads em cada etapa (Últimos 30 dias)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {funnelData.map((item, index) => (
                <div key={item.stage} className="relative">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-sm font-medium">{item.stage}</span>
                    <div className="text-right">
                      <span className="font-bold text-sm">{item.count}</span>
                      <span className="text-xs text-muted-foreground ml-2">{item.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-black/5 dark:bg-white/5 h-6 rounded-full overflow-hidden flex">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out flex items-center justify-end px-2`} 
                      style={{ width: `${item.percentage}%` }}
                    >
                      {/* Opcional: Colocar o count dentro da barra se couber */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex gap-3 items-center">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center shrink-0">
                <Target size={20} className="text-indigo-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-indigo-500">Métrica de Ouro</p>
                <p className="text-sm text-foreground">Sua equipe está convertendo <strong>40%</strong> das propostas enviadas em matrículas reais.</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader>
            <CardTitle>Vendas por Categoria</CardTitle>
            <CardDescription>Desempenho de matrículas por tipo de pacote</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10" />
                <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{fontSize: 12}} className="text-muted-foreground" dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} className="text-muted-foreground" />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.8)', color: '#fff' }}
                  cursor={{fill: 'currentColor', opacity: 0.05}}
                />
                <Bar dataKey="leads" name="Total de Leads" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="sales" name="Vendas (Contratos)" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
