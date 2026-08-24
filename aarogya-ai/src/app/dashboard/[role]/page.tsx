import { getRoleConfig } from "@/lib/roles";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/dashboard/DashboardClient";

// ── Supabase auth check (uncomment when .env.local is configured) ──
// import { createClient } from "@/lib/supabase/server";

interface Props {
  params: Promise<{ role: string }>;
}

export default async function DashboardPage({ params }: Props) {
  const { role } = await params;
  const config = getRoleConfig(role);
  if (!config) redirect("/");

  // ── Real auth check ──
  // const supabase = await createClient();
  // const { data: { user } } = await supabase.auth.getUser();
  // if (!user) redirect(`/auth/${role}`);

  return <DashboardClient config={config} />;
}
