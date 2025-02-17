import { TutorCard } from "@/components/tutor-card";
import { getRatedStudents } from "@/actions/rating-data";

export async function AllStudents() {
  const students = [
    {
      tutor: "Estudiante #1",
      rating: 5,
      pic_url: "/photos/placeholder.jpg",
      nreviews: 78,
    },
    {
      tutor: "Estudiante #2",
      rating: 4.9,
      pic_url: "/photos/placeholder.jpg",
      nreviews: 45,
    },
    {
      tutor: "Estudiante #3",
      rating: 4.7,
      pic_url: "/photos/placeholder.jpg",
      nreviews: 19,
    },
    {
      tutor: "Estudiante #4",
      rating: 4.5,
      pic_url: "/photos/placeholder.jpg",
      nreviews: 42,
    },
    {
      tutor: "Estudiante #5",
      rating: 4.4,
      pic_url: "/photos/placeholder.jpg",
      nreviews: 29,
    },
    {
      tutor: "Estudiante #6",
      rating: 4.2,
      pic_url: "/photos/placeholder.jpg",
      nreviews: 45,
    },
    {
      tutor: "Estudiante #7",
      rating: 4.0,
      pic_url: "/photos/placeholder.jpg",
      nreviews: 19,
    },
    {
      tutor: "Estudiante #8",
      rating: 3.9,
      pic_url: "/photos/placeholder.jpg",
      nreviews: 42,
    },
    {
      tutor: "Estudiante #9",
      rating: 3.8,
      pic_url: "/photos/placeholder.jpg",
      nreviews: 29,
    },
    {
      tutor: "Estudiante #10",
      rating: 3.5,
      pic_url: "/photos/placeholder.jpg",
      nreviews: 45,
    },
  ];

  const studentList = await getRatedStudents();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 max-w-screen-2xl mt-6 w-full">
      {studentList.map((tutor, index) => (
        <TutorCard
          id={tutor.id}
          tutor={tutor.student}
          rating={tutor.rating}
          pic_url={
            tutor.pic_url !== null
              ? `${process.env.NEXT_PUBLIC_BLOB_STORAGE_URL}/profile-pictures/${tutor.pic_url}`
              : "/photos/placeholder.jpg"
          }
          nreviews={tutor.nreviews}
          key={index}
        />
      ))}
    </div>
  );
}
