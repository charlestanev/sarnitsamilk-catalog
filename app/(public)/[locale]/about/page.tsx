import { getTranslations } from 'next-intl/server';

export default async function AboutPage() {
    const t = await getTranslations('AboutPage');

    return (
        <main className="container py-12 md:py-20">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">{t('title')}</h1>
                <div className="prose prose-lg dark:prose-invert max-w-none text-justify space-y-4">
                    <p>{t('p1')}</p>
                    <p>{t('p2')}</p>
                </div>
            </div>
        </main>
    );
}