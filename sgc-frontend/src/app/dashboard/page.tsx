"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      Redirigiendo...
    </div>
  );
}
