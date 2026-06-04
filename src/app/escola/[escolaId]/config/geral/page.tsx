"use client";

import { useState } from "react";
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Clock, Plus, Trash2 } from "lucide-react";

type TimeSlot = { id: string; start: string; end: string };
type DaySchedule = {
  day: string;
  isOpen: boolean;
  slots: TimeSlot[];
};

export default function ConfigGeralPage() {
  const [loading, setLoading] = useState(false);

  const [schedule, setSchedule] = useState<DaySchedule[]>([
    { day: 'Segunda-feira', isOpen: true, slots: [{ id: '1', start: '08:00', end: '12:00' }, { id: '2', start: '13:30', end: '18:00' }] },
    { day: 'Terça-feira', isOpen: true, slots: [{ id: '3', start: '08:00', end: '12:00' }, { id: '4', start: '13:30', end: '18:00' }] },
    { day: 'Quarta-feira', isOpen: true, slots: [{ id: '5', start: '08:00', end: '12:00' }, { id: '6', start: '13:30', end: '18:00' }] },
    { day: 'Quinta-feira', isOpen: true, slots: [{ id: '7', start: '08:00', end: '12:00' }, { id: '8', start: '13:30', end: '18:00' }] },
    { day: 'Sexta-feira', isOpen: true, slots: [{ id: '9', start: '08:00', end: '12:00' }, { id: '10', start: '13:30', end: '18:00' }] },
    { day: 'Sábado', isOpen: true, slots: [{ id: '11', start: '08:00', end: '12:00' }] },
    { day: 'Domingo', isOpen: false, slots: [] },
  ]);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Configurações salvas com sucesso!");
    }, 1000);
  };

  const toggleDay = (dayIndex: number, isOpen: boolean) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].isOpen = isOpen;
    if (isOpen && newSchedule[dayIndex].slots.length === 0) {
      newSchedule[dayIndex].slots = [{ id: Date.now().toString(), start: '08:00', end: '18:00' }];
    }
    setSchedule(newSchedule);
  };

  const addSlot = (dayIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].slots.push({ id: Date.now().toString(), start: '13:00', end: '18:00' });
    setSchedule(newSchedule);
  };

  const removeSlot = (dayIndex: number, slotId: string) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].slots = newSchedule[dayIndex].slots.filter(s => s.id !== slotId);
    if (newSchedule[dayIndex].slots.length === 0) {
      newSchedule[dayIndex].isOpen = false;
    }
    setSchedule(newSchedule);
  };

  const updateSlot = (dayIndex: number, slotId: string, field: 'start' | 'end', value: string) => {
    const newSchedule = [...schedule];
    const slot = newSchedule[dayIndex].slots.find(s => s.id === slotId);
    if (slot) {
      slot[field] = value;
    }
    setSchedule(newSchedule);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-xl rounded-3xl">
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
          <CardDescription>Estes dados serão usados nos contratos e mensagens.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome da Autoescola</Label>
              <Input id="nome" defaultValue="Autoescola Modelo" className="bg-background border-black/5 dark:border-white/10 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input id="cnpj" defaultValue="12.345.678/0001-99" className="bg-background border-black/5 dark:border-white/10 rounded-xl" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone Principal (WhatsApp)</Label>
              <Input id="telefone" defaultValue="(11) 98765-4321" className="bg-background border-black/5 dark:border-white/10 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Comercial</Label>
              <Input id="email" defaultValue="contato@autoescolamodelo.com" className="bg-background border-black/5 dark:border-white/10 rounded-xl" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço Completo</Label>
            <Input id="endereco" defaultValue="Av. Principal, 1000 - Centro, São Paulo - SP" className="bg-background border-black/5 dark:border-white/10 rounded-xl" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-xl rounded-3xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-muted-foreground" />
            <CardTitle>Horários de Atendimento</CardTitle>
          </div>
          <CardDescription>Defina detalhadamente os horários, com pausas para o almoço se houver.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {schedule.map((dia, dayIndex) => (
              <div key={dia.day} className="flex flex-col md:flex-row md:items-start justify-between p-4 bg-background/50 border border-black/5 dark:border-white/5 rounded-2xl gap-4">
                <div className="flex items-center gap-3 w-40 shrink-0">
                  <Switch 
                    checked={dia.isOpen} 
                    onCheckedChange={(c) => toggleDay(dayIndex, c)} 
                    id={`day-${dayIndex}`}
                  />
                  <Label htmlFor={`day-${dayIndex}`} className={`font-medium cursor-pointer ${!dia.isOpen && 'text-muted-foreground'}`}>
                    {dia.day}
                  </Label>
                </div>
                
                <div className="flex-1 space-y-3">
                  {!dia.isOpen ? (
                    <span className="text-sm text-muted-foreground px-2 py-2 inline-block">Fechado</span>
                  ) : (
                    <>
                      {dia.slots.map((slot) => (
                        <div key={slot.id} className="flex items-center gap-2">
                          <Input 
                            type="time" 
                            value={slot.start} 
                            onChange={(e) => updateSlot(dayIndex, slot.id, 'start', e.target.value)}
                            className="w-28 bg-background border-black/5 dark:border-white/10 rounded-xl text-center" 
                          />
                          <span className="text-muted-foreground text-xs">até</span>
                          <Input 
                            type="time" 
                            value={slot.end} 
                            onChange={(e) => updateSlot(dayIndex, slot.id, 'end', e.target.value)}
                            className="w-28 bg-background border-black/5 dark:border-white/10 rounded-xl text-center" 
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeSlot(dayIndex, slot.id)} 
                            className="text-zinc-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl h-9 w-9 shrink-0 ml-1"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      ))}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => addSlot(dayIndex)}
                        className="text-xs text-indigo-500 hover:text-indigo-600 hover:bg-indigo-500/10 rounded-lg h-7 mt-1 px-2"
                      >
                        <Plus size={12} className="mr-1" /> Adicionar intervalo
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-black/5 dark:border-white/10 mt-6 pt-6">
            <Button onClick={handleSave} disabled={loading} className="rounded-xl px-6 bg-foreground text-background hover:bg-foreground/90">
              {loading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
