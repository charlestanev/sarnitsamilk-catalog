// middleware.ts (в корена)
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

// Ограничи matcher-а по локали (bg/en) – добавяй тук ако имаш още
export const config = {
    matcher: ['/', '/(bg|en)/:path*']
};
