import { AllStudents } from "@/components/all-students";
import { PageContainer } from "@/components/page-container";

export default function Students() {
  return (
    <PageContainer size="2xl" className="min-h-screen">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight w-full text-left">
        Estudiantes
      </h2>
      <AllStudents />
    </PageContainer>
  );
}
