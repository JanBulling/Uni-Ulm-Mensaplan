import { Meal, MealPlan, MensaMeal } from "@/types/meal";
import jsdom from "jsdom";
import { containsWordFromList } from "./utils";

interface MealGroup {
  groupName: string;
  meals: Meal[];
}

export function parseMensaHTML(htmlString: string): MealPlan {
  const dom = new jsdom.JSDOM(htmlString);
  const doc = dom.window.document;

  const groups: MealGroup[] = [];
  let currentGroup: MealGroup | null = null;

  const elements = doc.querySelectorAll("div > div");

  elements.forEach((element) => {
    if (element.classList.contains("gruppenkopf")) {
      const groupNameElement = element.querySelector(".gruppenname");
      const groupName = groupNameElement?.textContent?.trim() || "?";

      currentGroup = {
        groupName: groupName,
        meals: [],
      };
      groups.push(currentGroup);
    } else if (element.classList.contains("splMeal") && currentGroup) {
      const nameElement = element.querySelector(".fltl:nth-child(2)");
      const name = nameElement?.childNodes[0].textContent?.trim() || "?";

      const proteinRow = Array.from(element.querySelectorAll("tr")).find(
        (row) => row.textContent?.includes("Protein")
      );
      const protein =
        proteinRow?.querySelector("td:nth-child(2)")?.textContent?.trim() ||
        "Unknown";

      const priceElement = element.querySelector(".col-xs-8.visible-xs-block");
      const price = priceElement?.textContent
        ?.replace(/\s|&nbsp;/g, "")
        ?.replaceAll("€", "")
        ?.split("|") ?? ["?", "?", "?"];

      currentGroup.meals.push({
        name: name,
        price: {
          student: price[0]?.trim(),
          employee: price[1]?.trim(),
          guest: price[2]?.trim(),
        },
        protein: protein,
      });
    }
  });

  const mensaMeals: MensaMeal[] = [];
  const pizzaMeals: Meal[] = [];
  const snackMeals: Meal[] = [];
  const saladMeals: Meal[] = [];
  const desertMeals: Meal[] = [];
  const otherMeals: Meal[] = [];

  const snackWords = ["BURGER", "CRUNCHY", "CURRY", "CRISPY"];

  groups.forEach((group) => {
    if (group.groupName.toUpperCase().includes("TOPF")) {
      mensaMeals.push({ category: "TOPF-PFANNE", ...group.meals[0] });
    } else if (group.groupName.toUpperCase().includes("PRIMA")) {
      mensaMeals.push({ category: "PRIMA-KLIMA", ...group.meals[0] });
    } else if (group.groupName.toUpperCase().includes("FLEISCH")) {
      mensaMeals.push({ category: "FLEISCH-FISCH", ...group.meals[0] });
    } else if (group.groupName.toUpperCase().includes("SATT")) {
      mensaMeals.push({ category: "SATTMACHER", ...group.meals[0] });
    } else if (group.groupName.toUpperCase().includes("WARM")) {
      mensaMeals.push({ category: "HEISSE-THEKE", ...group.meals[0] });
    } else if (
      containsWordFromList(group.groupName.toUpperCase(), snackWords)
    ) {
      group.meals.forEach((snack) => snackMeals.push(snack));
    } else if (group.groupName.toUpperCase().includes("PIZZA")) {
      group.meals.forEach((pizza) => pizzaMeals.push(pizza));
    } else if (group.groupName.toUpperCase().includes("SALAT")) {
      group.meals.forEach((salad) => saladMeals.push(salad));
    } else if (group.groupName.toUpperCase().includes("DESSERTS")) {
      group.meals.forEach((desert) => desertMeals.push(desert));
    } else {
      group.meals.forEach((other) => otherMeals.push(other));
    }
  });

  const currentDate = new Date();
  const dateFormatter = new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  const formattedDate = dateFormatter.format(currentDate);

  return {
    date: formattedDate,
    mensaMeals: mensaMeals,
    pizzaMeals: pizzaMeals,
    snackMeal: snackMeals,
    desserts: desertMeals,
    salad: saladMeals,
    others: otherMeals,
  };
}
