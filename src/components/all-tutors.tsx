import { StudentSessionCard } from "@/components/student-session-card";
import { getTutorSessions } from "@/actions/sessions-data";
import { auth } from "@/auth";
import { TutorSessionCard } from "@/components/tutor-session-card";
import { TutorCard } from "@/components/tutor-card";

export async function AllTutors() {
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
    {
        tutor: "Tutor #7",
        rating: 4.0,
        pic_url: "/photos/placeholder.jpg",
        nreviews: 19,
      },
      {
        tutor: "Tutor #8",
        rating: 3.9,
        pic_url: "/photos/placeholder.jpg",
        nreviews: 42,
      },
      {
        tutor: "Tutor #9",
        rating: 3.8,
        pic_url: "/photos/placeholder.jpg",
        nreviews: 29,
      },
      {
        tutor: "Tutor #10",
        rating: 3.5,
        pic_url: "/photos/placeholder.jpg",
        nreviews: 45,
      },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 max-w-screen-2xl mt-6 w-full">
      {tutores.map((tutor, index) => (
        <TutorCard
          tutor={tutor.tutor}
          rating={tutor.rating}
          pic_url={tutor.pic_url}
          nreviews={tutor.nreviews}
          key={index}
        />
      ))}
    </div>
  );
}
