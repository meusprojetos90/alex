"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Building2, ArrowRight, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const autoescolas = [
  { id: 'tenant_1', nome: 'Autoescola Modelo', cnpj: '12.345.678/0001-99', plano: 'Pro', taxa: 150.00, status: 'ativo', criacao: '12/01/2026' },
  { id: 'tenant_2', nome: 'CFC Liderança', cnpj: '98.765.432/0001-10', plano: 'Pro', taxa: 150.00, status: 'ativo', criacao: '05/02/2026' },
  { id: 'tenant_3', nome: 'Autoescola Rápida', cnpj: '11.222.333/0001-44', plano: 'Starter', taxa: 100.00, status: 'inadimplente', criacao: '20/03/2026' },
  { id: 'tenant_4', nome: 'Centro de Trânsito SP', cnpj: '55.666.777/0001-88', plano: 'Enterprise', taxa: 200.00, status: 'ativo', criacao: '01/04/2026' },
];

export default function AdminAutoescolasPage() {
  const [selectedEscola, setSelectedEscola] = useState(autoescolas[0]);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Gestão de Autoescolas</h2>
          <p className="text-muted-foreground mt-2">Configure o acesso e a comissão por contrato de cada cliente.</p>
        </div>
        
        <Dialog>
          <DialogTrigger render={<Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl" />}>
            <Plus size={16} className="mr-2" /> Nova Autoescola
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-background border-black/10 dark:border-white/10 rounded-3xl">
            <DialogHeader>
              <DialogTitle>Nova Autoescola</DialogTitle>
              <DialogDescription>
                Cadastre um novo cliente e defina a taxa de comissionamento.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Nome da Autoescola</Label>
                <Input placeholder="Ex: CFC Direção Certa" className="bg-black/5 dark:bg-white/5 rounded-xl border-none" />
              </div>
              <div className="space-y-2">
                <Label>CNPJ</Label>
                <Input placeholder="00.000.000/0001-00" className="bg-black/5 dark:bg-white/5 rounded-xl border-none" />
              </div>
              <div className="space-y-2">
                <Label>E-mail de Acesso (Login)</Label>
                <Input type="email" placeholder="admin@cfcdirecaocerta.com.br" className="bg-black/5 dark:bg-white/5 rounded-xl border-none" />
                <p className="text-[10px] text-muted-foreground mt-1">Uma senha provisória será enviada para este e-mail.</p>
              </div>
              <div className="space-y-2">
                <Label>Taxa por Contrato (R$)</Label>
                <Input type="number" placeholder="150" className="bg-black/5 dark:bg-white/5 rounded-xl border-none" />
                <p className="text-[10px] text-muted-foreground mt-1">Sua agência receberá este valor por cada contrato fechado pela IA.</p>
              </div>
              <div className="space-y-2">
                <Label>Token OpenAI (API Key)</Label>
                <Input type="password" placeholder="sk-proj-..." className="bg-black/5 dark:bg-white/5 rounded-xl border-none font-mono text-xs" />
                <p className="text-[10px] text-muted-foreground mt-1">Chave da OpenAI que será usada para processar as mensagens desta Autoescola.</p>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white">Cadastrar Cliente</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>

      <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl overflow-hidden">
        <CardHeader className="border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/[0.02] flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <Building2 size={20} className="text-blue-500" />
            </div>
            <div>
              <CardTitle>Clientes</CardTitle>
              <CardDescription>42 clientes ativos no momento</CardDescription>
            </div>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input placeholder="Buscar por nome ou CNPJ..." className="pl-9 bg-background border-black/5 dark:border-white/10 rounded-xl" />
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground bg-black/5 dark:bg-white/5 uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold">Razão Social</th>
                <th className="px-6 py-4 font-semibold">Taxa / Contrato</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Data Adesão</th>
                <th className="px-6 py-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {autoescolas.map((escola) => (
                <tr key={escola.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">{escola.nome}</div>
                    <div className="text-xs text-muted-foreground">{escola.cnpj}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-emerald-500">R$ {escola.taxa.toFixed(2)}</span>
                    <span className="text-xs text-muted-foreground ml-1">por venda</span>
                  </td>
                  <td className="px-6 py-4">
                    {escola.status === 'ativo' ? (
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Ativo</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/20">Inadimplente</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {escola.criacao}
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger render={<Button variant="ghost" size="sm" onClick={() => setSelectedEscola(escola)} className="h-8 rounded-lg text-zinc-500 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5" />}>
                        <Settings size={14} className="mr-1.5" /> Editar
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] bg-background border-black/10 dark:border-white/10 rounded-3xl text-left">
                        <DialogHeader>
                          <DialogTitle>Editar {selectedEscola.nome}</DialogTitle>
                          <DialogDescription>
                            Ajuste os dados e a taxa de comissionamento deste cliente.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label>Taxa por Contrato (R$)</Label>
                            <Input type="number" defaultValue={selectedEscola.taxa} className="bg-black/5 dark:bg-white/5 rounded-xl border-none font-bold text-emerald-500" />
                            <p className="text-[10px] text-muted-foreground mt-1">Este valor será multiplicado pelas matrículas geradas.</p>
                          </div>
                          <div className="space-y-2">
                            <Label>E-mail de Acesso</Label>
                            <Input type="email" defaultValue={`contato@${selectedEscola.id.replace('_', '')}.com.br`} className="bg-black/5 dark:bg-white/5 rounded-xl border-none" />
                          </div>
                          <div className="space-y-2">
                            <Label>Token OpenAI (API Key)</Label>
                            <Input type="password" defaultValue={`sk-proj-...${selectedEscola.id.slice(-4)}`} className="bg-black/5 dark:bg-white/5 rounded-xl border-none text-muted-foreground font-mono text-xs" />
                            <p className="text-[10px] text-muted-foreground mt-1">Chave exclusiva para separar os custos de IA deste cliente.</p>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white">Salvar Alterações</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Link href={`/escola/${escola.id}`}>
                      <Button variant="ghost" size="sm" className="h-8 rounded-lg text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10">
                        Acessar CRM <ArrowRight size={14} className="ml-1.5" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
