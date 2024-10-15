import { SubNav } from "@/components/navbar/subnav/subnav";
import { Customers } from "@/components/customers/customers";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { createFileRoute } from "@tanstack/react-router";

import { getFromLocalStorage } from "@/lib/utils";
import { Tabs } from "@/features/customers/types";
import { useState } from "react";

export interface CustomersSearchParams {
  tab: Tabs;
}

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: (search): CustomersSearchParams => {
    return {
      tab: (search?.tab as CustomersSearchParams["tab"]) || "all",
    };
  },
});

function Index() {
  const [isCopyrightAlertShown, setIsCopyrightAlertShown] = useState(
    () => getFromLocalStorage<boolean>("mb-copyright") || false,
  );
  return (
    <div className="flex h-full overflow-y-hidden">
      <SubNav />
      <Customers />
      <CopyrightAlert
        isCopyrightAlertShown={isCopyrightAlertShown}
        setIsCopyrightAlertShown={setIsCopyrightAlertShown}
      />
    </div>
  );
}

const CopyrightAlert = ({
  isCopyrightAlertShown,
  setIsCopyrightAlertShown,
}: {
  isCopyrightAlertShown: boolean;
  setIsCopyrightAlertShown: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <AlertDialog open={!isCopyrightAlertShown}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Копирайт</AlertDialogTitle>
        <AlertDialogDescription>
          Этот проект — тестовое задание, разработанное в рамках заявки на
          работу. Это визуальный клон приложения <MindboxLink /> только для
          демонстрационных целей. Все логотипы, товарные знаки и брендинг
          являются собственностью <MindboxLink />.<br />
          Этот проект не связан, не спонсируется и не поддерживается{" "}
          <MindboxLink />.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction
          onClick={() => {
            localStorage.setItem("mb-copyright", JSON.stringify(true));
            setIsCopyrightAlertShown(!isCopyrightAlertShown);
          }}
          className="bg-mbPrimary"
        >
          Ок
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

const MindboxLink = () => (
  <Button variant="link" className="m-0 p-0">
    <a href="https://mindbox.ru/" target="_blank">
      Mindbox
    </a>
  </Button>
);
