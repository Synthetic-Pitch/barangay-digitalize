import { Landmark, MapPin, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="w-full bg-[#f8f9fa] border-t border-gray-200/70 py-8 sm:py-10 font-dm-sans">
            <div className="w-full max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Content Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* Brand */}
                    <div 
                        className="flex items-center gap-3 cursor-pointer select-none"
                        onClick={() => navigate("/")}
                    >
                        <div className="border-[#005F44] border-2 rounded-full h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center shrink-0">
                            <div className="h-[88%] w-[88%] border-[#005F44] border rounded-full flex flex-col items-center justify-center bg-emerald-50/40">
                                <Landmark className="text-[#005F44] w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="text-[6px] sm:text-[7px] text-[#005F44] font-bold tracking-tighter">
                                    TUMANA
                                </span>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight leading-tight">
                                Barangay Tumana
                            </h2>
                            <p className="text-xs sm:text-[13px] text-gray-500 font-normal">
                                Isang komunidad. Isang pamilya.
                            </p>
                        </div>
                    </div>

                    {/* Location & Policies (side by side on mobile, integrated in row on desktop) */}
                    <div className="flex items-center justify-between md:justify-end md:gap-10 lg:gap-16 w-full md:w-auto">
                        {/* Location */}
                        <div className="flex items-center gap-2 text-[11px] sm:text-[12px] text-gray-600">
                            <MapPin size={16} className="text-gray-500 shrink-0" />
                            <span>Tumana, Marikina City, Philippines</span>
                        </div>

                        {/* Community Policies */}
                        <button
                            onClick={() => navigate("/policies")}
                            className="flex items-center gap-2 text-[11px] sm:text-[13px] text-gray-600 hover:text-[#005F44] transition-colors cursor-pointer"
                        >
                            <ShieldCheck size={16} className="text-gray-500 shrink-0" />
                            <span>Community policies</span>
                        </button>
                    </div>
                </div>

                {/* Divider Line */}
                <hr className="border-t border-gray-200/90 my-6 sm:my-8" />

                {/* Copyright & Tagline */}
                <div className="flex flex-row items-center justify-between text-[10px] sm:text-xs text-gray-400 font-normal gap-2">
                    <p>© 2026 Barangay Tumana. All rights reserved.</p>
                    <p>Made for the people of Tumana.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

