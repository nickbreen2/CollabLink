"use client";

import * as React from "react";
import HandleBar from "./HandleBar";
import { cn } from "@/lib/utils";

type DashboardHeaderProps = {
  title: string;
  subtitle?: string;
  handle?: string | null;
  right?: React.ReactNode;
  showHandleBar?: boolean;
  className?: string;
  badge?: React.ReactNode;
};

export default function DashboardHeader({
  title,
  subtitle,
  handle,
  right,
  showHandleBar = true,
  className,
  badge,
}: DashboardHeaderProps) {
  return (
    <div className={cn("sticky top-0 z-[100] bg-gray-50 dark:bg-gray-900 border-b", className)}>
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-start gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
              {badge}
            </div>
            {subtitle && (
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          <div className="w-full sm:w-auto sm:ml-auto">
            {right !== undefined ? (
              right
            ) : showHandleBar && handle ? (
              <div className="hidden lg:block">
                <HandleBar handle={handle} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

