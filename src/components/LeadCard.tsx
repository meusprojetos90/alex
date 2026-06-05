import { Lead } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MessageCircle, User, Tag } from "lucide-react";
import { Draggable } from "@hello-pangea/dnd";
import { useRouter } from "next/navigation";

interface LeadCardProps {
  lead: Lead;
  index: number;
}

export function LeadCard({ lead, index }: LeadCardProps) {
  const router = useRouter();
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
          <div onClick={() => router.push(`/escola/${lead.tenantId}/crm/${lead.id}`)}>
            <Card className={`border-black/5 dark:border-white/5 bg-white dark:bg-[#18181b] shadow-[0_8px_20px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_20px_rgb(0,0,0,0.4)] rounded-2xl transition-all duration-300 hover:border-black/10 dark:hover:border-white/20 hover:shadow-[0_12px_30px_rgb(0,0,0,0.1)] dark:hover:shadow-[0_12px_30px_rgb(0,0,0,0.6)] hover:-translate-y-0.5 cursor-pointer active:cursor-grabbing overflow-hidden group ${snapshot.isDragging ? 'scale-105 z-50 ring-2 ring-purple-500/50 shadow-[0_20px_40px_rgba(168,85,247,0.25)]' : ''}`}>
              <CardContent className="p-3 flex flex-col gap-2 relative">
                <div className="flex justify-between items-start gap-2 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-xs shadow-inner shrink-0`}>
                      {lead.nome.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 leading-tight truncate">{lead.nome}</h3>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium truncate">{lead.telefone}</p>
                    </div>
                  </div>
                  {lead.whaticketUrl && (
                    <a href={lead.whaticketUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 w-6 h-6 bg-emerald-500/10 text-emerald-500 rounded-md flex items-center justify-center hover:bg-emerald-500/20 transition-colors" onClick={(e) => e.stopPropagation()}>
                      <MessageCircle size={12} />
                    </a>
                  )}
                </div>
                
                <div className="flex flex-col gap-1.5 relative z-10 mt-1">
                  {lead.campanha && (
                    <div className="flex items-center text-[9px] text-zinc-500 dark:text-zinc-400">
                      <Tag size={10} className="mr-1" /> {lead.campanha}
                    </div>
                  )}
                  {lead.vendedor && (
                    <div className="flex items-center text-[9px] text-zinc-500 dark:text-zinc-400">
                      <User size={10} className="mr-1" /> {lead.vendedor}
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-1">
                     <span className="text-[9px] font-bold text-black bg-gradient-to-r from-yellow-400 to-amber-500 px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm border border-yellow-300/50">
                        {lead.categoriaInteresse}
                     </span>
                     <div className="flex items-center text-[9px] text-zinc-600 dark:text-zinc-400 font-medium bg-black/5 dark:bg-white/5 backdrop-blur-md px-2 py-0.5 rounded-md border border-black/5 dark:border-white/5">
                        <Clock size={10} className="text-zinc-500 dark:text-zinc-400 mr-1" /> {lead.diasNoStatus}d
                     </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </Draggable>
  );
}
