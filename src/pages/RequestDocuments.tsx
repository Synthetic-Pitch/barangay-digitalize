import { useState, type ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
    ArrowLeft,
    ArrowRight,
    Bell,
    Building2,
    Calendar,
    Check,
    ChevronDown,
    Target,
    FileText,
    GraduationCap,
    Heart,
    Home,
    Info,
    Lock,
    Mail,
    MapPin,
    MessageSquare,
    Phone,
    Send,
    ShieldCheck,
    TrendingUp,
    Truck,
    User,
    UserCheck,
} from "lucide-react";
import Navbar from "../components/Navbar";

/* ------------------------------------------------------------------ */
/* Types & Data                                                        */
/* ------------------------------------------------------------------ */

type CertificateId = "cedula" | "clearance" | "indigency" | "residency" | "good-moral" | "business-permit";

interface CertificateType {
    id: CertificateId;
    title: string;
    description: string;
    fee: number;
    feeLabel: string;
    feeNote?: string;
    icon: typeof FileText;
    typeParam?: string;
}

const CERTIFICATES: CertificateType[] = [
    {
        id: "cedula",
        title: "Cedula (Community Tax Certificate)",
        description: "A document showing you are a registered taxpayer in the community.",
        fee: 50,
        feeLabel: "Php 50.00",
        feeNote: "*",
        icon: FileText,
        typeParam: "cedula",
    },
    {
        id: "clearance",
        title: "Barangay Clearance",
        description: "Certifies you are a resident of good standing in the barangay.",
        fee: 50,
        feeLabel: "Php 50.00",
        icon: ShieldCheck,
        typeParam: "clearance",
    },
    {
        id: "indigency",
        title: "Certificate of Indigency",
        description: "Declares you as an indigent resident for assistance programs.",
        fee: 0,
        feeLabel: "Free",
        icon: Heart,
        typeParam: "indigency",
    },
    {
        id: "residency",
        title: "Certificate of Residency",
        description: "Confirms your residency in Barangay Tumana.",
        fee: 50,
        feeLabel: "Php 50.00",
        icon: MapPin,
        typeParam: "residency",
    },
    {
        id: "good-moral",
        title: "Good Moral Character",
        description: "Certifies you are of good moral standing in the community.",
        fee: 50,
        feeLabel: "Php 50.00",
        icon: GraduationCap,
    },
    {
        id: "business-permit",
        title: "Business Permit Clearance",
        description: "Barangay-level clearance for local business permit applications.",
        fee: 100,
        feeLabel: "Php 100.00",
        icon: TrendingUp,
    },
];

const PUROK_OPTIONS = ["Purok 1", "Purok 2", "Purok 3", "Purok 4", "Purok 5", "Purok 6", "Purok 7", "Purok 8"];

const PURPOSE_OPTIONS = [
    "Financial Assistance",
    "Employment",
    "Business Registration",
    "Educational Assistance",
    "Medical Assistance",
    "Legal / Court Requirement",
    "Other",
];

const DELIVERY_FEE = 30;

type NotificationMethod = "sms" | "email";
type ClaimingMethod = "pickup" | "representative" | "delivery";

const CLAIMING_LABELS: Record<ClaimingMethod, string> = {
    pickup: "Barangay Hall Pickup",
    representative: "Authorized Representative",
    delivery: "Home Delivery",
};

const NOTIFICATION_LABELS: Record<NotificationMethod, string> = {
    sms: "SMS",
    email: "Email",
};

