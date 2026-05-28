import { Suspense } from "react";
import AppHome from "@/components/AppHome";

export default function DashboardPage() {
  return (
    <Suspense>
      <AppHome />
    </Suspense>
  );
}
