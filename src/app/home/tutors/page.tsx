import { TutorsCarousel } from "@/components/tutors-carousel";
import clsx from "clsx";
import Image from "next/image";

const tutores = [
  {
    tutor: "Carlos Andrés Arévalo Torres",
    rating: 9.7,
    pic_url: "/photos/carlos.arevalo.jpg",
    nreviews: 78,
  },
  {
    tutor: "Carlos Arévalo2",
    rating: 4.3,
    pic_url: "/photos/carlos.arevalo.jpg",
    nreviews: 45,
  },
  {
    tutor: "Carlos Arévalo3",
    rating: 9.7,
    pic_url: "/photos/carlos.arevalo.jpg",
    nreviews: 19,
  },
  {
    tutor: "Carlos Arévalo4",
    rating: 9.7,
    pic_url: "/photos/carlos.arevalo.jpg",
    nreviews: 42,
  },
  {
    tutor: "Carlos Arévalo5",
    rating: 9.7,
    pic_url: "/photos/carlos.arevalo.jpg",
    nreviews: 29,
  },
  {
    tutor: "Carlos Arévalo6",
    rating: 9.7,
    pic_url: "/photos/carlos.arevalo.jpg",
    nreviews: 45,
  },
];

const schools = [
  {
    school:'Matemáticas y Ciencias computacionales', 
    img:'/images/mate.png', 
    color:'text-red-500',
    tutors:tutores,
    border:'border-red-500'
  },
  {
    school:'Física y Nanotacnología', 
    img:'/images/fis.png', 
    color:'text-yellow-500',
    tutors:tutores,
    border:'border-yellow-500'
  },
  {
    school:'Biología y Biomédica', 
    img:'/images/bio.png', 
    color:'text-green-500',
    tutors:tutores,
    border:'border-green-500'
  },
  {
    school:'Geología', 
    img:'/images/geo.png', 
    color:'text-orange-500',
    tutors:tutores,
    border:'border-orange-500'
  },
  {
    school:'Química e Materiales', 
    img:'/images/quim.png', 
    color:'text-blue-500',
    tutors:tutores,
    border:'border-blue-500'
  },
  {
    school:'Agroindustria', 
    img:'/images/agro.png', 
    color:'text-cyan-500',
    tutors:tutores,
    border:'border-cyan-500'
  },
  {
    school:'UNAE', 
    img:'/images/unae.png', 
    color:'text-purple-500',
    tutors:tutores,
    border:'border-purple-500'
  }
]

function SchoolSection({img,school,color,border}:{img:string,school:string,color:string,border:string}){
  return(
    <div className={clsx(
      "border-t-2 pt-3 pb-8",
      border
    )}>
      <div className="flex flex-row justify-between items-center px-8" >
        <h1 className={clsx(
          "text-2xl font-bold",
          color
        )}>{school}</h1>
        <Image
          src={img}
          alt={`logo ${school} pic`}
          width={50}
          height={50}
        />
      </div>
      <TutorsCarousel tutores={tutores}/>
    </div>
  )
}

export default function Tutors() {
  return (
    <>
      <section className="absolute top-1/4 w-full md:py-8 px-8 flex justify-content flex-col">
        {schools.map((e,i)=>{
          return(
            <SchoolSection key={i} img={e.img} school={e.school} color={e.color} border={e.border}/>
          )
        })}
      </section>
    </>
  );
}