interface FormState {
    certificateId: CertificateId;
    firstName: string;
    middleName: string;
    lastName: string;
    mobile: string;
    email: string;
    house: string;
    purok: string;
    purpose: string;
    notification: NotificationMethod;
    claiming: ClaimingMethod;
    repName: string;
    repContact: string;
    consent: boolean;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const getCertificate = (id: CertificateId): CertificateType =>
    CERTIFICATES.find((cert) => cert.id === id) ?? CERTIFICATES[0];

const mapTypeParam = (param: string | null): CertificateId | null => {
    const cert = CERTIFICATES.find((c) => c.typeParam && c.typeParam === param);
    return cert ? cert.id : null;
};

/** Next `count` weekdays (Mon-Fri), skipping weekends — starts from tomorrow. */
const getNextWeekdays = (count: number): Date[] => {
    const days: Date[] = [];
    const cursor = new Date();
    cursor.setHours(0, 0, 0, 0);
    while (days.length < count) {
        cursor.setDate(cursor.getDate() + 1);
        const day = cursor.getDay();
        if (day !== 0 && day !== 6) days.push(new Date(cursor));
    }
    return days;
};

const toShortDate = (date: Date) =>
    date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

const toLongDate = (date: Date) =>
    date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

const toIsoDate = (date: Date) => date.toISOString().slice(0, 10);

/* ------------------------------------------------------------------ */
/* Shared UI                                                           */
/* ------------------------------------------------------------------ */

const STEPS = ["Certificate Type", "Application Details", "Payment"];

const inputBase =
    "w-full rounded-lg bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:ring-2";

const inputClass = (hasIcon: boolean, error?: string, isSelect = false) =>
    [
        inputBase,
        hasIcon ? "pl-9" : "",
        isSelect ? "appearance-none pr-9" : "",
        error
            ? "border border-red-300 focus:border-red-400 focus:ring-red-100"
            : "border border-gray-200 focus:border-green-600 focus:ring-green-100",
    ]
        .filter(Boolean)
        .join(" ");

const FieldLabel = ({ children, required = false }: { children: ReactNode; required?: boolean }) => (
    <span className="mb-1.5 block text-[13px] font-medium text-gray-700">
        {children}
        {required && <span className="text-red-500"> *</span>}
    </span>
);

const FieldError = ({ message }: { message?: string }) =>
    message ? <p className="mt-1 text-xs text-red-500">{message}</p> : null;

const SectionHeader = ({
    icon: Icon,
    title,
    subtitle,
}: {
    icon: typeof Bell;
    title: string;
    subtitle: string;
}) => (
    <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-700">
            <Icon className="h-[18px] w-[18px]" />
        </span>
        <div>
            <h2 className="text-sm font-bold text-gray-900">{title}</h2>
            <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
    </div>
);

/** Full stepper on sm+ screens; compact "Step X of 3" progress bar on mobile. */
const Stepper = ({ current }: { current: number }) => (
    <div className="border-b border-gray-100 bg-white">
        {/* Desktop / tablet stepper */}
        <div className="mx-auto hidden max-w-5xl items-center px-4 py-5 sm:flex sm:px-6 lg:px-8">
            {STEPS.map((label, index) => {
                const isActive = index <= current;
                const isComplete = index < current;

                return (
                    <div key={label} className="flex flex-1 items-center last:flex-none">
                        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                            <span
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors duration-300 ${
                                    isActive ? "bg-green-700 text-white" : "bg-gray-100 text-gray-400"
                                }`}
                            >
                                {isComplete ? <Check className="h-4 w-4" /> : index + 1}
                            </span>
                            <span
                                className={`whitespace-nowrap text-xs font-semibold transition-colors duration-300 sm:text-sm ${
                                    isActive ? "text-green-800" : "text-gray-400"
                                }`}
                            >
                                {label}
                            </span>
                        </div>
                        {index < STEPS.length - 1 && (
                            <span
                                aria-hidden="true"
                                className={`mx-4 h-px min-w-8 flex-1 transition-colors duration-300 sm:mx-6 ${
                                    current > index ? "bg-green-600" : "bg-gray-200"
                                }`}
                            />
                        )}
                    </div>
                );
            })}
        </div>

        {/* Mobile stepper */}
        <div className="px-4 py-3.5 sm:hidden">
            <div className="mb-2 flex items-center gap-2 text-xs">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-700 text-[11px] font-bold text-white">
                    {current + 1}
                </span>
                <span className="font-medium text-gray-500">
                    Step {current + 1} of {STEPS.length}
                </span>
                <span className="font-semibold text-green-800">· {STEPS[current]}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                    className="h-full rounded-full bg-green-700 transition-all duration-300"
                    style={{ width: `${((current + 1) / STEPS.length) * 100}%` }}
                />
            </div>
        </div>
    </div>
);

/* ------------------------------------------------------------------ */
/* Step 1 — Certificate Type                                            */
/* ------------------------------------------------------------------ */

interface Step1Props {
    selectedId: CertificateId;
    onSelect: (id: CertificateId) => void;
    onNext: () => void;
}

/** Dark hero header shown only on step 1, above the timeline/stepper. */
const HeroHeader = () => {
    const navigate = useNavigate();

    return (
        <section className="bg-[#14532d] text-white">
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="mb-4 inline-flex items-center gap-1.5 text-sm text-green-100 transition hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </button>
                <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">Request a Certificate</h1>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-green-100 sm:text-base">
                    Select the certificate you need, fill out the form, and complete your request.
                    You will receive a tracking code to monitor your request status.
                </p>
            </div>
        </section>
    );
};

const Step1CertificateType = ({ selectedId, onSelect, onNext }: Step1Props) => {
    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Select Certificate Type</h2>
            <p className="mt-1 text-sm text-gray-500">Choose the document you need from the barangay.</p>

            {/* Certificate grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {CERTIFICATES.map((cert) => {
                    const selected = cert.id === selectedId;
                    return (
                        <button
                            key={cert.id}
                            type="button"
                            onClick={() => onSelect(cert.id)}
                            className={`flex flex-col rounded-xl border p-4 text-left transition-all ${
                                selected
                                    ? "border-green-600 bg-green-50 shadow-xs"
                                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-xs"
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                <span
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                                        selected ? "bg-green-700 text-white" : "bg-green-100 text-green-700"
                                    }`}
                                >
                                    <cert.icon className="h-5 w-5" />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="text-sm font-bold leading-snug text-gray-900">{cert.title}</h3>
                                        {selected && (
                                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                                                <Check className="h-3 w-3" />
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-1 text-xs leading-relaxed text-gray-500">{cert.description}</p>
                                </div>
                            </div>
                            <div className="mt-3">
                                {selected ? (
                                    <span className="text-xs font-semibold text-gray-800">
                                        {cert.feeLabel}
                                        {cert.feeNote}
                                    </span>
                                ) : (
                                    <span className="inline-block rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                                        {cert.feeLabel}
                                    </span>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end">
                <button
                    type="button"
                    onClick={onNext}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 sm:w-auto"
                >
                    Next
                    <ArrowRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

/* ------------------------------------------------------------------ */
/* Step 2 — Application Details                                         */
/* ------------------------------------------------------------------ */

interface Step2Props {
    form: FormState;
    errors: FormErrors;
    onUpdate: (patch: Partial<FormState>) => void;
    onBack: () => void;
    onNext: () => void;
}

const Step2ApplicationDetails = ({ form, errors, onUpdate, onBack, onNext }: Step2Props) => {
    const cert = getCertificate(form.certificateId);

    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Application Details</h1>
            <p className="mt-1 text-sm text-gray-500">Fill out your personal information and preferences.</p>

            <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-xs sm:p-6 lg:p-7">
                {/* Selected certificate summary */}
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-green-100 bg-green-50 px-4 py-3.5">
                    <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-700 text-white">
                            <cert.icon className="h-[18px] w-[18px]" />
                        </span>
                        <div>
                            <p className="text-sm font-bold text-gray-900">{cert.title}</p>
                            <p className="text-xs text-gray-500">
                                Fee: {cert.feeLabel}
                                {cert.feeNote}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onBack}
                        className="text-sm font-semibold text-green-700 hover:underline"
                    >
                        Change
                    </button>
                </div>

                {/* Personal Information */}
                <div className="mt-6 space-y-4">
                    <SectionHeader
                        icon={User}
                        title="Personal Information"
                        subtitle="Enter your legal name as it appears on your government-issued ID."
                    />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <FieldLabel required>First Name</FieldLabel>
                            <input
                                type="text"
                                value={form.firstName}
                                onChange={(e) => onUpdate({ firstName: e.target.value })}
                                placeholder="Juan"
                                className={inputClass(false, errors.firstName)}
                            />
                            <FieldError message={errors.firstName} />
                        </div>
                        <div>
                            <FieldLabel>
                                Middle Name <span className="font-normal text-gray-400">(optional)</span>
                            </FieldLabel>
                            <input
                                type="text"
                                value={form.middleName}
                                onChange={(e) => onUpdate({ middleName: e.target.value })}
                                placeholder="Dela Cruz"
                                className={inputClass(false)}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <FieldLabel required>Last Name</FieldLabel>
                            <input
                                type="text"
                                value={form.lastName}
                                onChange={(e) => onUpdate({ lastName: e.target.value })}
                                placeholder="Santos"
                                className={inputClass(false, errors.lastName)}
                            />
                            <FieldError message={errors.lastName} />
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="mt-6 space-y-4">
                    <SectionHeader
                        icon={Phone}
                        title="Contact Information"
                        subtitle="We use these to verify your identity and send request updates."
                    />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <FieldLabel required>Mobile Number</FieldLabel>
                            <div className="relative">
                                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="tel"
                                    value={form.mobile}
                                    onChange={(e) => onUpdate({ mobile: e.target.value })}
                                    placeholder="09XXXXXXXXX"
                                    className={inputClass(true, errors.mobile)}
                                />
                            </div>
                            <p className="mt-1 text-xs text-gray-400">Format: 09XXXXXXXXX or +639XXXXXXXXX</p>
                            <FieldError message={errors.mobile} />
                        </div>
                        <div>
                            <FieldLabel>
                                Email Address <span className="font-normal text-gray-400">(optional)</span>
                            </FieldLabel>
                            <div className="relative">
                                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => onUpdate({ email: e.target.value })}
                                    placeholder="juan@email.com"
                                    className={inputClass(true, errors.email)}
                                />
                            </div>
                            <p className="mt-1 text-xs text-gray-400">
                                Used only for request updates and digital receipt, if available.
                            </p>
                            <FieldError message={errors.email} />
                        </div>
                    </div>
                </div>

                {/* Residential Address */}
                <div className="mt-6 space-y-4">
                    <SectionHeader
                        icon={Home}
                        title="Residential Address"
                        subtitle="Your address within Barangay Tumana helps us verify residency."
                    />
                    <div>
                        <FieldLabel required>House No. &amp; Street</FieldLabel>
                        <div className="relative">
                            <Home className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={form.house}
                                onChange={(e) => onUpdate({ house: e.target.value })}
                                placeholder="Blk 11 Lot 2 Farmer St."
                                className={inputClass(true, errors.house)}
                            />
                        </div>
                        <FieldError message={errors.house} />
                    </div>
                    <div>
                        <FieldLabel required>Purok / Sitio</FieldLabel>
                        <div className="relative">
                            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <select
                                value={form.purok}
                                onChange={(e) => onUpdate({ purok: e.target.value })}
                                className={inputClass(true, errors.purok, true)}
                            >
                                <option value="">Select purok / sitio</option>
                                {PUROK_OPTIONS.map((purok) => (
                                    <option key={purok} value={purok}>
                                        {purok}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        </div>
                        <p className="mt-1 text-xs text-gray-400">
                            Tumana, Marikina City is automatically appended to your address.
                        </p>
                        <FieldError message={errors.purok} />
                    </div>
                </div>

                {/* Purpose of Request */}
                <div className="mt-6 space-y-4">
                    <SectionHeader
                        icon={Target}
                        title="Purpose of Request"
                        subtitle="Select the reason you need this certificate. This speeds up the review process."
                    />
                    <div>
                        <FieldLabel required>Purpose</FieldLabel>
                        <div className="relative">
                            {/* <Target className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 fill-gray-300 text-gray-300" /> */}
                            <Target className="absolute h-3.5 w-3.5 pointer-events-none left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                            <select
                                value={form.purpose}
                                onChange={(e) => onUpdate({ purpose: e.target.value })}
                                className={inputClass(true, errors.purpose, true)}
                            >
                                <option value="">Select purpose</option>
                                {PURPOSE_OPTIONS.map((purpose) => (
                                    <option key={purpose} value={purpose}>
                                        {purpose}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        </div>
                        <FieldError message={errors.purpose} />
                    </div>
                </div>

                {/* Notification & Claiming Preferences */}
                <div className="mt-6 space-y-4">
                    <SectionHeader
                        icon={Bell}
                        title="Notification & Claiming Preferences"
                        subtitle="Choose how you want to receive updates and claim your certificate."
                    />
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {/* Preferred Notification Method */}
                        <div className="space-y-3">
                            <FieldLabel required>Preferred Notification Method</FieldLabel>
                            {[
                                { value: "sms", title: "SMS", subtitle: "Updates via text message", icon: MessageSquare },
                                { value: "email", title: "Email", subtitle: "Updates via email (requires email above)", icon: Mail },
                            ].map((option) => {
                                const selected = form.notification === option.value;
                                return (
                                    <label
                                        key={option.value}
                                        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition ${
                                            selected
                                                ? "border-green-600 bg-green-50"
                                                : "border-gray-200 bg-white hover:border-gray-300"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="notification"
                                            checked={selected}
                                            onChange={() => onUpdate({ notification: option.value as NotificationMethod })}
                                            className="mt-1 h-4 w-4 shrink-0 accent-[#2563eb]"
                                        />
                                        <span
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                                selected ? "bg-green-700 text-white" : "bg-gray-100 text-gray-500"
                                            }`}
                                        >
                                            <option.icon className="h-[18px] w-[18px]" />
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="block text-sm font-semibold text-gray-900">{option.title}</span>
                                            <span className="mt-0.5 block text-xs text-gray-500">{option.subtitle}</span>
                                        </span>
                                    </label>
                                );
                            })}
                            <FieldError message={errors.notification} />
                        </div>

