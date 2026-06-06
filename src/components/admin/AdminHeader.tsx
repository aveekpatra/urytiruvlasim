"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Restaurant01Icon,
  Calendar03Icon,
  Logout01Icon,
  Menu02Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";

export type AdminTab = "menu" | "reservations";

interface AdminHeaderProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onLogout: () => void;
  pendingCount?: number;
}

const tabs: {
  id: AdminTab;
  label: string;
  hint: string;
  icon: typeof Restaurant01Icon;
}[] = [
  {
    id: "menu",
    label: "Denní menu",
    hint: "Polévka, hlavní jídla, dezerty",
    icon: Restaurant01Icon,
  },
  {
    id: "reservations",
    label: "Rezervace",
    hint: "Čekající a potvrzené",
    icon: Calendar03Icon,
  },
];

export function AdminHeader({
  activeTab,
  onTabChange,
  onLogout,
  pendingCount = 0,
}: AdminHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleTabSelect = (tab: AdminTab) => {
    onTabChange(tab);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-[var(--color-charcoal)] text-white">
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-[var(--color-gold)]/40 flex items-center justify-center">
              <span className="font-serif text-sm text-[var(--color-gold)]">A</span>
            </div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/70">
              Administrace
            </p>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 -mr-2 text-white/80 hover:text-white"
            aria-label="Menu"
          >
            <HugeiconsIcon
              icon={mobileOpen ? Cancel01Icon : Menu02Icon}
              size={22}
              strokeWidth={1.5}
            />
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-white/10 px-3 py-3 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabSelect(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                  activeTab === tab.id
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                )}
              >
                <HugeiconsIcon icon={tab.icon} size={18} strokeWidth={1.5} />
                <span className="text-sm">{tab.label}</span>
                {tab.id === "reservations" && pendingCount > 0 && (
                  <span className="ml-auto inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-semibold bg-[var(--color-gold)] text-[var(--color-charcoal)] rounded-full">
                    {pendingCount}
                  </span>
                )}
              </button>
            ))}
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-white/60 hover:bg-white/5 hover:text-white transition-colors"
            >
              <HugeiconsIcon icon={Logout01Icon} size={18} strokeWidth={1.5} />
              <span className="text-sm">Odhlásit se</span>
            </button>
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-72 bg-[var(--color-charcoal)] text-white flex-col z-30">
        {/* Brand */}
        <div className="px-8 pt-10 pb-12">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 border border-[var(--color-gold)]/50 flex items-center justify-center">
              <span className="font-serif text-xl text-[var(--color-gold)]">A</span>
            </div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/70">
              Administrace
            </p>
          </div>
        </div>

        {/* Section label */}
        <div className="px-8 mb-3">
          <p className="text-[9px] tracking-[0.3em] uppercase text-white/35">
            Sekce
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 space-y-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabSelect(tab.id)}
                className={cn(
                  "group w-full flex items-start gap-3 px-4 py-3.5 text-left transition-all relative",
                  isActive
                    ? "bg-white/[0.06] text-white"
                    : "text-white/65 hover:bg-white/[0.03] hover:text-white"
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--color-gold)]" />
                )}
                <HugeiconsIcon
                  icon={tab.icon}
                  size={20}
                  strokeWidth={1.5}
                  className={cn(
                    "mt-0.5 shrink-0 transition-colors",
                    isActive ? "text-[var(--color-gold)]" : "text-white/55 group-hover:text-white/80"
                  )}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{tab.label}</span>
                    {tab.id === "reservations" && pendingCount > 0 && (
                      <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-semibold bg-[var(--color-gold)] text-[var(--color-charcoal)] rounded-full">
                        {pendingCount}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-white/40 mt-0.5 leading-snug">
                    {tab.hint}
                  </p>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 pb-8 pt-4 border-t border-white/[0.08] mx-4">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-white/55 hover:bg-white/[0.03] hover:text-white transition-colors"
          >
            <HugeiconsIcon icon={Logout01Icon} size={18} strokeWidth={1.5} />
            <span className="text-sm">Odhlásit se</span>
          </button>
        </div>
      </aside>
    </>
  );
}
