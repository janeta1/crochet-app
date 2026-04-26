import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Layout({ isDark, toggleTheme }) {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  return (
    <div className="flex h-screen">
      {/* mobile only */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* sidebar - always visible on desktop, toggleable on mobile */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <Sidebar
          isDark={isDark}
          toggleTheme={toggleTheme}
        />
      </div>

      <main className="flex-1 overflow-y-auto p-8 bg-bg-primary">
        <div className={`lg:hidden flex items-center gap-4 pb-6 mb-6 ${!sidebarOpen ? "border-b border-gray-300" : ""}`}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="mb-4 text-text-primary hover:text-accent"
          >
            <Menu size={24} />
          </button>
          {!sidebarOpen && (
            <div>
              <h1 className="text-3xl font-serif mb-1">Stitchbook</h1>
              <p className="text-sm text-gray-500">Your Crochet Companion</p>
            </div>
          )}
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
