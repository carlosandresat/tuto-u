import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const objectMap = (obj:any, fn:any) =>
  Object.fromEntries(
    Object.entries(obj).map(
      ([k, v], i) => [k, fn(v, k, i)]
    )
  )

export function capitalizeMonth(dateStr: string) {
  return dateStr.replace(
    /(\d+)\s([a-z]+)\s(\d+)/i,
    (match, day, month, year) => {
      return `${day} ${
        month.charAt(0).toUpperCase() + month.slice(1)
      }, ${year}`;
    }
  );
}