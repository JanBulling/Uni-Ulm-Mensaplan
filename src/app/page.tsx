import { getMensaMenu } from "@/lib/mensa/mensa-data";
import { parseMensa } from "@/lib/mensa/parse-mensa";
import { getPizzaPasta } from "@/lib/pizza-pasta/pizza-pasta-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const htmlMensa = await getMensaMenu();
  const content = parseMensa(htmlMensa);

  const pizzaPasta = await getPizzaPasta();

  return (
    <main className='max-w-2xl md:mx-auto my-10 mx-5'>
      <h1 className='font-bold text-xl text-orange-500'>{content.date}</h1>
      {content.meals.length === 0 && <p>Gechlossen</p>}

      <h2 className='text-2xl font-bold mt-10'>MENSA</h2>

      {content.meals.map((c) => (
        <div className='mt-5' key={c.groupName}>
          <h3 className='text-xl font-bold'>{c.groupName}</h3>
          <h4 className='font-semibold'>{c.name}</h4>
          <p className='text-sm text-gray-500'>
            {c.price?.student}€ | {c.price?.employee}€ | {c.price?.guest}€
          </p>
          <p className='text-sm text-gray-500'>
            Protein: <span className='font-semibold'>{c.protein}g</span>
          </p>
          <p className='text-sm text-gray-500'>Calories: {c.calories}kcal</p>
        </div>
      ))}

      <hr className='my-10' />

      <h2 className='text-2xl font-bold mt-10'>PIZZA & PASTA</h2>

      {pizzaPasta.meals.map((c) => (
        <div className='mt-5' key={c.groupName}>
          <h3 className='text-xl font-bold'>{c.name}</h3>
          <h4 className='font-semibold'>{c.description}</h4>
          <p className='text-sm text-gray-500'>
            {c.price?.student}€ | {c.price?.employee}€ | {c.price?.guest}€
          </p>
        </div>
      ))}
    </main>
  );
}
