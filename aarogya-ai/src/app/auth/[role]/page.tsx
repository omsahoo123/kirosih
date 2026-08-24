import { notFound } from "next/navigation";
import { getRoleConfig } from "@/lib/roles";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthTabs from "@/components/auth/AuthTabs";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ role: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role } = await params;
  const config = getRoleConfig(role);
  if (!config) return { title: "AarogyaAI" };
  return {
    title: `AarogyaAI — ${config.label} Sign In`,
    description: config.description,
  };
}

export default async function AuthPage({ params }: Props) {
  const { role } = await params;
  const config = getRoleConfig(role);

  if (!config) notFound();

  return (
    <AuthLayout config={config}>
      <AuthTabs config={config} />
    </AuthLayout>
  );
}
