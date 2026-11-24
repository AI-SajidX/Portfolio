"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  Loader2,
  Send,
} from "lucide-react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";
import MagneticButton from "./MagneticButton";

const SOCIAL_CARDS = [
  {
    name: "GitHub",
    handle: "@AI-SajidX",
    href: "https://github.com/AI-SajidX",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    handle: "Ahmed Ibrahim Sajid",
    href: "https://www.linkedin.com/feed/",
    icon: FaLinkedinIn,
  },
  {
    name: "Facebook",
    handle: "ahmed.ibrahim.sajid",
    href: "https://www.facebook.com/ahmed.ibrahim.sajid",
    icon: FaFacebookF,
  },
];

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (form.name.trim().length < 2) {
      nextErrors.name = "Please enter your name (at least 2 characters).";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (form.subject.trim().length < 3) {
      nextErrors.subject = "Please enter a subject (at least 3 characters).";
    }
    if (form.message.trim().length < 10) {
      nextErrors.message = "Please enter a message (at least 10 characters).";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "idle", message: "" });

    if (!validate()) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setStatus({
          type: "success",
          message: data.message || "Your message has been sent!",
        });
        setForm(INITIAL_FORM);
      } else if (response.status === 503 && data.configured === false) {
        setStatus({
          type: "setup",
          message: data.error,
        });
      } else {
        setStatus({
          type: "error",
          message:
            data.error || "Unable to send your message right now. Please try again.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Network error while sending your message. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase =
    "w-full rounded-2xl border bg-[#080B12]/75 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-[#00D4FF]/70 focus:ring-2 focus:ring-[#3264FF]/30";

  return (
    <section
      id="contact"
      className="relative z-10 py-24 sm:py-28 px-4 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's Build"
          highlight="Something Together"
          subtitle="Have an idea, project, or opportunity? I'd love to connect and discuss it."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
          {/* Left Connect Info Column */}
          <div className="gsap-reveal lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Connect with SajidX
                </h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  Whether you want to collaborate on a web project, discuss
                  frontend engineering, or share an opportunity, feel free to
                  reach out using the form or connect directly via my profiles.
                </p>

                <div className="mt-6 space-y-3">
                  {SOCIAL_CARDS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 4 }}
                        className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3.5 hover:border-[#3264FF]/45 hover:bg-[#3264FF]/10 transition-colors"
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3264FF]/15 border border-[#3264FF]/30 text-[#00D4FF]">
                            <Icon className="h-4 w-4" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-white">
                              {item.name}
                            </p>
                            <p className="text-xs font-mono text-slate-400">
                              {item.handle}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-[#00D4FF]">
                          Visit →
                        </span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Honest Integration Note */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-[#080B12]/70 p-4 text-xs text-slate-400 leading-relaxed">
                <p className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                  <Info className="h-3.5 w-3.5 text-[#00D4FF]" />
                  <span>Contact Form Delivery Setup</span>
                </p>
                <p>
                  The form connects to{" "}
                  <code className="font-mono text-[#00D4FF]">/api/contact</code>.
                  Set{" "}
                  <code className="font-mono text-slate-200">RESEND_API_KEY</code>{" "}
                  +{" "}
                  <code className="font-mono text-slate-200">
                    CONTACT_TO_EMAIL
                  </code>{" "}
                  (or{" "}
                  <code className="font-mono text-slate-200">
                    FORMSPREE_ENDPOINT
                  </code>
                  ) in <code className="font-mono text-slate-200">.env.local</code>{" "}
                  to enable live inbox delivery.
                </p>
              </div>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="gsap-reveal lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="glass-panel rounded-3xl p-6 sm:p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange("name")}
                    placeholder="Your full name"
                    className={`${inputBase} ${
                      errors.name ? "border-rose-400/70" : "border-white/10"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-rose-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder="you@example.com"
                    className={`${inputBase} ${
                      errors.email ? "border-rose-400/70" : "border-white/10"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-rose-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange("subject")}
                  placeholder="Project inquiry, collaboration, or opportunity"
                  className={`${inputBase} ${
                    errors.subject ? "border-rose-400/70" : "border-white/10"
                  }`}
                />
                {errors.subject && (
                  <p className="mt-1.5 text-xs text-rose-400">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange("message")}
                  placeholder="Tell me about your idea, project scope, or opportunity..."
                  className={`${inputBase} resize-none ${
                    errors.message ? "border-rose-400/70" : "border-white/10"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-rose-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Status Feedback */}
              {status.type !== "idle" && (
                <div
                  role="status"
                  className={`flex items-start gap-3 rounded-2xl border p-4 text-xs sm:text-sm ${
                    status.type === "success"
                      ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-200"
                      : status.type === "setup"
                      ? "border-[#00D4FF]/40 bg-[#00D4FF]/10 text-cyan-100"
                      : "border-rose-400/40 bg-rose-500/10 text-rose-200"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-400" />
                  ) : status.type === "setup" ? (
                    <Info className="h-4 w-4 shrink-0 mt-0.5 text-[#00D4FF]" />
                  ) : (
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-400" />
                  )}
                  <p className="leading-relaxed">{status.message}</p>
                </div>
              )}

              <div className="pt-1">
                <MagneticButton>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-glow-primary inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </MagneticButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
