import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const body = await request.json();
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const subject = String(body?.subject || "").trim();
    const message = String(body?.message || "").trim();

    if (!name || name.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Please enter your name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!subject || subject.length < 3) {
      return NextResponse.json(
        { ok: false, error: "Please enter a subject (at least 3 characters)." },
        { status: 400 }
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Please write a message (at least 10 characters)." },
        { status: 400 }
      );
    }

    // Option 1: Resend API if configured
    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || "SajidX Portfolio <onboarding@resend.dev>";

    if (resendKey && toEmail) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: email,
          subject: `[SajidX Portfolio] ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
        }),
      });

      if (!resendRes.ok) {
        return NextResponse.json(
          {
            ok: false,
            error: "The mail provider rejected the request. Please try again later.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json({
        ok: true,
        message: "Thank you! Your message has been delivered successfully.",
      });
    }

    // Option 2: Formspree endpoint if configured
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;
    if (formspreeEndpoint) {
      const formRes = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!formRes.ok) {
        return NextResponse.json(
          {
            ok: false,
            error: "Form relay service failed to accept your message.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json({
        ok: true,
        message: "Thank you! Your message has been sent successfully.",
      });
    }

    // Honest unconfigured state — never pretend a message was sent
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        error:
          "Email delivery is not configured on this deployment yet. Configure RESEND_API_KEY + CONTACT_TO_EMAIL (or FORMSPREE_ENDPOINT) in environment variables to enable live form submissions.",
      },
      { status: 503 }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
