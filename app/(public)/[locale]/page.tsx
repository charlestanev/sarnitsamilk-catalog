export default function HomePage() {
  return (
    <main>
      <section className="text-center py-20 md:py-32 bg-gray-50">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Добре дошли в Sarnitsa Milk</h1>
          <p className="text-lg mt-4 text-gray-600 max-w-2xl mx-auto">Традиция и качество от сърцето на Родопите.</p>
        </div>
      </section>
      <section className="py-12 md:py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">Препоръчани продукти</h2>
          {/* We will add a component here later to show featured products */}
          <div className="text-center text-gray-500">(Секция в процес на разработка)</div>
        </div>
      </section>
    </main>
  );
}