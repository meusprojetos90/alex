"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DollarSign, Search, CheckCircle2, AlertCircle, Calendar, ArrowRightLeft, ArrowLeft, Building2, User } from "lucide-react";

const initialFaturas = [
  { id: '101', lead: 'Maria Silva', autoescola: 'Autoescola Modelo', valor: 150.00, data: '03/06/2026', status: 'pendente' },
  { id: '105', lead: 'Marcos Paulo', autoescola: 'Autoescola Modelo', valor: 150.00, data: '28/05/2026', status: 'pendente' },
  { id: '106', lead: 'Fernanda Lima', autoescola: 'Autoescola Modelo', valor: 150.00, data: '25/05/2026', status: 'pago' },
  
  { id: '102', lead: 'João Pedro', autoescola: 'CFC Liderança', valor: 150.00, data: '02/06/2026', status: 'pendente' },
  { id: '107', lead: 'Roberto Alves', autoescola: 'CFC Liderança', valor: 150.00, data: '01/06/2026', status: 'atrasado' },
  
  { id: '103', lead: 'Ana Costa', autoescola: 'Autoescola Rápida', valor: 100.00, data: '02/06/2026', status: 'pago' },
  
  { id: '104', lead: 'Lucas Fernandes', autoescola: 'Centro de Trânsito SP', valor: 200.00, data: '01/06/2026', status: 'pendente' },
];

