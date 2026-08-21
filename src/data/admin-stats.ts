import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";

/**
 * Lecturas agregadas para el panel de estadísticas de admin (Unit 4).
 *
 * Este archivo es capa de datos (src/data/), no de acciones: NO lleva la directiva de
 * server actions y no debe llevarla nunca — cada export de un módulo que la declara
 * queda expuesto como endpoint HTTP público.
 *
 * Toda función empieza con `await requireAdmin()` — fuera del try/catch, para que el
 * rechazo por falta de permisos no se convierta en un error genérico.
 *
 * CONTRATO DE SERIALIZACIÓN — estos datos cruzan la frontera RSC hacia componentes
 * cliente (charts de Recharts). `UserPricingConfiguration.price` es un `Decimal` de
 * Prisma y NO es serializable: pasarlo a un componente cliente lanza un error, y
 * mezclarlo con números JS en aritmética produce promedios silenciosamente
 * incorrectos. Por eso cada precio se convierte con `Number(...)` aquí mismo, apenas
 * sale de la base, y todo lo que se retorna es primitivo (number | string).
 */

/** Redondeo a 2 decimales sobre un number ya convertido desde Decimal. */
const roundMoney = (value: number) => Math.round(value * 100) / 100;

/** Promedio seguro: devuelve null cuando no hay muestra, nunca divide por cero. */
const average = (values: number[]) =>
  values.length === 0
    ? null
    : roundMoney(values.reduce((acc, value) => acc + value, 0) / values.length);

const byName = (a: string, b: string) => a.localeCompare(b, "es");

// ---------------------------------------------------------------------------
// Tutores por curso
// ---------------------------------------------------------------------------

export type TutorsPerCourseRow = {
  courseId: number;
  course: string;
  tutors: number;
};

/**
 * Cantidad de tutores por curso, descendente.
 *
 * Se parte de `Course` (no de `TutorCourse`) a propósito: un `groupBy` sobre
 * `TutorCourse` nunca puede producir una fila en cero, y los cursos SIN tutores son
 * justamente la señal que interesa — muestran la cobertura que falta.
 */
export const getTutorsPerCourse = async (): Promise<TutorsPerCourseRow[]> => {
  await requireAdmin();

  try {
    const courses = await db.course.findMany({
      select: {
        id: true,
        name: true,
        _count: { select: { tutorCourses: true } },
      },
    });

    return courses
      .map((course) => ({
        courseId: course.id,
        course: course.name,
        tutors: course._count.tutorCourses,
      }))
      .sort((a, b) => b.tutors - a.tutors || byName(a.course, b.course));
  } catch (error) {
    console.error("Failed to fetch tutors per course:", error);
    throw new Error("Unable to fetch tutors per course.");
  }
};

// ---------------------------------------------------------------------------
// Precios promedio
// ---------------------------------------------------------------------------

type CoursePriceRow = {
  courseId: number;
  course: string;
  duration: number;
  price: number;
};

/**
 * Filas (curso × tutor × duración) con el precio ya convertido a number.
 *
 * Una sola consulta con `select` anidado — sin N+1. Ojo con la ponderación: un tutor
 * que dicta 4 cursos aporta sus precios a los 4. Es lo que pide la métrica ("precios
 * de los tutores que dictan ese curso"), pero implica que estas filas NO se pueden
 * re-agregar para obtener el promedio global por duración.
 */
const fetchCoursePriceRows = async (): Promise<CoursePriceRow[]> => {
  const tutorCourses = await db.tutorCourse.findMany({
    select: {
      courseId: true,
      course: { select: { name: true } },
      tutor: {
        select: {
          tutor_pricing: { select: { duration: true, price: true } },
        },
      },
    },
  });

  return tutorCourses.flatMap((tutorCourse) =>
    tutorCourse.tutor.tutor_pricing.map((pricing) => ({
      courseId: tutorCourse.courseId,
      course: tutorCourse.course.name,
      duration: pricing.duration,
      // Decimal -> number aquí, en la capa de datos. Ver contrato arriba.
      price: Number(pricing.price),
    }))
  );
};

export type AveragePricePerCourseRow = {
  courseId: number;
  course: string;
  averagePrice: number;
  sampleSize: number;
};

