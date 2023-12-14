import { HomeNavbar } from "@/components/home-navbar";


export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
          <>
            <HomeNavbar />
            <div>{children}</div>
          </>
  );
}