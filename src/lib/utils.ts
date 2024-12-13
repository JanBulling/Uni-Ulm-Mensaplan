import { MensaCategory } from "@/types/meal";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { icons } from "lucide-react";

export function categoryToName(id: MensaCategory) {
  switch (id) {
    case "SATTMACHER":
      return "Sattmacher";
    case "FLEISCH-FISCH":
      return "Fleisch & Fisch";
    case "PRIMA-KLIMA":
      return "Prima Klima";
    case "TOPF-PFANNE":
      return "Topf & Pfanne";
    case "HEISSE-THEKE":
      return "Heiße Theke";
  }
}

export type IconType = keyof typeof icons;

export function categoryToIcon(id: MensaCategory): IconType {
  switch (id) {
    case "SATTMACHER":
      return "Utensils";
    case "FLEISCH-FISCH":
      return "Ham";
    case "PRIMA-KLIMA":
      return "Leaf";
    case "TOPF-PFANNE":
      return "CookingPot";
    case "HEISSE-THEKE":
      return "Soup";
  }
}

export function categoryToColor(id: MensaCategory) {
  switch (id) {
    case "SATTMACHER":
      return "orange-500";
    case "FLEISCH-FISCH":
      return "red-500";
    case "PRIMA-KLIMA":
      return "green-500";
    case "TOPF-PFANNE":
      return "blue-500";
    case "HEISSE-THEKE":
      return "yellow-500";
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function containsWordFromList(
  text: string,
  wordList: string[]
): boolean {
  return wordList.some((word) => text.includes(word));
}
