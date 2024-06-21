import { Meal } from "@/types/meal";
import { TodayPlan } from "@/types/today-plan";
import jsdom from "jsdom";

export function parseMensa(htmlContent: string): TodayPlan {
  const meals: Meal[] = [];

  const mealHead = extractHtmlByClassName(htmlContent, "gruppenkopf");
  const mealBodies = extractHtmlByClassName(htmlContent, "splMeal");

  const numberMeals = mealHead.length;

  // console.log(numberMeals, mealBodies.length);

  for (let i = 0; i < Math.min(numberMeals, 6); i++) {
    const mealGropName = extractTextByClassName(mealHead[i], "gruppenname")[0];

    const mealNameHtml = extractTextByQuerySelector(
      mealBodies[i],
      "div.fltl[style='width:92%']"
    );

    const mealName = mealNameHtml
      .filter((m) => !m.includes("\t") && !m.startsWith("("))
      .join("")
      .replace(" ,", ",");

    const pricesElement = extractTextByQuerySelector(
      mealBodies[i],
      ".col-xs-6:has(div > span.preisgramm)"
    )[1]
      .replaceAll(",", ".")
      .replaceAll("€", "");
    const prices = pricesElement.split("|");

    const nutritions = extractTextByQuerySelectorAll(
      mealBodies[i],
      "div.azn > table > tbody > tr"
    );

    const calories = nutritions[1]?.replace(",0", "").replace("kcal", "");
    const proteins = nutritions[4]?.replace(",", ".").replace("g", "");

    meals.push({
      groupName: mealGropName ?? "UNDEFINED",
      name: mealName ?? "???",
      price: {
        student: prices[0].trim(),
        employee: prices[1].trim(),
        guest: prices[2].trim(),
      },
      calories: calories?.trim() ?? undefined,
      protein: proteins?.trim() ?? undefined,
    });
  }

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
    meals: meals,
  };
}

function extractHtmlByClassName(html: string, className: string) {
  const dom = new jsdom.JSDOM(html);
  const document = dom.window.document;

  const elements = document.getElementsByClassName(className);

  return Array.from(elements).map((element) => element.innerHTML);
}

function extractTextByClassName(html: string, className: string) {
  const dom = new jsdom.JSDOM(html);
  const document = dom.window.document;

  const elements = document.getElementsByClassName(className);

  return Array.from(elements).map((element) => element.textContent);
}

function extractTextByQuerySelector(html: string, querySelector: string) {
  const dom = new jsdom.JSDOM(html);
  const document = dom.window.document;

  const element = document.querySelector(querySelector);
  const content: string[] = [];

  element?.childNodes.forEach((child) => {
    content.push(child.textContent ?? "");
  });

  return content;
}

function extractTextByQuerySelectorAll(html: string, querySelector: string) {
  const dom = new jsdom.JSDOM(html);
  const document = dom.window.document;

  const element = document.querySelectorAll(querySelector);
  const content: string[] = [];

  element.forEach((el) =>
    el.childNodes.forEach((child) => {
      content.push(child.textContent ?? "");
    })
  );

  return content;
}
