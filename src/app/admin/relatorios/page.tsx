"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Filter, BarChart3, TrendingUp, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";

const performanceData = [
  { nome: 'Autoescola Modelo', leads: 1240, convertidos: 142, faturamentoCliente: 262700, repasse: 21300 },
  { nome: 'CFC Liderança', leads: 980, convertidos: 98, faturamentoCliente: 181300, repasse: 14700 },
  { nome: 'Autoescola Rápida', leads: 850, convertidos: 85, faturamentoCliente: 157250, repasse: 12750 },
  { nome: 'Centro de Trânsito SP', leads: 720, convertidos: 72, faturamentoCliente: 133200, repasse: 10800 },
  { nome: 'CFC Direção Certa', leads: 400, convertidos: 31, faturamentoCliente: 57350, repasse: 4650 },
];

export default function AdminRelatoriosPage() {
  const totalLeads = performanceData.reduce((acc, curr) => acc + curr.leads, 0);
  const totalConvertidos = performanceData.reduce((acc, curr) => acc + curr.convertidos, 0);
  const totalFaturamentoClientes = performanceData.reduce((acc, curr) => acc + curr.faturamentoCliente, 0);
  const totalRepasse = performanceData.reduce((acc, curr) => acc + curr.repasse, 0);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Relatório de Vendas (CPA)</h2>
          <p className="text-muted-foreground mt-2">Acompanhe o funil de conversão e faturamento detalhado da sua rede de parceiros.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-md">
            <Filter size={16} className="mr-2 text-muted-foreground" />
            <span>Mês Atual</span>
          </Button>
          <Button variant="outline" className="rounded-xl border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-md">
            <Download size={16} className="mr-2 text-muted-foreground" />
            <span>Exportar CSV</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Leads Gerados</CardTitle>
            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Soma de todos os funis</p>
          </CardContent>
        </Card>
        
        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contratos Fechados</CardTitle>
            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConvertidos.toLocaleString()}</div>
            <p className="text-xs text-purple-500 mt-1">Taxa média de conversão: {((totalConvertidos / totalLeads) * 100).toFixed(1)}%</p>
          </CardContent>
        </Card>

        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturado pelas Autoescolas</CardTitle>
            <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">R$ {(totalFaturamentoClientes / 1000).toFixed(1)}k</div>
            <p className="text-xs text-muted-foreground mt-1">Valor retido pelos clientes</p>
          </CardContent>
        </Card>

        <Card className="border-black/5 dark:border-white/10 bg-emerald-500 dark:bg-emerald-600 backdrop-blur-3xl shadow-lg rounded-3xl text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sua Comissão (Receita)</CardTitle>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalRepasse.toLocaleString()}</div>
            <p className="text-xs text-emerald-100 mt-1">Garantido por contratos fechados</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        
        <Card className="col-span-7 border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/[0.02]">
            <CardTitle>Detalhamento por Autoescola</CardTitle>
            <CardDescription>Visualize o funil exato e o faturamento de cada parceiro.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-muted-foreground bg-black/5 dark:bg-white/5 uppercase">
                <tr>
                  <th className="px-6 py-4 font-semibold">Parceiro</th>
                  <th className="px-6 py-4 font-semibold text-center">Leads Totais</th>
                  <th className="px-6 py-4 font-semibold text-center">Contratos Fechados</th>
                  <th className="px-6 py-4 font-semibold text-center">Taxa de Conversão</th>
                  <th className="px-6 py-4 font-semibold text-right">Faturou (Cliente)</th>
                  <th className="px-6 py-4 font-semibold text-right">Você Faturou (Agência)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {performanceData.map((d, i) => {
                  const conversao = ((d.convertidos / d.leads) * 100).toFixed(1);
                  return (
                    <tr key={i} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium">{d.nome}</td>
                      <td className="px-6 py-4 text-center">{d.leads}</td>
                      <td className="px-6 py-4 text-center text-purple-500 font-semibold">{d.convertidos}</td>
                      <td className="px-6 py-4 text-center">
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">{conversao}%</Badge>
                      </td>
                      <td className="px-6 py-4 text-right text-muted-foreground">R$ {d.faturamentoCliente.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right font-bold text-emerald-500">R$ {d.repasse.toLocaleString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
