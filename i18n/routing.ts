// i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['bg', 'en'],
    defaultLocale: 'bg',
    // По желание, ако искаш непрефиксиран път за defaultLocale:
    // localePrefix: 'as-needed'
    // Ако ползваш именувани вътрешни pathnames, ги добавяш тук по-късно
});
