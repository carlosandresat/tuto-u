import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TutorCard } from "@/components/tutor-card";

type tutor={
  tutor:string
  rating:number
  pic_url:string
  nreviews:number
}

export function TutorsCarousel({tutores}:{tutores:tutor[]}) {

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
