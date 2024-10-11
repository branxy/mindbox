import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Link } from "@tanstack/react-router";

import { PropsWithChildren } from "react";

interface NavbarItemProps {
  tooltip: string;
}

export function NavbarItem({
  children,
  tooltip,
}: PropsWithChildren<NavbarItemProps>) {
  return (
    <div className="mb-1 flex w-full items-center justify-center py-1">
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            {tooltip === "Данные" ? (
              <Link
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md p-2 text-sm font-medium transition-colors hover:bg-[#393d41] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                activeProps={{ className: "bg-[#393d41] text-red-600" }}
              >
                {children}
              </Link>
            ) : (
              <Button variant="mbNavItem" size="icon">
                {children}
              </Button>
            )}
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={12} className="pb-2 text-sm">
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
