"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Input, Label } from "@/components/ui";
import { useAuth } from "@/components/AuthProvider";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email.trim(), password);
      router.push("/admin");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="section-shell flex min-h-[70vh] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          Sketchy Phonics
        </p>
        <h1 className="mt-2 text-3xl font-bold text-ink">Admin login</h1>
        <p className="mt-1 text-sm text-muted">
          Sign in with your admin account to manage galleries and content.
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <Label>
            <span>Email</span>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="username"
              required
            />
          </Label>
          <Label>
            <span>Password</span>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              required
            />
          </Label>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
