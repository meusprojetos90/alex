"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BookOpen, Sparkles } from "lucide-react";

export default function ConfigConhecimentoPage() {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Base de conhecimento atualizada!");
    }, 1000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-xl rounded-3xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center">
              <BookOpen size={20} className="text-purple-500" />
            </div>
            <div>
              <CardTitle>Regras e Informações</CardTitle>
              <CardDescription>O que o robô precisa saber para responder os leads?</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Textarea 
              className="min-h-[300px] resize-none bg-background border-black/5 dark:border-white/10 rounded-2xl p-4 leading-relaxed"
              defaultValue={`Nossa autoescola funciona de segunda a sábado das 08h às 18h.\nAceitamos pagamento no PIX (com 10% de desconto) e cartão de crédito em até 12x sem juros.\n\nPara matrícula, é necessário: CNH atual (se for adição), RG, CPF e comprovante de endereço atualizado.\n\nAs aulas teóricas são online.\nAs aulas práticas duram 50 minutos cada.`}
            />
          </div>
          <div className="flex items-center justify-between pt-4">
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <Sparkles size={14} className="text-purple-500" /> O Agente IA usará este texto para montar as respostas automaticamente.
            </p>
            <Button onClick={handleSave} disabled={loading} className="rounded-xl px-6 bg-purple-600 hover:bg-purple-700 text-white">
              {loading ? "Treinando IA..." : "Atualizar Base"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
