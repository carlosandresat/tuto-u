import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { StartNavbar } from "@/components/start-navbar";

export default function Pricing() {
  return (
    <>
      <StartNavbar />

      <section className="min-h-screen w-full py-12 flex items-center justify-center flex-col">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-32 md:mt-6 max-w-screen-xl">
          Precios
        </h2>

        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 md:gap-8">
            <div className="flex flex-col p-6 shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-300">
              <div>
                <h3 className="text-2xl font-bold text-center">Gratis</h3>
                <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                  <span className="text-4xl font-bold">$0</span>/ mes
                </div>
                <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                    <div className="w-full font-bold">Como estudiante:</div>
                  </li>

                  <li className="flex items-center">
                    <CheckCircle className="mr-2" />
                    <div className="w-full">
                      Solicitar tutorías personalizadas ilimitadas
                    </div>
                  </li>

                  <li className="flex items-center ">
                    <CheckCircle className="mr-2" />
                    <div className="w-full">Unirse a tutorías grupales</div>
                  </li>
                  <li className="flex items-center">
                    <div className="w-full font-bold">Como tutor:</div>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2" />
                    <div className="w-full">
                      Ofrecer tutorías gratuitas
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <Button className="w-full">Regístrate</Button>
              </div>
            </div>
            <div className="relative flex flex-col p-6 shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-purple-500">
              <div className="px-3 py-1 text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                Popular
              </div>
              <div>
                <h3 className="text-2xl font-bold text-center">Premium</h3>
                <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                  <span className="text-4xl font-bold">$5</span>/ mes
                </div>
                <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                    <div className="w-full font-bold">Como estudiante:</div>
                  </li>

                  <li className="flex items-center">
                    <CheckCircle className="mr-2" />
                    <div className="w-full">
                      Solicitar tutorías personalizadas ilimitadas
                    </div>
                  </li>

                  <li className="flex items-center ">
                    <CheckCircle className="mr-2" />
                    <div className="w-full">Unirse a tutorías grupales</div>
                  </li>

                  <li className="flex items-center ">
                    <CheckCircle className="mr-2" />
                    <div className="w-full">Gráficos de tus estadísticas en la aplicación</div>
                  </li>

                  <li className="flex items-center">
                    <div className="w-full font-bold">Como tutor:</div>
                  </li>

                  <li className="flex items-center">
                    <CheckCircle className="mr-2" />
                    <div className="w-full">
                      Ofrecer tutorías con precio a tu elección
                    </div>
                  </li>

                  <li className="flex items-center">
                    <CheckCircle className="mr-2" />
                    <div className="w-full">
                      Organizar tutorías grupales
                    </div>
                  </li>

                </ul>
              </div>
              <div className="mt-6">
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500">
                  Regístrate
                </Button>
              </div>
            </div>
            <div className="flex flex-col p-6 shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-300">
              <div>
                <h3 className="text-2xl font-bold text-center">Institucional</h3>
                <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                  <span className="text-4xl font-bold">Pago</span>/ año
                </div>
                <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                    <div className="w-full font-bold">
                      Cuenta administrador con las siguientes funcionalidades:
                    </div>
                  </li>

                  <li className="flex items-center">
                    <CheckCircle className="mr-2" />
                    <div className="w-full">
                      Visualizar y descargar estadísticas de uso de la aplicación
                    </div>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2" />
                    <div className="w-full">
                      Organizar los cursos por escuelas, facultades o departamentos y añadir logos para cada uno
                    </div>
                  </li>

                  <li className="flex items-center">
                    <CheckCircle className="mr-2" />
                    <div className="w-full">
                      Crear logros personalizados y otorgarlos a cualquier usuario de la institución
                    </div>
                  </li>

                </ul>
              </div>
              <div className="mt-6">
                <Button className="w-full">Contáctanos</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
