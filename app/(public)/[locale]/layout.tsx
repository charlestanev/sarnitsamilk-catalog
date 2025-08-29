import { notFound } from 'next/navigation';

const SUPPORTED_LOCALES = ['bg', 'en']; // добави/коригирай според проекта

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // В Next 15 params е Promise → нужно е await
  const { locale } = await params;

  // Валидация на локала (по желание, но е полезно)
  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}

// Ако ползваш Metadata – и тя вече приема Promise за params:
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title:
      locale === 'bg'
        ? 'Sarnitsa Milk — Каталог'
        : 'Sarnitsa Milk — Catalog',
    description:
      locale === 'bg'
        ? 'Каталог продукти — Sarnitsa Milk'
        : 'Product catalog — Sarnitsa Milk',
  };
}