export default function AdminFinanceiroPage() {
  const [faturas, setFaturas] = useState(initialFaturas);
  const [search, setSearch] = useState("");
  const [selectedAutoescola, setSelectedAutoescola] = useState<string | null>(null);

  const marcarComoPago = (id: string) => {
    setFaturas(prev => prev.map(f => f.id === id ? { ...f, status: 'pago' } : f));
  };

  const totais = {
    receber: faturas.filter(f => f.status === 'pendente').reduce((acc, curr) => acc + curr.valor, 0),
    atrasado: faturas.filter(f => f.status === 'atrasado').reduce((acc, curr) => acc + curr.valor, 0),
    pago: faturas.filter(f => f.status === 'pago').reduce((acc, curr) => acc + curr.valor, 0),
  };

  // Agrupar por Autoescola (Fechamento Mensal)
  const faturasAgrupadas = useMemo(() => {
    const agrupado: Record<string, { autoescola: string, leadsPendentes: number, valorPendente: number, totalLeads: number }> = {};
    
    faturas.forEach(f => {
      if (!agrupado[f.autoescola]) {
        agrupado[f.autoescola] = { autoescola: f.autoescola, leadsPendentes: 0, valorPendente: 0, totalLeads: 0 };
      }
      agrupado[f.autoescola].totalLeads += 1;
      if (f.status !== 'pago') {
        agrupado[f.autoescola].leadsPendentes += 1;
        agrupado[f.autoescola].valorPendente += f.valor;
      }
    });

    return Object.values(agrupado).filter(a => a.autoescola.toLowerCase().includes(search.toLowerCase()));
  }, [faturas, search]);

  const faturasDaAutoescola = selectedAutoescola 
    ? faturas.filter(f => f.autoescola === selectedAutoescola) 
    : [];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Fechamento Mensal</h2>
          <p className="text-muted-foreground mt-2">Gerencie as comissões a receber de cada autoescola parceira.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-md">
            <Calendar size={16} className="mr-2 text-muted-foreground" />
            <span>Mês Atual</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">A Receber</CardTitle>
            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">R$ {totais.receber.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Comissões pendentes</p>
          </CardContent>
        </Card>

        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inadimplência (Atrasado)</CardTitle>
            <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center">
              <AlertCircle className="h-4 w-4 text-rose-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-500">R$ {totais.atrasado.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Passou do prazo</p>
          </CardContent>
        </Card>

        <Card className="border-black/5 dark:border-white/10 bg-emerald-500 dark:bg-emerald-600 backdrop-blur-3xl shadow-lg rounded-3xl text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recebido (Caixa)</CardTitle>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totais.pago.toFixed(2)}</div>
            <p className="text-xs text-emerald-100 mt-1">Já debitado este mês</p>
          </CardContent>
        </Card>
      </div>

      {!selectedAutoescola ? (
        // MESTRE: LISTA DE AUTOESCOLAS
        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/[0.02] flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                <Building2 size={20} className="text-indigo-500" />
              </div>
              <div>
                <CardTitle>Autoescolas com Saldo</CardTitle>
                <CardDescription>Clique em um cliente para ver os leads fechados e fazer a cobrança.</CardDescription>
              </div>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input 
                placeholder="Buscar parceiro..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-background border-black/5 dark:border-white/10 rounded-xl" 
              />
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-muted-foreground bg-black/5 dark:bg-white/5 uppercase">
                <tr>
                  <th className="px-6 py-4 font-semibold">Parceiro (Autoescola)</th>
                  <th className="px-6 py-4 font-semibold text-center">Leads Convertidos (Mês)</th>
                  <th className="px-6 py-4 font-semibold text-center">Leads Pendentes Pgt</th>
                  <th className="px-6 py-4 font-semibold text-right">Valor a Receber</th>
                  <th className="px-6 py-4 font-semibold text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {faturasAgrupadas.map((agrupamento) => (
                  <tr key={agrupamento.autoescola} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-bold text-foreground">{agrupamento.autoescola}</td>
                    <td className="px-6 py-4 text-center">{agrupamento.totalLeads}</td>
                    <td className="px-6 py-4 text-center">
                      {agrupamento.leadsPendentes > 0 ? (
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">{agrupamento.leadsPendentes} aguardando</Badge>
                      ) : (
                        <span className="text-emerald-500 text-xs font-medium"><CheckCircle2 size={14} className="inline mr-1"/> Tudo pago</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-blue-500">R$ {agrupamento.valorPendente.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">
                      <Button 
                        size="sm" 
                        onClick={() => setSelectedAutoescola(agrupamento.autoescola)}
                        className="bg-black dark:bg-white text-white dark:text-black rounded-lg h-8 px-4 hover:opacity-80"
                      >
                        Fazer Fechamento <ArrowRightLeft size={14} className="ml-2" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {faturasAgrupadas.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">Nenhum parceiro encontrado com faturamento este mês.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      ) : (
        // DETALHE: LISTA DE LEADS DA AUTOESCOLA SELECIONADA
        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl overflow-hidden border-2 border-indigo-500/20">
          <CardHeader className="border-b border-black/5 dark:border-white/5 bg-indigo-500/5 flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setSelectedAutoescola(null)} className="rounded-full hover:bg-black/5 dark:hover:bg-white/5">
                <ArrowLeft size={20} />
              </Button>
              <div>
                <CardTitle className="text-xl">Cobrança: {selectedAutoescola}</CardTitle>
                <CardDescription>Marque individualmente os leads repassados por este cliente.</CardDescription>
              </div>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-600/20">
              <CheckCircle2 size={16} className="mr-2" /> Marcar Tudo como Pago
            </Button>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-muted-foreground bg-black/5 dark:bg-white/5 uppercase">
                <tr>
                  <th className="px-6 py-4 font-semibold">Ref. ID</th>
                  <th className="px-6 py-4 font-semibold">Lead Convertido</th>
                  <th className="px-6 py-4 font-semibold">Data do Fechamento</th>
                  <th className="px-6 py-4 font-semibold">Sua Comissão</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Dar Baixa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {faturasDaAutoescola.map((fatura) => (
                  <tr key={fatura.id} className={`transition-colors ${fatura.status === 'pago' ? 'bg-emerald-500/5' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}>
                    <td className="px-6 py-4 text-muted-foreground text-xs">#{fatura.id}</td>
                    <td className="px-6 py-4 font-medium flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-[10px] font-bold text-blue-500">
                        {fatura.lead.charAt(0)}
                      </div>
                      <span className={fatura.status === 'pago' ? 'line-through opacity-70' : 'text-foreground'}>{fatura.lead}</span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{fatura.data}</td>
                    <td className="px-6 py-4 font-bold">R$ {fatura.valor.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      {fatura.status === 'pendente' && <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Pendente</Badge>}
                      {fatura.status === 'atrasado' && <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/20">Atrasado</Badge>}
                      {fatura.status === 'pago' && <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20"><CheckCircle2 size={12} className="mr-1"/> Recebido</Badge>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {fatura.status !== 'pago' ? (
                        <Button 
                          size="sm" 
                          onClick={() => marcarComoPago(fatura.id)}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg h-8 px-3 transition-transform active:scale-95"
                        >
                          <CheckCircle2 size={14} className="mr-1.5" /> Recebi
                        </Button>
                      ) : (
                        <span className="text-xs text-emerald-500 font-bold pr-3">PAGO ✅</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
