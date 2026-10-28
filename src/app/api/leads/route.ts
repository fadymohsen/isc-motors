import { NextRequest, NextResponse } from "next/server";
import { addLead, getLeads, deleteLead } from "@/lib/leads";
import { isVisitorType, registrationTeams } from "@/lib/registrationTeams";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, name, email, phone, locale } = body;

    if (!name || !email || !phone || !type) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (type === "visitor") {
      const gender = String(body.gender || "").trim();
      const visitorType = String(body.visitorType || "").trim();
      const referral = String(body.referral || "").trim();
      const jobTitle = String(body.jobTitle || "").trim();

      if (!isVisitorType(visitorType)) {
        return NextResponse.json({ error: "Invalid visitor type" }, { status: 400 });
      }

      // Register with event.sa first. A rejection caused by the visitor's data (duplicate,
      // validation) is reported back; our own problems (auth, 5xx, network) are not held
      // against the visitor — the lead is still saved below.
      const eventSaToken = process.env.EVENT_SA_TOKEN;
      if (eventSaToken) {
        const eventSaPayload = {
          registration_team_id: registrationTeams[visitorType],
          name,
          email,
          phone,
          gender,
          organization_name: referral,
          position: jobTitle,
        };
        console.log("[event.sa] sending payload:", JSON.stringify(eventSaPayload));
        try {
          const extRes = await fetch("https://event.sa/api/v1/registrations", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${eventSaToken}`,
            },
            body: JSON.stringify(eventSaPayload),
          });
          const responseBody = await extRes.text().catch(() => "");
          if (extRes.ok) {
            console.log(`[event.sa] success ${extRes.status}:`, responseBody);
          } else {
            console.error(`[event.sa] error ${extRes.status}:`, responseBody);
            if (extRes.status === 409) {
              return NextResponse.json({ error: "Already registered", reason: "duplicate" }, { status: 409 });
            }
            if (extRes.status >= 400 && extRes.status < 500 && ![401, 403, 429].includes(extRes.status)) {
              return NextResponse.json({ error: "Registration rejected", reason: "rejected" }, { status: 422 });
            }
          }
        } catch (err) {
          console.error("[event.sa] fetch error:", err);
        }
      } else {
        console.warn("[event.sa] EVENT_SA_TOKEN not set — skipping registration");
      }

      const lead = await addLead({
        type: "visitor",
        name,
        email,
        phone,
        gender,
        visitorType,
        referral,
        jobTitle,
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
