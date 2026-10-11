import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router";
import { announcements as defaultAnnouncements, type Announcement } from "../data/announcements";

export type { Announcement };

interface AnnouncementsSectionProps {
    eyebrow?: string;
    title?: string;
    description?: string;
    viewAllLabel?: string;
    viewAllPath?: string;
    badgeLabel?: string;
    showViewAll?: boolean;
    announcements?: Announcement[];
}

const AnnouncementsSection = ({
    eyebrow = "STAY IN THE KNOW",
    title = "What's happening in Tumana",
    description = "The latest news, activities, and opportunities in our community.",
    viewAllLabel = "All announcements",
    viewAllPath = "/announcements",
    badgeLabel = "Sample announcement",
    announcements = defaultAnnouncements,
    showViewAll = true,
}: AnnouncementsSectionProps) => {
    const navigate = useNavigate();

    return (
        <section className="w-full flex justify-center py-6 sm:py-10 bg-[#F4F8F6]">
            <main className="w-full max-w-300 px-4 py-4 font-dm-sans">
                {/* Header */}
                <div className="flex flex-col gap-2 mb-6 sm:mb-8">
                    <p className="text-[11px] sm:text-xs font-semibold tracking-wider text-[#005F44] uppercase">
                        {eyebrow}
                    </p>

                    <div className="flex items-start sm:items-center justify-between gap-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                            {title}
                        </h2>
                        {/* Desktop "All announcements" link */}
                        {showViewAll && (
                            <button
                                onClick={() => navigate(viewAllPath)}
                                className="hidden md:flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#005F44] hover:underline cursor-pointer shrink-0"
                            >
                                <span>{viewAllLabel}</span>
                                <ArrowRight size={16} />
                            </button>
                        )}
                    </div>

                    <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed">
                        {description}
                    </p>

                    {/* Mobile "All announcements" link (below paragraph) */}
                    <div className="md:hidden pt-1">
                        {showViewAll && (
                            <button
                                onClick={() => navigate(viewAllPath)}
                                className="flex items-center gap-1.5 text-xs font-semibold text-[#005F44] hover:underline cursor-pointer"
                            >
                                <span>{viewAllLabel}</span>
                                <ArrowRight size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Announcements Grid: 1 col on mobile, 3 cols on desktop/tablet */}
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {announcements.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => navigate(item.link)}
                            className="group bg-white border border-gray-200/90 hover:border-[#005F44]/50 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                        >
                            {/* Media / Header with badge */}
                            <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[10px] sm:text-[11px] font-medium text-gray-700 px-2.5 py-1 rounded-md shadow-xs z-10">
                                    {badgeLabel}
                                </span>

                                {item.type === "image" ? (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className={`w-full h-full flex items-center justify-center gap-3.5 px-6 ${item.bgClass}`}>
                                        <item.icon className={`w-12 h-12 shrink-0 ${item.iconColor}`} strokeWidth={2} />
                                        <div className="flex flex-col text-left">
                                            {item.graphicText.map((line, lineIdx) => (
                                                <span
                                                    key={lineIdx}
                                                    className={`text-base sm:text-lg font-bold leading-tight ${item.textColor}`}
                                                >
                                                    {line}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Body */}
                            <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
                                <div className="space-y-1.5">
                                    <span className="text-[11px] sm:text-xs font-semibold text-[#005F44] tracking-wide">
                                        {item.category}
                                    </span>
                                    <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#005F44] transition-colors leading-snug">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed font-normal">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Action Link */}
                                <div className="pt-2 mt-auto">
                                    <span className="inline-flex items-center gap-1 text-xs sm:text-[13px] font-semibold text-[#005F44] group-hover:underline">
                                        Read more
                                        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </section>
    );
};

export default AnnouncementsSection;
