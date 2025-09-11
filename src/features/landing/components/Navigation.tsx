import { useState } from 'react';
import { Menu, X, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { useTheme } from '@/app/providers/ThemeContext.tsx';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navigationLinks = [
    { name: 'Можливості', href: '#features' },
    { name: 'Як це працює', href: '#how-it-works' },
    { name: 'Тарифи', href: '#pricing' },
    { name: 'Відгуки', href: '#testimonials' },
    { name: 'Контакти', href: '#contact' },
    { name: 'Дашборд', href: '/dashboard' }, // Added Dashboard link
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold">🌱</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              SmartAgroPlan
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) =>
              link.href.startsWith('/') ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors duration-300"
                >
                  {link.name}
                </a>
              ),
            )}
          </div>

          {/* Desktop CTA Buttons + Theme Switch */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              className="border-green-600 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-gray-800"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Увійти
            </Button>
            <button
              onClick={toggleTheme}
              className="ml-2 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>

          {/* Mobile menu button and theme switch */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationLinks.map((link) =>
                link.href.startsWith('/') ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ),
              )}

              {/* Mobile CTA Buttons */}
              <div className="pt-4 space-y-2">
                <Button
                  variant="outline"
                  className="w-full border-green-600 text-green-700 hover:bg-green-50"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Увійти
                </Button>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <User className="mr-2 h-4 w-4" />
                  Почати
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
