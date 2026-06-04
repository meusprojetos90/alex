"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Users, UserPlus, Shield, ShieldAlert } from "lucide-react";

export default function ConfigUsuariosPage() {
  const [loading, setLoading] = useState(false);

  const usuarios = [
    { id: 1, nome: "Carlos (Dono)", email: "carlos@autoescola.com", role: "admin", status: "ativo" },
    { id: 2, nome: "Letícia (Recepção)", email: "leticia@autoescola.com", role: "atendente", status: "ativo" },
  ];

  const convidar = () => {
    toast.success("Link de convite gerado e copiado!");
  };

  return (
    <div className="max-w-4xl space-y-6">
      <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-xl rounded-3xl">
        <CardHeader className="flex flex-row items-center justify-between border-b border-black/5 dark:border-white/10 pb-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-zinc-500/10 flex items-center justify-center">
              <Users size={20} className="text-zinc-500" />
            </div>
            <div>
              <CardTitle>Equipe da Autoescola</CardTitle>
              <CardDescription>Gerencie quem tem acesso ao CRM.</CardDescription>
            </div>
          </div>
          <Button onClick={convidar} className="rounded-xl px-4">
            <UserPlus size={16} className="mr-2" /> Convidar Membro
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {usuarios.map((u) => (
            <div key={u.id} className="flex items-center justify-between bg-background/50 p-4 rounded-2xl border border-black/5 dark:border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-inner">
                  {u.nome.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium text-sm text-foreground">{u.nome}</h4>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {u.role === 'admin' ? (
                  <span className="flex items-center text-xs font-semibold text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full"><ShieldAlert size={12} className="mr-1" /> Admin</span>
                ) : (
                  <span className="flex items-center text-xs font-semibold text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full"><Shield size={12} className="mr-1" /> Atendente</span>
                )}
                <Button variant="ghost" size="sm" className="text-xs text-zinc-500 hover:text-rose-500 rounded-xl">Remover</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
