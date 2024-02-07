import clsx from "clsx"

const data = [
  {name: "Carlos", school: "Ciencias computacionales y matemáticas", date: "2024-02-07", id: 1, topic: "Tema 1"},
  {name: "Ana", school: "Bilogía y Biomédica", date: "2024-02-08", id: 2, topic: "Tema 2"},
  {name: "Luis", school: "Química y Materiales", date: "2024-02-09", id: 3, topic: "Tema 3"},
  {name: "María", school: "Agroindustria", date: "2024-02-10", id: 4, topic: "Tema 4"},
  {name: "Javier", school: "Geaología", date: "2024-02-11", id: 5, topic: "Tema 5"},
  {name: "Sofía", school: "UNAE", date: "2024-02-12", id: 6, topic: "Tema 6"},
  {name: "Gabriel", school: "Ciencias computacionales y matemáticas", date: "2024-02-13", id: 7, topic: "Tema 7"},
  {name: "Isabel", school: "Bilogía y Biomédica", date: "2024-02-14", id: 8, topic: "Tema 8"},
  {name: "Fernando", school: "Química y Materiales", date: "2024-02-15", id: 9, topic: "Tema 9"},
  {name: "Lucía", school: "Agroindustria", date: "2024-02-16", id: 10, topic: "Tema 10"},
];


function CardService({name,school,date,id,topic}:{name:string,school:string,date:string,id:number,topic:string}){
  let textColor;
  let borderColor;
  switch(school) {
      case "Ciencias computacionales y matemáticas":
          borderColor="hover:border-red-500"
          textColor = "text-red-500";
          break;
      case "Bilogía y Biomédica":
          borderColor="hover:border-green-500"
          textColor = "text-green-500";
          break;
      case "Química y Materiales":
          borderColor="hover:border-blue-500"
          textColor = "text-blue-500";
          break;
      case "Agroindustria":
          borderColor="hover:border-cyan-500"
          textColor = "text-cyan-500";
          break;
      case "Geaología":
          borderColor="hover:border-orange-500"
          textColor = "text-orange-500";
          break;
      case "UNAE":
          borderColor="hover:border-purple-500"
          textColor = "text-purple-500";
          break;
      default:
          borderColor="hover:border-gray-500"
          textColor = "text-gray-500";
  }
  return(
    <div className={clsx(
      "flex gap-4 border border-gray-500 items-start mx-auto w-full md:w-1/2 p-5",
      borderColor
    )}>
      <img
        alt="Image"
        className="rounded-full"
        height={64}
        src="/photos/carlos.arevalo.jpg"
        style={{
          aspectRatio: "64/64",
          objectFit: "cover",
        }}
        width={64}
      />
      <div className="grid gap-1.5">
        <h3 className="text-lg font-semibold leading-none">{name}</h3>
        <p className={clsx(
          "text-sm text-white-500 leading-none",
          textColor
        )}>{school}</p>
        <p className="text-sm text-white-500 leading-snug dark:text-gray-400">{topic}</p>
        <p className="text-sm text-gray-500 leading-snug dark:text-gray-400">{date}</p>
      </div>
    </div>
  )
}

export default function History() {
  return (
    <div className="flex flex-col px-8 absolute top-1/4 pb-8 w-full gap-4">
      <h1 className="text-5xl text-center font-bold py-3">Historial</h1>
      {data.map(e=>{
        return(
          <CardService key={e.id} name={e.name} school={e.school} id={e.id} topic={e.topic} date={e.date}/>
        )
      })}
    </div>
  )
}


