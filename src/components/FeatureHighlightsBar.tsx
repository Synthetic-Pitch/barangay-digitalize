import { Fragment } from "react";
import { FileText, ShieldCheck, HeartHandshake, type LucideIcon } from "lucide-react";

export interface FeatureHighlightItem {
    icon: LucideIcon;
    title: string;
    subtitle: string;
}

interface FeatureHighlightsBarProps {
    items?: FeatureHighlightItem[];
}

const defaultItems: FeatureHighlightItem[] = [
    { icon: FileText, title: "Services at your fingertips", subtitle: "Start your document request online" },
    { icon: ShieldCheck, title: "A community you can count on", subtitle: "Transparent, people-centered service" },
    { icon: HeartHandshake, title: "Connected as one community", subtitle: "Stay updated. Get involved." },
];

const FeatureHighlightsBar = ({ items = defaultItems }: FeatureHighlightsBarProps) => {
    return (
        <section className="w-full bg-[#F4F8F6] border-b border-gray-100 shadow-xs py-5 sm:py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ul className="flex items-center justify-between gap-6 md:gap-4 lg:gap-8">
                    {items.map((item, index) => (
                        <Fragment key={index}>
                            <li className="flex flex-col md:flex-row items-center gap-3.5 w-full md:w-auto justify-start">
                                <div className="shrink-0 text-[#005F44]">
                                    <item.icon size={28} strokeWidth={2} />
                                </div>
                                <div className="flex flex-col text-left font-dm-sans">
                                    <h3 className="font-bold text-gray-900 text-[12px] sm:text-[15px] tracking-tight text-center">
                                        {item.title}
                                    </h3>
                                    <p className="hidden md:flex text-xs sm:text-[13px] text-gray-500 font-normal">
                                        {item.subtitle}
                                    </p>
                                </div>
                            </li>

                            {/* Vertical Divider between items (hidden on last item and on mobile) */}
                            {index < items.length - 1 && (
                                <div
                                    className="hidden md:block w-px h-10 bg-gray-200 shrink-0"
                                    aria-hidden="true"
                                />
                            )}
                        </Fragment>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default FeatureHighlightsBar;
