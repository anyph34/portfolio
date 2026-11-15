"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";

// Create a free Web3Forms key for anyphbett9@gmail.com, then add it as
// NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local and your hosting provider's environment settings.
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

type FormFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Web3FormsResponse = {
  success: boolean;
  message?: string;
};

function isWeb3FormsResponse(value: unknown): value is Web3FormsResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "success" in value &&
    typeof value.success === "boolean" &&
    (!("message" in value) || typeof value.message === "string")
  );
}

const initialFields: FormFields = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [fields, setFields] = useState(initialFields);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("error");
      setStatusMessage("The form is not connected yet. Please email Anyph directly while it is being configured.");
      return;
    }

    setStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          ...fields,
          from_name: "Anyph Kipngetich Portfolio",
        }),
      });
      const result: unknown = await response.json();

      if (!response.ok || !isWeb3FormsResponse(result) || !result.success) {
        const detail = isWeb3FormsResponse(result) ? result.message : undefined;
        throw new Error(detail || "The message could not be sent. Please try again or email directly.");
      }

      setFields(initialFields);
      setStatus("success");
      setStatusMessage("Thanks for reaching out. Your message has been sent.");
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error ? error.message : "The message could not be sent. Please email directly.",
      );
    }
  };

  const updateField = (field: keyof FormFields, value: string) => {
    setFields((current) => ({ ...current, [field]: value }));
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <h2>Send a note</h2>
        <p>Share a little about what you are building or looking for.</p>
      </div>
      <div className="form-field">
        <label htmlFor="contact-name">Name</label>
        <input
          autoComplete="name"
          id="contact-name"
          name="name"
          onChange={(event) => updateField("name", event.target.value)}
          placeholder="Your name"
          required
          value={fields.name}
        />
      </div>
      <div className="form-field">
        <label htmlFor="contact-email">Email</label>
        <input
          autoComplete="email"
          id="contact-email"
          name="email"
          onChange={(event) => updateField("email", event.target.value)}
          placeholder="you@example.com"
          required
          type="email"
          value={fields.email}
        />
      </div>
      <div className="form-field full-width">
        <label htmlFor="contact-subject">Subject</label>
        <input
          id="contact-subject"
          name="subject"
          onChange={(event) => updateField("subject", event.target.value)}
          placeholder="What would you like to discuss?"
          required
          value={fields.subject}
        />
      </div>
      <div className="form-field full-width">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="A few details are plenty..."
          required
          rows={6}
          value={fields.message}
        />
      </div>
      <p aria-live="polite" className={`form-status${status === "success" ? " is-success" : ""}${status === "error" ? " is-error" : ""}`}>
        {statusMessage}
      </p>
      <button className="button button-primary form-submit" disabled={status === "sending"} type="submit">
        {status === "sending" ? "Sending..." : "Send message"}
        <ArrowUpRight aria-hidden="true" size={15} />
      </button>
    </form>
  );
}
