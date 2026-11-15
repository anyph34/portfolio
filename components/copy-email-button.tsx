"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { contactDetails } from "@/lib/portfolio";

export function CopyEmailButton() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactDetails.email);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2200);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="copy-email-row">
      <button className="button button-outline" onClick={copyEmail} type="button">
        {status === "copied" ? <Check aria-hidden="true" size={15} /> : <Copy aria-hidden="true" size={15} />}
        {status === "copied" ? "Copied" : "Copy email"}
      </button>
      <span aria-live="polite" className="copy-toast">
        {status === "copied" ? "Email address copied." : null}
        {status === "error" ? "Copy failed. Please select the email address above." : null}
      </span>
    </div>
  );
}
