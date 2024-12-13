import { Meal } from "@/types/meal";

export default function PizzaCard({ meal }: { meal: Meal }) {
  return (
    <div className='bg-gray-100 rounded-md py-2 px-4 shadow-sm'>
      <h4 className='font-semibold text-lg'>{meal.name}</h4>
      <p className='text-sm text-gray-500'>
        {meal.price?.student}€ | {meal.price?.employee}€ | {meal.price?.guest}€
      </p>
    </div>
  );
}
