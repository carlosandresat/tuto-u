import type { Metadata } from "next";

type Props = {
  params: { user: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const user = params.user;
  const title = `${user} | Tuto-U`;
  const description = `Visita el perfil de ${user}. Conoce su progreso en Tuto-U.`;
  // fetch data

  return {
    title: title,
    description: description,
  };
}

export default function Page({ params }: Props) {
  return (
    <section className="w-full py-8 flex items-center justify-center flex-col">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-20 md:mt-28 p-6">
        Perfil de {params.user}
      </h2>
    </section>
  );
}
