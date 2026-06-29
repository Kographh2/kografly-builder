import Image from "next/image";
import { getTemplate } from "@/constants/templates";
import type { KograflyMascotId, KograflyTemplateId } from "@/lib/types";
import { cn } from "@/lib/utils";

const mascotSrc: Record<KograflyMascotId, string> = {
  "blue-guide-owl": "/mascots/blue-guide-owl.png",
  "blue-connector-fox": "/mascots/blue-connector-fox.png",
  "blue-supporter-turtle": "/mascots/blue-supporter-turtle.png",
  "green-guide-owl": "/mascots/green-guide-owl.png",
  "green-connector-fox": "/mascots/green-connector-fox.png",
  "green-supporter-bear": "/mascots/green-supporter-bear.png"
};

type Props = {
  templateId?: KograflyTemplateId | string | null;
  mascotId?: KograflyMascotId | string | null;
  className?: string;
  priority?: boolean;
};

export default function KograflyMascot({ templateId, mascotId, className, priority = false }: Props) {
  const template = getTemplate(templateId);
  const key = (mascotId || template.mascot) as KograflyMascotId;
  const src = mascotSrc[key] || mascotSrc[template.mascot];

  return (
    <Image
      src={src}
      alt={`${template.role} mascot`}
      width={760}
      height={900}
      priority={priority}
      className={cn("pointer-events-none select-none object-contain drop-shadow-[0_22px_34px_rgba(2,20,50,0.18)]", className)}
    />
  );
}
