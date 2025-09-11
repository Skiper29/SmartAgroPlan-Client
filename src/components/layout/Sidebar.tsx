import { Link } from 'react-router-dom';
import { Home, Leaf, Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../app/providers/ThemeContext';

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 border-r border-green-200 shadow-lg p-6 flex flex-col
      dark:bg-gradient-to-b dark:from-green-950 dark:via-green-900 dark:to-green-800 dark:border-green-800 dark:shadow-xl">
      <Link
        to={'/'}
        className="text-2xl font-extrabold mb-10 bg-gradient-to-r text-green-700 bg-clip-text
          dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-lime-300 dark:via-green-300 dark:to-green-200"
      >
        SmartAgroPlan
      </Link>
      <nav className="space-y-4 flex-1">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-green-900 hover:bg-green-100 hover:text-green-700 transition duration-150 font-medium
            dark:text-green-100 dark:hover:bg-green-800 dark:hover:text-green-300"
        >
          <Home size={22} /> Dashboard
        </Link>
        <Link
          to="/fields"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-green-900 hover:bg-green-100 hover:text-green-700 transition duration-150 font-medium
            dark:text-green-100 dark:hover:bg-green-800 dark:hover:text-green-300"
        >
          <Leaf size={22} /> Fields
        </Link>
        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-green-900 hover:bg-green-100 hover:text-green-700 transition duration-150 font-medium
            dark:text-green-100 dark:hover:bg-green-800 dark:hover:text-green-300"
        >
          <Settings size={22} /> Settings
        </Link>
      </nav>
      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className="mt-8 flex items-center gap-2 px-3 py-2 rounded-lg border border-green-200 bg-green-50 text-green-900 hover:bg-green-100 hover:text-green-700 transition duration-150
          dark:bg-green-900 dark:text-green-100 dark:border-green-700 dark:hover:bg-green-800 dark:hover:text-green-300"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>
    </aside>
  );
};

export default Sidebar;
