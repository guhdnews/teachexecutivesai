"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth, useUser } from "@/contexts";
import {
    Home,
    BookOpen,
    Wrench,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronDown,
    User,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
    tier?: "free" | "sop" | "caio" | "launchpad";
}

const navItems: NavItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: Home },
    { label: "My Courses", href: "/dashboard/courses", icon: BookOpen },
    { label: "AI Tools", href: "/dashboard/tools", icon: Wrench },
    { label: "Referrals", href: "/dashboard/referrals", icon: Users },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const { user, signOut } = useAuth();
    const { profile } = useUser();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <div className="min-h-screen bg-navy-50 flex">
            {/* Mobile sidebar backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-navy-800 text-white flex flex-col transition-transform duration-300",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                {/* Logo */}
                <div className="p-6 border-b border-navy-700">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <Image
                            src="/images/icon-192.png"
                            alt="AI Courses for Adults"
                            width={40}
                            height={40}
                            className="w-10 h-10"
                        />
                        <span className="font-semibold text-lg">AI Courses for Adults</span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href ||
                                (item.href !== "/dashboard" && pathname.startsWith(item.href));

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                            isActive
                                                ? "bg-gold-500 text-navy-900 font-medium"
                                                : "text-navy-200 hover:bg-navy-700 hover:text-white"
                                        )}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* User section */}
                <div className="p-4 border-t border-navy-700">
                    <div className="flex items-center gap-3 px-4 py-2">
                        <div className="w-10 h-10 bg-navy-600 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-navy-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                                {profile?.name || user?.displayName || "User"}
                            </p>
                            <p className="text-xs text-navy-400 truncate">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="w-full mt-2 flex items-center gap-3 px-4 py-3 text-navy-300 hover:text-white hover:bg-navy-700 rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Mobile header */}
                <header className="lg:hidden bg-white border-b sticky top-0 z-30">
                    <div className="flex items-center justify-between px-4 py-3">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 text-navy-700 hover:bg-navy-50 rounded-lg"
                            aria-label="Open menu"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <Link href="/dashboard" className="flex items-center gap-2">
                            <Image
                                src="/images/icon-192.png"
                                alt="AI Courses for Adults"
                                width={32}
                                height={32}
                                className="w-8 h-8"
                            />
                        </Link>

                        {/* User menu button */}
                        <div className="relative">
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center gap-2 p-2 text-navy-700 hover:bg-navy-50 rounded-lg"
                            >
                                <div className="w-8 h-8 bg-navy-100 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-navy-600" />
                                </div>
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            {/* Dropdown */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1">
                                    <Link
                                        href="/dashboard/settings"
                                        onClick={() => setIsUserMenuOpen(false)}
                                        className="block px-4 py-2 text-navy-700 hover:bg-navy-50"
                                    >
                                        Settings
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full text-left px-4 py-2 text-navy-700 hover:bg-navy-50"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
