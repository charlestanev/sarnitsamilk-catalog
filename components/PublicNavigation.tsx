'use client'

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation'

export default function PublicNavigation() {
    const t = useTranslations('Navigation');
    const pathname = usePathname();

    const navLinks = [
        { href: "/", label: t('home') },
        { href: "/about", label: t('about') },
        { href: "/mandra", label: t('mandra') },
        { href: "/products", label: t('products') },
        { href: "/contacts", label: t('contacts') },
    ];

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