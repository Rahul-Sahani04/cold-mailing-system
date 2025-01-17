// Tremor Raw cx [v0.0.0]

import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cx(...args) {
  return twMerge(clsx(...args))
}


export const focusRing = [
    // base
    "outline outline-offset-2 outline-0 focus-visible:outline-2",
    // outline color
    "outline-blue-500 dark:outline-blue-500",
]