import React, { useState } from 'react';
import { LayoutGrid, Bell } from 'lucide-react';
import NotificationPanel from './NotificationPanel';
import UserMenu from './UserMenu';

const Navbar = ({ onOpenSettings }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      <nav data-testid="navbar" className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3">
        <button data-testid="home-nav-btn" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 hover:border-zinc-700 transition-all duration-300">
          <LayoutGrid className="w-4 h-4 text-zinc-300" />
          <span className="text-white text-sm font-medium">Home</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            data-testid="notifications-btn"
            onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
            className="relative p-2 rounded-full hover:bg-zinc-800/60 transition-colors"
          >
            <Bell className="w-5 h-5 text-zinc-400" />
          </button>
          <button
            data-testid="user-menu-btn"
            onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
            className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-white text-sm font-medium hover:bg-zinc-600 transition-colors"
          >
            N
          </button>
        </div>
      </nav>

      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
      <UserMenu
        isOpen={showUserMenu}
        onClose={() => setShowUserMenu(false)}
        onOpenSettings={onOpenSettings}
      />
    </>
  );
};

export default Navbar;
