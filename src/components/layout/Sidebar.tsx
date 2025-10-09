import { Link } from 'react-router-dom';
import {
  Leaf,
  Settings,
  Moon,
  Sun,
  ChevronRight,
} from 'lucide-react';
import { useTheme } from '../../app/providers/ThemeContext';
import { useState } from 'react';
import { menuItems } from './menuItems';

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  const [, setHoveredItem] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const handleItemClick = (itemId: string) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  const handleMouseEnter = (itemId: string) => {
    setHoveredItem(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <aside
      className="w-20 hover:w-80 transition-all duration-300 ease-in-out min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 border-r border-green-200 shadow-lg flex flex-col group
      dark:bg-gradient-to-b dark:from-green-950 dark:via-green-900 dark:to-green-800 dark:border-green-800 dark:shadow-xl"
    >
      {/* Logo */}
      <div className="p-4 border-b border-green-200 dark:border-green-700">
        <Link
          to={'/'}
          className="flex items-center justify-center group-hover:justify-start transition-all duration-300"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 dark:from-green-400 dark:to-green-500 rounded-xl flex items-center justify-center shadow-lg">
            <Leaf className="text-white" size={24} />
          </div>
          <span className="ml-3 text-xl font-bold text-green-700 dark:text-green-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            SmartAgroPlan
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isExpanded = expandedItem === item.id;

          return (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Main menu item */}
              <button
                onClick={() => handleItemClick(item.id)}
                className="w-full flex items-center px-4 py-3 text-green-700 hover:bg-green-100 dark:text-green-300 dark:hover:bg-green-800 transition-all duration-200 group/item"
              >
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg bg-green-100 dark:bg-green-800 group-hover:item:bg-green-200 dark:group-hover/item:bg-green-700 transition-colors duration-200">
                  <Icon size={20} />
                </div>
                <span className="ml-3 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {item.label}
                </span>
                {item.submenu && (
                  <ChevronRight
                    size={16}
                    className={`ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                      isExpanded ? 'rotate-90' : ''
                    }`}
                  />
                )}
              </button>

              {/* Submenu */}
              {item.submenu && isExpanded && (
                <div className="ml-4 border-l-2 border-green-200 dark:border-green-700 bg-green-50/50 dark:bg-green-900/30 rounded-r-lg">
                  {item.submenu.map((subItem) => {
                    const SubIcon = subItem.icon;
                    return (
                      <Link
                        key={subItem.to}
                        to={subItem.to}
                        className="flex items-center px-4 py-2 text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-800 transition-colors duration-200 group/subitem"
                      >
                        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md bg-green-200/50 dark:bg-green-700/50 group-hover/subitem:bg-green-300 dark:group-hover/subitem:bg-green-600 transition-colors duration-200">
                          <SubIcon size={16} />
                        </div>
                        <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="font-medium text-sm whitespace-nowrap">
                            {subItem.label}
                          </div>
                          {subItem.description && (
                            <div className="text-xs text-green-500 dark:text-green-400 whitespace-nowrap">
                              {subItem.description}
                            </div>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Settings and Theme Toggle */}
      <div className="border-t border-green-200 dark:border-green-700 space-y-2">
        <Link
          to="/settings"
          className="flex items-center px-4 py-3 text-green-700 hover:bg-green-100 dark:text-green-300 dark:hover:bg-green-800 transition-colors duration-200 group/item rounded-lg"
        >
          <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg bg-green-100 dark:bg-green-800 group-hover/item:bg-green-200 dark:group-hover/item:bg-green-700 transition-colors duration-200">
            <Settings size={20} />
          </div>
          <span className="ml-3 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Налаштування
          </span>
        </Link>

        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center px-4 py-3 text-green-700 hover:bg-green-100 dark:text-green-300 dark:hover:bg-green-800 transition-colors duration-200 group/item rounded-lg"
          aria-label="Toggle theme"
        >
          <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg bg-green-100 dark:bg-green-800 group-hover/item:bg-green-200 dark:group-hover/item:bg-green-700 transition-colors duration-200">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </div>
          <span className="ml-3 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {theme === 'dark' ? 'Світлий режим' : 'Темний режим'}
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
