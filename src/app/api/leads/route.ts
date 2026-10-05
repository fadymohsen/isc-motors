import { NextRequest, NextResponse } from "next/server";
import { addLead, getLeads, deleteLead } from "@/lib/leads";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { company, name, email, phone, interest, locale } = body;

    if (!company || !name || !email || !phone) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const lead = await addLead({
      company,
      name,
      email,
      phone,
      interest: interest || "",
      locale: locale || "en",
    });

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const leads = await getLeads();
  return NextResponse.json(leads);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const ok = await deleteLead(id);
  if (!ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
