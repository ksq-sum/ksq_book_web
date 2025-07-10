"use client";
import React from "react";
import { PinContainer } from "./ui/3d-pin";

export function FinanceDashboardDemo() {
  return (
    <div className="h-[25rem] w-full flex items-center justify-center">
      <PinContainer
        title="Finance Dashboard"
        href="https://ui.aceternity.com/components"
        
      >
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[18rem] h-[16rem] bg-gradient-to-br from-slate-800 to-slate-900">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
            Finance Dashboard
          </h3>
          <div className="text-sm !m-0 !p-0 font-normal">
            <span className="text-slate-500">
              Interactive data visualization platform for financial analysts.
            </span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500" />
        </div>
      </PinContainer>
    </div>
  );
} 