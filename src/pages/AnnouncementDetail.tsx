import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, ArrowUpRight, CalendarDays, Megaphone } from "lucide-react";
import Navbar from "../components/Navbar";
import { getAnnouncementBySlug } from "../data/announcements";

const AnnouncementDetail = () => {
    const { slug } = useParams();
    const announcement = getAnnouncementBySlug(slug);

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [slug]);

    if (!announcement) {
        return (
            <div className="min-h-screen bg-[#F4F8F6] font-dm-sans">
                <Navbar />
                <main className="w-full max-w-300 mx-auto px-4 md:px-8 py-16 flex flex-col items-center gap-4 text-center">
                    <Megaphone size={40} className="text-[#005F44]" />
                    <h1 className="text-2xl font-bold text-gray-900">Announcement not found</h1>
                    <p className="text-sm text-gray-500 max-w-md leading-relaxed">
                        The announcement you are looking for does not exist or may have been removed.
                        Please check the link or browse all announcements below.
                    </p>
                    <Link
                        to="/announcements"
                        className="mt-2 inline-flex items-center gap-2 bg-[#125F44] hover:bg-[#0e4b36] text-white text-xs font-semibold px-6 py-2.5 rounded-2xl transition-colors"
                    >
                        <ArrowLeft size={16} /> Back to all announcements
                    </Link>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F4F8F6] font-dm-sans">
            <Navbar />
            <main className="w-full max-w-300 mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col gap-6">
                {/* Back link */}
                <Link
                    to="/announcements"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#005F44] hover:underline self-start"
                >
                    <ArrowLeft size={16} /> All announcements
                </Link>

                <article className="bg-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-xs">
                    {/* Hero: image or graphic banner (same look as the cards) */}
                    {announcement.type === "image" ? (
                        <img
                            src={announcement.image}
                            alt={announcement.title}
                            className="w-full h-64 sm:h-80 object-cover"
                        />
                    ) : (
                        <div className={`w-full h-56 sm:h-72 flex items-center justify-center gap-4 px-6 ${announcement.bgClass}`}>
                            <announcement.icon className={`w-14 h-14 shrink-0 ${announcement.iconColor}`} strokeWidth={2} />
                            <div className="flex flex-col text-left">
                                {announcement.graphicText.map((line, lineIdx) => (
                                    <span key={lineIdx} className={`text-xl sm:text-2xl font-bold leading-tight ${announcement.textColor}`}>
                                        {line}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div className="px-5 sm:px-10 py-7 sm:py-9 flex flex-col gap-5">
                        <div className="flex flex-wrap items-center gap-3 text-[11px] sm:text-xs">
                            <span className="font-semibold text-[#005F44] tracking-wide uppercase">{announcement.category}</span>
                            <span className="inline-flex items-center gap-1.5 text-gray-500">
                                <CalendarDays size={14} /> {announcement.date}
                            </span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight">
                            {announcement.title}
                        </h1>
                        <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                            {announcement.description}
                        </p>

                        <div className="space-y-4 text-sm sm:text-[15px] text-gray-700 leading-relaxed">
                            {announcement.body.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>

                        {announcement.highlights && announcement.highlights.length > 0 && (
                            <div className="bg-[#F4F8F6] border border-[#005F44]/10 rounded-xl p-5 flex flex-col gap-2.5">
                                <span className="text-xs font-bold text-[#005F44] uppercase tracking-wide">Highlights</span>
                                <ul className="space-y-2">
                                    {announcement.highlights.map((item, index) => (
                                        <li key={index} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-gray-700 leading-relaxed">
                                            <span className="mt-1.5 size-1.5 rounded-full bg-[#005F44] shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </article>

                {/* CTA footer */}
                <div className="bg-white border border-gray-200/90 rounded-2xl shadow-xs px-5 sm:px-10 py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-bold text-gray-900">Have questions about this announcement?</p>
                        <p className="text-xs text-gray-500">Reach out to the barangay office — we are happy to help.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            to="/announcements"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#005F44] border border-[#005F44]/30 hover:bg-[#005F44]/5 px-5 py-2.5 rounded-2xl transition-colors"
                        >
                            More announcements <ArrowUpRight size={14} />
                        </Link>
                        <Link
                            to="/contact-us"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#125F44] hover:bg-[#0e4b36] px-5 py-2.5 rounded-2xl transition-colors"
                        >
                            Contact the barangay <ArrowUpRight size={14} />
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AnnouncementDetail;
