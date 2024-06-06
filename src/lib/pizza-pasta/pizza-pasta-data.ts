import { Meal } from "@/types/meal";
import { TodayPlan } from "@/types/today-plan";

export async function getPizzaPasta(): Promise<TodayPlan> {
  const currentDate = new Date();
  const dateFormatter = new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  const formattedDate = dateFormatter.format(currentDate);

  const response = await fetch(
    "https://mensaplan.fs-et.de/data/mensaplan.json"
  );
  const data = await response.json();

  const dayOfWeek = (new Date().getDay() + 6) % 7;
  if (dayOfWeek >= 5)
    return {
      date: formattedDate,
      meals: [],
    };

  const todayData = data.weeks[0].days[dayOfWeek].Bistro.meals;

  const meals: Meal[] = todayData.map((m: any) => {
    const mealNameSplit = (m.meal as string).split(" ");
    const mealName = mealNameSplit.slice(0, 2).join(" ");
    const mealDescription = mealNameSplit
      .slice(2)
      .join(" ")
      .replaceAll("*", "");

    const price: string = m.price;
    const prices = price
      .replaceAll("€", "")
      .replaceAll(/[A-Za-z.]/g, "")
      .replaceAll(",", ".")
      .trim()
      .split("  ");

    const hasStudentPrice = prices.length == 3;

    return {
      groupName: (m.category as string).toUpperCase(),
      name: mealName,
      description: mealDescription,
      price: {
        student: hasStudentPrice ? prices[0] : "4.50",
        employee: prices[hasStudentPrice ? 1 : 0],
        guest: prices[hasStudentPrice ? 2 : 1],
      },
    } as Meal;
  });

  return {
    date: formattedDate,
    meals: meals,
  };
}
