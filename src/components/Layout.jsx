import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout({ isDark, toggleTheme }) {
  return (
    <div className="flex h-screen">
      <Sidebar isDark={isDark} toggleTheme={toggleTheme} />
      <main className="flex-1 overflow-y-auto p-8 bg-bg-primary">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
