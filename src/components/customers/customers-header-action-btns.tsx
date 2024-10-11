import {
  ChevronDown,
  EllipsisVertical,
  Import,
  LucideProps,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { ComponentType } from "react";

export function CustomersHeaderActionBtns() {
  return (
    <div className="flex gap-2">
      <Button variant="mbCustomersHeaderActions" className="gap-2">
        <CustomersHeaderActionBtnsIconIcon icon={Import} size={18} />
        <div className="flex items-center gap-1.5">
          <span className="font-inter font-normal">Импорт</span>
          <CustomersHeaderActionBtnsIconIcon icon={ChevronDown} size={14} />
        </div>
      </Button>
      <Button
        variant="mbCustomersHeaderActions"
        className="gap-2 border-none bg-[#ebeff0] text-[#637076]"
      >
        <CustomersHeaderActionBtnsIconIcon icon={Upload} size={18} />
        <div className="flex items-center gap-1.5">
          <span className="font-inter font-normal">Экспорт</span>
          <CustomersHeaderActionBtnsIconIcon icon={ChevronDown} size={14} />
        </div>
      </Button>
      <Button variant="mbCustomersHeaderActions" className="size-9 p-0">
        <CustomersHeaderActionBtnsIconIcon icon={EllipsisVertical} size={18} />
      </Button>
    </div>
  );
}

interface CustomersHeaderActionBtnsIconProps extends LucideProps {
  icon: ComponentType<LucideProps>;
}

const CustomersHeaderActionBtnsIconIcon = ({
  icon: Icon,
  ...props
}: CustomersHeaderActionBtnsIconProps) => {
  return <Icon size={24} strokeWidth={1.5} {...props} />;
};
