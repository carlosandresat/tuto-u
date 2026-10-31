import { HomeNavbar } from "@/components/home-navbar";
import { isCurrentUserMentorAdmin } from "@/lib/admin";


export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
          <>
            <HomeNavbar showMentorsLink={await isCurrentUserMentorAdmin()} />
            <div>{children}</div>
          </>
  );
}