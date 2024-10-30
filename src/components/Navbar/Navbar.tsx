"use client";

import { useAuth } from "@/hooks/useAuth";
import LogoutButton from "../Logout/LogoutButton";
import Link from "next/link";

const Navbar: React.FC = () => {
  const { user, refetch } = useAuth();

  const navItems = [
    { name: "Home", href: "/", icon: "" },
    { name: "Total Expenses", href: "/total-expenses", icon: "" },
  ];

  const userData = user?.data;
  console.log(userData);
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
        <div className="flex items-center">
          {userData ? ( // Check if user is not null
            <>
              <span className="text-white mr-4">{userData.name}</span>{" "}
              {/* Display user's name */}
              <LogoutButton refetch={refetch} /> {/* Logout button */}
            </>
          ) : (
            <Link href={"/auth/login"}>
              <span className="text-gray-300 border p-2 w-20 text-center">
                log in
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
