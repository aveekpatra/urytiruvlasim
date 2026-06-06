"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { HugeiconsIcon } from "@hugeicons/react";
import { LockKeyIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

export function LoginForm({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useMutation(api.auth.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await login({ password });
      onLogin(token);
    } catch {
      setError("Nesprávné heslo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--color-gold)]/[0.03] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--color-gold)]/[0.04] rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white border border-[var(--color-stone)]/60 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
          {/* Brand */}
          <div className="px-10 pt-12 pb-8 text-center border-b border-[var(--color-stone)]/40">
            <div className="inline-flex items-center justify-center w-14 h-14 border border-[var(--color-gold)]/40 mb-5">
              <span className="font-serif text-2xl text-[var(--color-gold-dark)]">A</span>
            </div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-2">
              Restaurace Adéla
            </p>
            <h1 className="font-serif text-3xl text-[var(--color-charcoal)]">
              Administrace
            </h1>
            <div className="w-12 h-px bg-[var(--color-gold)] mx-auto mt-5" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-10 space-y-5">
            <div>
              <label
                htmlFor="admin-password"
                className="block text-[10px] tracking-[0.25em] uppercase text-[var(--color-text-muted)] mb-2.5"
              >
                Heslo
              </label>
              <div className="relative">
                <HugeiconsIcon
                  icon={LockKeyIcon}
                  size={16}
                  strokeWidth={1.5}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                />
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Zadejte heslo"
                  autoFocus
                  className="w-full pl-11 pr-4 py-3.5 border border-[var(--color-stone)] bg-[var(--color-cream)] text-[var(--color-charcoal)] text-sm focus:outline-none focus:border-[var(--color-gold)] focus:bg-white transition-colors"
                />
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-100 text-red-700 text-xs">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[var(--color-charcoal)] text-white text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[var(--color-gold)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[var(--color-charcoal)]"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Přihlašování
                </>
              ) : (
                <>
                  Přihlásit se
                  <HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={1.5} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-muted)]/70 mt-8">
          U Blanických rytířů · Vlašim
        </p>
      </div>
    </div>
  );
}
