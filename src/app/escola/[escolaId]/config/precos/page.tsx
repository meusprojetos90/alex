"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DollarSign, Plus, Trash2, Tag } from "lucide-react";

interface Pacote {
  id: string;
  nome: string;
  valor: string;
  valorPromocional?: string;
  emPromocao?: boolean;
}

export default function ConfigPrecosPage() {
  const [pacotes, setPacotes] = useState<Pacote[]>([
    { id: "1", nome: "Primeira Habilitação (A)", valor: "1500,00", valorPromocional: "", emPromocao: false },
    { id: "2", nome: "Primeira Habilitação (B)", valor: "1800,00", valorPromocional: "1200,00", emPromocao: true },
    { id: "3", nome: "Primeira Habilitação (AB)", valor: "2400,00", valorPromocional: "", emPromocao: false },
    { id: "4", nome: "Adição de Categoria (A)", valor: "900,00", valorPromocional: "", emPromocao: false },
  ]);

  const removerPacote = (id: string) => {
    setPacotes(pacotes.filter(p => p.id !== id));
  };

  const adicionarPacote = () => {
    setPacotes([...pacotes, { id: Math.random().toString(), nome: "Novo Pacote", valor: "0,00", valorPromocional: "", emPromocao: false }]);
  };

  const togglePromocao = (id: string) => {
    setPacotes(pacotes.map(p => p.id === id ? { ...p, emPromocao: !p.emPromocao } : p));
  };

  const handleSave = () => {
    toast.success("Tabela de preços salva com sucesso!");
  };

  return (
    <div className="max-w-4xl space-y-6">
      <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-xl rounded-3xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <DollarSign size={20} className="text-emerald-500" />
            </div>
            <div>
              <CardTitle>Pacotes e Valores</CardTitle>
              <CardDescription>Liste todos os pacotes oferecidos.</CardDescription>
            </div>
          </div>
          <Button onClick={adicionarPacote} variant="outline" size="sm" className="rounded-xl border-black/5 dark:border-white/10">
            <Plus size={16} className="mr-2" /> Adicionar
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {pacotes.map((pacote) => (
              <div key={pacote.id} className="flex items-center gap-4 bg-background/50 p-3 rounded-2xl border border-black/5 dark:border-white/5 transition-all">
                <div className="flex-1 space-y-1">
                  <Label className="text-xs text-muted-foreground ml-1">Nome do Pacote</Label>
                  <Input defaultValue={pacote.nome} className="bg-background border-none shadow-none text-sm font-medium focus-visible:ring-1 rounded-xl" />
                </div>
                <div className="w-32 space-y-1 relative">
                  <Label className="text-xs text-muted-foreground ml-1">Valor (R$)</Label>
                  <Input defaultValue={pacote.valor} className={`bg-background border-none shadow-none text-sm font-medium focus-visible:ring-1 rounded-xl ${pacote.emPromocao ? 'line-through opacity-50' : ''}`} />
                </div>
                {pacote.emPromocao && (
                  <div className="w-32 space-y-1 relative animate-in fade-in zoom-in-95 duration-200">
                    <Label className="text-xs text-orange-500 ml-1 font-bold">Valor Promo (R$)</Label>
                    <Input defaultValue={pacote.valorPromocional} className="bg-orange-500/10 border-none shadow-none text-sm font-bold text-orange-600 dark:text-orange-400 focus-visible:ring-1 rounded-xl" />
                  </div>
                )}
                <div className="pt-5 flex items-center gap-2">
                  <Button type="button" variant="ghost" size="sm" onClick={() => togglePromocao(pacote.id)} className={`text-[10px] uppercase font-bold tracking-wider rounded-xl ${pacote.emPromocao ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'}`}>
                    <Tag size={12} className="mr-1.5" /> Promo
                  </Button>
                  <Button type="button" variant="ghost" size="icon" onClick={() => removerPacote(pacote.id)} className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 rounded-xl">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-4 border-t border-black/5 dark:border-white/10 mt-6 pt-6">
            <Button onClick={handleSave} className="rounded-xl px-6 bg-emerald-600 hover:bg-emerald-700 text-white">
              Salvar Tabela
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
