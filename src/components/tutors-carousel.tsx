import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TutorCard } from "@/components/tutor-card";
import { getRatedTutors } from "@/actions/rating-data";

export async function TutorsCarousel() {
  const tutores = [
    {
      tutor: "Tutor #1",
      rating: 5,
      pic_url: "/photos/placeholder.jpg",
      nreviews: 78,
    },
    {
      tutor: "Tutor #2",
      rating: 4.9,
      pic_url: "/photos/placeholder.jpg",
      nreviews: 45,
    },
    {
      tutor: "Tutor #3",
      rating: 4.7,
      pic_url: "/photos/placeholder.jpg",
      nreviews: 19,
    },
    {
      tutor: "Tutor #4",
      rating: 4.5,
      pic_url: "/photos/placeholder.jpg",
      nreviews: 42,
    },
    {
      tutor: "Tutor #5",
      rating: 4.4,
      pic_url: "/photos/placeholder.jpg",
      nreviews: 29,
    },
    {
      tutor: "Tutor #6",
      rating: 4.2,
      pic_url: "/photos/placeholder.jpg",
      nreviews: 45,
    },
  ];

  const tutorList = await getRatedTutors()

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full px-6 2xl:px-0 max-w-screen-2xl mt-6"
    >
      <CarouselContent>
        {tutorList.map((tutor) => (
            <CarouselItem key={tutor.tutor}  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <TutorCard
                    tutor={tutor.tutor}
                    rating={tutor.rating}
                    pic_url={tutor.pic_url !== null ? `${process.env.NEXT_PUBLIC_BLOB_STORAGE_URL}/profile-pictures/${tutor.pic_url}` : "/photos/placeholder.jpg"}
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
