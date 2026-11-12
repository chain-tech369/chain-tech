import { NavLink } from "react-router-dom";

const AdminsidebarLinks = [
  {
    name: "Dashboard",
    path: "/protected-home",
  },
  {
    name: "create budget",
    path: "/createbudget",
  },
  {
    name: "create timeline",
    path: "/createtimeline",
  },
  {
    name: "create roles",
    path: "/createroles",
  },
  {
    name: "edit roles",
    path: "/editroles",
  },
  {
    name: "delete roles",
    path: "/deleterole",
  },
];

const AdminSidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">
        Chain-Tech
      </h2>

      <nav className="space-y-2">
        {sidebarLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;