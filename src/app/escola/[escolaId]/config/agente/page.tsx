"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Bot, Volume2, Settings2, ShieldCheck } from "lucide-react";

export default function ConfigAgentePage() {
  const [loading, setLoading] = useState(false);
  const [canDiscount, setCanDiscount] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Comportamento do Agente IA salvo!");
    }, 1000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-xl rounded-3xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
              <Bot size={20} className="text-indigo-500" />
            </div>
            <div>
              <CardTitle>Comportamento do Agente IA</CardTitle>
              <CardDescription>Defina a personalidade do robô e como ele deve negociar com seus clientes.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 bg-background/50 p-6 rounded-2xl border border-black/5 dark:border-white/5">
            <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><Settings2 size={16}/> Configurações Básicas</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nomeBot">Nome do Atendente (IA)</Label>
                <Input id="nomeBot" defaultValue="Ana" className="bg-background border-black/5 dark:border-white/10 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tom">Tom de Voz</Label>
                <select id="tom" className="w-full h-10 px-3 rounded-xl bg-background border border-black/5 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Amigável e Descontraído</option>
                  <option>Profissional e Direto</option>
                  <option>Jovem e Empolgado</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="delay">Tempo Médio de Resposta (Delay)</Label>
                <select id="delay" className="w-full h-10 px-3 rounded-xl bg-background border border-black/5 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Imediato (1-3 seg)</option>
                  <option>Natural (5-15 seg)</option>
                  <option>Humano Ocupado (30-60 seg)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="limiteMensagens">Limite de msg por Lead (Gasto)</Label>
                <Input type="number" id="limiteMensagens" defaultValue="20" className="bg-background border-black/5 dark:border-white/10 rounded-xl" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="diretrizes">Diretrizes de Comportamento (Prompt de Contexto)</Label>
              <Textarea 
                id="diretrizes" 
                className="resize-y bg-background border-black/5 dark:border-white/10 rounded-xl min-h-[100px] text-sm" 
                defaultValue="Sempre use emojis com moderação. Nunca prometa aprovação garantida no Detran. Foque em convencer o aluno a agendar uma visita presencial na autoescola."
              />
              <p className="text-xs text-muted-foreground mt-1">Instruções extras de como a IA deve se comportar durante o atendimento.</p>
            </div>
          </div>

          <div className="space-y-4 bg-background/50 p-6 rounded-2xl border border-black/5 dark:border-white/5">
            <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><ShieldCheck size={16}/> Permissões de Negociação</h3>
            
            <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-black/5 dark:border-white/5">
              <div className="space-y-0.5">
                <Label className="font-medium cursor-pointer" htmlFor="p1">Pode enviar tabela de preços?</Label>
                <p className="text-xs text-muted-foreground">O agente envia valores sem intervenção humana.</p>
              </div>
              <Switch id="p1" defaultChecked />
            </div>

            <div className="p-4 bg-background rounded-xl border border-black/5 dark:border-white/5 space-y-4 transition-all">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium cursor-pointer" htmlFor="p2">Pode oferecer desconto?</Label>
                  <p className="text-xs text-muted-foreground">O agente pode reduzir o valor se o lead achar caro ou recusar o primeiro preço.</p>
                </div>
                <Switch id="p2" checked={canDiscount} onCheckedChange={setCanDiscount} />
              </div>
              
              {canDiscount && (
                <div className="pt-4 border-t border-black/5 dark:border-white/10 animate-in slide-in-from-top-2 fade-in duration-200">
                  <div className="space-y-2 max-w-[200px]">
                    <Label htmlFor="maxDesconto" className="text-indigo-500 font-medium">Desconto Máximo Permitido</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">R$</span>
                      <Input type="number" id="maxDesconto" defaultValue="150" className="pl-9 bg-indigo-500/5 border-indigo-500/20 text-indigo-500 font-bold rounded-xl" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Valor limite que a IA pode abater do total.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-black/5 dark:border-white/10 mt-6 pt-6">
            <Button onClick={handleSave} disabled={loading} className="rounded-xl px-6 bg-indigo-600 hover:bg-indigo-700 text-white">
              {loading ? "Salvando..." : "Salvar Configurações da IA"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
