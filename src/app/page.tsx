"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Hexagon, ArrowRight, Building2, ShieldAlert, LogIn, Lock, Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-black relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>

      <div className="max-w-md w-full relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1px] shadow-2xl shadow-purple-500/20 mb-6 animate-in zoom-in duration-700">
          <div className="w-full h-full bg-black/60 backdrop-blur-xl rounded-[2rem] flex items-center justify-center">
            <Hexagon size={40} strokeWidth={2} className="text-white fill-white/10" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 text-center mb-2">
          CFlow CRM
        </h1>
        <p className="text-zinc-400 text-center mb-8 text-sm">
          Acesse sua conta para gerenciar leads e inteligência artificial.
        </p>

        {/* Formulário de Login Principal */}
        <Card className="w-full border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-2xl rounded-3xl p-6 mb-8">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <Input type="email" placeholder="seu@email.com" className="pl-10 bg-white/5 border-white/10 text-white rounded-xl h-12" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Senha</label>
                <a href="#" className="text-xs text-purple-400 hover:text-purple-300">Esqueceu?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <Input type="password" placeholder="••••••••" className="pl-10 bg-white/5 border-white/10 text-white rounded-xl h-12" />
              </div>
            </div>

            <Button className="w-full h-12 mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl shadow-lg shadow-purple-600/20 transition-all font-bold">
              Entrar na Plataforma <LogIn size={18} className="ml-2" />
            </Button>
          </form>
        </Card>

        {/* Botões de Demonstração */}
        <div className="w-full relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-black px-2 text-zinc-500 font-bold tracking-widest">Demonstração</span>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-3 mt-6">
          <Link href="/escola/tenant_1" className="block w-full">
            <Button variant="outline" className="w-full h-auto py-3 px-4 flex flex-col items-center justify-center gap-2 bg-white/[0.02] border-white/10 hover:bg-purple-500/10 hover:border-purple-500/30 hover:text-purple-400 transition-all rounded-2xl group">
              <Building2 className="text-zinc-500 group-hover:text-purple-400" size={20} />
              <div className="text-center">
                <span className="block text-xs font-bold text-zinc-300 group-hover:text-purple-300">Visão Cliente</span>
                <span className="block text-[10px] text-zinc-500">Autoescola</span>
              </div>
            </Button>
          </Link>

          <Link href="/admin/dashboard" className="block w-full">
            <Button variant="outline" className="w-full h-auto py-3 px-4 flex flex-col items-center justify-center gap-2 bg-white/[0.02] border-white/10 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400 transition-all rounded-2xl group">
              <ShieldAlert className="text-zinc-500 group-hover:text-emerald-400" size={20} />
              <div className="text-center">
                <span className="block text-xs font-bold text-zinc-300 group-hover:text-emerald-300">Visão Agência</span>
                <span className="block text-[10px] text-zinc-500">Super Admin</span>
              </div>
            </Button>
          </Link>
        </div>

        <p className="text-xs text-zinc-600 mt-10">
          &copy; 2026 CNHFlow. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
