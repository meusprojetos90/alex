import { Badge } from "@/components/ui/badge";
import { CONTRATO_STATUS } from "@/lib/constants";
import { StatusContrato } from "@/lib/types";

export function ContratoStatusBadge({ status }: { status: StatusContrato }) {
  const config = CONTRATO_STATUS[status];
  return (
    <Badge variant="outline" className={`${config.color} border-transparent`}>
      {config.label}
    </Badge>
  );
}
