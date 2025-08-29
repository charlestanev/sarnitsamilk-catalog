export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // В Next 15 params е Promise → нужно е await
  const { locale } = await params;

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 8 }}>
        {locale === 'bg' ? 'Начало' : 'Home'}
      </h1>
      <p>
        {locale === 'bg'
          ? 'Добре дошли в каталога на Sarnitsa Milk.'
          : 'Welcome to the Sarnitsa Milk catalog.'}
      </p>
    </main>
  );
}
