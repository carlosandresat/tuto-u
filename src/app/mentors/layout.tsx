import { notFound } from "next/navigation";
import { isCurrentUserMentorAdmin } from "@/lib/admin";
import { HomeNavbar } from "@/components/home-navbar";
import { Footer } from "@/components/footer";

export default async function MentorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMentorAdmin = await isCurrentUserMentorAdmin();
  if (!isMentorAdmin) {
    notFound();
  }

  return (
    <>
      <HomeNavbar showMentorsLink />
      <div className="flex min-h-screen flex-col">{children}</div>
      <Footer size="xl" />
    </>
  );
}