/**
 * Precio promedio por curso, sobre las configuraciones de precio de los tutores que
 * dictan ese curso.
 *
 * ADVERTENCIA PARA QUIEN ARME EL GRÁFICO (Unit 5): este promedio mezcla duraciones.
 * Un curso cuyos tutores solo configuraron la tarifa de 60 min aparecerá "más barato"
 * que uno cuyos tutores llegaron hasta 180 min, sin que sus tarifas comparables lo
 * sean. Sirve como precio típico de un curso, NO para rankear cursos por precio; para
 * eso está `getAveragePricePerCourseAndDuration()`. `sampleSize` se devuelve para
 * poder rotular el tamaño de muestra en la tarjeta.
 */
export const getAveragePricePerCourse = async (): Promise<
  AveragePricePerCourseRow[]
> => {
  await requireAdmin();

  try {
    const rows = await fetchCoursePriceRows();

    const grouped = new Map<number, { course: string; prices: number[] }>();
    for (const row of rows) {
      const entry = grouped.get(row.courseId) ?? { course: row.course, prices: [] };
      entry.prices.push(row.price);
      grouped.set(row.courseId, entry);
    }

    return Array.from(grouped.entries())
      .map(([courseId, entry]) => ({
        courseId,
        course: entry.course,
        // `prices` nunca llega vacío aquí, pero `average` protege igual.
        averagePrice: average(entry.prices) ?? 0,
        sampleSize: entry.prices.length,
      }))
      .sort((a, b) => b.averagePrice - a.averagePrice || byName(a.course, b.course));
  } catch (error) {
    console.error("Failed to fetch average price per course:", error);
    throw new Error("Unable to fetch average price per course.");
  }
};

export type AveragePricePerCourseAndDurationRow = {
  courseId: number;
  course: string;
  duration: number;
  durationLabel: string;
  averagePrice: number;
  sampleSize: number;
};

/**
 * Precio promedio por curso Y duración — el corte comparable entre cursos, porque
 * mantiene fija la duración. Ordenado por curso y luego por duración.
 */
export const getAveragePricePerCourseAndDuration = async (): Promise<
  AveragePricePerCourseAndDurationRow[]
> => {
  await requireAdmin();

  try {
    const rows = await fetchCoursePriceRows();

    const grouped = new Map<
      string,
      { courseId: number; course: string; duration: number; prices: number[] }
    >();
    for (const row of rows) {
      const key = `${row.courseId}:${row.duration}`;
      const entry = grouped.get(key) ?? {
        courseId: row.courseId,
        course: row.course,
        duration: row.duration,
        prices: [] as number[],
      };
      entry.prices.push(row.price);
      grouped.set(key, entry);
    }

    return Array.from(grouped.values())
      .map((entry) => ({
        courseId: entry.courseId,
        course: entry.course,
        duration: entry.duration,
        durationLabel: `${entry.duration} min`,
        averagePrice: average(entry.prices) ?? 0,
        sampleSize: entry.prices.length,
      }))
      .sort((a, b) => byName(a.course, b.course) || a.duration - b.duration);
  } catch (error) {
    console.error("Failed to fetch average price per course and duration:", error);
    throw new Error("Unable to fetch average price per course and duration.");
  }
};

export type AveragePricePerDurationRow = {
  duration: number;
  durationLabel: string;
  averagePrice: number;
  sampleSize: number;
};

/**
 * Precio promedio por duración, contando cada tutor UNA sola vez.
 *
 * Dos decisiones que cambian el número y por eso quedan explícitas:
 *
 * 1. Solo se consideran tutores con al menos un curso asignado. Un tutor con tarifas
 *    pero sin cursos no es reservable, así que no forma parte de la oferta real;
 *    incluirlo infla el promedio. (Sobre los datos actuales: 50 tutores están en esa
 *    situación y arrastran el promedio de 60 min de $2.53 a $3.06.)
 * 2. A diferencia de `getAveragePricePerCourseAndDuration()`, aquí un tutor que dicta
 *    varios cursos NO se cuenta varias veces. Por eso los dos conjuntos de promedios
 *    no reconcilian entre sí: usan ponderaciones distintas a propósito.
 */
