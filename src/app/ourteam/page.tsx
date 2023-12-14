import { StartNavbar } from "@/components/start-navbar";

export default function OurTeam() {
  return (
    <>
      <StartNavbar />

      <section className="min-h-screen w-full py-12 flex items-center justify-center flex-col">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-32 md:mt-6 max-w-screen-xl">
          Nuestro Equipo
        </h2>

        <div className="flex mt-8">
        <h1 className="scroll-m-20 text-4xl md:text-6xl font-extrabold tracking-tight lg:text-8xl">
            Próximamente...
          </h1>

        </div>
      </section>
    </>
  );
}
