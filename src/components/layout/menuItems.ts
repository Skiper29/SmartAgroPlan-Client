import {
  Home,
  Leaf,
  BarChart3,
  Droplets,
  CloudRain,
  Brain,
  Calendar,
  Building2,
  BookOpen,
  MapPin,
  Wheat,
  Sprout,
  RotateCcw,
  CalendarDays,
  Calculator,
  Thermometer,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  FileText,
  Target,
  Gamepad2,
  CheckSquare,
  Users,
  UserCheck,
  BookOpenCheck,
  Database,
} from 'lucide-react';

export interface MenuItem {
  id: string;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  to?: string;
  submenu?: {
    icon: React.ComponentType<{ size?: number }>;
    label: string;
    to: string;
    description?: string;
  }[];
}

export const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    icon: Home,
    label: 'Панель керування',
    submenu: [
      {
        icon: MapPin,
        label: 'Огляд ферми',
        to: '/dashboard',
        description: 'Карта + KPI',
      },
      {
        icon: BarChart3,
        label: 'Ключові показники',
        to: '/dashboard/kpi',
        description: 'Урожайність, ресурси, ризики',
      },
    ],
  },
  {
    id: 'fields-crops',
    icon: Leaf,
    label: 'Поля та культури',
    submenu: [
      {
        icon: MapPin,
        label: 'Перегляд полів',
        to: '/fields',
        description: 'Карта + список',
      },
      {
        icon: Wheat,
        label: 'Керування полями',
        to: '/fields/new',
        description: 'Створення, редагування, видалення',
      },
      {
        icon: Sprout,
        label: 'Список культур',
        to: '/crops',
        description: 'Культури та сорти',
      },
      {
        icon: RotateCcw,
        label: 'Сівозміна',
        to: '/crops/rotation',
        description: 'Рекомендації',
      },
      {
        icon: CalendarDays,
        label: 'Календар робіт',
        to: '/crops/calendar',
        description: 'Планування польових робіт',
      },
    ],
  },
  {
    id: 'resources',
    icon: Droplets,
    label: 'Ресурси',
    submenu: [
      {
        icon: Droplets,
        label: 'Вода',
        to: '/resources/water',
        description: 'Потреби та графік поливу',
      },
      {
        icon: Calculator,
        label: 'Добрива',
        to: '/resources/fertilizers',
        description: 'Оптимальні дози',
      },
      {
        icon: Target,
        label: 'Планування ресурсів',
        to: '/resources/planning',
        description: 'Закупівля ресурсів',
      },
    ],
  },
  {
    id: 'analytics',
    icon: CloudRain,
    label: 'Аналітика та ризики',
    submenu: [
      {
        icon: CloudRain,
        label: 'Погода',
        to: '/weather',
        description: 'Інтеграція з API',
      },
      {
        icon: AlertTriangle,
        label: 'Ризики',
        to: '/risks',
        description: 'Заморозки, посуха, шкідники',
      },
      {
        icon: Thermometer,
        label: 'Сповіщення',
        to: '/alerts',
        description: 'Попередження',
      },
      {
        icon: TrendingUp,
        label: 'Прогноз урожаю',
        to: '/analytics/yield',
        description: 'Прогнозування',
      },
      {
        icon: DollarSign,
        label: 'Фінансовий аналіз',
        to: '/analytics/financial',
        description: 'Економічні показники',
      },
      {
        icon: FileText,
        label: 'Звіти',
        to: '/analytics/reports',
        description: 'Експорт PDF/Excel',
      },
    ],
  },
  {
    id: 'ai',
    icon: Brain,
    label: 'AI Рекомендації',
    submenu: [
      {
        icon: Brain,
        label: 'Персональні поради',
        to: '/ai/recommendations',
        description: 'Добрива, полив, сівба',
      },
      {
        icon: Gamepad2,
        label: 'Планувальник сценаріїв',
        to: '/ai/scenarios',
        description: 'Симуляція різних культур',
      },
    ],
  },
  {
    id: 'planning',
    icon: Calendar,
    label: 'Планування',
    submenu: [
      {
        icon: CheckSquare,
        label: 'Список завдань',
        to: '/tasks',
        description: 'Управління завданнями',
      },
      {
        icon: Calendar,
        label: 'Календар',
        to: '/calendar',
        description: 'Щоденні/тижневі завдання',
      },
      {
        icon: CheckSquare,
        label: 'Чек-лист',
        to: '/checklist',
        description: 'Контрольні списки',
      },
    ],
  },
  {
    id: 'organization',
    icon: Building2,
    label: 'Організація',
    submenu: [
      {
        icon: Building2,
        label: 'Ферми/Організації',
        to: '/organization/farms',
        description: 'Управління структурою',
      },
      {
        icon: Users,
        label: 'Користувачі та ролі',
        to: '/organization/users',
        description: 'Керування доступом',
      },
      {
        icon: UserCheck,
        label: 'Розподіл завдань',
        to: '/organization/tasks',
        description: 'Делегування',
      },
    ],
  },
  {
    id: 'knowledge',
    icon: BookOpen,
    label: 'База знань',
    submenu: [
      {
        icon: BookOpenCheck,
        label: 'Статті та поради',
        to: '/knowledge/articles',
        description: 'Корисні матеріали',
      },
      {
        icon: Database,
        label: 'Довідники',
        to: '/knowledge/guides',
        description: 'Шкідники/добрива',
      },
      {
        icon: Database,
        label: 'Відкриті дані',
        to: '/knowledge/opendata',
        description: 'Інтеграція з базами даних',
      },
    ],
  },
];