export const getAveragePricePerDuration = async (): Promise<
  AveragePricePerDurationRow[]
> => {
  await requireAdmin();

  try {
    const pricings = await db.userPricingConfiguration.findMany({
      where: { tutor: { tutorCourses: { some: {} } } },
      select: { duration: true, price: true },
    });

    const grouped = new Map<number, number[]>();
    for (const pricing of pricings) {
      const prices = grouped.get(pricing.duration) ?? [];
      // Decimal -> number aquí, en la capa de datos. Ver contrato arriba.
      prices.push(Number(pricing.price));
      grouped.set(pricing.duration, prices);
    }

    return Array.from(grouped.entries())
      .map(([duration, prices]) => ({
        duration,
        durationLabel: `${duration} min`,
        averagePrice: average(prices) ?? 0,
        sampleSize: prices.length,
      }))
      .sort((a, b) => a.duration - b.duration);
  } catch (error) {
    console.error("Failed to fetch average price per duration:", error);
    throw new Error("Unable to fetch average price per duration.");
  }
};

// ---------------------------------------------------------------------------
// Sesiones por estado
// ---------------------------------------------------------------------------

export type SessionStatusKey =
  | "requested"
  | "accepted"
  | "completed"
  | "rejected"
  | "canceled";

export type SessionsByStatusRow = {
  status: SessionStatusKey;
  label: string;
  sessions: number;
};

/**
 * Sesiones por estado.
 *
 * OJO — "completed" NO existe como valor almacenado. `IndividualSession.status` solo
 * toma cuatro valores en el código: "requested", "accepted", "rejected" y "canceled"
 * (con UNA sola "l"; ver `src/actions/sessions-data.ts`). Una sesión se considera
 * completada cuando fue aceptada y su fecha ya pasó — la misma definición que usa
 * `getAllAchievementsWithProgress` en `src/actions/achievements-data.ts`.
 *
 * Por eso "accepted" aquí significa aceptadas AÚN POR REALIZARSE: contar todas las
 * aceptadas como completadas infla la cifra con sesiones futuras, y filtrar por
 * `status = "completed"` devuelve siempre cero. Las dos categorías son disjuntas y
 * suman el total de aceptadas.
 */
export const getSessionsByStatus = async (): Promise<SessionsByStatusRow[]> => {
  await requireAdmin();

  try {
    const now = new Date();

    const [grouped, completed] = await Promise.all([
      db.individualSession.groupBy({
        by: ["status"],
        _count: { _all: true },
      }),
      db.individualSession.count({
        where: { status: "accepted", sessionDateTime: { lt: now } },
      }),
    ]);

    const counts = new Map(grouped.map((row) => [row.status, row._count._all]));
    const accepted = counts.get("accepted") ?? 0;

    return [
      {
        status: "requested",
        label: "Solicitadas",
        sessions: counts.get("requested") ?? 0,
      },
      {
        status: "accepted",
        label: "Aceptadas (por realizarse)",
        // Las dos consultas no son atómicas; el clamp evita un negativo si una sesión
        // cruza `now` justo entre ambas.
        sessions: Math.max(0, accepted - completed),
      },
      { status: "completed", label: "Completadas", sessions: completed },
      {
        status: "rejected",
        label: "Rechazadas",
        sessions: counts.get("rejected") ?? 0,
      },
      {
        status: "canceled",
        label: "Canceladas",
        sessions: counts.get("canceled") ?? 0,
      },
    ];
  } catch (error) {
    console.error("Failed to fetch sessions by status:", error);
    throw new Error("Unable to fetch sessions by status.");
  }
};

// ---------------------------------------------------------------------------
// Registros por semana
// ---------------------------------------------------------------------------

export type SignupsPerWeekRow = {
  /** Lunes de la semana, en UTC, como "YYYY-MM-DD". */
  weekStart: string;
  signups: number;
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const MS_PER_WEEK = 7 * MS_PER_DAY;

/**
 * Lunes 00:00 UTC de la semana que contiene `date`.
 *
 * En UTC explícito, como el resto de la app (ver la nota de husos horarios en
 * CLAUDE.md), y alineado con `date_trunc('week', ...)` de Postgres, que también
 * arranca en lunes.
 */
const startOfUtcWeek = (date: Date) => {
  const utcMidnight = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  );
  // getUTCDay(): 0 = domingo. (día + 6) % 7 = días transcurridos desde el lunes.
  const daysSinceMonday = (new Date(utcMidnight).getUTCDay() + 6) % 7;
  return new Date(utcMidnight - daysSinceMonday * MS_PER_DAY);
};

