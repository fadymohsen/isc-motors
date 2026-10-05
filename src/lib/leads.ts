import { put, list } from "@vercel/blob";

export type Lead = {
  id: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  locale: string;
  createdAt: string;
};

const BLOB_PATH = "leads/all.json";

async function read(): Promise<Lead[]> {
  try {
    const { blobs } = await list({ prefix: "leads/all.json" });
    if (blobs.length === 0) return [];
    const blob = blobs[0];
    const url = blob.downloadUrl;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("Blob read error:", err);
    return [];
  }
}

async function write(leads: Lead[]) {
  await put(BLOB_PATH, JSON.stringify(leads), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function addLead(
  data: Omit<Lead, "id" | "createdAt">,
): Promise<Lead> {
  const leads = await read();
  const lead: Lead = {
    ...data,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  leads.unshift(lead);
  await write(leads);
  return lead;
}

export async function getLeads(): Promise<Lead[]> {
  return read();
}

export async function deleteLead(id: string): Promise<boolean> {
  const leads = await read();
  const filtered = leads.filter((l) => l.id !== id);
  if (filtered.length === leads.length) return false;
  await write(filtered);
  return true;
}
