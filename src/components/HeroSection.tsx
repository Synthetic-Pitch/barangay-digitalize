import { MapPin, FileText, ArrowUpRight, ArrowRight, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router";
import backgroundPic from "../assets/img/tumana-community.jpg";

interface HeroSectionProps {
    badge?: string;
    title?: string;
    highlightedTitle?: string;
    subtitle?: string;
    primaryCtaLabel?: string;
    primaryCtaPath?: string;
    secondaryCtaLabel?: string;
    secondaryCtaPath?: string;
    trustNote?: string;
    imageSrc?: string;
    imageAlt?: string;
}

const HeroSection = ({
    badge = "Your Community, Now Connected",
    title = "Barangay Tumana.",
    highlightedTitle = "Mas malapit sa iyo.",
    subtitle = "Serbisyong barangay, abot-kamay. Request documents, stay informed, and be part of a stronger, more connected Tumana.",
    primaryCtaLabel = "Request a document",
    primaryCtaPath = "/request-document",
    secondaryCtaLabel = "Latest announcements",
    secondaryCtaPath = "/announcements",
    trustNote = "Para sa bawat pamilyang Tumana.",
    imageSrc = backgroundPic,
    imageAlt = "Barangay Tumana Community Hall",
}: HeroSectionProps) => {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-[480px] sm:min-h-[620px] lg:min-h-[400px] w-full flex items-center overflow-hidden">
            {/* Background Image */}
            <img
                src={imageSrc}
                alt={imageAlt}
                className="absolute inset-0 h-full w-full object-cover object-[40%_60%]"
            />

            {/* Dark Gradient Overlay for contrast and readability */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-[#021812]/95 via-[#032219]/80 via-15% sm:via-20% to-[#032219]/25 md:to-transparent"
                aria-hidden="true"
            />
            {/* Additional bottom gradient for smaller screens */}
            <div
                className="absolute inset-0 bg-gradient-to-t from-[#021812]/90 via-[#021812]/40 to-transparent sm:hidden"
                aria-hidden="true"
            />

            {/* Hero Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 md:py-20 lg:py-24">
                <div className="max-w-xl lg:max-w-2xl flex flex-col items-start gap-4 sm:gap-5 md:gap-6 text-white">

                    {/* Location / Status Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-black/25 backdrop-blur-xs text-[10px] sm:text-xs font-semibold tracking-wider text-white/90 uppercase shadow-xs">
                        <MapPin size={12} className="text-white/80 shrink-0" />
                        <span>{badge}</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[58px] font-bold tracking-tight leading-[1.1]">
                        <span>{title}</span>
                        <br />
                        <span className="text-[#9BE0B6]">{highlightedTitle}</span>
                    </h1>

                    {/* Subtitle / Paragraph */}
                    <p className="text-xs sm:text-sm md:text-base text-gray-200/90 leading-relaxed max-w-lg font-normal">
                        {subtitle}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto pt-1 sm:pt-2">
                        {/* Primary Button */}
                        <button
                            onClick={() => navigate(primaryCtaPath)}
                            className="inline-flex items-center justify-center gap-2 bg-[#00704A] hover:bg-[#005a3b] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                        >
                            <FileText size={16} />
                            <span>{primaryCtaLabel}</span>
                            <ArrowUpRight size={16} />
                        </button>

                        {/* Secondary Button */}
                        <button
                            onClick={() => navigate(secondaryCtaPath)}
                            className="inline-flex items-center justify-center gap-2 border border-white/30 bg-black/20 hover:bg-white/10 backdrop-blur-xs text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-lg transition-all duration-200 cursor-pointer"
                        >
                            <span>{secondaryCtaLabel}</span>
                            <ArrowRight size={16} />
                        </button>
                    </div>

                    {/* Trust / Community Note */}
                    <div className="flex items-center gap-2 pt-1 text-[11px] sm:text-xs text-white/75 font-normal">
                        <ShieldCheck size={14} className="text-[#4ade80] shrink-0" />
                        <span>{trustNote}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
