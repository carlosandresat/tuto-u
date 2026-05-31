import { StartNavbar } from "@/components/start-navbar";
import { Lightbulb } from "lucide-react";
import { PageContainer } from "@/components/page-container";
import { Footer } from "@/components/footer";
export default function PatchNotes() {
  return (
    <>
      <StartNavbar />
      <PageContainer size="default" className="min-h-screen">
        <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight max-w-screen-xl w-full text-center">
          Notas de la Versión
        </h1>
        <div className="flex flex-col w-full mt-8">
          {/* Versión 1.6 */}
          <div className="w-full flex justify-start items-center">
            <div className="bg-foreground text-background rounded-full h-20 w-20 text-center items-center justify-center flex text-2xl flex-none font-semibold">
              1.6
            </div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight ml-4">
              Versión 1.6 – 31 de mayo de 2026
            </h3>
          </div>
          <div className="w-full flex">
            <div className="flex justify-center relative w-20">
              <div className="flex justify-center h-full w-20">
                <div className="w-1 bg-foreground"></div>
              </div>
            </div>
            <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
              <p className="text-md text-muted-foreground">
                Esta actualización de Tuto-U introduce nuevas herramientas interactivas,
                flujos de seguridad esenciales y una optimización completa de velocidad y consistencia:
              </p>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>
                  <span className="font-semibold">Página de Logros con Progreso:</span>{" "}
                  Nueva sección en el panel de inicio para consultar tus logros obtenidos,
                  los que están pendientes y el avance porcentual de cada meta.
                </li>
                <li>
                  <span className="font-semibold">Buscador y Filtro de Asignaturas:</span>{" "}
                  Barra de búsqueda en tiempo real y filtros rápidos por área/escuela en la página principal
                  para encontrar tutores y materias con un solo clic.
                </li>
                <li>
                  <span className="font-semibold">Colaboración de Syllabus:</span>{" "}
                  Nueva guía paso a paso y botón para subir programas académicos en PDF de forma sencilla,
                  permitiéndote ganar un logro al colaborar. Además, ahora se muestra la fecha de su última actualización.
                </li>
                <li>
                  <span className="font-semibold">Soporte para Tutorías Cortas (30 minutos):</span>{" "}
                  Los tutores ahora pueden configurar opciones de duración de 30 minutos, y los estudiantes
                  solicitar tutorías rápidas adaptadas a dudas puntuales.
                </li>
                <li>
                  <span className="font-semibold">Recuperación de Contraseñas por Correo:</span>{" "}
                  Flujo seguro para restablecer credenciales en caso de olvido mediante el correo institucional.
                </li>
                <li>
                  <span className="font-semibold">Corrección de Zonas Horarias y Regla de 8 Horas:</span>{" "}
                  Ajustes internos para sincronizar de manera óptima las zonas horarias locales con el servidor (UTC),
                  garantizando que las reservas se realicen correctamente con las 8 horas de antelación requeridas.
                </li>
                <li>
                  <span className="font-semibold">Nueva Estructura Visual Unificada:</span>{" "}
                  Migración de las páginas principales al nuevo sistema de contenedores y pie de página común,
                  mejorando la presentación y legibilidad en dispositivos móviles.
                </li>
                <li>
                  <span className="font-semibold">Actualización Mayor de Velocidad (React 19 & Next.js 16):</span>{" "}
                  Actualización técnica profunda que reduce los tiempos de respuesta del sitio y optimiza la estabilidad general.
                </li>
              </ul>
              <p className="leading-7">
                Esta versión prepara a Tuto-U para el inicio del nuevo semestre académico,
                brindando una plataforma mucho más ágil, rápida y accesible para toda la comunidad de Yachay Tech.
              </p>
            </div>
          </div>
          <div className="w-full flex">
            <div className="flex justify-center relative w-20">
              <div className="flex justify-center h-full w-20">
                <div className="w-1 bg-foreground"></div>
              </div>
            </div>
            <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
          </div>

          {/* Versión 1.5 */}
          <div className="w-full flex justify-start items-center">
            <div className="bg-foreground text-background rounded-full h-20 w-20 text-center items-center justify-center flex text-2xl flex-none font-semibold">
              1.5
            </div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight ml-4">
              Versión 1.5 – 20 de marzo de 2025
            </h3>
          </div>
          <div className="w-full flex">
            <div className="flex justify-center relative w-20">
              <div className="flex justify-center h-full w-20">
                <div className="w-1 bg-foreground"></div>
              </div>
            </div>
            <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
              <p className="text-md text-muted-foreground">
                Un lanzamiento centrado en la conexión directa entre la comunidad y la personalización
                de perfiles para facilitar el agendamiento:
              </p>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>
                  <span className="font-semibold">Perfiles Públicos y Compartibles:</span>{" "}
                  Los usuarios pueden ahora compartir sus perfiles mediante un enlace directo público.
                  Se añadieron portadas sociales dinámicas (OpenGraph) para Facebook y WhatsApp.
                </li>
                <li>
                  <span className="font-semibold">Botón de Chat de WhatsApp:</span>{" "}
                  Integración de enlaces de contacto directo por WhatsApp en las tarjetas de tutoría aceptada,
                  permitiendo coordinar detalles al instante sin depender de correos electrónicos.
                </li>
                <li>
                  <span className="font-semibold">Agendamiento desde Perfiles con Horarios Dinámicos:</span>{" "}
                  Un nuevo formulario que permite agendar tutorías directamente desde el perfil del tutor,
                  mostrando sus tarifas y actualizando automáticamente los horarios hábiles según el día elegido.
                </li>
                <li>
                  <span className="font-semibold">Syllabus de Química I y Biología I:</span>{" "}
                  Ampliación del contenido académico disponible con las guías de estudio de estas materias básicas.
                </li>
                <li>
                  <span className="font-semibold">Hito de 400 Usuarios Registrados:</span>{" "}
                  Tuto-U superó la marca de 400 estudiantes de Yachay Tech registrados de forma activa en la plataforma.
                </li>
              </ul>
              <p className="leading-7">
                Con la versión 1.5, Tuto-U da un paso gigante hacia la comunicación directa y
                descentralizada entre tutores y estudiantes, agilizando el flujo completo de enseñanza.
              </p>
            </div>
          </div>
          <div className="w-full flex">
            <div className="flex justify-center relative w-20">
              <div className="flex justify-center h-full w-20">
                <div className="w-1 bg-foreground"></div>
              </div>
            </div>
            <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
          </div>

          {/* Hito 400 Usuarios */}
          <div className="w-full flex justify-start items-center">
            <div className="bg-foreground text-background rounded-full h-20 w-20 text-center items-center justify-center flex text-2xl flex-none">
              <Lightbulb />
            </div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight ml-4">
              400 usuarios registrados - 20 de marzo de 2025
            </h3>
          </div>
          <div className="w-full flex">
            <div className="flex justify-center relative w-20">
              <div className="flex justify-center h-full w-20">
                <div className="w-1 bg-foreground"></div>
              </div>
            </div>
            <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
          </div>

          {/* Versión 1.4 */}
          <div className="w-full flex items-center">
            <div className="bg-foreground text-background rounded-full h-20 w-20 text-center items-center justify-center flex text-2xl flex-none">
              1.4
            </div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight ml-4">
              Versión 1.4 – 15 de julio de 2024
            </h3>
          </div>
          <div className="w-full flex">
            <div className="flex justify-center relative w-20">
              <div className="flex justify-center h-full w-20">
                <div className="w-1 bg-foreground"></div>
              </div>
            </div>
            <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
              <p className="text-md text-muted-foreground">
                Esta actualización de Tuto-U trae varias optimizaciones
                funcionales y recursos adicionales para enriquecer la
                experiencia del usuario:
              </p>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>
                  <span className="font-semibold">
                    Syllabus de Asignaturas:
                  </span>{" "}
                  Ahora cada tarjeta de curso en la página de inicio incluye un
                  enlace directo al syllabus, mejorando el acceso a la
                  información académica vital.
                </li>
                <li>
                  <span className="font-semibold">Sección FAQ Añadida:</span>{" "}
                  Nueva sección de preguntas frecuentes disponible para ayudar a
                  los usuarios con las consultas comunes.
                </li>
                <li>
                  <span className="font-semibold">
                    Nueva Sección de Notas de la Versión:
                  </span>{" "}
                  Inclusión de una sección dedicada a explicar los detalles de
                  las actualizaciones de Tuto-U.
                </li>
                <li>
                  <span className="font-semibold">
                    Eliminación de la Página de Precios y Cómo Usar:
                  </span>{" "}
                  Simplificación del sitio web mediante la eliminación de las
                  páginas sin contenido.
                </li>
              </ul>
              <p className="leading-7">
                Estas mejoras y adiciones están diseñadas para proporcionar una
                plataforma más intuitiva y rica en recursos, facilitando el
                acceso a la información y mejorando la navegación general.
              </p>
            </div>
          </div>
          <div className="w-full flex">
            <div className="flex justify-center relative w-20">
              <div className="flex justify-center h-full w-20">
                <div className="w-1 bg-foreground"></div>
              </div>
            </div>
            <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
          </div>

          <div className="w-full flex  justify-start items-center">
            <div className="bg-foreground text-background rounded-full h-20 w-20 text-center items-center justify-center flex text-2xl flex-none">
              <Lightbulb />
            </div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight ml-4">
              300 usuarios registrados - 23 de junio de 2024
            </h3>
          </div>
          <div className="w-full flex">
            <div className="flex justify-center relative w-20">
              <div className="flex justify-center h-full w-20">
                <div className="w-1 bg-foreground"></div>
              </div>
            </div>
            <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
          </div>

          {/* Versión 1.3.1 */}
          <div className="w-full flex justify-start items-center">
            <div className="bg-foreground text-background rounded-full h-20 w-20 text-center items-center justify-center flex text-2xl flex-none">
              1.3.1
            </div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight ml-4">
              Versión 1.3.1 – 21 de junio de 2024
            </h3>
          </div>
          <div className="w-full flex">
            <div className="flex justify-center relative w-20">
              <div className="flex justify-center h-full w-20">
                <div className="w-1 bg-foreground"></div>
              </div>
            </div>
            <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
              <p className="text-md text-muted-foreground">
                Mejoras de accesibilidad y ajustes menores para optimizar la
                experiencia del usuario:
              </p>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>
                  <span className="font-semibold">Ajustes en Logros:</span> Se
                  realizaron mejoras en la funcionalidad de logros y se
                  corrigieron aspectos generales para una mejor gestión de los
                  mismos.
                </li>
                <li>
                  <span className="font-semibold">Nueva Opción de Curso:</span>{" "}
                  Se añadió el curso de Aplicaciones Web a la lista de cursos
                  disponibles, ampliando las opciones educativas para los
                  estudiantes.
                </li>
                <li>
                  <span className="font-semibold">
                    Mejoras en Tarjetas de Tutor:
                  </span>{" "}
                  Se realizaron ajustes en los identificadores utilizados en las
                  tarjetas de tutor para mejorar la interacción y accesibilidad
                  en la plataforma.
                </li>
              </ul>
              <p className="leading-7">
                Con estas actualizaciones, Tuto-U v1.3.1 sigue mejorando la
                usabilidad y funcionalidad de la plataforma, asegurando que los
                usuarios disfruten de una experiencia de aprendizaje más fluida
                y eficaz.
              </p>
            </div>
          </div>

          {/* Versión 1.3 */}
          <div className="w-full flex justify-start items-center">
            <div className="bg-foreground text-background rounded-full h-20 w-20 text-center items-center justify-center flex text-2xl flex-none">
              1.3
            </div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight ml-4">
              Versión 1.3 – 19 de junio de 2024
            </h3>
          </div>
          <div className="w-full flex">
            <div className="flex justify-center relative w-20">
              <div className="flex justify-center h-full w-20">
                <div className="w-1 bg-foreground"></div>
              </div>
            </div>
            <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
              <p className="text-md text-muted-foreground">
                Implementación de nuevas funcionalidades y mejoras
                significativas para enriquecer la experiencia de tutorías:
              </p>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>
                  <span className="font-semibold">
                    Notificaciones Mejoradas:
                  </span>{" "}
                  Los usuarios reciben notificaciones instantáneas por correo
                  cuando las sesiones de tutoría son aceptadas, rechazadas o
                  canceladas, asegurando una gestión efectiva del tiempo.
                </li>
                <li>
                  <span className="font-semibold">Reporte de Sesiones:</span> Se
                  introdujo la opción de reportar sesiones que no cumplen con
                  los estándares esperados, fomentando un ambiente seguro y
                  respetuoso.
                </li>
                <li>
                  <span className="font-semibold">Nueva Página de Equipo:</span>{" "}
                  Actualización de la página &apos;Nuestro Equipo&apos; con
                  información detallada sobre los colaboradores, partners y
                  donantes que apoyan a Tuto-U.
                </li>
                <li>
                  <span className="font-semibold">
                    Páginas de Tutores y Estudiantes:
                  </span>{" "}
                  Nuevas secciones para explorar los perfiles de tutores y
                  estudiantes más destacados en la plataforma, aumentando la
                  visibilidad y accesibilidad.
                </li>
                <li>
                  <span className="font-semibold">
                    Interfaces de Usuario Actualizadas:
                  </span>{" "}
                  Renovación de las páginas de inicio de sesión y registro con
                  un diseño más limpio y accesible, mejorando la experiencia
                  general del usuario.
                </li>
              </ul>
              <p className="leading-7">
                Con Tuto-U v1.3, seguimos comprometidos a mejorar continuamente
                la plataforma para ofrecer una experiencia educativa
                transformadora y eficaz.
              </p>
            </div>
          </div>
          <div className="w-full flex">
            <div className="flex justify-center relative w-20">
              <div className="flex justify-center h-full w-20">
                <div className="w-1 bg-foreground"></div>
              </div>
            </div>
            <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
          </div>

          <div className="w-full flex  justify-start items-center">
            <div className="bg-foreground text-background rounded-full h-20 w-20 text-center items-center justify-center flex text-2xl flex-none">
              <Lightbulb />
            </div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight ml-4">
              100 solicitudes de tutoría - 16 de junio de 2024
            </h3>
          </div>
          <div className="w-full flex">
            <div className="flex justify-center relative w-20">
              <div className="flex justify-center h-full w-20">
                <div className="w-1 bg-foreground"></div>
              </div>
            </div>
            <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
          </div>

          {/* Versión 1.2 */}
          <div className="w-full flex justify-start items-center">
            <div className="bg-foreground text-background rounded-full h-20 w-20 text-center items-center justify-center flex text-2xl flex-none">
              1.2
            </div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight ml-4">
              Versión 1.2 – 2 de junio de 2024
            </h3>
          </div>
          <div className="w-full flex">
            <div className="flex justify-center relative w-20">
              <div className="flex justify-center h-full w-20">
                <div className="w-1 bg-foreground"></div>
              </div>
            </div>
            <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
              <p className="text-md text-muted-foreground">
                Optimización de la experiencia del usuario y mejoras técnicas:
              </p>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>
                  <span className="font-semibold">
                    Notificaciones por Correo:
                  </span>{" "}
                  Los tutores ahora reciben un correo electrónico cada vez que
                  se les solicita una tutoría, mejorando la comunicación y
                  respuesta.
                </li>
                <li>
                  <span className="font-semibold">
                    Mejora en la Visualización Móvil:
                  </span>{" "}
                  Se actualizaron las interfaces para la selección de horarios
                  en dispositivos móviles, haciendo el proceso más fluido.
                </li>
                <li>
                  <span className="font-semibold">
                    Cambio de Temas en &apos;Mi Perfil&apos;:
                  </span>{" "}
                  Los usuarios pueden cambiar el tema visual de la aplicación
                  directamente desde &apos;Mi Perfil&apos;, personalizando aún
                  más su experiencia.
                </li>
              </ul>
              <p className="leading-7">
                La versión 1.2 de Tuto-U trae consigo mejoras significativas que
                facilitan la interacción y gestión dentro de la plataforma,
                reforzando la usabilidad y la personalización para todos los
                usuarios.
              </p>
            </div>
          </div>

          {/* Versión 1.1 */}
          <div className="w-full flex justify-start items-center">
            <div className="bg-foreground text-background rounded-full h-20 w-20 text-center items-center justify-center flex text-2xl flex-none">
              1.1
            </div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight ml-4">
              Versión 1.1 – 25 de mayo de 2024
            </h3>
          </div>
          <div className="w-full flex">
            <div className="flex justify-center relative w-20">
              <div className="flex justify-center h-full w-20">
                <div className="w-1 bg-foreground"></div>
              </div>
            </div>
            <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
              <p className="text-md text-muted-foreground">
                Avances y mejoras en la personalización y experiencia del
                usuario:
              </p>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>
                  <span className="font-semibold">
                    Vista Previa de Páginas:
                  </span>{" "}
                  Se habilitaron las vistas previas de las páginas
                  &apos;Tutores&apos; y &apos;Estudiantes&apos;, con
                  funcionalidades completas próximamente disponibles.
                </li>
                <li>
                  <span className="font-semibold">Logros Secretos:</span>{" "}
                  Introducción de logros secretos para los usuarios más
                  curiosos, incluyendo el logro &apos;Narcisista Por
                  Excelencia&apos;, que se desbloquea bajo condiciones
                  especiales.
                </li>
                <li>
                  <span className="font-semibold">Edición de Perfil:</span> Los
                  usuarios pueden ahora personalizar la descripción en sus
                  perfiles desde la sección &apos;Mi Perfil&apos;, lo cual
                  también se refleja en los detalles mostrados durante las
                  solicitudes de tutoría.
                </li>
              </ul>
              <p className="leading-7">
                Estas mejoras apuntan a enriquecer la experiencia de los
                usuarios, proporcionando más herramientas de personalización y
                engagement, y preparando el terreno para futuras funcionalidades
                que seguirán mejorando la interacción y la eficiencia en la
                plataforma Tuto-U.
              </p>
            </div>
          </div>
          <div className="w-full flex">
            <div className="flex justify-center relative w-20">
              <div className="flex justify-center h-full w-20">
                <div className="w-1 bg-foreground"></div>
              </div>
            </div>
            <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
          </div>

          <div className="w-full flex  justify-start items-center">
            <div className="bg-foreground text-background rounded-full h-20 w-20 text-center items-center justify-center flex text-2xl flex-none">
              <Lightbulb />
            </div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight ml-4">
              200 usuarios registrados - 20 de mayo de 2024
            </h3>
          </div>
          <div className="w-full flex">
            <div className="flex justify-center relative w-20">
              <div className="flex justify-center h-full w-20">
                <div className="w-1 bg-foreground"></div>
              </div>
            </div>
            <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
          </div>

          {/* Versión 1.0 */}
          <div className="w-full flex  justify-start items-center">
            <div className="bg-foreground text-background rounded-full h-20 w-20 text-center items-center justify-center flex text-2xl flex-none">
              1.0
            </div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight ml-4">
              Versión 1.0 – 15 de mayo de 2024
            </h3>
          </div>
          <div className="w-full flex">
            <div className="flex justify-center relative w-20">
              <div className="flex justify-center h-full w-20">
                <div className="w-1 bg-foreground"></div>
              </div>
            </div>
            <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
              <p className="text-md text-muted-foreground">
                Lanzamiento inicial de Tuto-U con todas las funcionalidades
                esenciales:
              </p>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>
                  <span className=" font-semibold">Pre-registro y Acceso:</span>{" "}
                  Los usuarios pueden pre-registrarse y acceder con sus
                  credenciales creadas.
                </li>
                <li>
                  <span className=" font-semibold">Gestión de Tutorías:</span>{" "}
                  Los estudiantes pueden revisar y gestionar sus solicitudes de
                  tutoría; los tutores pueden aceptar, rechazar o cancelar
                  solicitudes.
                </li>
                <li>
                  <span className=" font-semibold">
                    Calificaciones de Sesiones:
                  </span>{" "}
                  Tanto tutores como estudiantes pueden calificar las sesiones
                  completadas, con la opción de añadir comentarios.
                </li>
                <li>
                  <span className=" font-semibold">
                    Gestión de Perfil de Tutor:
                  </span>{" "}
                  Los tutores pueden configurar precios y horarios, seleccionar
                  materias para enseñar, y revisar logros obtenidos en la
                  plataforma.
                </li>
                <li>
                  <span className=" font-semibold">
                    Funcionalidades de Sesión:
                  </span>{" "}
                  Los usuarios pueden solicitar tutorías especificando la
                  asignatura, fecha, hora, duración, modo (en línea o
                  presencial), y proporcionar detalles adicionales para la
                  sesión.
                </li>
                <li>
                  <span className=" font-semibold">Navegación Intuitiva:</span>{" "}
                  Las páginas clave como &apos;Inicio&apos;, &apos;Solicitar
                  Tutoría&apos;, y &apos;Mi Perfil&apos; ofrecen una interfaz
                  clara y funcional para una experiencia de usuario eficiente.
                </li>
              </ul>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Estas funcionalidades marcaron el inicio de Tuto-U como una
                plataforma integral para la gestión y realización de tutorías en
                Yachay Tech, proporcionando herramientas robustas para facilitar
                el aprendizaje y la enseñanza dentro de la comunidad educativa.
              </p>
            </div>
          </div>
          <div className="w-full flex">
            <div className="flex justify-center relative w-20">
              <div className="flex justify-center h-full w-20">
                <div className="w-1 bg-foreground"></div>
              </div>
            </div>
            <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
          </div>

          <div className="w-full flex  justify-start items-center">
            <div className="bg-foreground text-background rounded-full h-20 w-20 text-center items-center justify-center flex text-2xl flex-none">
              <Lightbulb />
            </div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight ml-4">
              156 usuarios pre-registrados - 15 de mayo de 2024
            </h3>
          </div>

          <div className="w-full flex">
            <div className="flex justify-center relative w-20">
              <div className="flex justify-center h-full w-20">
                <div className="w-1 bg-foreground"></div>
              </div>
            </div>
            <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
          </div>

          <div className="w-full flex  justify-start items-center">
            <div className="bg-foreground text-background rounded-full h-20 w-20 text-center items-center justify-center flex text-2xl flex-none">
              <Lightbulb />
            </div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight ml-4">
              Inicio Pre-Registro - 2 de abril de 2024
            </h3>
          </div>

          <div className="w-full flex">
            <div className="flex justify-center relative w-20">
              <div className="flex justify-center h-full w-20">
                <div className="border-foreground border-l-4 border-dashed"></div>
              </div>
            </div>
            <div className="flex flex-col pl-4 w-auto space-y-2 h-16"></div>
          </div>
        </div>
      </PageContainer>
      <Footer size="default" />
    </>
  );
}
