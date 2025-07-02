
import { Home, ShoppingBag, MessageSquare, Search, FileText, ShoppingCart, Info, Zap, HelpCircle, Grid3X3 } from 'lucide-react';

const NavigationMenu = () => {
  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
  ];

  const buyItems = [
    { icon: Grid3X3, label: 'View All Categories', href: '/categories' },
    { icon: MessageSquare, label: 'Messages', href: '/messages' },
    { icon: Search, label: 'Search', href: '/search' },
    { icon: FileText, label: 'Post Your Requirement', href: '/post-requirement' },
    { icon: ShoppingCart, label: 'My Orders', href: '/orders' },
    { icon: ShoppingBag, label: 'Shopping', href: '/shopping', badge: 'NEW' },
  ];

  const moreItems = [
    { icon: Info, label: 'About IndiaMART', href: '/about' },
    { icon: Zap, label: 'Enjoy 10X faster experience', href: '/app', cta: 'Open in App' },
    { icon: HelpCircle, label: 'Help & Support', href: '/support' },
    { icon: Grid3X3, label: 'More Apps', href: '/apps' },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Main menu items */}
      <div className="px-4 py-2">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center py-3 text-gray-700 hover:bg-gray-50 rounded-lg px-2"
          >
            <item.icon className="w-5 h-5 mr-3 text-gray-600" />
            <span className="text-sm font-medium">{item.label}</span>
          </a>
        ))}
      </div>

      {/* BUY Section */}
      <div className="px-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">BUY</h3>
        {buyItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center justify-between py-3 text-gray-700 hover:bg-gray-50 rounded-lg px-2"
          >
            <div className="flex items-center">
              <item.icon className="w-5 h-5 mr-3 text-gray-600" />
              <span className="text-sm">{item.label}</span>
            </div>
            {item.badge && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                {item.badge}
              </span>
            )}
          </a>
        ))}
      </div>

      {/* MORE Section */}
      <div className="px-4 mt-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">MORE</h3>
        {moreItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center justify-between py-3 text-gray-700 hover:bg-gray-50 rounded-lg px-2"
          >
            <div className="flex items-center">
              <item.icon className="w-5 h-5 mr-3 text-gray-600" />
              <span className="text-sm">{item.label}</span>
            </div>
            {item.cta && (
              <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                {item.cta}
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default NavigationMenu;
