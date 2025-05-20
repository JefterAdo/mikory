"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { 
  HiHome, 
  HiDocumentText, 
  HiPhotograph, 
  HiUserGroup, 
  HiCog, 
  HiLogout,
  HiChevronDown,
  HiChevronRight,
  HiMenuAlt2,
  HiX,
  HiCollection,
  HiTag,
  HiAnnotation,
  HiAdjustments
} from "react-icons/hi";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contentOpen, setContentOpen] = useState(true);
  const [blogSubmenuOpen, setBlogSubmenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("mikory_admin_auth");
    router.push("/admin/auth/login");
  };

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + "/");
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 z-40 md:hidden bg-primary p-2 rounded-md text-white"
      >
        {mobileOpen ? <HiX size={24} /> : <HiMenuAlt2 size={24} />}
      </button>

      {/* Sidebar backdrop for mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-mikory-dark border-r border-gray-800 transition-all duration-300 z-20
          ${collapsed ? "w-20" : "w-64"} 
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and toggle */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            {!collapsed && (
              <Link href="/admin/dashboard" className="flex items-center space-x-2">
                <Image 
                  src="/images/logo.png" 
                  alt="Mikory Logo" 
                  width={40} 
                  height={40} 
                  className="h-8 w-auto" 
                />
                <span className="text-xl font-bold text-white">Mikory</span>
              </Link>
            )}
            {collapsed && (
              <Link href="/admin/dashboard" className="mx-auto">
                <Image 
                  src="/images/logo.png" 
                  alt="Mikory Logo" 
                  width={32} 
                  height={32} 
                  className="h-8 w-auto" 
                />
              </Link>
            )}
            <button 
              onClick={toggleSidebar}
              className="text-gray-400 hover:text-white hidden md:block"
            >
              {collapsed ? <HiChevronRight size={20} /> : <HiChevronDown size={20} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin/dashboard"
                  className={`flex items-center p-2 rounded-lg ${
                    isActive("/admin/dashboard")
                      ? "bg-primary text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  } ${collapsed ? "justify-center" : "space-x-3"}`}
                >
                  <HiHome size={20} />
                  {!collapsed && <span>Tableau de bord</span>}
                </Link>
              </li>

              <li>
                <div className="relative">
                  <button
                    onClick={() => !collapsed && setBlogSubmenuOpen(!blogSubmenuOpen)}
                    className={`flex items-center w-full p-2 rounded-lg ${
                      isActive("/admin/blog")
                        ? "bg-primary text-white"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    } ${collapsed ? "justify-center" : "justify-between"}`}
                  >
                    <div className={`flex items-center ${collapsed ? "" : "space-x-3"}`}>
                      <HiDocumentText size={20} />
                      {!collapsed && <span>Blog</span>}
                    </div>
                    {!collapsed && (
                      <div>
                        {blogSubmenuOpen ? (
                          <HiChevronDown size={16} />
                        ) : (
                          <HiChevronRight size={16} />
                        )}
                      </div>
                    )}
                  </button>
                  
                  {/* Sous-menu pour le blog */}
                  {(blogSubmenuOpen || collapsed) && (
                    <div className={`${collapsed ? "absolute left-full top-0 ml-1 bg-mikory-dark border border-gray-800 rounded-lg w-48" : "pl-6 mt-1"}`}>
                      <Link
                        href="/admin/blog"
                        className={`flex items-center p-2 rounded-lg ${
                          pathname === "/admin/blog"
                            ? "bg-primary text-white"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                        } space-x-3`}
                      >
                        <HiDocumentText size={16} />
                        <span>Articles</span>
                      </Link>
                      
                      <Link
                        href="/admin/blog/categories"
                        className={`flex items-center p-2 rounded-lg ${
                          pathname === "/admin/blog/categories"
                            ? "bg-primary text-white"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                        } space-x-3`}
                      >
                        <HiCollection size={16} />
                        <span>Catégories</span>
                      </Link>
                      
                      <Link
                        href="/admin/blog/tags"
                        className={`flex items-center p-2 rounded-lg ${
                          pathname === "/admin/blog/tags"
                            ? "bg-primary text-white"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                        } space-x-3`}
                      >
                        <HiTag size={16} />
                        <span>Tags</span>
                      </Link>
                      
                      <Link
                        href="/admin/blog/comments"
                        className={`flex items-center p-2 rounded-lg ${
                          pathname === "/admin/blog/comments"
                            ? "bg-primary text-white"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                        } space-x-3`}
                      >
                        <HiAnnotation size={16} />
                        <span>Commentaires</span>
                      </Link>
                      
                      <Link
                        href="/admin/blog/settings"
                        className={`flex items-center p-2 rounded-lg ${
                          pathname === "/admin/blog/settings"
                            ? "bg-primary text-white"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                        } space-x-3`}
                      >
                        <HiAdjustments size={16} />
                        <span>Paramètres</span>
                      </Link>
                    </div>
                  )}
                </div>
              </li>

              <li>
                <button
                  onClick={() => setContentOpen(!contentOpen)}
                  className={`flex items-center w-full p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white ${
                    collapsed ? "justify-center" : "justify-between"
                  }`}
                >
                  <div className={`flex items-center ${collapsed ? "" : "space-x-3"}`}>
                    <HiDocumentText size={20} />
                    {!collapsed && <span>Autres contenus</span>}
                  </div>
                  {!collapsed && (
                    <span>
                      {contentOpen ? (
                        <HiChevronDown size={16} />
                      ) : (
                        <HiChevronRight size={16} />
                      )}
                    </span>
                  )}
                </button>
                {!collapsed && contentOpen && (
                  <ul className="pl-6 mt-2 space-y-2">
                    <li>
                      <Link
                        href="/admin/pages"
                        className={`flex items-center p-2 rounded-lg ${
                          isActive("/admin/pages")
                            ? "bg-primary/20 text-primary"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                        }`}
                      >
                        <span>Pages</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <Link
                  href="/admin/media"
                  className={`flex items-center p-2 rounded-lg ${
                    isActive("/admin/media")
                      ? "bg-primary text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  } ${collapsed ? "justify-center" : "space-x-3"}`}
                >
                  <HiPhotograph size={20} />
                  {!collapsed && <span>Médias</span>}
                </Link>
              </li>

              <li>
                <Link
                  href="/admin/users"
                  className={`flex items-center p-2 rounded-lg ${
                    isActive("/admin/users")
                      ? "bg-primary text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  } ${collapsed ? "justify-center" : "space-x-3"}`}
                >
                  <HiUserGroup size={20} />
                  {!collapsed && <span>Utilisateurs</span>}
                </Link>
              </li>

              <li>
                <Link
                  href="/admin/settings"
                  className={`flex items-center p-2 rounded-lg ${
                    isActive("/admin/settings")
                      ? "bg-primary text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  } ${collapsed ? "justify-center" : "space-x-3"}`}
                >
                  <HiCog size={20} />
                  {!collapsed && <span>Paramètres</span>}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className={`flex items-center p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white w-full ${
                collapsed ? "justify-center" : "space-x-3"
              }`}
            >
              <HiLogout size={20} />
              {!collapsed && <span>Déconnexion</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
