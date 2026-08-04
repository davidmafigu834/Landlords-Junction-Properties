"use client";

import { signIn } from "@/lib/actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="section-pad flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md border border-line bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <Image src="/logo.png" alt="" width={48} height={48} className="h-12 w-12 object-contain" />
          <div>
            <p className="display text-xl text-ink">Agent Login</p>
            <p className="text-sm text-muted">Landlords Junction portal</p>
          </div>
        </div>
        <form
          className="space-y-3"
          action={(fd) => {
            startTransition(async () => {
              const result = await signIn(fd);
              if (!result.ok) {
                setError(result.message);
                return;
              }
              router.push("/dashboard");
              router.refresh();
            });
          }}
        >
          <input className="input" name="email" type="email" placeholder="Email" required />
          <input
            className="input"
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          {error && <p className="text-sm text-orange">{error}</p>}
          <button type="submit" className="btn-primary w-full" disabled={pending}>
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="mt-4 text-xs text-muted">
          Accounts are created by administrators. Public signup is disabled.
        </p>
      </div>
    </div>
  );
}
