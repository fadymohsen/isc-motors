import { put, list, del } from "@vercel/blob";

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
    const { blobs } = await list({ prefix: "leads/" });
    const match = blobs.find((b) => b.pathname === BLOB_PATH);
    if (!match) return [];
    const res = await fetch(match.downloadUrl);
    return res.json();
  } catch {
    return [];
  }
}

async function write(leads: Lead[]) {
  await put(BLOB_PATH, JSON.stringify(leads), {
    access: "public",
    addRandomSuffix: false,
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
