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

      <section className="w-full py-12 flex items-center justify-center flex-col pt-44">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight max-w-screen-xl">
          Precios
        </h2>
        <div className="container px-4 md:px-6">

        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 md:gap-8">
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Starter</h3>
            <p className="text-4xl font-bold mb-1">$60.00</p>
            <p className="text-sm mb-6">per year</p>
            <h4 className="text-md font-semibold mb-4">Features</h4>
            <ul className="mb-6">
              <li className="flex items-center mb-2">
                <CheckIcon className="text-green-500 mr-2" />
                50 users{"\n                  "}
              </li>
            </ul>
            <h4 className="text-md font-semibold mb-4">All plan features</h4>
            <ul>
              <li className="flex items-center mb-2">
                <CheckIcon className="text-green-500 mr-2" />
                Create own personalised courses{"\n                  "}
              </li>
              <li className="flex items-center mb-2">
                <CheckIcon className="text-green-500 mr-2" />
                Set up unlimited courses and activities{"\n                  "}
              </li>
              <li className="flex items-center mb-2">
                <CheckIcon className="text-green-500 mr-2" />
                Create own custom certificates{"\n                  "}
              </li>
              <li className="flex items-center">
                <CheckIcon className="text-green-500 mr-2" />
                Access web conferencing and session recordings with up to 100
                concurrent users{"\n                  "}
              </li>
            </ul>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Mini</h3>
            <p className="text-4xl font-bold mb-1">$105.00</p>
            <p className="text-sm mb-6">per year</p>
            <h4 className="text-md font-semibold mb-4">Features</h4>
            <ul className="mb-6">
              <li className="flex items-center mb-2">
                <CheckIcon className="text-green-500 mr-2" />
                100 users{"\n                  "}
              </li>
              <li className="flex items-center">
                <CheckIcon className="text-green-500 mr-2" />
                Includes All plan features{"\n                  "}
              </li>
            </ul>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Small</h3>
            <p className="text-4xl font-bold mb-1">$190.00</p>
            <p className="text-sm mb-6">per year</p>
            <h4 className="text-md font-semibold mb-4">Features</h4>
            <ul className="mb-6">
              <li className="flex items-center mb-2">
                <CheckIcon className="text-green-500 mr-2" />
                200 users{"\n                  "}
              </li>
              <li className="flex items-center">
                <CheckIcon className="text-green-500 mr-2" />
                Includes All plan features{"\n                  "}
              </li>
            </ul>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Medium</h3>
            <p className="text-4xl font-bold mb-1">$445.00</p>
            <p className="text-sm mb-6">per year</p>
            <h4 className="text-md font-semibold mb-4">Features</h4>
            <ul className="mb-6">
              <li className="flex items-center mb-2">
                <CheckIcon className="text-green-500 mr-2" />
                500 users{"\n                  "}
              </li>
              <li className="flex items-center">
                <CheckIcon className="text-green-500 mr-2" />
                Includes All plan features{"\n                  "}
              </li>
            </ul>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Large</h3>
            <p className="text-4xl font-bold mb-1">$890.00</p>
            <p className="text-sm mb-6">per year</p>
            <h4 className="text-md font-semibold mb-4">Features</h4>
            <ul className="mb-6">
              <li className="flex items-center mb-2">
                <CheckIcon className="text-green-500 mr-2" />
                1000 users{"\n                  "}
              </li>
              <li className="flex items-center">
                <CheckIcon className="text-green-500 mr-2" />
                Includes All plan features{"\n                  "}
              </li>
            </ul>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Enterprise</h3>
            <p className="text-4xl font-bold mb-1">Custom</p>
            <p className="text-sm mb-6">per year</p>
            <h4 className="text-md font-semibold mb-4">Features</h4>
            <ul className="mb-6">
              <li className="flex items-center mb-2">
                <CheckIcon className="text-green-500 mr-2" />
                Scale up to millions of users{"\n                  "}
              </li>
              <li className="flex items-center">
                <CheckIcon className="text-green-500 mr-2" />
                Includes All plan features{"\n                  "}
              </li>
            </ul>
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
