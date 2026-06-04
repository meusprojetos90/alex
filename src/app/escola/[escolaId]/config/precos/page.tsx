"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DollarSign, Plus, Trash2 } from "lucide-react";

interface Pacote {
  id: string;
  nome: string;
  valor: string;
}

export default function ConfigPrecosPage() {
  const [pacotes, setPacotes] = useState<Pacote[]>([
    { id: "1", nome: "Primeira Habilitação (A)", valor: "R$ 1.500,00" },
    { id: "2", nome: "Primeira Habilitação (B)", valor: "R$ 1.800,00" },
    { id: "3", nome: "Primeira Habilitação (AB)", valor: "R$ 2.400,00" },
    { id: "4", nome: "Adição de Categoria (A)", valor: "R$ 900,00" },
  ]);

  const removerPacote = (id: string) => {
    setPacotes(pacotes.filter(p => p.id !== id));
  };

  const adicionarPacote = () => {
    setPacotes([...pacotes, { id: Math.random().toString(), nome: "Novo Pacote", valor: "R$ 0,00" }]);
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
              <div key={pacote.id} className="flex items-center gap-4 bg-background/50 p-3 rounded-2xl border border-black/5 dark:border-white/5">
                <div className="flex-1 space-y-1">
                  <Label className="text-xs text-muted-foreground ml-1">Nome do Pacote</Label>
                  <Input defaultValue={pacote.nome} className="bg-background border-none shadow-none text-sm font-medium focus-visible:ring-1 rounded-xl" />
                </div>
                <div className="w-32 space-y-1">
                  <Label className="text-xs text-muted-foreground ml-1">Valor</Label>
                  <Input defaultValue={pacote.valor} className="bg-background border-none shadow-none text-sm font-medium focus-visible:ring-1 rounded-xl" />
                </div>
                <div className="pt-5">
                  <Button variant="ghost" size="icon" onClick={() => removerPacote(pacote.id)} className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 rounded-xl">
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
