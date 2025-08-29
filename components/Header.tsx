import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import PublicNavigation from './PublicNavigation';
import LanguageSwitcher from './LanguageSwitcher'; // Import the new component

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="font-bold text-lg">Sarnitsa Milk</span>
                    </Link>
                </div>

                <PublicNavigation />

                <div className="flex flex-1 items-center justify-end space-x-2">
                    <LanguageSwitcher /> {/* Add the language switcher */}
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}