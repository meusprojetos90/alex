"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Edit2, ShieldAlert } from "lucide-react";

const usuarios = [
  { id: '1', nome: 'Edimar Barros', email: 'edimar@agencia.com', role: 'Super Admin', status: 'ativo' },
  { id: '2', nome: 'Alex', email: 'alex@agencia.com', role: 'Admin', status: 'ativo' },
  { id: '3', nome: 'Suporte Técnico', email: 'suporte@agencia.com', role: 'Viewer', status: 'ativo' },
];

export default function AdminUsuariosPage() {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Usuários da Agência</h2>
          <p className="text-muted-foreground mt-2">Quem tem acesso ao painel de administração geral (Super Admins).</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
          <ShieldAlert size={16} className="mr-2" /> Convidar Admin
        </Button>
      </div>

      <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl overflow-hidden">
        <CardHeader className="border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/[0.02] flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center">
              <Users size={20} className="text-purple-500" />
            </div>
            <div>
              <CardTitle>Equipe</CardTitle>
              <CardDescription>Membros autorizados do SaaS</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground bg-black/5 dark:bg-white/5 uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold">Nome Completo</th>
                <th className="px-6 py-4 font-semibold">Nível de Acesso</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {usuarios.map((user) => (
                <tr key={user.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">{user.nome}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-zinc-500">{user.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Ativo</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="h-8 rounded-lg text-zinc-500 hover:text-foreground">
                      <Edit2 size={16} />
                    </Button>
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
