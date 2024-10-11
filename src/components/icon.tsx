import { LucideProps } from "lucide-react";
import { ComponentType } from "react";

interface IconSettingsProps extends LucideProps {
  icon: ComponentType<LucideProps>;
}

export function Icon({ icon: Icon, ...props }: IconSettingsProps) {
  return (
    <Icon size={24} strokeWidth={1.5} className="text-mbIcon" {...props} />
  );
}
