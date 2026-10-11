import { useState } from "react";
import { Landmark, ArrowUpRight, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

interface NavItem {
    label: string;
    path: string;
}

const navItems: NavItem[] = [
    { label: "Home", path: "/" },
    { label: "Contacts", path: "/contact-us" },
    { label: "Announcements", path: "/announcements" },
    { label: "Track Request", path: "/track-request" },
    { label: "Officials", path: "/officials" },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = (path: string) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    return (
        <div className="flex flex-col w-full sticky top-0 z-50 bg-white">
            {/* Top Bar */}
            <header className="bg-[#005F44] text-white py-1.5 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] sm:text-xs">
                    <div className="flex items-center gap-2">
                        <span className="font-bold tracking-wide">PH</span>
                        <span className="text-white/80">Barangay Tumana, Marikina City</span>
                    </div>
                    <p className="hidden sm:block text-white/90 italic tracking-wide">
                        Serbisyong may malasakit.
                    </p>
                </div>
            </header>

            {/* Main Navbar */}
            <nav className="bg-white border-b border-gray-100 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between">
                    {/* Brand / Logo */}
                    <div 
                        className="flex items-center gap-2.5 sm:gap-3 cursor-pointer"
                        onClick={() => handleNavigate("/")}
                    >
                        <div className="border-[#005F44] border-2 rounded-full h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center shrink-0">
                            <div className="h-[88%] w-[88%] border-[#005F44] border rounded-full flex flex-col items-center justify-center bg-emerald-50/40">
                                <Landmark className="text-[#005F44] w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="text-[6px] sm:text-[7px] text-[#005F44] font-bold tracking-tighter">
                                    TUMANA
                                </span>
                            </div>
                        </div>
                        <aside className="leading-tight">
                            <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 tracking-tight">
                                Barangay Tumana
                            </h1>
                            <p className="text-[8px] sm:text-[9px] text-gray-400 font-semibold tracking-[0.22em] uppercase">
                                City of Marikina
                            </p>
                        </aside>
                    </div>

                    {/* Desktop Navigation Links */}
                    <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-medium">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <li
                                    key={item.path}
                                    className="cursor-pointer group relative py-1 select-none"
                                    onClick={() => handleNavigate(item.path)}
                                >
                                    <span
                                        className={`transition-colors text-[14px] duration-200 ${
                                            isActive
                                                ? "text-[#005F44] font-semibold"
                                                : "text-gray-600 hover:text-[#005F44]"
                                        }`}
                                    >
                                        {item.label}
                                    </span>
                                    <span
                                        className={`absolute bottom-0 left-0 h-[2px] bg-[#005F44] rounded-full transition-transform duration-200 origin-left ${
                                            isActive
                                                ? "w-full scale-x-100"
                                                : "w-full scale-x-0 group-hover:scale-x-100"
                                        }`}
                                    />
                                </li>
                            );
                        })}
                    </ul>

                    {/* Desktop Right CTA Button */}
                    <div className="hidden lg:flex items-center">
                        <button
                            onClick={() => handleNavigate("/request-document")}
                            className="bg-[#005F44] hover:bg-[#004833] text-white text-xs lg:text-sm font-medium px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                            <span>Request a document</span>
                            <ArrowUpRight size={15} />
                        </button>
                    </div>

                    {/* Mobile Hamburger Toggle Button */}
                    <div className="flex md:hidden items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg text-gray-700 hover:text-[#005F44] hover:bg-gray-100 transition-colors focus:outline-none"
                            aria-label="Toggle navigation menu"
                        >
                            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
                        <ul className="flex flex-col space-y-1">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <li key={item.path}>
                                        <button
                                            onClick={() => handleNavigate(item.path)}
                                            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                                isActive
                                                    ? "bg-emerald-50 text-[#005F44] font-semibold"
                                                    : "text-gray-700 hover:bg-gray-50 hover:text-[#005F44]"
                                            }`}
                                        >
                                            {item.label}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="pt-2 border-t border-gray-100">
                            <button
                                onClick={() => handleNavigate("/request-document")}
                                className="w-full bg-[#005F44] hover:bg-[#004833] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                            >
                                <span>Request a document</span>
                                <ArrowUpRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;