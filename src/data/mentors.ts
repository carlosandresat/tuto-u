import { db } from "@/lib/db";
import { requireMentorAdmin } from "@/lib/admin";
import {
  getPeriodStatus,
  periodLabel,
  periodLastDay,
  utcToEcuadorDay,
  type PeriodStatus,
} from "@/lib/academic-period";

export type AcademicPeriodRow = {
  id: number;
  label: string;
  startsOn: string;
  endsOn: string;
  status: PeriodStatus;
  mentorCount: number;
};

export type MentorAssignmentRow = {
  id: number;
  email: string;
  // null = el correo todavía no tiene cuenta en Tuto-U.
  name: string | null;
  username: string | null;
};

export async function getAcademicPeriods(): Promise<AcademicPeriodRow[]> {
  await requireMentorAdmin();

  try {
    const periods = await db.academicPeriod.findMany({
      orderBy: { startsAt: "desc" },
      include: { _count: { select: { mentors: true } } },
    });
    const now = new Date();

    return periods.map((period) => ({
      id: period.id,
      label: periodLabel(period),
      startsOn: utcToEcuadorDay(period.startsAt),
      endsOn: periodLastDay(period.endsAt),
      status: getPeriodStatus(period, now),
      mentorCount: period._count.mentors,
    }));
  } catch (error) {
    console.error("Failed to fetch academic periods:", error);
    throw new Error("Unable to fetch academic periods.");
  }
}

export async function getMentorAssignments(periodId: number): Promise<MentorAssignmentRow[]> {
  await requireMentorAdmin();

  try {
    const assignments = await db.mentorAssignment.findMany({
      where: { periodId },
      orderBy: { email: "asc" },
      select: { id: true, email: true },
    });
    if (assignments.length === 0) return [];

    const users = await db.user.findMany({
      where: {
        OR: assignments.map((a) => ({ email: { equals: a.email, mode: "insensitive" as const } })),
      },
      select: { email: true, firstname: true, lastname: true, username: true },
    });
    const usersByEmail = new Map(
      users.flatMap((u) => (u.email ? [[u.email.toLowerCase(), u] as const] : []))
    );

    return assignments.map((assignment) => {
      const user = usersByEmail.get(assignment.email);
      return {
        id: assignment.id,
        email: assignment.email,
        name: user ? `${user.firstname ?? ""} ${user.lastname ?? ""}`.trim() : null,
        username: user?.username ?? null,
      };
    });
  } catch (error) {
    console.error("Failed to fetch mentor assignments:", error);
    throw new Error("Unable to fetch mentor assignments.");
  }
}
