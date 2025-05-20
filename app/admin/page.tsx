"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Rediriger vers la page de connexion admin
    router.push("/admin/auth/login");
  }, [router]);

  return null;
}
