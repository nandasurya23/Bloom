"use client";

import type { ChangeEvent, FormEvent, JSX } from "react";
import { useState } from "react";
import { FiMail, FiMessageCircle } from "react-icons/fi";

type ContactFormState = {
  name: string;
  email: string;
  message: string;
};

const INITIAL_CONTACT_FORM: ContactFormState = {
  name: "",
  email: "",
  message: ""
};

export function ContactSection(): JSX.Element {
  const [form, setForm] = useState<ContactFormState>(INITIAL_CONTACT_FORM);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const updateField =
    (field: keyof ContactFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setForm((previous) => ({
        ...previous,
        [field]: event.target.value
      }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSubmitted(true);
    setForm(INITIAL_CONTACT_FORM);
  };

  return (
    <section className="mt-14 grid gap-6 rounded-3xl border border-bloom-rose/40 bg-white p-8 sm:grid-cols-2 sm:p-10">
      <div>
        <h2 className="text-2xl font-semibold text-bloom-ink sm:text-3xl">Contact Us</h2>
        <p className="mt-3 text-sm text-bloom-ink/75">
          Need a custom arrangement or urgent same-day bouquet? Reach out and our team will assist.
        </p>
        <div className="mt-5 space-y-3 text-sm text-bloom-ink/80">
          <a href="mailto:hello@bloomflowershop.com" className="inline-flex items-center gap-2">
            <FiMail /> hello@bloomflowershop.com
          </a>
          <a href="https://wa.me/628123456789" className="inline-flex items-center gap-2">
            <FiMessageCircle /> +62 812-3456-789
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={form.name}
          onChange={updateField("name")}
          placeholder="Your name"
          className="w-full rounded-md border border-bloom-rose/60 px-3 py-2 text-sm"
          required
        />
        <input
          type="email"
          value={form.email}
          onChange={updateField("email")}
          placeholder="Your email"
          className="w-full rounded-md border border-bloom-rose/60 px-3 py-2 text-sm"
          required
        />
        <textarea
          value={form.message}
          onChange={updateField("message")}
          placeholder="How can we help?"
          rows={4}
          className="w-full rounded-md border border-bloom-rose/60 px-3 py-2 text-sm"
          required
        />
        <button type="submit" className="rounded-full border border-bloom-rose/60 px-4 py-2 text-sm font-medium">
          Send Message
        </button>
        {submitted ? <p className="text-xs text-bloom-leaf">Message sent. We will reply soon.</p> : null}
      </form>
    </section>
  );
}
