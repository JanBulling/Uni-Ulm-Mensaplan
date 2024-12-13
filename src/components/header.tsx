export default function Header({ date }: { date?: string }) {
  return (
    <header className='bg-orange-100 fixed top-0 inset-x-0 shadow-md border-b border-orange-300 h-12 flex items-center justify-center'>
      <p className='text-xl font-bold'>
        {date || new Date().toLocaleDateString("de-DE")}
      </p>
    </header>
  );
}
