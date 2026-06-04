"use client";

import { useState } from "react";
import { use } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, PhoneCall, Image as ImageIcon } from "lucide-react";

export default function PublicChatPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([
    { id: 1, type: "bot", text: "Olá! Bem-vindo à Autoescola Modelo. 🚗 Sou a assistente virtual e estou aqui para te ajudar." },
    { id: 2, type: "bot", text: "Qual curso você tem interesse? (Ex: Primeira Habilitação B, Moto, Adição de Categoria...)" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) return;

    // Adiciona msg do usuário
    const newMsg = { id: Date.now(), type: "user", text: msg };
    setChat([...chat, newMsg]);
    setMsg("");
    setIsTyping(true);

    // Simula resposta da IA
    setTimeout(() => {
      setChat(prev => [...prev, { 
        id: Date.now() + 1, 
        type: "bot", 
        text: "Entendi! O valor para essa categoria está em promoção hoje: R$ 1.850,00 à vista ou em até 12x no cartão. Quer que eu gere um link de matrícula com desconto?" 
      }]);
      setIsTyping(false);
    }, 2500);
  };

  const autoescolaNome = slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ');

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden font-sans">
      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Mobile Device Mockup */}
      <div className="w-full max-w-[400px] h-[85vh] max-h-[850px] bg-[#111] border-[8px] border-zinc-900 rounded-[3rem] shadow-2xl relative flex flex-col overflow-hidden z-10 mx-4">
        
        {/* Notch Simulação */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 rounded-b-2xl z-20"></div>

        {/* WhatsApp-like Header */}
        <div className="bg-[#1e293b] pt-10 pb-3 px-4 flex items-center justify-between shrink-0 shadow-md relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px]">
              <div className="w-full h-full bg-[#1e293b] rounded-full flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm leading-tight">{autoescolaNome}</h2>
              <p className="text-emerald-400 text-[10px] flex items-center gap-1">
                {isTyping ? "digitando..." : "online"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-white/70">
            <PhoneCall size={18} />
          </div>
        </div>

        {/* Chat Area (WhatsApp Background Wallpaper) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0f172a]/90 relative" style={{ backgroundImage: 'radial-gradient(#ffffff05 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          <div className="text-center my-4">
            <span className="bg-[#1e293b] text-white/50 text-[10px] px-3 py-1 rounded-lg uppercase tracking-wider">Hoje</span>
          </div>

          {chat.map((c) => (
            <div key={c.id} className={`flex ${c.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-3 text-sm shadow-sm relative ${
                c.type === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-sm' 
                  : 'bg-[#1e293b] text-white rounded-tl-sm'
              }`}>
                {c.text}
                <div className={`text-[9px] mt-1 text-right ${c.type === 'user' ? 'text-indigo-200' : 'text-zinc-400'}`}>
                  {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#1e293b] rounded-2xl rounded-tl-sm p-3 flex gap-1 items-center h-10 w-16 justify-center">
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-3 bg-[#1e293b] shrink-0 flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white/50 hover:bg-white/10 rounded-full shrink-0">
            <ImageIcon size={22} />
          </Button>
          <form onSubmit={handleSend} className="flex-1 flex gap-2">
            <Input 
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Digite uma mensagem..." 
              className="flex-1 bg-[#0f172a] border-none text-white rounded-full px-4 h-11 placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-indigo-500"
            />
            <Button type="submit" size="icon" className={`rounded-full shrink-0 h-11 w-11 transition-all ${msg.trim() ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-[#0f172a] text-white/30'}`}>
              <Send size={18} className={msg.trim() ? "ml-1" : ""} />
            </Button>
          </form>
        </div>

      </div>

      <div className="absolute top-8 text-center w-full z-0 opacity-50">
        <h1 className="text-xl font-bold text-white tracking-widest uppercase">Simulador Mobile</h1>
        <p className="text-zinc-400 text-xs mt-1">Como o lead visualiza o atendimento</p>
      </div>

    </div>
  );
}
