import { NavLink } from "react-router-dom";
import { FolderOpen, Package, Heart } from "lucide-react";

function Sidebar() {
  return (
    <div className="w-60 h-full flex flex-col border-r border-gray-300 bg-sidebar-bg">
      <div className="border-b border-gray-300 px-6 pt-6 pb-6 mb-6">
        <h1 className="text-3xl font-serif mb-1">Stitchbook</h1>
        <p className="text-sm text-gray-500">Your Crochet Companion</p>
      </div>

      <nav className="flex flex-col gap-2 p-4">
        <ul>
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 font-medium text-base"
                  : "flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500 text-base hover:bg-gray-50"
              }
            >
              <FolderOpen size={16} />
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/yarn-stash"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 font-medium text-base"
                  : "flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500 text-base hover:bg-gray-50"
              }
            >
              <Package size={16} />
              Yarn Stash
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 font-medium text-base"
                  : "flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500 text-base hover:bg-gray-50"
              }
            >
              <Heart size={16} />
              Favorites
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
