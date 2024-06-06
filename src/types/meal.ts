export type Meal = {
  groupName: string;
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
