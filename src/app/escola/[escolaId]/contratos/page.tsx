"use client";

import { use } from "react";
import { mockContracts, mockLeads } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, CheckCircle2, Clock, XCircle } from "lucide-react";

export default function ContratosPage({ params }: { params: Promise<{ escolaId: string }> }) {
  const { escolaId } = use(params);
  
  // No modo de demonstração, ignora o tenantId se estiver undefined
  const contratos = escolaId === "undefined" ? mockContracts : mockContracts.filter(c => c.tenantId === escolaId);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ativo': return <CheckCircle2 size={14} className="text-emerald-500 mr-1.5" />;
      case 'pendente_assinatura': return <Clock size={14} className="text-orange-500 mr-1.5" />;
      case 'cancelado': return <XCircle size={14} className="text-rose-500 mr-1.5" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'pendente_assinatura': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'cancelado': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      default: return 'bg-zinc-500/10 text-zinc-500';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Gestão de Contratos</h2>
        <p className="text-muted-foreground mt-2">Acompanhe todos os contratos gerados e suas respectivas assinaturas.</p>
      </div>

      <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <FileText size={20} className="text-blue-500" />
            </div>
            <div>
              <CardTitle>Histórico de Contratos</CardTitle>
              <CardDescription>Lista completa de todos os alunos matriculados.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground bg-black/5 dark:bg-white/5 uppercase">
                <tr>
                  <th className="px-6 py-4 font-semibold">Aluno (Lead)</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Valor</th>
                  <th className="px-6 py-4 font-semibold">Data Criação</th>
                  <th className="px-6 py-4 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {contratos.map((contrato) => {
                  const lead = mockLeads.find(l => l.id === contrato.leadId);
                  return (
                    <tr key={contrato.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-foreground">{lead?.nome || 'Desconhecido'}</div>
                        <div className="text-xs text-muted-foreground">{lead?.telefone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(contrato.status)}`}>
                          {getStatusIcon(contrato.status)}
                          {contrato.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium">
                        {formatCurrency(contrato.valor)}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(contrato.criadoEm).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 rounded-lg text-blue-500 hover:text-blue-600 hover:bg-blue-500/10">
                          <Eye size={16} className="mr-1.5" /> Visualizar
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 rounded-lg text-zinc-500 hover:text-foreground">
                          <Download size={16} />
                        </Button>
                      </td>
                    </tr>
                  )
                })}
                {contratos.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">Nenhum contrato gerado ainda.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
