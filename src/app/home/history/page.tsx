import { PageContainer } from "@/components/page-container";

export default function History() {
  return (
    <PageContainer size="xl" className="min-h-screen">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight w-full text-center">
        Historial
      </h2>

      <div className="flex mt-8 flex-grow items-center justify-center">
        <h1 className="scroll-m-20 text-4xl md:text-6xl font-extrabold tracking-tight lg:text-8xl text-center">
          Próximamente...
        </h1>
      </div>
    </PageContainer>
  );
}
