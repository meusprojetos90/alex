"use client";

import { use } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Send, Printer, CheckCircle2, History } from "lucide-react";

export default function ContratoDetalhePage({ params }: { params: Promise<{ escolaId: string, contratoId: string }> }) {
  const { escolaId, contratoId } = use(params);

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href={`/escola/${escolaId}/contratos`}>
          <Button variant="outline" size="icon" className="rounded-xl border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-md">
            <ArrowLeft size={18} />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Contrato #{contratoId.toUpperCase()}</h2>
          <p className="text-muted-foreground mt-1 text-sm">Visualização e assinatura digital do documento.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visualizador do Documento (A4 Simulation) */}
        <div className="lg:col-span-2">
          <Card className="border-black/5 dark:border-white/10 shadow-2xl rounded-sm overflow-hidden bg-white text-black min-h-[800px]">
            {/* Header da Folha */}
            <div className="p-8 border-b border-zinc-200 flex justify-between items-center bg-zinc-50">
              <div className="w-16 h-16 bg-zinc-200 rounded-md flex items-center justify-center">
                <span className="text-xs text-zinc-500 font-bold">LOGO</span>
              </div>
              <div className="text-right">
                <h3 className="font-bold text-lg">Autoescola Modelo</h3>
                <p className="text-xs text-zinc-500">CNPJ: 12.345.678/0001-99</p>
              </div>
            </div>
            
            {/* Corpo do Documento */}
            <div className="p-12 space-y-6 text-sm leading-relaxed text-zinc-800">
              <h1 className="text-center font-bold text-xl mb-8">CONTRATO DE PRESTAÇÃO DE SERVIÇOS EDUCACIONAIS</h1>
              
              <p><strong>CONTRATANTE:</strong> Ana Costa, portador(a) do CPF nº 123.456.789-00, residente e domiciliado(a) no endereço Av. Brasil, 100.</p>
              
              <p><strong>CONTRATADA:</strong> Autoescola Modelo, inscrita no CNPJ sob o nº 12.345.678/0001-99, sediada em São Paulo - SP.</p>
              
              <h3 className="font-bold mt-6">CLÁUSULA PRIMEIRA - DO OBJETO</h3>
              <p>O presente instrumento tem por objeto a prestação de serviços educacionais referentes ao curso de Primeira Habilitação (Categoria B), de acordo com as normas do DETRAN.</p>

              <h3 className="font-bold mt-6">CLÁUSULA SEGUNDA - DOS VALORES</h3>
              <p>Pelos serviços contratados, o CONTRATANTE pagará à CONTRATADA o valor total de <strong>R$ 1.850,00</strong>, a ser pago em até 12 parcelas no cartão de crédito.</p>

              <div className="mt-24 flex justify-between items-end pt-12">
                <div className="border-t border-zinc-400 pt-2 w-64 text-center">
                  <p className="font-bold text-xs">Autoescola Modelo</p>
                  <p className="text-[10px] text-zinc-500">Contratada</p>
                </div>
                <div className="border-t border-zinc-400 pt-2 w-64 text-center relative">
                  {/* Assinatura Digital Placeholder */}
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-80 pointer-events-none">
                    <span className="font-signature text-blue-600 text-3xl transform -rotate-2 inline-block">Ana Costa</span>
                  </div>
                  <p className="font-bold text-xs">Ana Costa</p>
                  <p className="text-[10px] text-zinc-500">Contratante</p>
                </div>
              </div>

            </div>
          </Card>
        </div>

        {/* Painel de Ações */}
        <div className="space-y-6">
          <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg">Status da Assinatura</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <CheckCircle2 className="text-emerald-500" size={24} />
                <div>
                  <h4 className="font-semibold text-emerald-500">Assinado Eletronicamente</h4>
                  <p className="text-xs text-emerald-500/70">Validado via Token WhatsApp</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-black/5 dark:border-white/10">
                <Button className="w-full justify-start rounded-xl bg-blue-600 hover:bg-blue-700 text-white h-12">
                  <Send size={18} className="mr-3" /> Enviar PDF no WhatsApp
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl h-12 border-black/5 dark:border-white/10">
                  <Download size={18} className="mr-3 text-muted-foreground" /> Baixar PDF
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl h-12 border-black/5 dark:border-white/10">
                  <Printer size={18} className="mr-3 text-muted-foreground" /> Imprimir 2 Vias
                </Button>
              </div>

            </CardContent>
          </Card>

          <Card className="border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl shadow-lg rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><History size={18}/> Log de Auditoria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative border-l border-black/10 dark:border-white/10 ml-3 space-y-6 pb-2">
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-background"></div>
                  <div className="pl-4">
                    <p className="text-sm font-medium">Contrato Assinado</p>
                    <p className="text-xs text-muted-foreground">03 Jun 2026, 14:30 - IP: 192.168.1.5</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-background"></div>
                  <div className="pl-4">
                    <p className="text-sm font-medium">Link acessado pelo cliente</p>
                    <p className="text-xs text-muted-foreground">03 Jun 2026, 14:25</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-purple-500 ring-4 ring-background"></div>
                  <div className="pl-4">
                    <p className="text-sm font-medium">Contrato Gerado (IA)</p>
                    <p className="text-xs text-muted-foreground">03 Jun 2026, 14:20</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
