import { AllStudents } from "@/components/all-students";

export default function Students() {
  return (
      <section className="flex min-h-screen flex-col items-center p-8">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight max-w-screen-xl pt-32">
          Estudiantes
        </h2>
        <AllStudents />
      </section>
  );
}
