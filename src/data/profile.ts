import { db } from "@/lib/db";

export const getUserProfile = async (username: string) => {
    try{
        const user = await db.user.findFirst ({
            where: {username},
            include: {
                tutorCourses: {
                    include: {
                        course: true,
                    },
                },
                tutor_pricing: true,
                availabilities: true,
            },
        });
        if (!user) {
            return {error: "Unable to fetch user profile"}
        }
        return {
            name: `${user.firstname} ${user.lastname}`,
            email: user.email,
            description: user.description,
            whatsapp: user.whatsapp,
            profilePic: user.image || "photos/placeholder.jpg",
            courses: user.tutorCourses.map((tc) => ({
                name: tc.course.name,
            })),
            pricing: user.tutor_pricing.map((p) => ({
                duration: `${p.duration/ 60}h`,
                price: Number(p.price),
            })),
            availability: user.availabilities.map((a) =>({
                dayOfWeek: a.dayOfWeek,
                timeSlot: a.timeSlot,
            })),
        };
    } catch (error) {
        console.error ("Failed to fetch User Profile", error);
        throw new Error ("Unable to fetch User Profile");
    }
};

export const getUserNameByUsername = async (username: string) => {
  try {
    const user = await db.user.findFirst({
      where: { username },
      select: {
        firstname: true,
        lastname: true,
      },
    });

    if (!user) {
      return "Not Found User";
    }

    return `${user.firstname} ${user.lastname}`;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return "Not Found User";
  }
};

export const getTutorFormData = async (username: string) => {
  try {
    const user = await db.user.findFirst({
      where: { username },
      include: {
        tutorCourses: {
          include: {
            course: true,
          },
        },
        availabilities: true,
        tutor_pricing: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      tutorId: user.id,
      name: `${user.firstname} ${user.lastname}`,
      courses: user.tutorCourses.map((tc) => ({
        id: tc.course.id,
        course: tc.course.name,
      })),
      availability: user.availabilities.map((a) => ({
        dayOfWeek: a.dayOfWeek,
        timeSlot: a.timeSlot,
      })),
      pricing: user.tutor_pricing.map((p) => ({
        duration: p.duration,
        price: Number(p.price),
      })),
    };
  } catch (error) {
    console.error("Failed to fetch tutor form data:", error);
    throw new Error("Unable to fetch tutor form data.");
  }
};