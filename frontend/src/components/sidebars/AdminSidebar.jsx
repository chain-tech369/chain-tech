import { NavLink } from "react-router-dom";

const AdminsidebarLinks = [
  {
    name: "Dashboard",
    path: "/protected-home",
  },
  {
    name: "Services",
    path: "/protected-services",
  },
  {
    name: "Service Requests",
    path: "/service-requests",
  },
  {
    name: "Join Us",
    path: "/join-us",
  },
  {
    name: "Profile",
    path: "/profile/edit",
  },
  {
    name: "Settings",
    path: "/settings",
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