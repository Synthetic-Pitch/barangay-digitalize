import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router";

interface CommunityProgramsBannerProps {
    eyebrow?: string;
    title?: string;
    description?: string;
    ctaLabel?: string;
    ctaPath?: string;
    onCtaClick?: () => void;
}

const CommunityProgramsBanner = ({
    eyebrow = "KASAMA MO ANG BARANGAY",
    title = "A better Tumana starts with all of us.",
    description = "Discover the programs bringing our community together.",
    ctaLabel = "Explore community programs",
    ctaPath = "/programs",
    onCtaClick,
}: CommunityProgramsBannerProps) => {
    const navigate = useNavigate();

    const handleCtaClick = () => {
        if (onCtaClick) {
            onCtaClick();
            return;
        }
        navigate(ctaPath);
    };

    return (
        <section className="w-full flex justify-center py-10 sm:py-14 bg-white border-t border-gray-100">
            <main className="w-full max-w-300 px-4 py-4 font-dm-sans">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex flex-col gap-2">
                        <p className="text-[11px] sm:text-xs font-semibold tracking-wider text-[#005F44] uppercase">
                            {eyebrow}
                        </p>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                            {title}
                        </h2>
                        <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div className="shrink-0">
                        <button
                            onClick={handleCtaClick}
                            className="border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-900 font-medium text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 shadow-xs"
                        >
                            <span>{ctaLabel}</span>
                            <ArrowUpRight size={15} />
                        </button>
                    </div>
                </div>
            </main>
        </section>
    );
};

export default CommunityProgramsBanner;
