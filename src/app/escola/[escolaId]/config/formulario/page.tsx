"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { FormInput, Copy, Plus, Trash2 } from "lucide-react";

export default function ConfigFormularioPage() {
  const [loading, setLoading] = useState(false);
  
  const [customFields, setCustomFields] = useState([
    { id: 1, label: "Como nos conheceu?", slug: "como_conheceu", required: false }
  ]);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Formulário atualizado!");
    }, 1000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText("https://saas-autoescola.com/f/modelo");
    toast.success("Link do formulário copiado!");
  };

  const addField = () => {
    const newId = Date.now();
    setCustomFields([...customFields, { id: newId, label: "Novo Campo", slug: "novo_campo", required: false }]);
  };

  const updateField = (id: number, key: string, value: string | boolean) => {
    setCustomFields(customFields.map(f => f.id === id ? { ...f, [key]: value } : f));
  };

  const removeField = (id: number) => {
    setCustomFields(customFields.filter(f => f.id !== id));
  };

  const generateSlug = (text: string) => {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/(^_|_$)/g, "");
  };

  return (
    <div className="max-w-4xl space-y-6">
      <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-xl rounded-3xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center">
              <FormInput size={20} className="text-orange-500" />
            </div>
            <div className="flex-1">
              <CardTitle>Página de Captura (Formulário)</CardTitle>
              <CardDescription>Configure os campos exigidos na página pública para novos Leads.</CardDescription>
            </div>
            <Button variant="outline" onClick={copyLink} className="rounded-xl border-black/5 dark:border-white/10">
              <Copy size={16} className="mr-2" /> Copiar Link
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 bg-background/50 p-6 rounded-2xl border border-black/5 dark:border-white/5">
            <h3 className="font-semibold text-sm mb-4">Campos Padrão do Sistema</h3>
            
            <div className="flex items-center justify-between p-3 bg-background rounded-xl border border-black/5 dark:border-white/5 opacity-70">
              <div className="space-y-0.5">
                <Label className="font-medium">Nome Completo</Label>
                <p className="text-xs text-muted-foreground font-mono">Slug: nome</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><Switch checked disabled /> Obrigatório</div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-background rounded-xl border border-black/5 dark:border-white/5 opacity-70">
              <div className="space-y-0.5">
                <Label className="font-medium">Telefone / WhatsApp</Label>
                <p className="text-xs text-muted-foreground font-mono">Slug: telefone</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><Switch checked disabled /> Obrigatório</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-background rounded-xl border border-black/5 dark:border-white/5">
              <div className="space-y-0.5">
                <Label className="font-medium cursor-pointer" htmlFor="cpf">CPF</Label>
                <p className="text-xs text-muted-foreground font-mono">Slug: cpf</p>
              </div>
              <Switch id="cpf" />
            </div>

            <div className="flex items-center justify-between p-3 bg-background rounded-xl border border-black/5 dark:border-white/5">
              <div className="space-y-0.5">
                <Label className="font-medium cursor-pointer" htmlFor="cat">Categoria de Interesse</Label>
                <p className="text-xs text-muted-foreground font-mono">Slug: categoria</p>
              </div>
              <Switch id="cat" defaultChecked />
            </div>
          </div>

          <div className="space-y-4 bg-background/50 p-6 rounded-2xl border border-black/5 dark:border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">Campos Personalizados</h3>
              <Button onClick={addField} variant="outline" size="sm" className="rounded-xl border-black/5 dark:border-white/10 h-8">
                <Plus size={14} className="mr-1.5" /> Adicionar Campo
              </Button>
            </div>
            
            {customFields.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">Nenhum campo personalizado. Adicione para solicitar mais informações do Lead.</p>
            )}

            {customFields.map((field) => (
              <div key={field.id} className="flex items-start gap-4 p-4 bg-background rounded-xl border border-black/5 dark:border-white/5">
                <div className="flex-1 space-y-3">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1 block">Nome do Campo</Label>
                    <Input 
                      value={field.label} 
                      onChange={(e) => {
                        updateField(field.id, 'label', e.target.value);
                        updateField(field.id, 'slug', generateSlug(e.target.value));
                      }}
                      className="bg-background border-black/5 dark:border-white/10 rounded-lg h-9" 
                    />
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Label className="text-xs text-muted-foreground">Slug da Variável (para o contrato):</Label>
                      <code className="text-xs font-mono bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">{`{{${field.slug}}}`}</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={field.required} 
                        onCheckedChange={(c) => updateField(field.id, 'required', c)} 
                        id={`req-${field.id}`} 
                      />
                      <Label htmlFor={`req-${field.id}`} className="text-xs font-medium cursor-pointer">Obrigatório</Label>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeField(field.id)} className="text-zinc-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg shrink-0 mt-6">
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="space-y-2 bg-background/50 p-6 rounded-2xl border border-black/5 dark:border-white/5">
            <Label className="font-semibold text-sm">Mensagem de Agradecimento</Label>
            <p className="text-xs text-muted-foreground mb-2">Exibida logo após o lead enviar o formulário.</p>
            <Input defaultValue="Obrigado! Em breve nossa equipe ou nossa IA entrará em contato pelo WhatsApp." className="bg-background border-black/5 dark:border-white/10 rounded-xl" />
          </div>

          <div className="flex justify-end pt-4 border-t border-black/5 dark:border-white/10 mt-6 pt-6">
            <Button onClick={handleSave} disabled={loading} className="rounded-xl px-6 bg-orange-600 hover:bg-orange-700 text-white">
              {loading ? "Salvando..." : "Salvar Formulário"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
