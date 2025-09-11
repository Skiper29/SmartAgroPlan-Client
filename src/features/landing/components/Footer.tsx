import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export default function Footer() {
  const footerSections = [
    {
      title: 'Продукт',
      links: [
        { name: 'Можливості', href: '#features' },
        { name: 'Тарифи', href: '#pricing' },
        { name: 'API-документація', href: '/docs' },
        { name: 'Інтеграції', href: '/integrations' },
        { name: 'Мобільний додаток', href: '/mobile' },
      ],
    },
    {
      title: 'Ресурси',
      links: [
        { name: 'Центр допомоги', href: '/help' },
        { name: 'Блог', href: '/blog' },
        { name: 'Кейси', href: '/case-studies' },
        { name: 'Вебінари', href: '/webinars' },
        { name: 'Агро-гайди', href: '/guides' },
      ],
    },
    {
      title: 'Компанія',
      links: [
        { name: 'Про нас', href: '/about' },
        { name: 'Карʼєра', href: '/careers' },
        { name: 'Преса', href: '/press' },
        { name: 'Партнери', href: '/partners' },
        { name: 'Контакти', href: '/contact' },
      ],
    },
    {
      title: 'Правова інформація',
      links: [
        { name: 'Політика конфіденційності', href: '/privacy' },
        { name: 'Умови використання', href: '/terms' },
        { name: 'Політика cookies', href: '/cookies' },
        { name: 'GDPR', href: '/gdpr' },
        { name: 'Безпека', href: '/security' },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: 'https://facebook.com/smartagroplan',
      name: 'Facebook',
    },
    {
      icon: Twitter,
      href: 'https://twitter.com/smartagroplan',
      name: 'Twitter',
    },
    {
      icon: Instagram,
      href: 'https://instagram.com/smartagroplan',
      name: 'Instagram',
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/company/smartagroplan',
      name: 'LinkedIn',
    },
  ];

  return (
    <footer className="bg-gray-900 text-white border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">🌱</span>
              </div>
              <span className="text-2xl font-bold">SmartAgroPlan</span>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering farmers worldwide with AI-driven insights for smarter,
              more sustainable agriculture. Grow more with less.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3" />
                <span>support@smartagroplan.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-green-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-bold mb-4">Будьте в курсі новин</h3>
            <p className="text-gray-400 mb-6">
              Отримуйте агроінсайти та оновлення продукту на email.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Введіть email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-green-500 text-white"
              />
              <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-r-lg font-semibold transition-colors duration-300">
                Підписатися
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Без спаму. Можна відписатися у будь-який час.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 SmartAgroPlan. Всі права захищені.
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors duration-300 group"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5 text-gray-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-500 text-xs">
            <span className="flex items-center">🔒 SSL-захист</span>
            <span className="flex items-center">🛡️ SOC 2-сумісність</span>
            <span className="flex items-center">🌍 GDPR-ready</span>
            <span className="flex items-center">📱 Мобільна оптимізація</span>
            <span className="flex items-center">☁️ 99.9% аптайм</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
