"use client";

import { useCallback, useEffect, useState } from "react";

type Lead = {
  id: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  locale: string;
  createdAt: string;
};

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

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

  async function handleDelete(id: string) {
    if (!confirm("Delete this lead?")) return;
    await fetch(`/api/leads?id=${id}`, { method: "DELETE" });
    setLeads((prev) => prev.filter((l) => l.id !== id));
  }

  function exportCSV() {
    if (leads.length === 0) return;
    const headers = ["Date", "Company", "Name", "Email", "Phone", "Interest", "Locale"];
    const rows = leads.map((l) => [
      new Date(l.createdAt).toLocaleString(),
      l.company,
      l.name,
      l.email,
      l.phone,
      l.interest,
      l.locale,
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `jims-leads-${new Date().toISOString().slice(0, 10)}.csv`;
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
              JIMS 2026 · {leads.length} total leads
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
              disabled={leads.length === 0}
              className="bg-red px-4 py-2 font-mono text-xs uppercase tracking-wide text-white transition-colors hover:bg-[#e00e0f] disabled:opacity-40"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {[
            { label: "Total", value: leads.length },
            { label: "Today", value: leads.filter((l) => new Date(l.createdAt).toDateString() === new Date().toDateString()).length },
            { label: "Arabic", value: leads.filter((l) => l.locale === "ar").length },
            { label: "English", value: leads.filter((l) => l.locale === "en").length },
          ].map((s) => (
            <div key={s.label} className="border border-white/10 bg-dark2 p-5">
              <p className="font-display text-3xl uppercase tracking-tightest2 text-white">{s.value}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-white/50">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="mt-8 overflow-x-auto">
          {loading ? (
            <p className="py-20 text-center font-mono text-sm uppercase text-white/50">Loading…</p>
          ) : leads.length === 0 ? (
            <div className="border border-white/10 bg-dark2 py-20 text-center">
              <p className="font-display text-2xl uppercase tracking-tightest2 text-white/40">No leads yet</p>
              <p className="mt-2 font-mono text-xs uppercase text-white/30">Leads from /register will appear here</p>
            </div>
          ) : (
            <table className="w-full min-w-[900px] border-collapse text-start">
              <thead>
                <tr className="border-b border-white/15">
                  {["Date", "Company", "Name", "Email", "Phone", "Interest", "Lang", ""].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-start font-mono text-[11px] uppercase tracking-[0.15em] text-white/50"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
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
                    <td className="px-4 py-3.5 font-display text-sm uppercase tracking-tightest2 text-white">
                      {lead.company}
                    </td>
                    <td className="px-4 py-3.5 text-sm text-white/90">{lead.name}</td>
                    <td className="px-4 py-3.5">
                      <a href={`mailto:${lead.email}`} className="text-sm text-red hover:underline">
                        {lead.email}
                      </a>
                    </td>
                    <td className="px-4 py-3.5">
                      <a href={`tel:${lead.phone}`} className="font-mono text-sm text-white/70 hover:text-white">
                        {lead.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-block border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[11px] uppercase text-white/70">
                        {lead.interest}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-block px-2 py-0.5 font-mono text-[10px] uppercase ${lead.locale === "ar" ? "bg-green-900/40 text-green-400" : "bg-blue-900/40 text-blue-400"}`}>
                        {lead.locale}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="font-mono text-[11px] uppercase text-white/30 transition-colors hover:text-red"
                        title="Delete lead"
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
    </div>
  );
}
