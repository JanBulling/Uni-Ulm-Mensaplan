export type MealPlan = {
  date: string;
  mensaMeals: MensaMeal[];
  pizzaMeals: Meal[];
  snackMeal: Meal[];
  desserts: Meal[];
  salad: Meal[];
  others: Meal[];
};

export type MensaMeal = {
  category: MensaCategory;
  name: string;
  description?: string;
  price: {
    student: string;
    employee: string;
    guest: string;
  };
  calories?: string;
  protein?: string;
};

export type Meal = {
  name: string;
  description?: string;
  price: {
    student: string;
    employee: string;
    guest: string;
  };
  calories?: string;
  protein?: string;
};

export type MensaCategory =
  | "SATTMACHER"
  | "FLEISCH-FISCH"
  | "PRIMA-KLIMA"
  | "TOPF-PFANNE"
  | "HEISSE-THEKE";
