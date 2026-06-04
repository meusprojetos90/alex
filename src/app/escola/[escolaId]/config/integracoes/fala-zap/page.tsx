"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Key, MessageCircle, CheckCircle2 } from "lucide-react";

export default function ConfigFalaZapPage() {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Token validado com sucesso!");
    }, 1500);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-xl rounded-3xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full"></div>
        
        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <MessageCircle size={20} className="text-emerald-500" />
            </div>
            <div>
              <CardTitle>Integração Oficial: FalaZap</CardTitle>
              <CardDescription>Conecte seu número de WhatsApp via API oficial.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 relative z-10">
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-start gap-3">
            <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" />
            <div className="text-sm text-emerald-700 dark:text-emerald-300 leading-relaxed font-medium">
              Sua instância está conectada. Último envio há 5 minutos.
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="instancia">ID da Instância (FalaZap)</Label>
              <Input id="instancia" defaultValue="inst_8f8e9a2b" className="bg-background border-black/5 dark:border-white/10 rounded-xl font-mono text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="token">Token de Acesso (API Key)</Label>
              <div className="flex gap-2">
                <Input id="token" type="password" defaultValue="abcdef1234567890" className="bg-background border-black/5 dark:border-white/10 rounded-xl font-mono text-sm" />
                <Button variant="outline" className="rounded-xl border-black/5 dark:border-white/10 shrink-0 px-4">
                  <Key size={16} />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-black/5 dark:border-white/10 mt-6">
            <Button onClick={handleSave} disabled={loading} className="rounded-xl px-6 bg-emerald-600 hover:bg-emerald-700 text-white">
              {loading ? "Testando Conexão..." : "Salvar e Testar"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
