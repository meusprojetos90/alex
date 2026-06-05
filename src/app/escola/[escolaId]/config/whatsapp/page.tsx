"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { QrCode, Phone, Plus, RefreshCw, Trash2, Smartphone, CheckCircle2, Bot } from "lucide-react";

function InstanceCard({ instance }: { instance: any }) {
  const [nomeAssistente, setNomeAssistente] = useState("Ana");
  const [usarDepto, setUsarDepto] = useState(false);
  const [departamento, setDepartamento] = useState("Financeiro");
  const [identificarComoIA, setIdentificarComoIA] = useState(true);

  let complemento = "";
  if (usarDepto && identificarComoIA) {
    complemento = ` do departamento de ${departamento} (Assistente Virtual).`;
  } else if (usarDepto && !identificarComoIA) {
    complemento = ` do departamento de ${departamento}.`;
  } else if (!usarDepto && identificarComoIA) {
    complemento = `, assistente virtual da Autoescola.`;
  } else {
    complemento = `.`;
  }

  const previewText = `Olá! Tudo bem? Sou a ${nomeAssistente}${complemento}`;

  return (
    <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl overflow-hidden relative group">
      <CardHeader className="border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/[0.02] py-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Smartphone size={18} className="text-emerald-500" />
            {instance.name}
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg">
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {instance.status === "connected" ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Conectado</p>
                  <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70">{instance.phone}</p>
                </div>
              </div>
              <Badge className="bg-emerald-500 text-white border-none shadow-none">Pronto</Badge>
            </div>
            
            <div className="mt-6 border-t border-black/5 dark:border-white/5 pt-6 space-y-4">
              <h4 className="text-sm font-semibold flex items-center gap-2"><Bot size={16} className="text-indigo-500" /> Configuração da Persona (IA)</h4>
              
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Nome do Atendente Virtual</Label>
                <Input 
                  value={nomeAssistente} 
                  onChange={e => setNomeAssistente(e.target.value)} 
                  className="bg-black/5 dark:bg-white/5 border-none rounded-xl h-10" 
                  placeholder="Ex: Ana, Carlos"
                />
              </div>

              <div className="flex flex-col gap-2 py-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id={`usar_dep_${instance.id}`} 
                    checked={usarDepto} 
                    onCheckedChange={(checked) => setUsarDepto(!!checked)} 
                  />
                  <label htmlFor={`usar_dep_${instance.id}`} className="text-xs font-medium cursor-pointer">
                    Informar departamento na saudação
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id={`id_ia_${instance.id}`} 
                    checked={identificarComoIA} 
                    onCheckedChange={(checked) => setIdentificarComoIA(!!checked)} 
                  />
                  <label htmlFor={`id_ia_${instance.id}`} className="text-xs font-medium cursor-pointer">
                    Identificar-se como Assistente Virtual
                  </label>
                </div>
              </div>

              {usarDepto && (
                <div className="space-y-2 animate-in slide-in-from-top-2">
                  <Label className="text-xs text-muted-foreground">Nome do Departamento</Label>
                  <Input 
                    value={departamento} 
                    onChange={e => setDepartamento(e.target.value)} 
                    className="bg-black/5 dark:bg-white/5 border-none rounded-xl h-10" 
                    placeholder="Ex: Comercial, Financeiro"
                  />
                </div>
              )}

              <div className="p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 text-xs italic text-indigo-600 dark:text-indigo-400 mt-2 shadow-inner">
                <span className="font-semibold block mb-1.5 not-italic text-[9px] uppercase tracking-wider text-indigo-500/70">Preview da Saudação:</span>
                "{previewText}"
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-black/5 dark:border-white/5">
              <Button variant="outline" className="rounded-xl border-black/10 dark:border-white/10">
                <RefreshCw size={14} className="mr-2" /> Sincronizar
              </Button>
              <Button variant="outline" className="rounded-xl border-rose-500/30 text-rose-500 hover:bg-rose-500/10 hover:text-rose-600">
                Desconectar
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-dashed border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5">
              <QrCode size={40} className="text-muted-foreground opacity-50 mb-3" />
              <p className="text-sm font-bold text-foreground mb-1">Aguardando Leitura</p>
              <p className="text-xs text-center text-muted-foreground max-w-[200px] mb-4">Abra o WhatsApp no seu celular e escaneie o código QR para conectar.</p>
              <Button className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white w-full">
                Gerar QR Code
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function ConfigWhatsappPage() {
  const instances = [
    { id: 1, name: "Atendimento 1", phone: "+55 11 99999-9999", status: "connected" },
    { id: 2, name: "Atendimento 2", phone: "+55 11 98888-8888", status: "connected" },
    { id: 3, name: "Financeiro", phone: "", status: "disconnected" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Instâncias de WhatsApp</h2>
          <p className="text-muted-foreground text-sm mt-1">Gerencie os números de WhatsApp conectados ao seu sistema (Máximo 4).</p>
        </div>
        <Button className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white">
          <Plus size={16} className="mr-2" /> Adicionar Instância
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {instances.map((instance) => (
          <InstanceCard key={instance.id} instance={instance} />
        ))}

        {instances.length < 4 && (
          <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl border-dashed flex flex-col items-center justify-center min-h-[300px] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus size={24} className="text-emerald-500" />
            </div>
            <p className="font-bold text-foreground">Nova Instância</p>
            <p className="text-xs text-muted-foreground mt-1 text-center max-w-[200px]">Você ainda tem {4 - instances.length} vagas disponíveis para conectar números.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
