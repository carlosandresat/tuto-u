import { CardTitle, CardContent, Card } from "@/components/ui/card";
import Image from "next/image";

const students_instructions = [
  {
    img: "/instructions/capt-screen.png",
    inst: [
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus laudantium error magni, rem ab quibusdam hic maiores atque beatae consectetur asperiores deserunt optio id quas minus, eveniet molestias. Illo, minus.",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus laudantium error magni, rem ab quibusdam hic maiores atque beatae consectetur asperiores deserunt optio id quas minus, eveniet molestias. Illo, minus.",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus laudantium error magni, rem ab quibusdam hic maiores atque beatae consectetur asperiores deserunt optio id quas minus, eveniet molestias. Illo, minus.",
    ],
  },
  {
    img: "/instructions/capt-screen.png",
    inst: [
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus laudantium error magni, rem ab quibusdam hic maiores atque beatae consectetur asperiores deserunt optio id quas minus, eveniet molestias. Illo, minus.",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus laudantium error magni, rem ab quibusdam hic maiores atque beatae consectetur asperiores deserunt optio id quas minus, eveniet molestias. Illo, minus.",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus laudantium error magni, rem ab quibusdam hic maiores atque beatae consectetur asperiores deserunt optio id quas minus, eveniet molestias. Illo, minus.",
    ],
  },
  {
    img: "/instructions/capt-screen.png",
    inst: [
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus laudantium error magni, rem ab quibusdam hic maiores atque beatae consectetur asperiores deserunt optio id quas minus, eveniet molestias. Illo, minus.",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus laudantium error magni, rem ab quibusdam hic maiores atque beatae consectetur asperiores deserunt optio id quas minus, eveniet molestias. Illo, minus.",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus laudantium error magni, rem ab quibusdam hic maiores atque beatae consectetur asperiores deserunt optio id quas minus, eveniet molestias. Illo, minus.",
    ],
  },
];

const tutors_instructions = [
  {
    img: "/instructions/capt-screen.png",
    inst: [
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus laudantium error magni, rem ab quibusdam hic maiores atque beatae consectetur asperiores deserunt optio id quas minus, eveniet molestias. Illo, minus.",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus laudantium error magni, rem ab quibusdam hic maiores atque beatae consectetur asperiores deserunt optio id quas minus, eveniet molestias. Illo, minus.",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus laudantium error magni, rem ab quibusdam hic maiores atque beatae consectetur asperiores deserunt optio id quas minus, eveniet molestias. Illo, minus.",
    ],
  },
  {
    img: "/instructions/capt-screen.png",
    inst: [
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus laudantium error magni, rem ab quibusdam hic maiores atque beatae consectetur asperiores deserunt optio id quas minus, eveniet molestias. Illo, minus.",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus laudantium error magni, rem ab quibusdam hic maiores atque beatae consectetur asperiores deserunt optio id quas minus, eveniet molestias. Illo, minus.",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus laudantium error magni, rem ab quibusdam hic maiores atque beatae consectetur asperiores deserunt optio id quas minus, eveniet molestias. Illo, minus.",
    ],
  },
  {
    img: "/instructions/capt-screen.png",
    inst: [
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus laudantium error magni, rem ab quibusdam hic maiores atque beatae consectetur asperiores deserunt optio id quas minus, eveniet molestias. Illo, minus.",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus laudantium error magni, rem ab quibusdam hic maiores atque beatae consectetur asperiores deserunt optio id quas minus, eveniet molestias. Illo, minus.",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus laudantium error magni, rem ab quibusdam hic maiores atque beatae consectetur asperiores deserunt optio id quas minus, eveniet molestias. Illo, minus.",
    ],
  },
];

function List({ inst }: { inst: string[] }) {
  return inst.map((e, i) => {
    return (
      <div className="flex flex-row gap-2 text-sm" key={i}>
        <h2 className="font-bold text-black dark:text-white">{i + 1}.</h2>
        <p className="text-gray-500 dark:text-gray-400">{e}</p>
      </div>
    );
  });
}

function CardInstruction({ img, inst }: { img: string; inst: string[] }) {
  return (
    <Card className="w-9/10 flex flex-col my-12">
      <div className="w-full">
        <Image
          alt="Instruction Image"
          className="w-full h-auto"
          height="642"
          src={img}
          style={{
            objectFit: "contain",
          }}
          width="1340"
        />
      </div>
      <CardContent className="w-full p-6">
        <CardTitle className="text-lg font-bold">Card Title</CardTitle>
        <List inst={inst} />
      </CardContent>
    </Card>
  );
}

export default function Instructions() {
  return (
    <div className="w-4/5">
      <h2 className="text-center text-3xl mt-12 pb-2 border-b md:w-1/4 mx-auto">
        Para estudiantes:
      </h2>
      {students_instructions.map((c, i) => (
        <CardInstruction key={i} img={c.img} inst={c.inst} />
      ))}
      <h2
        className="text-center text-3xl mt-12 pb-2 border-b md:w-1/4 mx-auto"
        id="tutor"
      >
        Para tutores:
      </h2>
      {tutors_instructions.map((c, i) => (
        <CardInstruction key={i} img={c.img} inst={c.inst} />
      ))}
    </div>
  );
}
