"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { use } from "react";

export default function ConfigLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ escolaId: string }>;
}) {
  const pathname = usePathname();
  const { escolaId } = use(params);
  const baseUrl = `/escola/${escolaId}/config`;

  const tabs = [
    { label: "Geral", href: `${baseUrl}/geral` },
    { label: "Base de Conhecimento", href: `${baseUrl}/conhecimento` },
    { label: "Tabela de Preços", href: `${baseUrl}/precos` },
    { label: "Template Contrato", href: `${baseUrl}/contrato` },
    { label: "Formulário", href: `${baseUrl}/formulario` },
    { label: "Agente IA", href: `${baseUrl}/agente` },
    { label: "Integrações", href: `${baseUrl}/integracoes/fala-zap` },
    { label: "Usuários", href: `${baseUrl}/usuarios` },
  ];

  return (
    <div className="flex flex-col h-full max-w-5xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Configurações</h2>
        <p className="text-muted-foreground mt-2">Ajuste as preferências e dados do sistema da sua autoescola.</p>
      </div>

      <div className="flex items-center gap-2 mb-8 overflow-x-auto hide-scrollbar p-4 -m-4">
        {tabs.map((tab) => {
          const isActive = pathname.includes(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive 
                  ? 'bg-zinc-800 text-white border border-white/10 shadow-lg' 
                  : 'text-zinc-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
