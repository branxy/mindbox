import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { ComponentProps } from "react";

export function SubNav() {
  return (
    <div className="flex h-screen w-60 shrink-0 flex-col items-center overflow-hidden border-r-[1px] border-r-mbDivider">
      <div className="flex w-full justify-start border-b-[1px] border-b-mbDivider px-8 py-4 font-inter text-sm font-medium">
        Данные
      </div>
      <div className="flex w-full flex-col items-center">
        <ul className="flex w-full flex-col gap-1 p-4">
          <SubNavItem title="Клиенты" className="bg-[#edfaf2] text-[#00664b]" />
          <SubNavItem title="Действия" />
          <SubNavItem title="Статусы рассылок" />
          <SubNavItem title="Продукты" />
        </ul>
      </div>
    </div>
  );
}

interface SubNavItemProps extends ComponentProps<typeof Button> {
  title: string;
  className?: string;
}

const SubNavItem = ({ title, className, ...props }: SubNavItemProps) => {
  return (
    <li className="mr-[calc(100% - 208px)] w-full">
      <Button
        variant="mbSubNavItem"
        className={cn(className, "w-full justify-start font-inter font-normal")}
        {...props}
      >
        {title}
      </Button>
    </li>
  );
};
