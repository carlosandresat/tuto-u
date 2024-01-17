import { StartNavbar } from "@/components/start-navbar";
import Instructions from "@/components/instructions";
import ScrollElement from "@/components/scroll-to";

export default function How() {

  return (
    <>
      <StartNavbar />

      <section className="w-full pt-44 flex items-center justify-center flex-col">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight max-w-screen-xl">
          ¿Cómo usar?
        </h2>
        <p className="scroll-m-20 text-lg text-muted-foreground mt-4 max-w-screen-md px-8 text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate non corporis assumenda, voluptates culpa quo, suscipit odio ea reprehenderit magnam sit perspiciatis minima aliquam vel necessitatibus. Officiis laudantium ex harum.
        </p>
        <div>
        <ScrollElement id="tutor">
          <h2 className="underline text-cyan-600 dark:text-cyan-400 text-2xl text-center cursor-pointer pt-5">Ver para tutores</h2>
        </ScrollElement>
        </div>
        <Instructions/>
      </section>
    </>
  );
}
