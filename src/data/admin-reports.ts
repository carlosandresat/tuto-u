import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";

// DELIBERATE PII EXCEPTION: everywhere else in this codebase (see src/data/sessions.ts)
// tutor/student email and whatsapp are only returned once a session's status is
// "accepted". This view is exempt from that gate on purpose — admin moderation of a
// filed report needs to contact both parties regardless of the underlying session's
// status. Do not "fix" this back to a status check.

export const getReports = async () => {
  await requireAdmin();

  try {
    const reports = await db.sessionReport.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        reporter: {
          select: {
            firstname: true,
            lastname: true,
            email: true,
            whatsapp: true,
          },
        },
        session: {
          select: {
            sessionDateTime: true,
            topic: true,
            status: true,
            course: {
              select: {
                name: true,
              },
            },
            student: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                whatsapp: true,
              },
            },
            tutor: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                whatsapp: true,
              },
            },
          },
        },
      },
    });

    return reports.map((report) => {
      const counterpart =
        report.session.student.id === report.reporterId
          ? report.session.tutor
          : report.session.student;

      return {
        reportId: report.id,
        description: report.description,
        createdAt: report.createdAt,
        reporterFullname: `${report.reporter.firstname} ${report.reporter.lastname}`,
        reporterEmail: report.reporter.email || "",
        reporterWhatsapp: report.reporter.whatsapp,
        counterpartFullname: `${counterpart.firstname} ${counterpart.lastname}`,
        counterpartEmail: counterpart.email || "",
        counterpartWhatsapp: counterpart.whatsapp,
        sessionId: report.sessionId,
        sessionDateTime: report.session.sessionDateTime,
        sessionTopic: report.session.topic,
        sessionCourse: report.session.course.name,
        sessionStatus: report.session.status,
      };
    });
  } catch (error) {
    console.error("Failed to fetch session reports:", error);
    throw new Error("Unable to fetch session reports.");
  }
};

export const getReportCount = async () => {
  await requireAdmin();

  try {
    return await db.sessionReport.count();
  } catch (error) {
    console.error("Failed to count session reports:", error);
    throw new Error("Unable to count session reports.");
  }
};
