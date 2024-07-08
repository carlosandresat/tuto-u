import { StartNavbar } from "@/components/start-navbar";

export default function PatchNotes() {
  return (
    <>
      <StartNavbar />
      <section className="min-h-screen w-full py-12 flex items-center justify-center flex-col pt-40">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight max-w-screen-xl">
          Notas de la Versión
        </h2>


        <div className="flex flex-col w-full max-w-screen-xl p-8">
          {/* Versión 1.4 */}
<div className="w-full flex justify-start items-center">
  <div className="bg-foreground text-background rounded-full h-20 w-20 text-center items-center justify-center flex text-2xl">
    1.4
  </div>
  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight ml-4">
    Versión 1.4 – 18 de julio de 2024
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
      Esta actualización de Tuto-U trae varias optimizaciones funcionales y recursos adicionales para enriquecer la experiencia del usuario:
    </p>
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      <li>
        <span className="font-semibold">Sección FAQ Añadida:</span> Nueva sección de preguntas frecuentes disponible para ayudar a los usuarios con las consultas comunes.
      </li>
      <li>
        <span className="font-semibold">Eliminación de la Página de Precios y Cómo Usar:</span> Simplificación del sitio web mediante la eliminación de las páginas sin contenido.
      </li>
      <li>
        <span className="font-semibold">Nueva Sección de Notas de la Versión:</span> Inclusión de una sección dedicada a explicar los detalles de las actualizaciones de Tuto-U.
      </li>
      <li>
        <span className="font-semibold">Syllabus de Asignaturas:</span> Ahora cada tarjeta de curso en la página de inicio incluye un enlace directo al syllabus, mejorando el acceso a la información académica vital.
      </li>
    </ul>
    <p className="leading-7">
      Estas mejoras y adiciones están diseñadas para proporcionar una plataforma más intuitiva y rica en recursos, facilitando el acceso a la información y mejorando la navegación general.
    </p>
  </div>
</div>



          {/* Versión 1.3.1 */}
<div className="w-full flex justify-start items-center">
  <div className="bg-foreground text-background rounded-full h-20 w-20 text-center items-center justify-center flex text-2xl">
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
      Mejoras de accesibilidad y ajustes menores para optimizar la experiencia del usuario:
    </p>
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      <li>
        <span className="font-semibold">Ajustes en Logros:</span> Se realizaron mejoras en la funcionalidad de logros y se corrigieron aspectos generales para una mejor gestión de los mismos.
      </li>
      <li>
        <span className="font-semibold">Nueva Opción de Curso:</span> Se añadió el curso de Aplicaciones Web a la lista de cursos disponibles, ampliando las opciones educativas para los estudiantes.
      </li>
      <li>
        <span className="font-semibold">Mejoras en Tarjetas de Tutor:</span> Se realizaron ajustes en los identificadores utilizados en las tarjetas de tutor para mejorar la interacción y accesibilidad en la plataforma.
      </li>
    </ul>
    <p className="leading-7">
      Con estas actualizaciones, Tuto-U v1.3.1 sigue mejorando la usabilidad y funcionalidad de la plataforma, asegurando que los usuarios disfruten de una experiencia de aprendizaje más fluida y eficaz.
    </p>
  </div>
</div>


          {/* Versión 1.3 */}
<div className="w-full flex justify-start items-center">
  <div className="bg-foreground text-background rounded-full h-20 w-20 text-center items-center justify-center flex text-2xl">
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
      Implementación de nuevas funcionalidades y mejoras significativas para enriquecer la experiencia de tutorías:
    </p>
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      <li>
        <span className="font-semibold">Notificaciones Mejoradas:</span> Los usuarios reciben notificaciones instantáneas por correo cuando las sesiones de tutoría son aceptadas, rechazadas o canceladas, asegurando una gestión efectiva del tiempo.
      </li>
      <li>
        <span className="font-semibold">Reporte de Sesiones:</span> Se introdujo la opción de reportar sesiones que no cumplen con los estándares esperados, fomentando un ambiente seguro y respetuoso.
      </li>
      <li>
        <span className="font-semibold">Nueva Página de Equipo:</span> Actualización de la página &apos;Nuestro Equipo&apos; con información detallada sobre los colaboradores, partners y donantes que apoyan a Tuto-U.
      </li>
      <li>
        <span className="font-semibold">Páginas de Tutores y Estudiantes:</span> Nuevas secciones para explorar los perfiles de tutores y estudiantes más destacados en la plataforma, aumentando la visibilidad y accesibilidad.
      </li>
      <li>
        <span className="font-semibold">Interfaces de Usuario Actualizadas:</span> Renovación de las páginas de inicio de sesión y registro con un diseño más limpio y accesible, mejorando la experiencia general del usuario.
      </li>
    </ul>
    <p className="leading-7">
      Con Tuto-U v1.3, seguimos comprometidos a mejorar continuamente la plataforma para ofrecer una experiencia educativa transformadora y eficaz.
    </p>
  </div>
</div>

          {/* Versión 1.2 */}
<div className="w-full flex justify-start items-center">
  <div className="bg-foreground text-background rounded-full h-20 w-20 text-center items-center justify-center flex text-2xl">
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
        <span className="font-semibold">Notificaciones por Correo:</span> Los tutores ahora reciben un correo electrónico cada vez que se les solicita una tutoría, mejorando la comunicación y respuesta.
      </li>
      <li>
        <span className="font-semibold">Mejora en la Visualización Móvil:</span> Se actualizaron las interfaces para la selección de horarios en dispositivos móviles, haciendo el proceso más fluido.
      </li>
      <li>
        <span className="font-semibold">Cambio de Temas en &apos;Mi Perfil&apos;:</span> Los usuarios pueden cambiar el tema visual de la aplicación directamente desde &apos;Mi Perfil&apos;, personalizando aún más su experiencia.
      </li>
    </ul>
    <p className="leading-7">
      La versión 1.2 de Tuto-U trae consigo mejoras significativas que facilitan la interacción y gestión dentro de la plataforma, reforzando la usabilidad y la personalización para todos los usuarios.
    </p>
  </div>
</div>

          {/* Versión 1.1 */}
          <div className="w-full flex justify-start items-center">
            <div className="bg-foreground text-background rounded-full h-20 w-20 text-center items-center justify-center flex text-2xl">
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
                  Se habilitaron las vistas previas de las páginas &apos;Tutores&apos; y
                  &apos;Estudiantes&apos;, con funcionalidades completas próximamente
                  disponibles.
                </li>
                <li>
                  <span className="font-semibold">Logros Secretos:</span>{" "}
                  Introducción de logros secretos para los usuarios más
                  curiosos, incluyendo el logro &apos;Narcisista Por Excelencia&apos;, que
                  se desbloquea bajo condiciones especiales.
                </li>
                <li>
                  <span className="font-semibold">Edición de Perfil:</span> Los
                  usuarios pueden ahora personalizar la descripción en sus
                  perfiles desde la sección &apos;Mi Perfil&apos;, lo cual también se
                  refleja en los detalles mostrados durante las solicitudes de
                  tutoría.
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
          {/* Versión 1.0 */}
          <div className="w-full flex  justify-start items-center">
            <div className="bg-foreground text-background rounded-full h-20 w-20 text-center items-center justify-center flex text-2xl">
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
        </div>
      </section>
    </>
  );
}
