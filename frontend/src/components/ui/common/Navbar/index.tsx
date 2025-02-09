import { FiBell, FiSettings, FiUser } from "react-icons/fi";

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-blue-600">
              FinSearch
            </span>
          </div>
          <div className="flex items-center gap-4 text-black">
            <div title="notification" className="p-2 cursor-pointer rounded-lg">
              <FiBell className="w-6 h-6" />
            </div>
            <div title="settings" className="p-2 cursor-pointer rounded-lg">
              <FiSettings className="w-6 h-6" />
            </div>
            <div
              title="user profile"
              className="flex items-center gap-2 p-2 cursor-pointer rounded-lg"
            >
              <FiUser className="w-6 h-6" />
              <span>Profile</span>
            </div>
            <div>
              <button className="px-4 py-2 text-white bg-blue-600 rounded-lg">
                connect wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
