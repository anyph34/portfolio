"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmail, signUpWithEmail } from "@/lib/supabase/client";
import { validateLoginForm, validateRegisterForm } from "./validation";

type LoginFormProps = {
  title?: string;
  description?: string;
};

export function LoginForm({ title = "Welcome back", description = "Sign in to your business workspace." }: LoginFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<"email" | "password", string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateLoginForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus("error");
      setMessage("Please correct the highlighted fields.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const { error } = await signInWithEmail(form.email.trim(), form.password);
      if (error) {
        throw error;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to sign in. Please try again.");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">BiasharaDesk</p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">{title}</h1>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(event) => handleChange("email", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white"
            placeholder="owner@biasharadesk.com"
          />
          {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={(event) => handleChange("password", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white"
            placeholder="••••••••"
          />
          {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password}</p> : null}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Signing in..." : "Sign in"}
        </button>

        {message ? (
          <p
            className={`rounded-md border px-3 py-2 text-sm ${
              status === "error"
                ? "border-red-100 bg-red-50 text-red-700"
                : "border-emerald-100 bg-emerald-50 text-emerald-700"
            }`}
          >
            {message}
          </p>
        ) : null}
      </form>
    </div>
  );
}

export function RegisterForm({ title = "Create your business account", description = "Set up a tenant and start managing operations." }: LoginFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({ fullName: "", email: "", password: "", businessName: "" });
  const [errors, setErrors] = useState<Partial<Record<"fullName" | "email" | "password" | "businessName", string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateRegisterForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus("error");
      setMessage("Please complete all required fields.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const { data, error } = await signUpWithEmail(
        form.email.trim(),
        form.password,
        form.fullName.trim(),
        form.businessName.trim(),
      );
      if (error) {
        throw error;
      }

      if (data.session) {
        router.replace("/dashboard");
        router.refresh();
        return;
      }

      setStatus("success");
      setMessage("Account created. Check your email to confirm your address, then sign in.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to create your account. Please try again.");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">BiasharaDesk</p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">{title}</h1>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-slate-700">
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            value={form.fullName}
            onChange={(event) => handleChange("fullName", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white"
            placeholder="Mary Wanjiku"
          />
          {errors.fullName ? <p className="mt-1 text-xs text-red-600">{errors.fullName}</p> : null}
        </div>

        <div>
          <label htmlFor="businessName" className="mb-1 block text-sm font-medium text-slate-700">
            Business name
          </label>
          <input
            id="businessName"
            type="text"
            value={form.businessName}
            onChange={(event) => handleChange("businessName", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white"
            placeholder="Nairobi Retail Hub"
          />
          {errors.businessName ? <p className="mt-1 text-xs text-red-600">{errors.businessName}</p> : null}
        </div>

        <div>
          <label htmlFor="register-email" className="mb-1 block text-sm font-medium text-slate-700">
            Email address
          </label>
          <input
            id="register-email"
            type="email"
            value={form.email}
            onChange={(event) => handleChange("email", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white"
            placeholder="owner@business.com"
          />
          {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
        </div>

        <div>
          <label htmlFor="register-password" className="mb-1 block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="register-password"
            type="password"
            value={form.password}
            onChange={(event) => handleChange("password", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white"
            placeholder="Create a secure password"
          />
          {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password}</p> : null}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Creating account..." : "Create account"}
        </button>

        {message ? (
          <p
            className={`rounded-md border px-3 py-2 text-sm ${
              status === "error"
                ? "border-red-100 bg-red-50 text-red-700"
                : "border-emerald-100 bg-emerald-50 text-emerald-700"
            }`}
          >
            {message}
            {status === "success" ? (
              <>
                {" "}
                <Link className="font-semibold underline" href="/login">
                  Sign in
                </Link>
              </>
            ) : null}
          </p>
        ) : null}
      </form>
    </div>
  );
}
