"use client";

import { use, useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Building2, Save, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { mockTenants } from "@/lib/mock-data";

export default function AutoescolaFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const isEditing = id !== "nova";
  const tenant = isEditing ? mockTenants.find(t => t.id === id) : null;
  const router = useRouter();
  const [produtos, setProdutos] = useState([{ id: 1, nome: "", valor: "" }]);

  const handleAddProduto = () => {
    setProdutos([...produtos, { id: Date.now(), nome: "", valor: "" }]);
  };

  const handleRemoveProduto = (id: number) => {
    setProdutos(produtos.filter(p => p.id !== id));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isEditing ? "Autoescola atualizada com sucesso!" : "Autoescola cadastrada com sucesso!");
    router.push("/admin/autoescolas");
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/admin/autoescolas">
          <Button variant="ghost" size="icon" className="rounded-xl border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5">
            <ArrowLeft size={18} />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">{isEditing ? "Editar Autoescola" : "Nova Autoescola"}</h2>
          <p className="text-muted-foreground mt-1">{isEditing ? "Altere as configurações do cliente." : "Preencha os dados completos para cadastrar um novo cliente."}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid gap-6">
        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/[0.02]">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="text-indigo-500" size={20} />
              Dados da Empresa
            </CardTitle>
            <CardDescription>Informações básicas e legais do cliente.</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
            <div className="space-y-2">
              <Label>Razão Social</Label>
              <Input required defaultValue={tenant?.nome || ""} placeholder="Ex: CFC Direção Certa LTDA" className="bg-black/5 dark:bg-white/5 rounded-xl border-none" />
            </div>
            <div className="space-y-2">
              <Label>Nome Fantasia</Label>
              <Input required defaultValue={tenant?.nomeFantasia || ""} placeholder="Ex: Autoescola Direção Certa" className="bg-black/5 dark:bg-white/5 rounded-xl border-none" />
            </div>
            <div className="space-y-2">
              <Label>CNPJ</Label>
              <Input required defaultValue={tenant?.cnpj || ""} placeholder="00.000.000/0001-00" className="bg-black/5 dark:bg-white/5 rounded-xl border-none" />
            </div>
            <div className="space-y-2">
              <Label>Endereço Completo</Label>
              <Input defaultValue={tenant?.endereco || ""} placeholder="Rua, Número, Bairro, Cidade - UF" className="bg-black/5 dark:bg-white/5 rounded-xl border-none" />
            </div>
            <div className="space-y-2">
              <Label>Nome do Responsável</Label>
              <Input required defaultValue={tenant ? "Administrador" : ""} placeholder="Nome do proprietário ou gerente" className="bg-black/5 dark:bg-white/5 rounded-xl border-none" />
            </div>
            <div className="space-y-2">
              <Label>E-mail de Acesso (Login)</Label>
              <Input required type="email" defaultValue={tenant?.email || ""} placeholder="admin@cfcdirecaocerta.com.br" className="bg-black/5 dark:bg-white/5 rounded-xl border-none" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/[0.02]">
            <CardTitle>Configurações Financeiras e Tráfego</CardTitle>
            <CardDescription>Definições de pagamento, meta ads e taxas.</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
            <div className="space-y-2">
              <Label>Valor Tráfego Pago Mensal (R$)</Label>
              <Input type="number" placeholder="Ex: 1000" className="bg-black/5 dark:bg-white/5 rounded-xl border-none" />
            </div>
            <div className="space-y-2">
              <Label>Dia de Pagamento (Empresa)</Label>
              <Select>
                <SelectTrigger className="bg-black/5 dark:bg-white/5 rounded-xl border-none">
                  <SelectValue placeholder="Selecione o dia" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 5, 10, 15, 20, 25].map(dia => (
                    <SelectItem key={dia} value={dia.toString()}>Dia {dia}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Responsável Pagamento Meta Ads</Label>
              <Select defaultValue="autoescola">
                <SelectTrigger className="bg-black/5 dark:bg-white/5 rounded-xl border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="autoescola">Autoescola (Cliente)</SelectItem>
                  <SelectItem value="agencia">Agência</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Taxa por Contrato / Comissão (R$)</Label>
              <Input type="number" defaultValue={tenant ? "150" : ""} placeholder="150" className="bg-black/5 dark:bg-white/5 rounded-xl border-none" />
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="investimos_nos" className="rounded-sm" />
                <label htmlFor="investimos_nos" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Nós investimos nesse valor (Tráfego)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="valor_fixo" className="rounded-sm" />
                <label htmlFor="valor_fixo" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Tem valor pago fixo mensal (+ comissão)
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/[0.02] flex flex-row items-center justify-between">
            <div>
              <CardTitle>Produtos da Autoescola</CardTitle>
              <CardDescription>Cadastre as categorias e pacotes que a autoescola vende.</CardDescription>
            </div>
            <Button type="button" onClick={handleAddProduto} variant="outline" size="sm" className="rounded-xl border-black/5 dark:border-white/10">
              <Plus size={16} className="mr-2" /> Adicionar Produto
            </Button>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {produtos.map((produto, index) => (
              <div key={produto.id} className="flex items-end gap-4 p-3 bg-black/5 dark:bg-white/5 rounded-2xl">
                <div className="flex-1 space-y-2">
                  <Label className="text-xs">Nome do Produto/Pacote</Label>
                  <Input placeholder="Ex: Primeira Habilitação (AB)" className="bg-background rounded-xl border-none" />
                </div>
                <div className="w-48 space-y-2">
                  <Label className="text-xs">Valor Padrão (R$)</Label>
                  <Input type="number" placeholder="2400" className="bg-background rounded-xl border-none" />
                </div>
                {produtos.length > 1 && (
                  <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveProduto(produto.id)} className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 rounded-xl mb-0.5">
                    <Trash2 size={18} />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 mt-4">
          <Link href="/admin/autoescolas">
            <Button type="button" variant="ghost" className="rounded-xl px-6">Cancelar</Button>
          </Link>
          <Button type="submit" className="rounded-xl px-8 bg-indigo-600 hover:bg-indigo-700 text-white">
            <Save size={18} className="mr-2" /> Salvar Cadastro
          </Button>
        </div>
      </form>
    </div>
  );
}
