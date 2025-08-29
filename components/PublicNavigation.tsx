'use client'

// IMPORTANT: Imports now come from 'next-intl/navigation'
// import { Link } from 'next-intl/navigation';
import { usePathname } from 'next/navigation'; // Standard pathname is fine here
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function PublicNavigation() {
    const t = useTranslations('Navigation');
    const pathnameWithLocale = usePathname();

    const navLinks = [
        { href: "/", label: t('home') },
        { href: "/about", label: t('about') },
        { href: "/mandra", label: t('mandra') },
        { href: "/products", label: t('products') },
        { href: "/contacts", label: t('contacts') },
    ];

    // Remove locale from pathname for comparison, e.g. /bg/about -> /about
    const pathname = pathnameWithLocale.replace(/^\/(bg|en)/, '') || '/';

    return (
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-6 text-sm font-medium">
            {navLinks.map(link => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-colors hover:text-foreground/80 ${pathname === link.href ? 'text-foreground' : 'text-foreground/60'}`}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    );
}