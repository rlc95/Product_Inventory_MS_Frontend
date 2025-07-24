"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Film,
  PlusCircle,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { href: "/dashboard/products", label: "Product", icon: Film },
  { href: "/dashboard/add-product", label: "Add Product", icon: PlusCircle },

];

export default function SidePanel() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div>
      { /* Mobile Toggle Button */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 border rounded-md shadow"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed sm:static top-0 left-0 h-full sm:h-auto w-64 sm:w-full bg-white dark:bg-gray-900 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 transition-transform duration-300 z-40 sm:rounded-lg sm:shadow-md p-4 space-y-2`}
      >
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 p-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
              onClick={() => setIsOpen(false)} // close menu on link click (mobile)
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </aside>

      {/* Optional: Overlay on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 sm:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
