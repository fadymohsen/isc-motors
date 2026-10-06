import { NextRequest, NextResponse } from "next/server";
import { addLead, getLeads, deleteLead } from "@/lib/leads";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, name, email, phone, locale } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (type === "visitor") {
      const lead = await addLead({
        type: "visitor",
        name,
        email,
        phone,
        referral: body.referral || "",
        jobTitle: body.jobTitle || "",
        locale: locale || "en",
      });
      return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
    }

    // Default: exhibitor
    if (!body.company) {
      return NextResponse.json({ error: "Missing company" }, { status: 400 });
    }
    const lead = await addLead({
      type: "exhibitor",
      name,
      email,
      phone,
      company: body.company,
      interest: body.interest || "",
      locale: locale || "en",
    });
    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("POST /api/leads error:", err);
    return NextResponse.json(
      { error: "Server error", detail: String(err) },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json(leads);
  } catch (err) {
    console.error("GET /api/leads error:", err);
    return NextResponse.json(
      { error: "Server error", detail: String(err) },
      { status: 500 },
    );
  }
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
