"use client";

import { useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Doc } from "../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";

type Reservation = Doc<"reservations">;
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  Clock01Icon,
  UserGroupIcon,
  CallIcon,
  Mail01Icon,
  NoteIcon,
  Tick02Icon,
  Cancel01Icon,
  InboxIcon,
  CheckmarkCircle02Icon,
  AlertCircleIcon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";

type StatusKey = "pending" | "confirmed" | "rejected";
type FilterKey = "all" | StatusKey;

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("cs-CZ", {
    weekday: "short",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

function formatShortDate(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "numeric",
  });
}

function formatCreatedAt(ts: number) {
  return new Date(ts).toLocaleString("cs-CZ", {
    day: "numeric",
    month: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function pluralGuests(n: number) {
  return n === 1 ? "osoba" : n < 5 ? "osoby" : "osob";
}

const statusConfig: Record<
  StatusKey,
  { label: string; pill: string; dot: string; icon: typeof Tick02Icon }
> = {
  pending: {
    label: "Čeká",
    pill: "bg-amber-50 text-amber-800 border-amber-200",
    dot: "bg-amber-500",
    icon: SparklesIcon,
  },
  confirmed: {
    label: "Potvrzeno",
    pill: "bg-green-50 text-green-800 border-green-200",
    dot: "bg-green-600",
    icon: CheckmarkCircle02Icon,
  },
  rejected: {
    label: "Zamítnuto",
    pill: "bg-red-50 text-red-800 border-red-200",
    dot: "bg-red-500",
    icon: Cancel01Icon,
  },
};

function StatusPill({ status }: { status: StatusKey }) {
  const cfg = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] tracking-[0.15em] uppercase border",
        cfg.pill
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)} />
      {cfg.label}
    </span>
  );
}

function StatCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: number | string;
  icon: typeof InboxIcon;
  accent?: "gold" | "green" | "amber" | "neutral";
}) {
  const accents = {
    gold: "text-[var(--color-gold-dark)]",
    green: "text-green-700",
    amber: "text-amber-700",
    neutral: "text-[var(--color-charcoal)]",
  };
  return (
    <div className="bg-white border border-[var(--color-stone)]/60 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-text-muted)]">
            {label}
          </p>
          <p
            className={cn(
              "font-serif text-3xl mt-2 tabular-nums",
              accents[accent || "neutral"]
            )}
          >
            {value}
          </p>
        </div>
        <div
          className={cn(
            "w-10 h-10 flex items-center justify-center bg-[var(--color-ivory)]",
            accents[accent || "neutral"]
          )}
        >
          <HugeiconsIcon icon={icon} size={18} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}

function PendingCard({
  r,
  busy,
  error,
  onAction,
}: {
  r: Reservation;
  busy: boolean;
  error: boolean;
  onAction: (id: string, action: "confirm" | "reject") => void;
}) {
  return (
    <article className="bg-white border border-[var(--color-stone)]/60 shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-[var(--color-stone)]/50 bg-gradient-to-r from-amber-50/30 to-transparent">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-serif text-xl text-[var(--color-charcoal)] truncate">
              {r.name}
            </h3>
            <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
              Přijato {formatCreatedAt(r.createdAt)}
            </p>
          </div>
          <StatusPill status="pending" />
        </div>
      </div>

      {/* Details grid */}
      <div className="px-6 py-5">
        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5">
          <Detail icon={Calendar03Icon} label="Datum" value={formatDate(r.date)} />
          <Detail icon={Clock01Icon} label="Čas" value={r.time} />
          <Detail
            icon={UserGroupIcon}
            label="Hosté"
            value={`${r.guests} ${pluralGuests(r.guests)}`}
          />
          <Detail
            icon={CallIcon}
            label="Telefon"
            value={
              <a
                href={`tel:${r.phone}`}
                className="text-[var(--color-gold-dark)] hover:underline"
              >
                {r.phone}
              </a>
            }
          />
          <Detail
            icon={Mail01Icon}
            label="E-mail"
            value={
              <a
                href={`mailto:${r.email}`}
                className="text-[var(--color-gold-dark)] hover:underline break-all"
              >
                {r.email}
              </a>
            }
            className="col-span-2"
          />
        </dl>

        {(r.occasion || r.notes) && (
          <div className="mt-5 pt-5 border-t border-[var(--color-stone)]/40 space-y-3">
            {r.occasion && (
              <div className="flex items-start gap-2 text-sm">
                <HugeiconsIcon
                  icon={SparklesIcon}
                  size={14}
                  strokeWidth={1.5}
                  className="text-[var(--color-gold-dark)] mt-0.5 shrink-0"
                />
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-muted)] mr-2">
                    Příležitost
                  </span>
                  <span className="text-[var(--color-charcoal)]">{r.occasion}</span>
                </div>
              </div>
            )}
            {r.notes && (
              <div className="flex items-start gap-2 text-sm bg-[var(--color-ivory)] p-3 border-l-2 border-[var(--color-gold)]">
                <HugeiconsIcon
                  icon={NoteIcon}
                  size={14}
                  strokeWidth={1.5}
                  className="text-[var(--color-text-muted)] mt-0.5 shrink-0"
                />
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-1">
                    Poznámka hosta
                  </p>
                  <p className="text-[var(--color-charcoal)] leading-relaxed">
                    {r.notes}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-center gap-2 text-xs text-red-700 bg-red-50 px-3 py-2 border border-red-100">
            <HugeiconsIcon icon={AlertCircleIcon} size={14} strokeWidth={1.5} />
            Chyba při zpracování. Zkuste to znovu.
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-6 py-4 bg-[var(--color-ivory)]/50 border-t border-[var(--color-stone)]/50 flex gap-3">
        <button
          onClick={() => onAction(r._id, "confirm")}
          disabled={busy}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-green-700 text-white text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-green-800 transition-colors disabled:opacity-50"
        >
          {busy ? (
            <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <HugeiconsIcon icon={Tick02Icon} size={14} strokeWidth={1.5} />
          )}
          Potvrdit
        </button>
        <button
          onClick={() => onAction(r._id, "reject")}
          disabled={busy}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 border border-red-300 text-red-700 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={14} strokeWidth={1.5} />
          Zamítnout
        </button>
      </div>
    </article>
  );
}

function Detail({
  icon,
  label,
  value,
  className,
}: {
  icon: typeof Calendar03Icon;
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start gap-2.5 min-w-0", className)}>
      <HugeiconsIcon
        icon={icon}
        size={15}
        strokeWidth={1.5}
        className="text-[var(--color-text-muted)] mt-0.5 shrink-0"
      />
      <div className="min-w-0">
        <dt className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-0.5">
          {label}
        </dt>
        <dd className="text-sm text-[var(--color-charcoal)] font-medium truncate">
          {value}
        </dd>
      </div>
    </div>
  );
}

export function ReservationPanel({ token }: { token: string }) {
  const pending = useQuery(api.reservations.listPending, { token });
  const all = useQuery(api.reservations.listAll, { token });
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());
  const [errorId, setErrorId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterKey>("all");

  const handleAction = async (
    reservationId: string,
    action: "confirm" | "reject"
  ) => {
    setLoadingIds((prev) => new Set(prev).add(reservationId));
    setErrorId(null);
    try {
      const res = await fetch(`/api/reservation/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, reservationId }),
      });
      if (!res.ok) throw new Error("Failed");
    } catch {
      setErrorId(reservationId);
    } finally {
      setLoadingIds((prev) => {
        const next = new Set(prev);
        next.delete(reservationId);
        return next;
      });
    }
  };

  const stats = useMemo(() => {
    const list = all ?? [];
    return {
      total: list.length,
      pending: list.filter((r) => r.status === "pending").length,
      confirmed: list.filter((r) => r.status === "confirmed").length,
      rejected: list.filter((r) => r.status === "rejected").length,
    };
  }, [all]);

  const filteredAll = useMemo(() => {
    if (!all) return [];
    if (filter === "all") return all;
    return all.filter((r) => r.status === filter);
  }, [all, filter]);

  const filterTabs: { key: FilterKey; label: string; count: number }[] = [
    { key: "all", label: "Vše", count: stats.total },
    { key: "pending", label: "Čeká", count: stats.pending },
    { key: "confirmed", label: "Potvrzeno", count: stats.confirmed },
    { key: "rejected", label: "Zamítnuto", count: stats.rejected },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-8 lg:py-10">
      {/* Page header */}
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-2">
          Správa rezervací
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-[var(--color-charcoal)]">
          Rezervace
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-2 max-w-2xl">
          Zpracujte čekající rezervace a prohlédněte si přehled všech rezervací
          od hostů.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard
          label="Čeká na potvrzení"
          value={stats.pending}
          icon={InboxIcon}
          accent="amber"
        />
        <StatCard
          label="Potvrzeno"
          value={stats.confirmed}
          icon={CheckmarkCircle02Icon}
          accent="green"
        />
        <StatCard
          label="Zamítnuto"
          value={stats.rejected}
          icon={Cancel01Icon}
          accent="neutral"
        />
        <StatCard
          label="Celkem"
          value={stats.total}
          icon={Calendar03Icon}
          accent="gold"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8">
        {/* Pending column */}
        <section className="min-w-0">
          <div className="flex items-end justify-between gap-4 mb-5">
            <div>
              <h2 className="font-serif text-xl text-[var(--color-charcoal)]">
                Čekající rezervace
              </h2>
              <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                Vyžadují vaše rozhodnutí — host obdrží e-mail s potvrzením nebo zamítnutím.
              </p>
            </div>
            {stats.pending > 0 && (
              <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 bg-amber-100 text-amber-900 text-xs font-semibold rounded-full">
                {stats.pending}
              </span>
            )}
          </div>

          {pending === undefined && (
            <div className="bg-white border border-[var(--color-stone)]/60 p-10 text-center">
              <div className="w-6 h-6 border-2 border-[var(--color-stone)] border-t-[var(--color-gold)] rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-[var(--color-text-muted)]">Načítání...</p>
            </div>
          )}

          {pending && pending.length === 0 && (
            <div className="bg-white border border-[var(--color-stone)]/60 px-6 py-14 text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-[var(--color-ivory)] text-[var(--color-gold-dark)]">
                <HugeiconsIcon icon={InboxIcon} size={22} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-lg text-[var(--color-charcoal)]">
                Vše vyřízeno
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] mt-1.5">
                Žádné čekající rezervace.
              </p>
            </div>
          )}

          <div className="space-y-5">
            {pending?.map((r) => (
              <PendingCard
                key={r._id}
                r={r}
                busy={loadingIds.has(r._id)}
                error={errorId === r._id}
                onAction={handleAction}
              />
            ))}
          </div>
        </section>

        {/* Sidebar - history with filter */}
        <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
          <div className="bg-white border border-[var(--color-stone)]/60">
            <div className="px-5 py-4 border-b border-[var(--color-stone)]/50">
              <p className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-text-muted)] mb-3">
                Historie rezervací
              </p>
              <div className="flex flex-wrap gap-1">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key)}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] tracking-[0.15em] uppercase transition-colors",
                      filter === tab.key
                        ? "bg-[var(--color-charcoal)] text-white"
                        : "bg-[var(--color-ivory)] text-[var(--color-charcoal)]/70 hover:bg-[var(--color-stone)]/60"
                    )}
                  >
                    {tab.label}
                    <span
                      className={cn(
                        "tabular-nums",
                        filter === tab.key ? "text-white/70" : "text-[var(--color-text-muted)]"
                      )}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="max-h-[640px] overflow-y-auto">
              {all === undefined ? (
                <p className="px-5 py-6 text-xs text-[var(--color-text-muted)]">
                  Načítání...
                </p>
              ) : filteredAll.length === 0 ? (
                <p className="px-5 py-6 text-xs text-[var(--color-text-muted)]">
                  {filter === "all"
                    ? "Zatím žádné rezervace."
                    : "Žádné rezervace v této kategorii."}
                </p>
              ) : (
                <ul className="divide-y divide-[var(--color-stone)]/40">
                  {filteredAll.map((r) => (
                    <li key={r._id} className="px-5 py-3.5">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="text-sm font-medium text-[var(--color-charcoal)] truncate">
                          {r.name}
                        </span>
                        <StatusPill status={r.status as StatusKey} />
                      </div>
                      <p className="text-[11px] text-[var(--color-text-muted)] tabular-nums">
                        {formatShortDate(r.date)} · {r.time} · {r.guests}{" "}
                        {pluralGuests(r.guests)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
