import {
  categoryToColor,
  categoryToIcon,
  categoryToName,
  cn,
} from "@/lib/utils";
import { MensaMeal } from "@/types/meal";
import { Icon } from "./icon";

export default function MensaCard({ meal }: { meal: MensaMeal }) {
  const categoryName = categoryToName(meal.category);
  const categoryIcon = categoryToIcon(meal.category);
  const color = categoryToColor(meal.category);

  return (
    <div className='bg-gray-100 rounded-md py-2 px-4 shadow-sm'>
      <div
        className={cn(
          "flex gap-2 items-center font-semibold",
          "text-green-500 text-red-500 text-orange-500 text-blue-500 text-yellow-500",
          `text-${color}`
        )}
      >
        <h3>{categoryName}</h3>
        <Icon icon={categoryIcon} />
      </div>
      <h4 className='font-semibold text-lg'>{meal.name}</h4>
      <p className='text-sm text-gray-500'>
        {meal.price?.student}€ | {meal.price?.employee}€ | {meal.price?.guest}€
      </p>
      {meal.protein && (
        <p className='text-xs text-gray-500'>
          Protein: <span className='font-semibold'>{meal.protein}g</span>
        </p>
      )}
      {meal.calories && (
        <p className='text-xs text-gray-500'>Calories: {meal.calories}kcal</p>
      )}
    </div>
  );
}
