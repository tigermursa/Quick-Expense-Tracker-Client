"use client";

import { useAuth } from "@/hooks/useAuth";
import LogoutButton from "../Logout/LogoutButton";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";

const Navbar: React.FC = () => {
  const { user, refetch } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Total", href: "/total-expenses" },
    { name: "Week", href: "/week" },
    { name: "Month", href: "/month" },
    { name: "Search", href: "/search" },
  ];

  const userData = user?.data;

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      drawerRef.current &&
      !drawerRef.current.contains(event.target as Node)
    ) {
      setIsDrawerOpen(false);
    }
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleDrawer} aria-label="Open Menu">
            <FaBars className="text-white text-2xl" />
          </button>
        </div>

        {/* Navigation Links for Desktop */}
        <ul className="hidden md:flex space-x-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href}>
                <p className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  {item.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        {/* User Actions */}
        <div className="flex items-center">
          {userData ? (
            <>
              <span className="text-white mr-4">{userData.name}</span>
              <div className="relative">
                <button onClick={toggleDropdown} aria-label="User Menu">
                  <FaUserCircle className="text-white text-2xl" />
                </button>
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute hidden md:block right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                  >
                    <LogoutButton refetch={refetch} />
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link href="/auth/login">
              <span className="text-gray-300 border p-2 w-20 text-center">
                Log in
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Drawer for Mobile */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300  ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          ref={drawerRef}
          className="fixed top-0 left-0 h-full w-64 bg-white p-4 shadow-lg"
        >
          <button
            onClick={toggleDrawer}
            className="absolute top-4 right-4 text-xl"
          >
            &times;
          </button>
          <ul>
            {navItems.map((item, index) => (
              <li key={index} onClick={toggleDrawer}>
                <Link href={item.href}>
                  <p className="block text-gray-800 hover:bg-gray-200 p-2">
                    {item.name}
                  </p>
                </Link>
                
              </li>
              
            ))}
          </ul>
          <LogoutButton refetch={refetch} />
        </div>
        {/* Background overlay */}

      </div>
    </nav>
  );
};

export default Navbar;
