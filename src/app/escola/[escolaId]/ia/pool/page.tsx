"use client";

import { useState } from "react";
import { use } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot, User, Send, Search, Sparkles, PauseCircle, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MOCK_CHATS = [
  { id: 1, nome: 'Ana Costa', status: 'ia', lastMsg: 'Tudo bem! Vou gerar o link...', time: '10:42', active: true },
  { id: 2, nome: 'Marcos Silva', status: 'humano', lastMsg: 'Marcos, você prefere pagar no...', time: '09:15', active: false },
  { id: 3, nome: 'Juliana Paes', status: 'ia', lastMsg: 'Qual a sua categoria atual?', time: 'Ontem', active: false },
];

export default function AIPoolPage({ params }: { params: Promise<{ escolaId: string }> }) {
  const { escolaId } = use(params);
  const [chatMessage, setChatMessage] = useState("");

  return (
    <div className="h-[calc(100vh-12rem)] min-h-[500px] flex flex-col space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Sparkles className="text-indigo-500" /> Monitoramento da IA (FalaZap)
        </h2>
        <p className="text-muted-foreground mt-1">Acompanhe as conversas do robô em tempo real. Assuma o controle quando quiser.</p>
      </div>

      <div className="flex-1 border border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-xl rounded-3xl overflow-hidden flex flex-row">
        
        {/* Sidebar Esquerda - Lista de Chats */}
        <div className="w-80 border-r border-black/5 dark:border-white/10 flex flex-col bg-background/50">
          <div className="p-4 border-b border-black/5 dark:border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input placeholder="Buscar lead..." className="pl-9 bg-background border-black/5 dark:border-white/10 rounded-xl h-10" />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {MOCK_CHATS.map((chat) => (
              <div key={chat.id} className={`p-4 border-b border-black/5 dark:border-white/5 cursor-pointer transition-colors ${chat.active ? 'bg-indigo-500/10' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm">{chat.nome}</span>
                  <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  {chat.status === 'ia' ? (
                    <Badge variant="outline" className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20 text-[9px] px-1.5 py-0">IA Atendendo</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-[9px] px-1.5 py-0">Humano</Badge>
                  )}
                  <p className="text-xs text-muted-foreground truncate">{chat.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Área Central - Chat Atual */}
        <div className="flex-1 flex flex-col bg-transparent">
          {/* Header do Chat */}
          <div className="h-16 border-b border-black/5 dark:border-white/10 px-6 flex items-center justify-between bg-background/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <h3 className="font-semibold text-sm">Ana Costa</h3>
                <p className="text-xs text-indigo-500 flex items-center gap-1"><Bot size={12}/> Robô "Ana" digitando...</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-xl border-orange-500/20 text-orange-500 hover:bg-orange-500 hover:text-white">
                <PauseCircle size={14} className="mr-1.5" /> Assumir Atendimento
              </Button>
            </div>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            
            <div className="flex justify-end">
              <div className="bg-black/5 dark:bg-white/5 text-foreground rounded-2xl rounded-tr-sm p-3 max-w-[70%] text-sm">
                Olá, gostaria de saber o valor da primeira habilitação para carro.
                <div className="text-[10px] text-muted-foreground text-right mt-1">10:35</div>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="bg-indigo-600 text-white rounded-2xl rounded-tl-sm p-3 max-w-[70%] text-sm">
                Olá, Ana! Tudo bem? Sou a atendente virtual da Autoescola Modelo. 🚗<br/><br/>
                O pacote completo para Primeira Habilitação B (Carro) está saindo por R$ 1.850,00 à vista ou em até 12x no cartão.<br/><br/>
                Gostaria que eu gerasse o link de matrícula ou prefere agendar uma visita na nossa unidade?
                <div className="text-[10px] text-indigo-200 text-right mt-1 flex items-center justify-end gap-1"><Bot size={10}/> 10:36</div>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="bg-black/5 dark:bg-white/5 text-foreground rounded-2xl rounded-tr-sm p-3 max-w-[70%] text-sm">
                Nossa, achei um pouco caro. Tem algum desconto se for no Pix?
                <div className="text-[10px] text-muted-foreground text-right mt-1">10:40</div>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="bg-indigo-600 text-white rounded-2xl rounded-tl-sm p-3 max-w-[70%] text-sm">
                Entendo, Ana! Para pagamento à vista no Pix, consigo aplicar um desconto especial de R$ 150,00 para você fechar hoje. 🎉<br/><br/>
                Ficaria R$ 1.700,00. Podemos gerar o seu contrato com esse valor?
                <div className="text-[10px] text-indigo-200 text-right mt-1 flex items-center justify-end gap-1"><Bot size={10}/> 10:41</div>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="bg-black/5 dark:bg-white/5 text-foreground rounded-2xl rounded-tr-sm p-3 max-w-[70%] text-sm">
                Ah, perfeito! Pode gerar sim.
                <div className="text-[10px] text-muted-foreground text-right mt-1">10:42</div>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="bg-indigo-600 text-white rounded-2xl rounded-tl-sm p-3 max-w-[70%] text-sm flex gap-2">
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>

          </div>

          {/* Input Area */}
          <div className="p-4 bg-background/50 border-t border-black/5 dark:border-white/10">
            <div className="flex items-center gap-2">
              <Input 
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="A IA está no controle. Assuma para digitar..." 
                disabled
                className="bg-background border-black/5 dark:border-white/10 rounded-xl h-12" 
              />
              <Button disabled className="h-12 w-12 rounded-xl shrink-0 border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 text-muted-foreground">
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
