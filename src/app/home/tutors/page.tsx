import { AllTutors } from "@/components/all-tutors";

export default function Tutors() {
  return (
      <section className="flex min-h-screen flex-col items-center justify-between p-8">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight max-w-screen-xl pt-32">
          Tutores
        </h2>
        <AllTutors />
      </section>
  );
}
