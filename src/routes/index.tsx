import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/roster/app-shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-background text-muted-foreground">
        <p className="font-display text-lg">Loading roster…</p>
      </main>
    );
  }
  return <AppShell />;
}
