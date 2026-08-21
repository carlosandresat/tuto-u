import type { Prisma } from "@/generated/prisma/client";
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
 *
 * DEFINICIÓN DE TUTOR ACTIVO — ver `ACTIVE_TUTOR_WHERE` más abajo. Es la ÚNICA fuente
 * de verdad del término en este archivo; toda función derivada de tutores la reutiliza
 * en vez de repetir las condiciones inline.
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
// Definición de TUTOR ACTIVO — fuente única de verdad
// ---------------------------------------------------------------------------

/**
 * TUTOR ACTIVO: usuario con las TRES condiciones a la vez — al menos un curso, al
 * menos una franja de disponibilidad y al menos una fila de precios.
 *
 * Es una condición COMPUESTA sobre el MISMO usuario, no tres conteos sueltos: sin
 * curso no aparece en ningún listado, sin disponibilidad no se puede reservar, y sin
 * ninguna fila de precios el formulario de reserva no tiene qué ofrecer. Los tres
 * huecos producen el mismo resultado — un tutor que no es oferta real.
 *
 * Una fila de precio en 0 SÍ cuenta para esta prueba. `updateUserPricing`
 * (src/actions/user-configuration.ts) inserta `price: 0` cuando el tutor marca una
 * duración y deja el campo vacío, así que un 0 significa casi siempre "sin
 * configurar", no "gratis": basta para probar que el tutor llegó a ese paso, pero NO
 * entra en ningún promedio. Ver `POSITIVE_PRICE_WHERE`.
 *
 * Este objeto es la ÚNICA definición del término en el archivo. Toda función derivada
 * de tutores lo reutiliza — directamente en `db.user`, o anidado como `tutor:` desde
 * `TutorCourse` / `UserPricingConfiguration`. No dupliques las condiciones inline.
 *
 * Compartido por referencia: nunca se muta. Para agregar una condición extra, compón
 * con `AND: [ACTIVE_TUTOR_WHERE, { ... }]`.
 */
export const ACTIVE_TUTOR_WHERE: Prisma.UserWhereInput = {
  tutorCourses: { some: {} },
  availabilities: { some: {} },
  tutor_pricing: { some: {} },
};

/** Filas de precio que cuentan como tarifa configurada de verdad. Ver arriba. */
export const POSITIVE_PRICE_WHERE: Prisma.UserPricingConfigurationWhereInput = {
  price: { gt: 0 },
};

// ---------------------------------------------------------------------------
// Tutores por curso
// ---------------------------------------------------------------------------

export type TutorsPerCourseRow = {
  courseId: number;
  course: string;
  tutors: number;
};

/**
 * Cantidad de tutores ACTIVOS por curso, descendente. Ver `ACTIVE_TUTOR_WHERE`.
 *
 * Se parte de `Course` (no de `TutorCourse`) a propósito: un `groupBy` sobre
 * `TutorCourse` nunca puede producir una fila en cero, y los cursos SIN tutores
 * activos son justamente la señal que interesa — muestran la cobertura que falta.
 */
