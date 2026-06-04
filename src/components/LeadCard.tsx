import { Lead } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Phone } from "lucide-react";
import { Draggable } from "@hello-pangea/dnd";
import Link from "next/link";

interface LeadCardProps {
  lead: Lead;
  index: number;
}

export function LeadCard({ lead, index }: LeadCardProps) {
  const gradients = [
    "from-purple-500 to-indigo-500",
    "from-orange-400 to-rose-400",
    "from-emerald-400 to-cyan-400",
    "from-blue-500 to-purple-500"
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <Draggable draggableId={lead.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-4"
        >
          <Link href={`/escola/${lead.tenantId}/crm/${lead.id}`}>
            <Card className={`border-black/5 dark:border-white/5 bg-white dark:bg-[#18181b] shadow-[0_8px_20px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_20px_rgb(0,0,0,0.4)] rounded-[1.5rem] transition-all duration-300 hover:border-black/10 dark:hover:border-white/20 hover:shadow-[0_12px_30px_rgb(0,0,0,0.1)] dark:hover:shadow-[0_12px_30px_rgb(0,0,0,0.6)] hover:-translate-y-0.5 cursor-grab active:cursor-grabbing overflow-hidden group ${snapshot.isDragging ? 'scale-105 z-50 ring-2 ring-purple-500/50 shadow-[0_20px_40px_rgba(168,85,247,0.25)]' : ''}`}>
              <CardContent className="p-5 flex flex-col gap-4 relative">
                <div className="flex justify-between items-start gap-2 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-sm shadow-inner`}>
                      {lead.nome.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[15px] text-zinc-900 dark:text-zinc-100 leading-tight mb-1">{lead.nome}</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{lead.telefone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 relative z-10 mt-1">
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-bold text-black bg-gradient-to-r from-yellow-400 to-amber-500 px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm border border-yellow-300/50">
                        {lead.categoriaInteresse}
                     </span>
                     <div className="flex items-center text-[11px] text-zinc-600 dark:text-zinc-400 font-medium bg-black/5 dark:bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-black/5 dark:border-white/5">
                        <Clock size={12} className="text-zinc-500 dark:text-zinc-400 mr-1.5" /> {lead.diasNoStatus} dias
                     </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      )}
    </Draggable>
  );
}
