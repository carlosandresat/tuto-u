import { notFound } from "next/navigation";
import { isCurrentUserAdmin } from "@/lib/admin";
import { HomeNavbar } from "@/components/home-navbar";
import { Footer } from "@/components/footer";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await isCurrentUserAdmin();
  if (!isAdmin) {
    notFound();
  }

  return (
    <>
      <HomeNavbar />
      <div className="flex min-h-screen flex-col">{children}</div>
      <Footer size="2xl" />
    </>
  );
}
