"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex justify-end pt-8 px-2 md:px-8">
      <Button
        className="bg-transparent shadow-none"
        variant={"outline"}
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <SunIcon className="hidden dark:block h-[1.2rem] w-[1.2rem] transition-all" />
        <MoonIcon className="dark:hidden h-[1.2rem] w-[1.2rem] transition-all" />
      </Button>
    </div>
  );
}
