import { Icon } from "@/components/icon";
import MensaCard from "@/components/mensa-card";
import PizzaCard from "@/components/pizza-card";
import { getMensaMenu } from "@/lib/mensa-data";
import { parseMensaHTML } from "@/lib/parser";

export const dynamic = "force-dynamic";

export default async function Home() {
  const htmlMensa = await getMensaMenu();
  const mealPlan = parseMensaHTML(htmlMensa);

  return (
    <main className='max-w-4xl lg:mx-auto my-10 mx-5'>
      <h1 className='mx-auto font-semibold text-xl my-6'>{mealPlan.date}</h1>

      {mealPlan.mensaMeals.length === 0 && <p>Gechlossen</p>}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {mealPlan.mensaMeals.map((c) => (
          <MensaCard meal={c} key={c.name} />
        ))}
      </div>

      <hr className='mt-6' />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
        <div>
          <div className='text-amber-800 flex items-center gap-2'>
            <h2 className='text-2xl font-semibold'>Pizza</h2>
            <Icon icon='Pizza' />
          </div>
          <div className='flex flex-col gap-4 mt-4'>
            {mealPlan.pizzaMeals.map((c) => (
              <PizzaCard meal={c} key={c.name} />
            ))}
            {mealPlan.pizzaMeals.length === 0 && (
              <p className='font-semibold'>Heute geschlossen</p>
            )}
          </div>
        </div>

        <div>
          <div className='text-amber-800 flex items-center gap-2'>
            <h2 className='text-2xl font-semibold'>Snacks</h2>
            <Icon icon='ChefHat' />
          </div>
          <div className='flex flex-col gap-4 mt-4'>
            {mealPlan.snackMeal.map((c) => (
              <PizzaCard meal={c} key={c.name} />
            ))}
            {mealPlan.snackMeal.length === 0 && (
              <p className='font-semibold'>Heute geschlossen</p>
            )}
          </div>
        </div>
      </div>

      <hr className='mt-6' />

      <div className='mt-6 text-fuchsia-600 flex items-center gap-2'>
        <h2 className='text-2xl font-semibold'>Deserts</h2>
        <Icon icon='IceCreamBowl' />
      </div>
      <div className='flex flex-col gap-4 mt-4'>
        {mealPlan.desserts.map((c) => (
          <PizzaCard meal={c} key={c.name} />
        ))}
        {mealPlan.desserts.length === 0 && (
          <p className='font-semibold'>Heute nicht vorhanden</p>
        )}
      </div>

      <hr className='mt-6' />

      <div className='mt-6 text-lime-600 flex items-center gap-2'>
        <h2 className='text-2xl font-semibold'>Salate</h2>
        <Icon icon='Salad' />
      </div>
      <div className='flex flex-col gap-4 mt-4'>
        {mealPlan.salad.map((c) => (
          <PizzaCard meal={c} key={c.name} />
        ))}
        {mealPlan.salad.length === 0 && (
          <p className='font-semibold'>Heute nicht vorhanden</p>
        )}
      </div>
      {mealPlan.others.length !== 0 && (
        <>
          <hr className='mt-6' />

          <div className='mt-6 text-neutral-500 flex items-center gap-2'>
            <h2 className='text-2xl font-semibold'>Sonstiges</h2>
            <Icon icon='Salad' />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4'>
            {mealPlan.others.map((c) => (
              <PizzaCard meal={c} key={c.name} />
            ))}
          </div>
        </>
      )}

      <p className='mt-8 text-xs text-gray-500'>
        &#169; {new Date().getFullYear()} Jan Bulling
      </p>
    </main>
  );
}
