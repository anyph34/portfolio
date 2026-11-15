"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { contactDetails } from "@/lib/portfolio";

export function CopyEmailButton() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  const copyWithFallback = () => {
    const textarea = document.createElement("textarea");
    textarea.value = contactDetails.email;
    textarea.setAttribute("readonly", "");
    textarea.setAttribute("aria-hidden", "true");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      if (!document.execCommand("copy")) {
        throw new Error("Clipboard copy was not permitted.");
      }
    } finally {
      textarea.remove();
    }
  };

  const copyEmail = async () => {
    try {
      if (typeof navigator.clipboard?.writeText === "function") {
        try {
          await navigator.clipboard.writeText(contactDetails.email);
        } catch {
          copyWithFallback();
        }
      } else {
        copyWithFallback();
      }
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
        {status === "copied" ? "Copied!" : "Copy email"}
      </button>
      <span aria-live="polite" className="copy-toast">
        {status === "copied" ? "Copied!" : null}
        {status === "error" ? "Copy failed. Please select the email address above." : null}
      </span>
    </div>
  );
}
