"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileEdit, Info, ImagePlus, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, Type, Sparkles } from "lucide-react";

export default function ConfigContratoPage() {
  const [loading, setLoading] = useState(false);
  const [headerImage, setHeaderImage] = useState<string | null>(null);
  const [footerImage, setFooterImage] = useState<string | null>(null);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Template salvo com sucesso!");
    }, 1000);
  };

  const handleImageUpload = (type: 'header' | 'footer') => {
    // Simulando um upload de arquivo real com um FileReader local (Mock para o UI)
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (type === 'header') setHeaderImage(e.target?.result as string);
          else setFooterImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const execCommand = (command: string) => {
    document.execCommand(command, false, '');
  };

  return (
    <div className="max-w-4xl space-y-6 pb-12">
      <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <FileEdit size={20} className="text-blue-500" />
            </div>
            <div>
              <CardTitle>Construtor de Contratos Pro</CardTitle>
              <CardDescription>Crie o modelo oficial do PDF. Você pode colar do Word que a formatação será mantida.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8 pt-6">

          {/* Upload de Cabeçalho e Rodapé */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Cabeçalho (Timbre)</span>
                {headerImage && <Button variant="ghost" size="sm" onClick={() => setHeaderImage(null)} className="h-6 text-xs text-rose-500">Remover</Button>}
              </div>
              <div 
                onClick={() => handleImageUpload('header')}
                className={`border-2 border-dashed rounded-2xl h-32 flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden relative group
                  ${headerImage ? 'border-blue-500/50 bg-blue-500/5' : 'border-black/10 dark:border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5'}`}
              >
                {headerImage ? (
                  <img src={headerImage} alt="Header" className="w-full h-full object-contain" />
                ) : (
                  <>
                    <ImagePlus className="text-muted-foreground group-hover:text-blue-500 mb-2 transition-colors" />
                    <span className="text-xs text-muted-foreground group-hover:text-blue-500 transition-colors font-medium">Clique para subir imagem</span>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Rodapé (Assinaturas/Logo)</span>
                {footerImage && <Button variant="ghost" size="sm" onClick={() => setFooterImage(null)} className="h-6 text-xs text-rose-500">Remover</Button>}
              </div>
              <div 
                onClick={() => handleImageUpload('footer')}
                className={`border-2 border-dashed rounded-2xl h-32 flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden relative group
                  ${footerImage ? 'border-blue-500/50 bg-blue-500/5' : 'border-black/10 dark:border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5'}`}
              >
                {footerImage ? (
                  <img src={footerImage} alt="Footer" className="w-full h-full object-contain" />
                ) : (
                  <>
                    <ImagePlus className="text-muted-foreground group-hover:text-blue-500 mb-2 transition-colors" />
                    <span className="text-xs text-muted-foreground group-hover:text-blue-500 transition-colors font-medium">Clique para subir imagem</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-2xl flex items-start gap-3">
            <Sparkles size={20} className="text-blue-500 shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground leading-relaxed">
              <strong>Editor Inteligente:</strong> Você pode usar tags automáticas como <code className="bg-black/5 dark:bg-white/10 px-1 rounded">{"{{NOME_ALUNO}}"}</code>, <code className="bg-black/5 dark:bg-white/10 px-1 rounded">{"{{CPF}}"}</code>, <code className="bg-black/5 dark:bg-white/10 px-1 rounded">{"{{PACOTE}}"}</code> e <code className="bg-black/5 dark:bg-white/10 px-1 rounded">{"{{VALOR}}"}</code>. O sistema preencherá esses dados no momento de gerar o PDF.
            </div>
          </div>

          {/* Editor Rich Text */}
          <div className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden bg-background shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
            <div className="border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/[0.02] p-2 flex items-center flex-wrap gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground" onClick={() => execCommand('bold')}><Bold size={16} /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground" onClick={() => execCommand('italic')}><Italic size={16} /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground" onClick={() => execCommand('underline')}><Underline size={16} /></Button>
              
              <div className="w-[1px] h-6 bg-black/10 dark:bg-white/10 mx-1"></div>
              
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground" onClick={() => execCommand('justifyLeft')}><AlignLeft size={16} /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground" onClick={() => execCommand('justifyCenter')}><AlignCenter size={16} /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground" onClick={() => execCommand('justifyRight')}><AlignRight size={16} /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground" onClick={() => execCommand('justifyFull')}><AlignJustify size={16} /></Button>
              
              <div className="w-[1px] h-6 bg-black/10 dark:bg-white/10 mx-1"></div>

              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground" onClick={() => execCommand('insertUnorderedList')}><List size={16} /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground" onClick={() => execCommand('insertOrderedList')}><ListOrdered size={16} /></Button>

              <div className="flex-1"></div>
              
              <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs font-medium border-blue-500/20 text-blue-500 hover:bg-blue-500 hover:text-white">
                <Type size={14} className="mr-1.5" /> Inserir Variável
              </Button>
            </div>
            
            <div 
              contentEditable 
              className="min-h-[500px] p-8 outline-none text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: `<h2>CONTRATO DE PRESTAÇÃO DE SERVIÇOS EDUCACIONAIS</h2><br/><p><b>CONTRATANTE:</b> {{NOME_ALUNO}}, inscrito no CPF sob o nº {{CPF}}.</p><p><b>CONTRATADA:</b> Autoescola Modelo Ltda.</p><br/><p><b>CLÁUSULA PRIMEIRA - DO OBJETO</b></p><p>O presente contrato tem como objeto a prestação de serviços de instrução teórica e prática para habilitação de condutores na categoria {{PACOTE}}, conforme especificações descritas no momento da matrícula.</p><br/><p><b>CLÁUSULA SEGUNDA - DOS VALORES</b></p><p>Pela prestação dos serviços, o CONTRATANTE pagará à CONTRATADA o valor total de <b>{{VALOR}}</b>.</p><br/><p><i>Cole seu modelo completo aqui. Toda a formatação (negrito, itálico, listas e tabelas) trazida do Word ou Google Docs será mantida!</i></p>`
              }}
            />
          </div>

          <div className="flex justify-end pt-4 mt-6">
            <Button onClick={handleSave} disabled={loading} className="rounded-xl px-8 h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-base shadow-lg shadow-blue-500/20">
              {loading ? "Salvando Template..." : "Salvar Contrato Oficial"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