                        {/* Claiming Method */}
                        <div className="space-y-3">
                            <FieldLabel required>Claiming Method</FieldLabel>
                            {[
                                { value: "pickup", title: "Barangay Hall Pickup", subtitle: "Claim in person at the Barangay Hall", icon: Building2 },
                                { value: "representative", title: "Authorized Representative", subtitle: "Send someone to claim on your behalf", icon: UserCheck },
                                { value: "delivery", title: "Home Delivery", subtitle: "Delivered to your home by a barangay worker", icon: Truck, badge: `+Php ${DELIVERY_FEE}.00 delivery fee` },
                            ].map((option) => {
                                const selected = form.claiming === option.value;
                                return (
                                    <label
                                        key={option.value}
                                        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition ${
                                            selected
                                                ? "border-green-600 bg-green-50"
                                                : "border-gray-200 bg-white hover:border-gray-300"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="claiming"
                                            checked={selected}
                                            onChange={() => onUpdate({ claiming: option.value as ClaimingMethod })}
                                            className="mt-1 h-4 w-4 shrink-0 accent-[#2563eb]"
                                        />
                                        <span
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                                selected ? "bg-green-700 text-white" : "bg-gray-100 text-gray-500"
                                            }`}
                                        >
                                            <option.icon className="h-[18px] w-[18px]" />
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="flex flex-wrap items-center gap-2">
                                                <span className="text-sm font-semibold text-gray-900">{option.title}</span>
                                                {option.badge && (
                                                    <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[11px] font-medium text-amber-700">
                                                        {option.badge}
                                                    </span>
                                                )}
                                            </span>
                                            <span className="mt-0.5 block text-xs text-gray-500">{option.subtitle}</span>
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Authorized Representative — extra details (amber panel) */}
                    {form.claiming === "representative" && (
                        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <FieldLabel required>Representative's Full Name</FieldLabel>
                                    <div className="relative">
                                        <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            value={form.repName}
                                            onChange={(e) => onUpdate({ repName: e.target.value })}
                                            placeholder="Maria Santos Cruz"
                                            className={inputClass(true, errors.repName)}
                                        />
                                    </div>
                                    <FieldError message={errors.repName} />
                                </div>
                                <div>
                                    <FieldLabel required>Representative's Contact No.</FieldLabel>
                                    <div className="relative">
                                        <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="tel"
                                            value={form.repContact}
                                            onChange={(e) => onUpdate({ repContact: e.target.value })}
                                            placeholder="0917 123 4567"
                                            className={inputClass(true, errors.repContact)}
                                        />
                                    </div>
                                    <FieldError message={errors.repContact} />
                                </div>
                            </div>
                            <p className="mt-3 text-xs text-amber-800">
                                Your representative must bring a valid ID, an authorization letter, and your
                                tracking code when claiming the document.
                            </p>
                        </div>
                    )}

                    {/* Home Delivery — info notice (green panel) */}
                    {form.claiming === "delivery" && (
                        <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
                            <Truck className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                            <div>
                                <p className="text-sm font-bold text-green-800">Home Delivery Selected</p>
                                <p className="mt-1 text-xs leading-relaxed text-gray-600">
                                    A barangay worker will deliver your certificate to your address
                                    {form.house.trim() ? ` (${form.house.trim()}, Tumana, Marikina City)` : ""}. A
                                    delivery fee of{" "}
                                    <span className="font-semibold text-gray-900">Php {DELIVERY_FEE}.00</span> will
                                    be added to your total. Payment is required{" "}
                                    <span className="font-semibold text-gray-900">before</span> processing — you
                                    will select a payment method in the next step.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Privacy & Data Processing Consent */}
                <div className="mt-6 space-y-4">
                    <SectionHeader
                        icon={Lock}
                        title="Privacy & Data Processing Consent"
                        subtitle="Please review and accept before continuing."
                    />
                    <label className="flex cursor-pointer items-start gap-3">
                        <input
                            type="checkbox"
                            checked={form.consent}
                            onChange={(e) => onUpdate({ consent: e.target.checked })}
                            className="mt-0.5 h-4 w-4 shrink-0 accent-[#2563eb]"
                        />
                        <span className="text-xs leading-relaxed text-gray-600 sm:text-[13px]">
                            I certify that the information provided is true and correct. I understand that this
                            information will be used solely for processing my certificate request and will be handled
                            in accordance with the Data Privacy Act of 2012 (RA 10173). I authorize Barangay Tumana to
                            contact me via my preferred notification method regarding my request.
                        </span>
                    </label>
                    <FieldError message={errors.consent} />
                </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 sm:w-auto"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </button>
                <button
                    type="button"
                    onClick={onNext}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 sm:w-auto"
                >
                    Next
                    <ArrowRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

/* ------------------------------------------------------------------ */
/* Step 3 — Review & Submit                                            */
/* ------------------------------------------------------------------ */

interface Step3Props {
    form: FormState;
    pickupDates: Date[];
    selectedDate: string;
    dateError?: string;
    onSelectDate: (iso: string) => void;
    onBack: () => void;
    onSubmit: () => void;
}

const Step3ReviewSubmit = ({
    form,
    pickupDates,
    selectedDate,
    dateError,
    onSelectDate,
    onBack,
    onSubmit,
}: Step3Props) => {
    const cert = getCertificate(form.certificateId);
    const isDelivery = form.claiming === "delivery";
    const deliveryFee = isDelivery ? DELIVERY_FEE : 0;
    const total = cert.fee + deliveryFee;
    const selectedDateObj = pickupDates.find((date) => toIsoDate(date) === selectedDate);

    const reviewRows: { label: string; value: string }[] = [
        { label: "Certificate Type", value: cert.title },
        {
            label: "Applicant Name",
            value: [form.firstName, form.middleName, form.lastName].filter(Boolean).join(" ").toUpperCase(),
        },
        { label: "Mobile Number", value: form.mobile },
        { label: "Email", value: form.email || "—" },
        {
            label: "Address",
            value: `${form.house}, ${form.purok}, Tumana, Marikina City`,
        },
        { label: "Purpose", value: form.purpose },
        { label: "Notification", value: NOTIFICATION_LABELS[form.notification] },
        { label: "Claiming Method", value: CLAIMING_LABELS[form.claiming] },
    ];

    if (form.claiming === "representative") {
        reviewRows.push({
            label: "Representative",
            value: `${form.repName} (${form.repContact})`,
        });
    }

    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Review &amp; Submit</h1>
            <p className="mt-1 text-sm text-gray-500">Review your request details and submit.</p>

            <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Review card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs sm:p-6 lg:col-span-2 lg:p-7">
                    <h2 className="text-base font-bold text-gray-900">Review Your Request</h2>
                    <p className="mt-0.5 text-xs text-gray-500">
                        Please confirm the details below before submitting.
                    </p>

                    <dl className="mt-4 divide-y divide-gray-100">
                        {reviewRows.map((row) => (
                            <div key={row.label} className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                                <dt className="text-xs text-gray-500 sm:text-sm">{row.label}</dt>
                                <dd className="text-sm font-semibold text-gray-900 sm:text-right">{row.value}</dd>
                            </div>
                        ))}
                    </dl>

                    <div className="mt-4 flex items-center justify-between gap-4 border-t border-gray-100 pt-4">
                        <span className="text-sm font-semibold text-gray-900">Total Fee</span>
                        <span className="text-xl font-bold text-green-700">Php {total.toFixed(2)}</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-400">
                        {form.claiming === "delivery"
                            ? "Payment will be collected upon delivery at your address."
                            : "Payment will be collected at the Barangay Hall during pickup."}
                    </p>

                    {/* Schedule Your Pickup */}
                    <div className="mt-6 border-t border-gray-100 pt-5">
                        <div className="flex items-start gap-2.5">
                            <Calendar className="mt-0.5 h-[18px] w-[18px] shrink-0 text-green-700" />
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">
                                    {isDelivery ? "Schedule Your Delivery" : "Schedule Your Pickup"}
                                </h3>
                                <p className="text-xs text-gray-500">
                                    {isDelivery
                                        ? "Choose a preferred date for a barangay worker to deliver your certificate to your address. Delivery hours: 8:00 AM - 5:00 PM."
                                        : "Choose a preferred date to claim your certificate at the Barangay Hall. Office hours: 8:00 AM - 5:00 PM."}
                                </p>
                            </div>
                        </div>

                        {/* Date cards: stacked on mobile, 3 columns on sm+ */}
                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                            {pickupDates.map((date) => {
                                const iso = toIsoDate(date);
                                const selected = iso === selectedDate;
                                return (
                                    <button
                                        key={iso}
                                        type="button"
                                        onClick={() => onSelectDate(iso)}
                                        className={`flex flex-col items-center gap-1.5 rounded-xl border px-4 py-4 text-center transition ${
                                            selected
                                                ? "border-green-600 bg-green-50"
                                                : "border-gray-200 bg-white hover:border-gray-300"
                                        }`}
                                    >
                                        <span
                                            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                                selected ? "bg-green-700 text-white" : "bg-gray-100 text-gray-500"
                                            }`}
                                        >
                                            <Calendar className="h-[18px] w-[18px]" />
                                        </span>
                                        <span className="text-sm font-bold text-gray-900">{toShortDate(date)}</span>
                                        <span className="text-xs text-gray-500">8 AM - 5 PM</span>
                                    </button>
                                );
                            })}
                        </div>

                        {dateError ? (
                            <p className="mt-2 text-xs text-red-500">{dateError}</p>
                        ) : selectedDateObj ? (
                            <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-green-100 bg-green-50 p-3.5">
                                <Info className="mt-0.5 h-4 w-4 shrink-0 text-green-700" />
                                <p className="text-xs leading-relaxed text-gray-600">
                                    <span className="font-semibold text-gray-900">
                                        Selected: {toLongDate(selectedDateObj)}.{" "}
                                    </span>
                                    {isDelivery
                                        ? "A barangay worker will deliver your certificate to your address between 8:00 AM and 5:00 PM."
                                        : "Please visit the Barangay Hall between 8:00 AM and 5:00 PM with a valid ID and your tracking code."}
                                </p>
                            </div>
                        ) : null}
                    </div>

                </div>

                {/* Fee Summary — stacks below the review card on mobile, side column on lg+ */}
                <aside className="h-fit overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs">
                    <div className="bg-[#14532d] px-5 py-3.5">
                        <h2 className="text-sm font-bold text-white">Fee Summary</h2>
                    </div>
                    <div className="space-y-3 p-5">
                        <div className="flex items-center justify-between gap-3 text-sm">
                            <span className="text-gray-500">Certificate Fee</span>
                            <span className="font-semibold text-gray-900">
                                {cert.fee > 0 ? `Php ${cert.fee.toFixed(2)}` : "Free"}
                            </span>
                        </div>
                        <div className="flex items-center justify-between gap-3 text-sm">
                            <span className="text-gray-500">Delivery Fee</span>
                            <span className="font-semibold text-gray-900">
                                {deliveryFee > 0 ? `Php ${deliveryFee.toFixed(2)}` : "—"}
                            </span>
                        </div>
                        <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-3">
                            <span className="text-sm font-semibold text-gray-900">Total</span>
                            <span className="text-xl font-bold text-green-700">Php {total.toFixed(2)}</span>
                        </div>

                        {/* Preferred pickup / delivery summary */}
                        <div className="flex items-start gap-2.5 rounded-lg bg-green-50 p-3.5">
                            <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-green-700" />
                            <div>
                                <p className="text-xs font-bold text-gray-900">
                                    {selectedDateObj
                                        ? toLongDate(selectedDateObj)
                                        : isDelivery
                                          ? "No delivery date selected"
                                          : "No pickup date selected"}
                                </p>
                                <p className="mt-0.5 text-[11px] text-gray-500">
                                    {isDelivery
                                        ? "Delivery to your address, 8:00 AM - 5:00 PM"
                                        : "Barangay Hall, 8:00 AM - 5:00 PM"}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onSubmit}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                        >
                            <Send className="h-4 w-4" />
                            Submit Request
                        </button>
                        <button
                            type="button"
                            onClick={onBack}
                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Details
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

