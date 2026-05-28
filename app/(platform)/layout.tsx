import { ClerkProvider } from "@clerk/nextjs";
import SiteNav from "@/app/site-nav";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <div data-theme="dark" style={{ minHeight: "100vh" }}>
        <SiteNav />
        <main>{children}</main>
      </div>
    </ClerkProvider>
  );
}
