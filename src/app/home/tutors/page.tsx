import { AllTutors } from "@/components/all-tutors";
import { PageContainer } from "@/components/page-container";

export default function Tutors() {
  return (
    <PageContainer size="2xl" className="min-h-screen">
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight w-full text-left">
        Tutores
      </h1>
      <AllTutors />
    </PageContainer>
  );
}