/**
 * Registros de usuarios agrupados por semana.
 *
 * Las semanas sin registros se rellenan con cero: si se omitieran, el gráfico de línea
 * uniría dos semanas distantes como si fueran consecutivas y comprimiría el eje de
 * tiempo, mostrando una tendencia que no ocurrió.
 */
export const getSignupsPerWeek = async (): Promise<SignupsPerWeekRow[]> => {
  await requireAdmin();

  try {
    const users = await db.user.findMany({ select: { createdAt: true } });

    // Base vacía: sin filas no hay rango que rellenar.
    if (users.length === 0) {
      return [];
    }

    const counts = new Map<number, number>();
    for (const user of users) {
      const weekStart = startOfUtcWeek(user.createdAt).getTime();
      counts.set(weekStart, (counts.get(weekStart) ?? 0) + 1);
    }

    const weeks = Array.from(counts.keys());
    const firstWeek = Math.min(...weeks);
    const lastWeek = Math.max(...weeks);

    const series: SignupsPerWeekRow[] = [];
    for (let week = firstWeek; week <= lastWeek; week += MS_PER_WEEK) {
      series.push({
        weekStart: new Date(week).toISOString().slice(0, 10),
        signups: counts.get(week) ?? 0,
      });
    }

    return series;
  } catch (error) {
    console.error("Failed to fetch signups per week:", error);
    throw new Error("Unable to fetch signups per week.");
  }
};

// ---------------------------------------------------------------------------
// Oferta real de tutores
// ---------------------------------------------------------------------------

export type TutorSupply = {
  /** Tutores con AL MENOS una disponibilidad Y al menos un curso. */
  activeTutors: number;
  tutorsWithCourses: number;
  tutorsWithAvailability: number;
  totalUsers: number;
  /** Porcentaje de usuarios que son tutores activos, con 1 decimal. */
  activeTutorsShare: number;
};

/**
 * La cifra real de oferta: tutores activos frente al total de usuarios registrados.
 *
 * La condición es COMPUESTA sobre el MISMO usuario — ≥1 disponibilidad Y ≥1 curso —,
 * no dos conteos por separado. Un tutor con horarios pero sin cursos no aparece en
 * ningún listado, y uno con cursos pero sin horarios no se puede reservar: ninguno de
 * los dos es oferta. La diferencia no es cosmética: sobre los datos actuales hay 66
 * usuarios con disponibilidad y 19 con cursos, pero solo 19 cumplen ambas
 * condiciones. Reportar el conteo de disponibilidad como "tutores activos"
 * multiplicaría la cifra por 3.5.
 *
 * `tutorsWithCourses` y `tutorsWithAvailability` se devuelven aparte precisamente para
 * que esa brecha sea visible y no se confundan con el número activo.
 */
export const getTutorSupply = async (): Promise<TutorSupply> => {
  await requireAdmin();

  try {
    const [activeTutors, tutorsWithCourses, tutorsWithAvailability, totalUsers] =
      await Promise.all([
        db.user.count({
          where: {
            availabilities: { some: {} },
            tutorCourses: { some: {} },
          },
        }),
        db.user.count({ where: { tutorCourses: { some: {} } } }),
        db.user.count({ where: { availabilities: { some: {} } } }),
        db.user.count(),
      ]);

    return {
      activeTutors,
      tutorsWithCourses,
      tutorsWithAvailability,
      totalUsers,
      // Sin usuarios no hay porcentaje que calcular: 0, nunca NaN.
      activeTutorsShare:
        totalUsers === 0 ? 0 : Math.round((activeTutors / totalUsers) * 1000) / 10,
    };
  } catch (error) {
    console.error("Failed to fetch tutor supply:", error);
    throw new Error("Unable to fetch tutor supply.");
  }
};