/* ------------------------------------------------------------------ */
/* Success Screen                                                      */
/* ------------------------------------------------------------------ */

interface SuccessScreenProps {
    trackingCode: string;
    onNewRequest: () => void;
}

const SuccessScreen = ({ trackingCode, onNewRequest }: SuccessScreenProps) => {
    const navigate = useNavigate();

    return (
        <div className="mx-auto w-full max-w-xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
                <Check className="h-8 w-8" />
            </span>
            <h1 className="mt-5 text-2xl font-bold text-gray-900 sm:text-3xl">Request Submitted!</h1>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Your certificate request has been received. Keep your tracking code to monitor the status of
                your request.
            </p>
            <div className="mt-6 rounded-xl border border-dashed border-green-300 bg-green-50 px-5 py-4">
                <p className="text-xs uppercase tracking-wider text-gray-500">Tracking Code</p>
                <p className="mt-1 font-mono text-lg font-bold tracking-wider text-green-800 sm:text-2xl">
                    {trackingCode}
                </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                >
                    Back to Home
                </button>
                <button
                    type="button"
                    onClick={onNewRequest}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                    Submit Another Request
                </button>
            </div>
        </div>
    );
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const RequestDocuments = () => {
    const [searchParams] = useSearchParams();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState<FormState>(() => ({
        certificateId: mapTypeParam(searchParams.get("type")) ?? "cedula",
        firstName: "",
        middleName: "",
        lastName: "",
        mobile: "",
        email: "",
        house: "",
        purok: "",
        purpose: "",
        notification: "sms",
        claiming: "pickup",
        repName: "",
        repContact: "",
        consent: false,
    }));
    const [errors, setErrors] = useState<FormErrors>({});
    const [pickupDates] = useState(() => getNextWeekdays(3));
    const [selectedDate, setSelectedDate] = useState("");
    const [dateError, setDateError] = useState<string | undefined>(undefined);
    const [trackingCode, setTrackingCode] = useState<string | null>(null);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    /** Update form fields and clear any error for the touched fields. */
    const update = (patch: Partial<FormState>) => {
        setForm((prev) => ({ ...prev, ...patch }));
        setErrors((prev) => {
            const next = { ...prev };
            (Object.keys(patch) as (keyof FormState)[]).forEach((key) => delete next[key]);
            // Leaving the representative claiming method clears its related field errors
            if (patch.claiming && patch.claiming !== "representative") {
                delete next.repName;
                delete next.repContact;
            }
            return next;
        });
    };

    const validateStep2 = (): FormErrors => {
        const next: FormErrors = {};
        if (!form.firstName.trim()) next.firstName = "First name is required.";
        if (!form.lastName.trim()) next.lastName = "Last name is required.";
        const mobile = form.mobile.replace(/[\s-]/g, "");
        if (!mobile) next.mobile = "Mobile number is required.";
        else if (!/^(\+63|0)9\d{9}$/.test(mobile)) next.mobile = "Enter a valid Philippine mobile number.";
        if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
            next.email = "Enter a valid email address.";
        if (form.notification === "email" && !form.email.trim())
            next.email = "Email is required for email updates.";
        if (!form.house.trim()) next.house = "House no. & street is required.";
        if (!form.purok) next.purok = "Please select your purok / sitio.";
        if (!form.purpose) next.purpose = "Please select a purpose.";
        if (form.claiming === "representative") {
            if (!form.repName.trim()) next.repName = "Representative's full name is required.";
            const repContact = form.repContact.replace(/[\s-]/g, "");
            if (!repContact) next.repContact = "Representative's contact number is required.";
            else if (!/^(\+63|0)9\d{9}$/.test(repContact))
                next.repContact = "Enter a valid Philippine mobile number.";
        }
        if (!form.consent) next.consent = "Please accept the privacy consent to continue.";
        return next;
    };

    const handleNextFromStep1 = () => {
        setStep(2);
        scrollToTop();
    };

    const handleNextFromStep2 = () => {
        const next = validateStep2();
        setErrors(next);
        if (Object.keys(next).length === 0) {
            setDateError(undefined);
            setStep(3);
            scrollToTop();
        }
    };

    const handleBackToStep = (target: number) => () => {
        setStep(target);
        scrollToTop();
    };

    const handleSelectDate = (iso: string) => {
        setSelectedDate(iso);
        setDateError(undefined);
    };

    const handleSubmit = () => {
        if (!selectedDate) {
            setDateError(
                form.claiming === "delivery"
                    ? "Please select a preferred delivery date."
                    : "Please select a preferred pickup date.",
            );
            return;
        }
        setTrackingCode(`TUM-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`);
        scrollToTop();
    };

    const handleNewRequest = () => {
        setForm((prev) => ({
            certificateId: prev.certificateId,
            firstName: "",
            middleName: "",
            lastName: "",
            mobile: "",
            email: "",
            house: "",
            purok: "",
            purpose: "",
            notification: "sms",
            claiming: "pickup",
            repName: "",
            repContact: "",
            consent: false,
        }));
        setErrors({});
        setSelectedDate("");
        setDateError(undefined);
        setTrackingCode(null);
        setStep(1);
        scrollToTop();
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa]">
            <Navbar />

            {trackingCode ? (
                <SuccessScreen trackingCode={trackingCode} onNewRequest={handleNewRequest} />
            ) : (
                <>
                    {step === 1 && <HeroHeader />}

                    {/* Timeline/stepper — visible on every step; connectors turn green as steps are reached */}
                    <Stepper current={step - 1} />

                    {step === 1 && (
                        <Step1CertificateType
                            selectedId={form.certificateId}
                            onSelect={(id) => update({ certificateId: id })}
                            onNext={handleNextFromStep1}
                        />
                    )}

                    {step === 2 && (
                        <Step2ApplicationDetails
                            form={form}
                            errors={errors}
                            onUpdate={update}
                            onBack={handleBackToStep(1)}
                            onNext={handleNextFromStep2}
                        />
                    )}

                    {step === 3 && (
                        <Step3ReviewSubmit
                            form={form}
                            pickupDates={pickupDates}
                            selectedDate={selectedDate}
                            dateError={dateError}
                            onSelectDate={handleSelectDate}
                            onBack={handleBackToStep(2)}
                            onSubmit={handleSubmit}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default RequestDocuments;
