import { ArrowRight, ArrowUpRight, FileCheck2, House, ReceiptText, HeartHandshake, type LucideIcon } from "lucide-react";
import { useNavigate } from "react-router";

export interface ServiceItem {
    title: string;
    description: string;
    icon: LucideIcon;
    iconBg: string;
    path: string;
}

interface ServicesSectionProps {
    eyebrow?: string;
    title?: string;
    description?: string;
    exploreLabel?: string;
    actionLabel?: string;
    onExploreClick?: () => void;
    services?: ServiceItem[];
}

const defaultServices: ServiceItem[] = [
    {
        title: "Barangay Clearance",
        description: "For employment, business, and other official requirements.",
        icon: FileCheck2,
        iconBg: "bg-emerald-100 text-emerald-800",
        path: "/request-document?type=clearance",
    },
    {
        title: "Community Tax Certificate (Cedula)",
        description: "Request your cedula for personal and official transactions.",
        icon: ReceiptText,
        iconBg: "bg-sky-100 text-sky-800",
        path: "/request-document?type=cedula",
    },
    {
        title: "Certificate of Indigency",
        description: "For medical, educational, and financial assistance.",
        icon: HeartHandshake,
        iconBg: "bg-amber-100 text-amber-800",
        path: "/request-document?type=indigency",
    },
    {
        title: "Certificate of Residency",
        description: "A certification of your residence in Barangay Tumana.",
        icon: House,
        iconBg: "bg-purple-100 text-purple-800",
        path: "/request-document?type=residency",
    },
];

const ServicesSection = ({
    eyebrow = "ONLINE BARANGAY SERVICES",
    title = "Less waiting, More living.",
    description = "Your essential documents, without the extra trips.",
    exploreLabel = "Explore all services",
    actionLabel = "Request document",
    onExploreClick,
    services = defaultServices,
}: ServicesSectionProps) => {
    const navigate = useNavigate();

    return (
        <section className="w-full flex justify-center">
            <main className="w-full max-w-300 px-4 py-4 font-dm-sans">
                <aside className="flex flex-col gap-2 my-4">
                    <p className="text-[12px] md:text-[14px] text-[#005f44] ">{eyebrow}</p>
                    <div className="flex justify-between ">
                        <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
                        <button onClick={onExploreClick} className="hidden md:flex gap-2 text-[#005f44]">{exploreLabel} <ArrowRight color="#005f44"/></button>
                    </div>
                    <p className="text-gray-500 text-[12px] md:text-[14px]">{description}</p>
                    <button onClick={onExploreClick} className="flex items-center md:hidden gap-2 text-[#005f44] text-[12px] ">{exploreLabel} <ArrowRight color="#005f44" size={16}/></button>
                </aside>
                <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mt-4 sm:mt-6">
                    {services.map((service, index) => (
                        <li
                            key={index}
                            onClick={() => navigate(service.path)}
                            className="group bg-white border border-gray-200/90 rounded-2xl p-3.5 sm:p-5 flex flex-col justify-between shadow-xs hover:-translate-y-px hover:shadow-md transition-all duration-200 cursor-pointer min-h-[210px] sm:min-h-[240px]"
                        >
                            <div className="flex flex-col gap-3 sm:gap-4">
                                <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 ${service.iconBg}`}>
                                    <service.icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
                                </div>
                                <div className="space-y-1 sm:space-y-1.5">
                                    <h3 className="text-xs sm:text-sm lg:text-[15px] font-bold text-gray-900 group-hover:text-[#005F44] transition-colors leading-snug">
                                        {service.title}
                                    </h3>
                                    <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed font-normal">
                                        {service.description}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-3 sm:pt-4 mt-auto">
                                <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#005F44] group-hover:underline">
                                    {actionLabel}
                                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </section>
    );
};

export default ServicesSection;
