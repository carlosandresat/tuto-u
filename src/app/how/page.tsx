import { StartNavbar } from "@/components/start-navbar";
import Instructions from "@/components/instructions";
import ScrollElement from "@/components/scroll-to";

export default function How() {

  return (
    <>
      <StartNavbar />

      <section className="min-h-screen w-full py-12 flex items-center justify-center flex-col">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight max-w-screen-xl">
          ¿Cómo usar?
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
