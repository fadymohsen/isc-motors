"use client";

import { useCallback, useEffect, useState } from "react";
import { ConfirmModal } from "@/components/Modal";

type Lead = {
  id: string;
  type?: "exhibitor" | "visitor";
  name: string;
  email: string;
  phone: string;
  locale: string;
  createdAt: string;
  company?: string;
  interest?: string;
  referral?: string;
  jobTitle?: string;
};

type Tab = "all" | "exhibitor" | "visitor";

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      setLeads(data);
    } catch {
      /* empty */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const filtered =
    tab === "all"
      ? leads
      : leads.filter((l) => (l.type ?? "exhibitor") === tab);

  const exhibitors = leads.filter((l) => (l.type ?? "exhibitor") === "exhibitor");
  const visitors = leads.filter((l) => (l.type ?? "exhibitor") === "visitor");

  async function handleDelete(id: string) {
    await fetch(`/api/leads?id=${id}`, { method: "DELETE" });
    setLeads((prev) => prev.filter((l) => l.id !== id));
  }

  function exportCSV() {
    if (filtered.length === 0) return;
    const isVisitor = tab === "visitor";
    const headers = isVisitor
      ? ["Date", "Name", "Email", "Phone", "Job Title", "Referral", "Locale"]
      : tab === "exhibitor"
        ? ["Date", "Company", "Name", "Email", "Phone", "Interest", "Locale"]
        : ["Date", "Type", "Name", "Email", "Phone", "Company/Referral", "Interest/Job Title", "Locale"];
    const rows = filtered.map((l) => {
      if (tab === "visitor")
        return [fmtDate(l.createdAt), l.name, l.email, l.phone, l.jobTitle ?? "", l.referral ?? "", l.locale];
      if (tab === "exhibitor")
        return [fmtDate(l.createdAt), l.company ?? "", l.name, l.email, l.phone, l.interest ?? "", l.locale];
      return [
        fmtDate(l.createdAt),
        l.type ?? "exhibitor",
        l.name,
        l.email,
        l.phone,
        l.company || l.referral || "",
        l.interest || l.jobTitle || "",
        l.locale,
      ];
    });
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `jims-${tab}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-[100svh] bg-dark p-5 md:p-10">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-4xl uppercase tracking-tightest2 text-white md:text-5xl">
              Leads Dashboard
            </h1>
            <p className="mt-1 font-mono text-xs uppercase tracking-wide text-white/50">
              JIMS 2026 · {leads.length} total
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchLeads}
              className="border border-white/20 px-4 py-2 font-mono text-xs uppercase tracking-wide text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              Refresh
            </button>
            <button
              onClick={exportCSV}
              disabled={filtered.length === 0}
              className="bg-red px-4 py-2 font-mono text-xs uppercase tracking-wide text-white transition-colors hover:bg-[#e00e0f] disabled:opacity-40"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
          {[
            { label: "Total", value: leads.length },
            { label: "Exhibitors", value: exhibitors.length },
            { label: "Visitors", value: visitors.length },
            { label: "Today", value: leads.filter((l) => new Date(l.createdAt).toDateString() === new Date().toDateString()).length },
            { label: "Arabic", value: leads.filter((l) => l.locale === "ar").length },
          ].map((s) => (
            <div key={s.label} className="border border-white/10 bg-dark2 p-5">
              <p className="font-display text-3xl uppercase tracking-tightest2 text-white">{s.value}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-white/50">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-1">
          {([
            { key: "all" as Tab, label: `All (${leads.length})` },
            { key: "exhibitor" as Tab, label: `Exhibitors (${exhibitors.length})` },
            { key: "visitor" as Tab, label: `Visitors (${visitors.length})` },
          ]).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-2.5 font-mono text-xs uppercase tracking-wide transition-colors ${
                tab === t.key
                  ? "bg-red text-white"
                  : "bg-dark2 text-white/50 hover:text-white/80"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto">
          {loading ? (
            <p className="py-20 text-center font-mono text-sm uppercase text-white/50">Loading…</p>
          ) : filtered.length === 0 ? (
            <div className="border border-white/10 bg-dark2 py-20 text-center">
              <p className="font-display text-2xl uppercase tracking-tightest2 text-white/40">No leads yet</p>
              <p className="mt-2 font-mono text-xs uppercase text-white/30">
                {tab === "visitor" ? "Visitor registrations from /visit will appear here" : "Exhibitor leads from /register will appear here"}
              </p>
            </div>
          ) : (
            <table className="w-full min-w-[900px] border-collapse text-start">
              <thead>
                <tr className="border-b border-white/15">
                  {tab === "visitor"
                    ? ["Date", "Name", "Email", "Phone", "Job Title", "Referral", "Lang", ""].map((h) => (
                        <th key={h} className="px-4 py-3 text-start font-mono text-[11px] uppercase tracking-[0.15em] text-white/50">{h}</th>
                      ))
                    : tab === "exhibitor"
                      ? ["Date", "Company", "Name", "Email", "Phone", "Interest", "Lang", ""].map((h) => (
                          <th key={h} className="px-4 py-3 text-start font-mono text-[11px] uppercase tracking-[0.15em] text-white/50">{h}</th>
                        ))
                      : ["Date", "Type", "Name", "Email", "Phone", "Details", "Lang", ""].map((h) => (
                          <th key={h} className="px-4 py-3 text-start font-mono text-[11px] uppercase tracking-[0.15em] text-white/50">{h}</th>
                        ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-white/5 transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="whitespace-nowrap px-4 py-3.5 font-mono text-xs text-white/60">
                      {new Date(lead.createdAt).toLocaleDateString()}{" "}
                      <span className="text-white/30">
                        {new Date(lead.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </td>

                    {tab === "all" && (
                      <td className="px-4 py-3.5">
                        <span className={`inline-block px-2.5 py-1 font-mono text-[10px] uppercase ${
                          (lead.type ?? "exhibitor") === "visitor"
                            ? "bg-purple-900/40 text-purple-400"
                            : "bg-amber-900/40 text-amber-400"
                        }`}>
                          {lead.type ?? "exhibitor"}
                        </span>
                      </td>
                    )}

                    {tab === "exhibitor" && (
                      <td className="px-4 py-3.5 font-display text-sm uppercase tracking-tightest2 text-white">
                        {lead.company}
                      </td>
                    )}

                    <td className="px-4 py-3.5 text-sm text-white/90">{lead.name}</td>
                    <td className="px-4 py-3.5">
                      <a href={`mailto:${lead.email}`} className="text-sm text-red hover:underline">{lead.email}</a>
                    </td>
                    <td className="px-4 py-3.5">
                      <a href={`tel:${lead.phone}`} className="font-mono text-sm text-white/70 hover:text-white">{lead.phone}</a>
                    </td>

                    {tab === "visitor" ? (
                      <>
                        <td className="px-4 py-3.5 text-sm text-white/70">{lead.jobTitle}</td>
                        <td className="px-4 py-3.5 text-sm text-white/70">{lead.referral}</td>
                      </>
                    ) : tab === "exhibitor" ? (
                      <td className="px-4 py-3.5">
                        <span className="inline-block border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[11px] uppercase text-white/70">
                          {lead.interest}
                        </span>
                      </td>
                    ) : (
                      <td className="px-4 py-3.5 text-sm text-white/60">
                        {lead.company || lead.referral || "—"}
                        {(lead.interest || lead.jobTitle) && (
                          <span className="ms-2 text-white/40">· {lead.interest || lead.jobTitle}</span>
                        )}
                      </td>
                    )}

                    <td className="px-4 py-3.5">
                      <span className={`inline-block px-2 py-0.5 font-mono text-[10px] uppercase ${
                        lead.locale === "ar" ? "bg-green-900/40 text-green-400" : "bg-blue-900/40 text-blue-400"
                      }`}>
                        {lead.locale}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => setDeleteId(lead.id)}
                        className="font-mono text-[11px] uppercase text-white/30 transition-colors hover:text-red"
                        title="Delete"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <ConfirmModal
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => { if (deleteId) handleDelete(deleteId); }}
        title="Delete Lead"
        message="This action cannot be undone. Are you sure?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />
    </div>
  );
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString();
}
