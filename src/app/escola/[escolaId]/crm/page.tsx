"use client";
import { use } from "react";

import { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { mockLeads } from "@/lib/mock-data";
import { LEAD_STATUS } from "@/lib/constants";
import { KanbanColumn } from "@/components/KanbanColumn";
import { StatusLead } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function CRMPage({ params }: { params: Promise<{ escolaId: string }> }) {
  const { escolaId } = use(params);
  const [leads, setLeads] = useState(mockLeads);

  const columns = Object.entries(LEAD_STATUS).map(([key, config]) => ({
    id: key as StatusLead,
    title: config.label,
    color: config.color,
  }));

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const newLeads = Array.from(leads);
    const movedLeadIndex = newLeads.findIndex(l => l.id === draggableId);
    
    if (movedLeadIndex > -1) {
      const [movedLead] = newLeads.splice(movedLeadIndex, 1);
      movedLead.status = destination.droppableId as StatusLead;
      newLeads.push(movedLead);
      
      setLeads(newLeads);
      toast.success(`Status atualizado para ${LEAD_STATUS[movedLead.status].label}`);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">CRM</h2>
          <p className="text-muted-foreground">Gerencie seus leads e arraste-os pelas etapas do funil</p>
        </div>
        <Button onClick={() => toast.info("Funcionalidade de novo lead a ser implementada")}>
          <Plus className="mr-2 h-4 w-4" /> Novo Lead
        </Button>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex h-full gap-4 items-start">
            {columns.map(col => (
              <KanbanColumn
                key={col.id}
                id={col.id}
                title={col.title}
                leads={leads.filter(l => l.status === col.id)}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
