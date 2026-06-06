"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { LoginForm } from "@/components/admin/LoginForm";
import { AdminHeader, type AdminTab } from "@/components/admin/AdminHeader";
import { MenuEditor } from "@/components/admin/MenuEditor";
import { ReservationPanel } from "@/components/admin/ReservationPanel";

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>("menu");
  const isValid = useQuery(api.auth.verifySession, token ? { token } : "skip");
  const logout = useMutation(api.auth.logout);
  const pendingReservations = useQuery(
    api.reservations.listPending,
    token && isValid ? { token } : "skip"
  );

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    sessionStorage.setItem("admin_token", newToken);
  };

  const handleLogout = async () => {
    if (token) await logout({ token });
    setToken(null);
    sessionStorage.removeItem("admin_token");
  };

  if (token && isValid === undefined) {
    return (
      <div className="min-h-screen bg-[var(--color-ivory)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[var(--color-stone)] border-t-[var(--color-gold)] rounded-full animate-spin" />
          <p className="text-[var(--color-text-muted)] text-sm">Načítání...</p>
        </div>
      </div>
    );
  }

  if (token && isValid === false) {
    sessionStorage.removeItem("admin_token");
    return <LoginForm onLogin={handleLogin} />;
  }

  if (!token) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[var(--color-ivory)]">
      <AdminHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        pendingCount={pendingReservations?.length ?? 0}
      />
      <main className="lg:pl-72">
        {activeTab === "menu" ? (
          <MenuEditor token={token} />
        ) : (
          <ReservationPanel token={token} />
        )}
      </main>
    </div>
  );
}
