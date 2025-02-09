import {
  FiHome,
  FiTrendingUp,
  FiPieChart,
  FiDatabase,
  FiSettings,
} from "react-icons/fi";
import Link from "next/link";

export function Sidebar() {
  const menuItems = [
    { icon: FiHome, label: "Dashboard", href: "/" },
    { icon: FiTrendingUp, label: "Markets", href: "/markets" },
    { icon: FiPieChart, label: "Analysis", href: "/analysis" },
    { icon: FiDatabase, label: "Data", href: "/data" },
    { icon: FiSettings, label: "Settings", href: "/settings" },
  ];

  return (
    <aside className="fixed left-0 z-40 w-64 h-screen pt-20 bg-[#0F0F12] border-r border-[#1F1F23]">
      <div className="h-full px-3 pb-4 overflow-y-auto bg-[#0F0F12]">
        <ul className="space-y-2 font-medium">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-800"
              >
                <item.icon className="w-6 h-6" />
                <span className="ml-3">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
