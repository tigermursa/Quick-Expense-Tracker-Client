"use client";
import LogoutButton from "../Logout/LogoutButton";

const Navbar = () => {
  const navItems = [
    { name: "Home", href: "/", icon: "" },
    { name: "Total Expenses", href: "/total-expenses", icon: "" },
  ];

  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg">Expense Tracker</div>
        <ul className="flex space-x-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <div>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
