import { readFile, writeFile } from "fs/promises";
import { join } from "path";

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

const FILE = join(process.cwd(), "data", "leads.json");

async function read(): Promise<Lead[]> {
  try {
    const raw = await readFile(FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function write(leads: Lead[]) {
  await writeFile(FILE, JSON.stringify(leads, null, 2), "utf-8");
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
