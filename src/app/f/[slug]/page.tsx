"use client";

import { useState } from "react";
import { use } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Hexagon, CheckCircle2 } from "lucide-react";

export default function PublicFormPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const autoescolaNome = slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ');

  if (submitted) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-black relative overflow-hidden">
        {/* Glows Decorativos */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none"></div>

        <Card className="max-w-md w-full border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-2xl rounded-[2rem] text-center p-8 animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Tudo certo!</h2>
          <p className="text-zinc-400">Recebemos seus dados. Em instantes, nossa equipe (ou nossa Inteligência Artificial) entrará em contato com você pelo WhatsApp com os valores e informações.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-black relative overflow-hidden">
      {/* Glows Decorativos */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-purple-600 to-purple-900 p-[1px] shadow-lg shadow-purple-900/50 mb-4">
            <div className="w-full h-full bg-black/50 backdrop-blur-md rounded-3xl flex items-center justify-center text-white">
              <Hexagon size={28} strokeWidth={2} className="text-purple-400 fill-purple-500/20" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Autoescola {autoescolaNome}</h1>
          <p className="text-zinc-400 text-sm mt-1">Preencha os dados para receber um orçamento.</p>
        </div>

        <Card className="border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-2xl rounded-[2rem] overflow-hidden">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-zinc-300">Nome Completo</Label>
                <Input required id="nome" placeholder="Digite seu nome" className="bg-black/50 border-white/10 rounded-xl h-12 text-white placeholder:text-zinc-600 focus-visible:ring-purple-500 focus-visible:border-purple-500" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone" className="text-zinc-300">WhatsApp</Label>
                <Input required id="telefone" placeholder="(00) 00000-0000" className="bg-black/50 border-white/10 rounded-xl h-12 text-white placeholder:text-zinc-600 focus-visible:ring-purple-500 focus-visible:border-purple-500" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria" className="text-zinc-300">Categoria de Interesse</Label>
                <select id="categoria" required className="w-full h-12 px-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none">
                  <option value="" disabled selected>Selecione uma opção...</option>
                  <option value="A">Primeira Habilitação (A - Moto)</option>
                  <option value="B">Primeira Habilitação (B - Carro)</option>
                  <option value="AB">Primeira Habilitação (A+B)</option>
                  <option value="ADD">Adição de Categoria</option>
                </select>
              </div>

              <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium text-base mt-4 shadow-[0_0_20px_rgba(147,51,234,0.3)]">
                {loading ? "Enviando..." : "Solicitar Orçamento Agora"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-zinc-600 mt-6 flex items-center justify-center gap-1">
          Protegido por CFlow CRM
        </p>
      </div>
    </div>
  );
}