export const getTutorsPerCourse = async (): Promise<TutorsPerCourseRow[]> => {
  await requireAdmin();

  try {
    const courses = await db.course.findMany({
      select: {
        id: true,
        name: true,
        _count: { select: { tutorCourses: { where: { tutor: ACTIVE_TUTOR_WHERE } } } },
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
 * Una sola consulta con `select` anidado — sin N+1. Dos filtros, dos trabajos
 * distintos: el `where` externo decide QUÉ TUTORES cuentan (`ACTIVE_TUTOR_WHERE`), el
 * `where` anidado decide QUÉ PRECIOS de esos tutores cuentan (`POSITIVE_PRICE_WHERE`
 * — un 0 no es un precio real, ver la nota en `ACTIVE_TUTOR_WHERE`). Un tutor activo
 * cuyas tarifas son todas 0 pasa el filtro externo y no aporta ninguna fila: correcto
 * bajo las dos reglas a la vez.
 *
 * Ojo con la ponderación: un tutor que dicta 4 cursos aporta sus precios a los 4. Es
 * lo que pide la métrica ("precios de los tutores que dictan ese curso"), pero implica
 * que estas filas NO se pueden re-agregar para obtener el promedio global por
 * duración — para eso está `getAveragePricePerDuration()`, que cuenta cada tutor una
 * sola vez.
 */
const fetchCoursePriceRows = async (): Promise<CoursePriceRow[]> => {
  const tutorCourses = await db.tutorCourse.findMany({
    where: { tutor: ACTIVE_TUTOR_WHERE },
    select: {
      courseId: true,
      course: { select: { name: true } },
      tutor: {
        select: {
          tutor_pricing: {
            where: POSITIVE_PRICE_WHERE,
            select: { duration: true, price: true },
          },
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
 * Precio promedio por curso, sobre las tarifas configuradas (> 0) de los tutores
 * ACTIVOS que dictan ese curso. Ver `ACTIVE_TUTOR_WHERE` y `POSITIVE_PRICE_WHERE`.
 *
 * ADVERTENCIA PARA QUIEN ARME EL GRÁFICO (Unit 5): este promedio mezcla duraciones.
 * Un curso cuyos tutores solo configuraron la tarifa de 60 min aparecerá "más barato"
 * que uno cuyos tutores llegaron hasta 180 min, sin que sus tarifas comparables lo
 * sean. Sirve como precio típico de un curso, NO para rankear cursos por precio; para
 * eso está `getAveragePricePerCourseAndDuration()`. `sampleSize` se devuelve para
 * poder rotular el tamaño de muestra en la tarjeta, y ya excluye las tarifas en 0.
 *
 * El dominio de cursos aquí es MÁS ANGOSTO que el de `getTutorsPerCourse()`: un curso
 * cuyos tutores activos solo tienen tarifas en 0 no produce ninguna fila (no se
 * sintetiza `averagePrice: 0` — eso leería como "este curso es gratis").
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
 *
 * Mismo dominio que `getAveragePricePerCourse()`: tutores ACTIVOS, tarifas > 0.
 * `sampleSize` ya excluye las tarifas en 0.
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
 * 1. Solo se consideran tutores ACTIVOS (`ACTIVE_TUTOR_WHERE`) y tarifas > 0
 *    (`POSITIVE_PRICE_WHERE`). Un tutor sin curso o sin disponibilidad no es
 *    reservable y no forma parte de la oferta real; una tarifa en 0 casi siempre
 *    significa "sin configurar", no "gratis" (ver la nota en `ACTIVE_TUTOR_WHERE`).
 *    Incluir cualquiera de los dos infla o distorsiona el promedio.
 * 2. A diferencia de `getAveragePricePerCourseAndDuration()`, aquí un tutor que dicta
 *    varios cursos NO se cuenta varias veces. Por eso los dos conjuntos de promedios
 *    no reconcilian entre sí: usan ponderaciones distintas a propósito, y encima el
 *    de aquí filtra sobre una población de tutores potencialmente distinta a la que
 *    aparece curso por curso en el otro.
 */
export const getAveragePricePerDuration = async (): Promise<
  AveragePricePerDurationRow[]
> => {
  await requireAdmin();

  try {
    const pricings = await db.userPricingConfiguration.findMany({
      where: { ...POSITIVE_PRICE_WHERE, tutor: ACTIVE_TUTOR_WHERE },
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

/** Los cuatro valores que la aplicación realmente escribe. Ver el comentario abajo. */
const STORED_STATUS_ORDER = ["requested", "accepted", "rejected", "canceled"] as const;
type StoredStatus = (typeof STORED_STATUS_ORDER)[number];

const STORED_STATUS_LABELS: Record<StoredStatus, string> = {
  requested: "Solicitadas",
  accepted: "Aceptadas (por realizarse)",
  rejected: "Rechazadas",
  canceled: "Canceladas",
};

/**
 * Claves de presentación: los cuatro estados almacenados, más "completed" (derivado,
 * ver abajo) y "other" — cajón de sastre para cualquier valor que aparezca en la base
 * y no esté en `STORED_STATUS_ORDER`. Quien consuma esto (Unit 5) debe contemplar
 * "other" si hace un switch exhaustivo sobre `status`.
 */
export type SessionStatusKey = StoredStatus | "completed" | "other";

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
 *
 * `status` no tiene restricción a nivel de base de datos (es un `TEXT` sin `CHECK` ni
 * enum) y las filas se leen con un `groupBy` sin filtro, así que cualquier valor fuera
 * de los cuatro conocidos — de una edición manual, una migración futura, o datos
 * antiguos — se agrega en una fila "Otras" en vez de desaparecer silenciosamente.
 * Invariante: la suma de `sessions` en todas las filas siempre es igual al total de
 * sesiones en la base.
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
    // Las dos consultas no son atómicas; el clamp evita un negativo si una sesión
    // cruza `now` justo entre ambas.
    const pendingAccepted = Math.max(0, accepted - completed);

    const known = new Set<string>(STORED_STATUS_ORDER);
    const other = grouped
      .filter((row) => !known.has(row.status))
      .reduce((acc, row) => acc + row._count._all, 0);

    const rows: SessionsByStatusRow[] = [];
    for (const status of STORED_STATUS_ORDER) {
      rows.push({
        status,
        label: STORED_STATUS_LABELS[status],
        sessions: status === "accepted" ? pendingAccepted : (counts.get(status) ?? 0),
      });
      // "completed" se intercala justo después de "accepted" para conservar el orden
      // de presentación previo: Solicitadas, Aceptadas, Completadas, Rechazadas,
      // Canceladas.
      if (status === "accepted") {
        rows.push({ status: "completed", label: "Completadas", sessions: completed });
      }
    }

    if (other > 0) {
      rows.push({ status: "other", label: "Otras", sessions: other });
    }

    return rows;
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
  /** Tutores activos. Ver `ACTIVE_TUTOR_WHERE` — la definición vive ahí, no aquí. */
  activeTutors: number;
  /** Tutores activos SIN ninguna tarifa > 0: todas sus filas de precio están en 0. */
  voluntaryTutors: number;
  tutorsWithCourses: number;
  tutorsWithAvailability: number;
  tutorsWithPricing: number;
  totalUsers: number;
  /** Porcentaje de usuarios que son tutores activos, con 1 decimal. */
  activeTutorsShare: number;
};

/**
 * La cifra real de oferta: tutores activos frente al total de usuarios registrados.
 *
 * `activeTutors` usa `ACTIVE_TUTOR_WHERE` — una condición COMPUESTA sobre el MISMO
 * usuario (curso Y disponibilidad Y precio), no conteos sueltos. Un tutor que solo
 * cumple una o dos de las tres condiciones no es oferta real: no aparece en ningún
 * listado, o no se puede reservar, o no tiene qué ofrecer en el formulario. Reportar
 * cualquiera de los conteos individuales como "tutores activos" sobreestima la cifra.
 *
 * `tutorsWithCourses`, `tutorsWithAvailability` y `tutorsWithPricing` se devuelven por
 * separado precisamente para que esa brecha sea visible y no se confunda con el
 * número activo — no hay una cifra fija que citar aquí; compárense en el momento
 * contra `activeTutors` para ver cuánto aporta cada condición.
 *
 * `voluntaryTutors` es un sub-conjunto de `activeTutors`: cumple las tres condiciones
 * pero ninguna de sus tarifas es > 0. Ver la nota sobre precios en 0 en
 * `ACTIVE_TUTOR_WHERE` — casi siempre significa "sin configurar", no "gratis", así que
 * en el gráfico (Unit 5) esta cifra debe rotularse como tal, nunca como "gratis" a
 * secas.
 */
export const getTutorSupply = async (): Promise<TutorSupply> => {
  await requireAdmin();

  try {
    const [
      activeTutors,
      voluntaryTutors,
      tutorsWithCourses,
      tutorsWithAvailability,
      tutorsWithPricing,
      totalUsers,
    ] = await Promise.all([
      db.user.count({ where: ACTIVE_TUTOR_WHERE }),
      db.user.count({
        where: {
          AND: [ACTIVE_TUTOR_WHERE, { tutor_pricing: { none: POSITIVE_PRICE_WHERE } }],
        },
      }),
      db.user.count({ where: { tutorCourses: { some: {} } } }),
      db.user.count({ where: { availabilities: { some: {} } } }),
      db.user.count({ where: { tutor_pricing: { some: {} } } }),
      db.user.count(),
    ]);

    return {
      activeTutors,
      voluntaryTutors,
      tutorsWithCourses,
      tutorsWithAvailability,
      tutorsWithPricing,
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
