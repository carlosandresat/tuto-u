"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

export const getRatedTutors = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be signed in to perform this action");
  }
  try {
    const ratedTutors = await db.user.findMany({
      where: {
        tutorSessions: {
          // Assuming `tutorSessions` is the relation name in the User model for sessions where the user is a tutor
          some: {
            studentRating: {
              not: null,
            },
          },
        },
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        image: true, // Assuming this is the field for the tutor's picture URL
        tutorSessions: {
          where: {
            studentRating: {
              not: null,
            },
          },
          select: {
            studentRating: true,
          },
        },
      },
    });

    // Map through the tutors to calculate the average rating and count reviews
    const tutorsWithRatings = ratedTutors
      .map((tutor) => ({
        tutor: `${tutor.firstname} ${tutor.lastname}`,
        pic_url: tutor.image,
        rating: calculateAverage(
          tutor.tutorSessions.map((session) => Number(session.studentRating))
        ),
        nreviews: tutor.tutorSessions.length,
      }))
      .sort((a, b) => b.rating - a.rating || b.nreviews - a.nreviews); // Sort by rating in descending order

    console.log(tutorsWithRatings)
    return tutorsWithRatings;
  } catch (error) {
    console.error("Failed to fetch rated tutors:", error);
    throw new Error("Unable to fetch rated tutors.");
  }
};

export const getRatedStudents = async () => {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("You must be signed in to perform this action");
    }
    try {
      const ratedStudents = await db.user.findMany({
        where: {
          studentSessions: {
            // Assuming `tutorSessions` is the relation name in the User model for sessions where the user is a tutor
            some: {
              tutorRating: {
                not: null,
              },
            },
          },
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          image: true, // Assuming this is the field for the tutor's picture URL
          studentSessions: {
            where: {
                tutorRating: {
                not: null,
              },
            },
            select: {
                tutorRating: true,
            },
          },
        },
      });
  
      // Map through the tutors to calculate the average rating and count reviews
      const studentsWithRatings = ratedStudents
        .map((student) => ({
          student: `${student.firstname} ${student.lastname}`,
          pic_url: student.image,
          rating: calculateAverage(
            student.studentSessions.map((session) => Number(session.tutorRating))
          ),
          nreviews: student.studentSessions.length,
        }))
        .sort((a, b) => b.rating - a.rating || b.nreviews - a.nreviews); // Sort by rating in descending order
  
      console.log(studentsWithRatings)
      return studentsWithRatings;
    } catch (error) {
      console.error("Failed to fetch rated tutors:", error);
      throw new Error("Unable to fetch rated tutors.");
    }
  };

function calculateAverage(ratings: number[]): number {
  return ratings.reduce((acc, cur) => acc + cur, 0) / ratings.length;
}
