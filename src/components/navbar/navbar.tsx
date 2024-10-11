import { Link } from "@tanstack/react-router";
import { MindboxIcon } from "./mindbox-icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Blocks,
  ChartColumnIncreasing,
  CircleHelp,
  LucideProps,
  Megaphone,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
import { NavbarItem } from "./navbar-item";
import { ComponentType } from "react";

export function Navbar() {
  return (
    <div className="bg-mbBg flex w-14 flex-col items-center justify-start">
      <Link
        to="/"
        className="border-b-mbBorder mb-1 flex w-full items-center justify-center border-b-[1px] px-2 py-2.5 pt-2 leading-[16.2px]"
      >
        <MindboxIcon />
      </Link>
      <NavbarItem tooltip="Найти">
        <Search size={24} className="text-mbIcon" strokeWidth={1.5} />
      </NavbarItem>
      <nav>
        <ul>
          <li>
            <NavbarItem tooltip="Данные">
              <Icon icon={Users} color="white" />
            </NavbarItem>
          </li>
          <li>
            <NavbarItem tooltip="Кампании">
              <Icon icon={Megaphone} />
            </NavbarItem>
          </li>
          <li>
            <NavbarItem tooltip="Аналитика">
              <Icon icon={ChartColumnIncreasing} />
            </NavbarItem>
          </li>
          <li>
            <NavbarItem tooltip="Интеграции">
              <Icon icon={Blocks} />
            </NavbarItem>
          </li>
          <li>
            <NavbarItem tooltip="Настройки">
              <Icon icon={Settings} />
            </NavbarItem>
          </li>
        </ul>
      </nav>
      <ul className="flex grow flex-col justify-end">
        <li>
          <NavbarItem tooltip="Помощь">
            <Icon icon={CircleHelp} />
          </NavbarItem>
        </li>
        <li>
          <NavbarItem tooltip="Профиль">
            <Icon icon={User} />
          </NavbarItem>
        </li>
      </ul>
      <CurrentTime />
    </div>
  );
}

interface IconSettingsProps extends LucideProps {
  icon: ComponentType<LucideProps>;
}

const Icon = ({ icon: Icon, ...props }: IconSettingsProps) => {
  return (
    <Icon size={24} strokeWidth={1.5} className="text-mbIcon" {...props} />
  );
};

const CurrentTime = () => {
  const date = new Date(),
    time = date.toLocaleTimeString().slice(0, 5),
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone,
    formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: timezone,
      timeZoneName: "short",
    }).format(date);

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="text-mbIcon border-t-mbBorder shrink-0 border-t-[1px] py-2">
            {time}
          </span>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={12} className="mb-2 max-w-48">
          <p>
            Текущее время — {formattedDate} {timezone}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
