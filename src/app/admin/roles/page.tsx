import { PageContainer } from "@/components/page-container";
import { AdminNav } from "@/components/admin/admin-nav";
import { MentorAdminRoles } from "@/components/admin/mentor-admin-roles";
import { getMentorAdmins } from "@/data/admin-roles";

export default async function AdminRolesPage() {
  const admins = await getMentorAdmins();

  return (
    <PageContainer size="2xl">
      <AdminNav />
      <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight w-full mb-6">
        Roles
      </h1>
      <MentorAdminRoles admins={admins} />
    </PageContainer>
  );
}
