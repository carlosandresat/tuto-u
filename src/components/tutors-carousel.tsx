import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TutorCard } from "@/components/tutor-card";

export function TutorsCarousel() {
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

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full px-6 2xl:px-0 max-w-screen-2xl mt-6"
    >
      <CarouselContent>
        {tutores.map((tutor) => (
            <CarouselItem key={tutor.tutor}  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <TutorCard
                    tutor={tutor.tutor}
                    rating={tutor.rating}
                    pic_url={tutor.pic_url}
                    nreviews={tutor.nreviews}
                />
            </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-6 2xl:-left-12"/>
      <CarouselNext  className="-right-6 2xl:-right-12"/>
    </Carousel>
  );
}
