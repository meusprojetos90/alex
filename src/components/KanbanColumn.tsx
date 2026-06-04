import { Droppable } from "@hello-pangea/dnd";
import { Lead } from "@/lib/types";
import { LeadCard } from "./LeadCard";
import { MoreHorizontal } from "lucide-react";

interface KanbanColumnProps {
  id: string;
  title: string;
  leads: Lead[];
}

export function KanbanColumn({ id, title, leads }: KanbanColumnProps) {
  return (
    <div className="flex flex-col w-[340px] shrink-0 h-full max-h-[calc(100vh-140px)] overflow-hidden mr-6">
      <div className="py-4 flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[15px] text-zinc-800 dark:text-zinc-100">{title}</span>
          <span className="bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2.5 py-0.5 rounded-full text-xs font-bold border border-black/5 dark:border-white/5">{leads.length}</span>
        </div>
        <button className="text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white transition-colors bg-black/5 dark:bg-white/5 w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10">
          <MoreHorizontal size={18} />
        </button>
      </div>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 overflow-y-auto rounded-3xl transition-colors duration-200 hide-scrollbar pb-32 px-2 ${snapshot.isDraggingOver ? 'bg-black/5 dark:bg-white/5' : ''}`}
          >
            {leads.map((lead, index) => (
              <LeadCard key={lead.id} lead={lead} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
