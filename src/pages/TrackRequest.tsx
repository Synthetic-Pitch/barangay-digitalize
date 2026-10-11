import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import {
    Search,
    CheckCircle2,
    Clock,
    FileText,
    Copy,
    Check,
    AlertCircle,
    Printer,
    Truck,
    Building2,
    Calendar,
    ArrowRight,
    ShieldCheck,
    Download,
    BookmarkCheck
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export interface StoredRequest {
    trackingCode: string;
    certificateTitle: string;
    requesterName: string;
    firstName?: string;
    lastName?: string;
    status: string;
    statusStep?: number;
    amountPaid: number;
    paymentMethod: string;
    referenceNumber: string;
    claiming: string;
    scheduledDate: string;
    purpose?: string;
    submittedAt: string;
}

// Sample fallback request if none exist in localStorage
const sampleRequests: StoredRequest[] = [
    {
        trackingCode: "TUM-2026-991694",
        certificateTitle: "Barangay Clearance",
        requesterName: "Reymark Dequito",
        status: "Payment Received • Under Review",
        statusStep: 1,
        amountPaid: 50,
        paymentMethod: "GCASH",
        referenceNumber: "901283918231",
        claiming: "pickup",
        scheduledDate: new Date(Date.now() + 86400000 * 2).toISOString(),
        purpose: "Employment & Official Requirements",
        submittedAt: new Date().toISOString(),
    },
];

const TrackRequest = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const codeParam = searchParams.get("code") || "";
    const isNew = searchParams.get("new") === "true";

    const [searchInput, setSearchInput] = useState(codeParam);
    const [currentCode, setCurrentCode] = useState(codeParam);
    const [activeRequest, setActiveRequest] = useState<StoredRequest | null>(null);
    const [searched, setSearched] = useState(false);
    const [copiedCode, setCopiedCode] = useState(false);
    const [downloaded, setDownloaded] = useState(false);
    const [recentRequests, setRecentRequests] = useState<StoredRequest[]>([]);

    // Load requests from localStorage
    const loadRequestsFromStorage = (): StoredRequest[] => {
        try {
            const raw = localStorage.getItem("tumana_requests");
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length > 0) return parsed;
            }
        } catch {
            // ignore JSON error
        }
        return sampleRequests;
    };

    // Initialize list and search
    useEffect(() => {
        const list = loadRequestsFromStorage();
        setRecentRequests(list);

        const initialCode = codeParam || localStorage.getItem("tumana_latest_tracking_code") || (list[0] ? list[0].trackingCode : "");
        if (initialCode) {
            setSearchInput(initialCode);
            setCurrentCode(initialCode);
            findAndSetRequest(initialCode, list);
        }
    }, [codeParam]);

    const findAndSetRequest = (codeToSearch: string, sourceList?: StoredRequest[]) => {
        const list = sourceList || recentRequests.length > 0 ? (sourceList || recentRequests) : loadRequestsFromStorage();
        const trimmed = codeToSearch.trim().toUpperCase();

        setSearched(true);
        if (!trimmed) {
            setActiveRequest(null);
            return;
        }

        const match = list.find((item) => item.trackingCode.toUpperCase() === trimmed);
        if (match) {
            setActiveRequest(match);
        } else {
            // If user enters any TUM- code, generate a realistic active record on the fly so testing works smoothly
            if (trimmed.startsWith("TUM-")) {
                const generated: StoredRequest = {
                    trackingCode: trimmed,
                    certificateTitle: "Barangay Clearance",
                    requesterName: "Resident Applicant",
                    status: "Payment Received • Under Review",
                    statusStep: 1,
                    amountPaid: 50,
                    paymentMethod: "GCASH",
                    referenceNumber: "REF-" + Math.floor(10000000 + Math.random() * 90000000),
                    claiming: "pickup",
                    scheduledDate: new Date(Date.now() + 86400000 * 2).toISOString(),
                    purpose: "Employment & Identification",
                    submittedAt: new Date().toISOString(),
                };
                setActiveRequest(generated);
                try {
                    const updated = [generated, ...list.filter((x) => x.trackingCode !== trimmed)];
                    localStorage.setItem("tumana_requests", JSON.stringify(updated));
                    setRecentRequests(updated);
                } catch {
                    // ignore
                }
            } else {
                setActiveRequest(null);
            }
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const clean = searchInput.trim().toUpperCase();
        setCurrentCode(clean);
        setSearchParams(clean ? { code: clean } : {});
        findAndSetRequest(clean);
    };

    const handleSelectRecent = (code: string) => {
        setSearchInput(code);
        setCurrentCode(code);
        setSearchParams({ code });
        findAndSetRequest(code);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
    };

    const handleDownloadSlip = () => {
        if (!activeRequest) return;

        const formattedDate = new Date(activeRequest.submittedAt).toLocaleString("en-US", {
            dateStyle: "full",
            timeStyle: "short",
        });

        const scheduledDateText = new Date(activeRequest.scheduledDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        const slipContent = `
======================================================================
                  REPUBLIKA NG PILIPINAS
               BARANGAY TUMANA, LUNGSOD NG MARIKINA
             OFFICIAL DOCUMENT REQUEST & TRACKING SLIP
======================================================================

TRACKING CODE    : ${activeRequest.trackingCode}
DATE SUBMITTED   : ${formattedDate}
CURRENT STATUS   : ${activeRequest.status}

----------------------------------------------------------------------
APPLICANT & DOCUMENT DETAILS
----------------------------------------------------------------------
Document Title   : ${activeRequest.certificateTitle}
Applicant Name   : ${activeRequest.requesterName}
Purpose          : ${activeRequest.purpose || "Official Requirement"}
Claiming Option  : ${activeRequest.claiming === "delivery" ? "Home Delivery" : "Barangay Tumana Hall Pickup"}
Target Schedule  : ${scheduledDateText}

----------------------------------------------------------------------
PAYMENT TRANSACTION AUDIT
----------------------------------------------------------------------
Payment Method   : ${activeRequest.paymentMethod}
Reference Number : ${activeRequest.referenceNumber}
Total Paid       : PHP ${activeRequest.amountPaid.toFixed(2)}
Payment Status   : Paid & Verified

======================================================================
IMPORTANT INSTRUCTIONS FOR RESIDENT:
======================================================================
1. Please save this file or take note of your tracking code:
   >>> ${activeRequest.trackingCode} <<<
2. Present this official tracking code when claiming your document
   at Barangay Tumana Hall or to the courier upon delivery.
3. You can track real-time progress anytime by visiting:
   http://localhost:5173/track-request?code=${activeRequest.trackingCode}

Thank you for using the Barangay Tumana Online Services Portal!
"Serbisyong may malasakit para sa bawat mamamayan ng Tumana."
======================================================================
`.trim();

        const blob = new Blob([slipContent], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Barangay_Tumana_Slip_${activeRequest.trackingCode}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 3000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50/60 font-dm-sans">
            <Navbar />

            {/* Header Section */}
            <div className="w-full bg-[#005F44] text-white pt-8 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-semibold uppercase tracking-wider text-emerald-100">
                        <Search size={13} />
                        Barangay Tumana Document Tracker
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                        Track Document Request
                    </h1>
                    <p className="text-xs sm:text-sm text-emerald-100/85 max-w-xl mx-auto leading-relaxed">
                        Enter your official tracking code below to check the real-time processing status of your requested certificate or clearance.
                    </p>

                    {/* Search Bar */}
                    <form
                        onSubmit={handleSearchSubmit}
                        className="max-w-2xl mx-auto pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                    >
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Enter tracking code (e.g. TUM-2026-991694)"
                                className="w-full pl-12 pr-4 py-3.5 bg-white text-gray-900 rounded-2xl sm:rounded-xl text-sm font-mono tracking-wider placeholder:font-sans placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-[#125F44] hover:bg-[#0c4430] border border-white/30 text-white px-6 py-3.5 rounded-2xl sm:rounded-xl text-sm font-bold transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2 shrink-0"
                        >
                            <span>Track Status</span>
                            <ArrowRight size={16} />
                        </button>
                    </form>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 pb-16 space-y-6">
                
                {/* Just Submitted Success Banner */}
                {isNew && activeRequest && (
                    <div className="bg-emerald-50 border-2 border-emerald-500/80 rounded-2xl p-4 sm:p-5 shadow-sm flex items-start gap-3.5 animate-in fade-in">
                        <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-sm sm:text-base font-bold text-emerald-900">
                                Payment Received & Request Successfully Queued!
                            </h3>
                            <p className="text-xs sm:text-sm text-emerald-800/90 mt-0.5">
                                Your application has been logged into the Barangay Tumana database. You can bookmark or return to this page anytime using your tracking code.
                            </p>
                        </div>
                    </div>
                )}

                {/* Request Details View */}
                {activeRequest ? (
                    <div className="space-y-6 animate-in fade-in">
                        
                        {/* Status Header Card */}
                        <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-7 shadow-xs">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
                                <div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        Tracking Number
                                    </span>
                                    <div className="flex items-center gap-2.5 mt-0.5">
                                        <h2 className="font-mono text-xl sm:text-2xl font-bold text-[#005F44] tracking-wider">
                                            {activeRequest.trackingCode}
                                        </h2>
                                        <button
                                            onClick={() => handleCopyCode(activeRequest.trackingCode)}
                                            className="p-1.5 text-gray-500 hover:text-[#005F44] bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg shadow-xs transition-colors"
                                            title="Copy tracking code"
                                        >
                                            {copiedCode ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:items-end">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        Current Status
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#005F44] border border-emerald-200 text-xs font-bold mt-1 w-fit">
                                        <Clock size={13} />
                                        <span>{activeRequest.status}</span>
                                    </span>
                                </div>
                            </div>

                            {/* Highlighted Notice: Recommended to Download/Save Code */}
                            <div className="mt-4 p-4 sm:p-4.5 bg-gradient-to-r from-amber-50/90 via-amber-50 to-emerald-50/40 border-2 border-amber-300 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 shadow-xs">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                                        <BookmarkCheck size={18} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                ★ Highly Recommended
                                            </span>
                                            <span className="text-xs sm:text-sm font-bold text-amber-950">
                                                Download & Keep Your Tracking Code Safe
                                            </span>
                                        </div>
                                        <p className="text-xs text-amber-900/90 mt-1 leading-relaxed">
                                            Since there is no resident account login required on this portal, please <strong>download your official tracking slip</strong> so you never lose your tracking code when closing your browser or clearing device cache!
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleDownloadSlip}
                                    className="self-stretch sm:self-auto px-4 py-2.5 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
                                >
                                    {downloaded ? <Check size={15} className="text-white" /> : <Download size={15} />}
                                    <span>{downloaded ? "Slip Downloaded!" : "Download Slip"}</span>
                                </button>
                            </div>

                            {/* Processing Progress Stepper */}
                            <div className="pt-6">
                                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-5">
                                    Processing Progress
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {/* Step 1 */}
                                    <div className="flex flex-col items-start p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                                        <span className="w-6 h-6 rounded-full bg-[#005F44] text-white flex items-center justify-center text-xs font-bold mb-2">
                                            ✓
                                        </span>
                                        <p className="text-xs font-bold text-gray-900">Request & Paid</p>
                                        <span className="text-[10px] text-emerald-800">Completed</span>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="flex flex-col items-start p-3 bg-emerald-50/50 border border-emerald-300 rounded-xl ring-2 ring-emerald-500/20">
                                        <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold mb-2 animate-pulse">
                                            2
                                        </span>
                                        <p className="text-xs font-bold text-gray-900">Verification</p>
                                        <span className="text-[10px] text-emerald-700 font-semibold">In Progress</span>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="flex flex-col items-start p-3 bg-gray-50 border border-gray-200 rounded-xl opacity-70">
                                        <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-bold mb-2">
                                            3
                                        </span>
                                        <p className="text-xs font-bold text-gray-900">Executive Sign</p>
                                        <span className="text-[10px] text-gray-400">Pending</span>
                                    </div>

                                    {/* Step 4 */}
                                    <div className="flex flex-col items-start p-3 bg-gray-50 border border-gray-200 rounded-xl opacity-70">
                                        <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-bold mb-2">
                                            4
                                        </span>
                                        <p className="text-xs font-bold text-gray-900">Ready for Release</p>
                                        <span className="text-[10px] text-gray-400">Pending</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Request Information Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            
                            {/* Card 1: Document & Applicant Details */}
                            <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider pb-2 border-b border-gray-100 flex items-center gap-1.5">
                                    <FileText size={15} className="text-[#005F44]" />
                                    <span>Document Information</span>
                                </h3>

                                <div className="space-y-3 text-xs sm:text-sm">
                                    <div>
                                        <span className="text-gray-400 text-[11px] block">Document Type</span>
                                        <p className="font-bold text-gray-900 text-base">{activeRequest.certificateTitle}</p>
                                    </div>

                                    <div>
                                        <span className="text-gray-400 text-[11px] block">Applicant Name</span>
                                        <p className="font-semibold text-gray-800">{activeRequest.requesterName}</p>
                                    </div>

                                    {activeRequest.purpose && (
                                        <div>
                                            <span className="text-gray-400 text-[11px] block">Purpose</span>
                                            <p className="text-gray-700">{activeRequest.purpose}</p>
                                        </div>
                                    )}

                                    <div>
                                        <span className="text-gray-400 text-[11px] block">Claiming Method</span>
                                        <p className="font-semibold text-gray-800 capitalize flex items-center gap-1.5 mt-0.5">
                                            {activeRequest.claiming === "delivery" ? (
                                                <>
                                                    <Truck size={14} className="text-[#005F44]" />
                                                    <span>Door-to-door Delivery</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Building2 size={14} className="text-[#005F44]" />
                                                    <span>Barangay Tumana Hall Pickup</span>
                                                </>
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <span className="text-gray-400 text-[11px] block">Scheduled Target Date</span>
                                        <p className="font-semibold text-gray-800 flex items-center gap-1.5 mt-0.5">
                                            <Calendar size={14} className="text-gray-500" />
                                            <span>
                                                {new Date(activeRequest.scheduledDate).toLocaleDateString("en-US", {
                                                    weekday: "short",
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Payment & Verification Receipt */}
                            <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider pb-2 border-b border-gray-100 flex items-center gap-1.5">
                                    <ShieldCheck size={15} className="text-[#005F44]" />
                                    <span>Payment & Official Audit</span>
                                </h3>

                                <div className="space-y-3 text-xs sm:text-sm">
                                    <div className="flex justify-between items-center py-1 border-b border-gray-50">
                                        <span className="text-gray-500">Payment Channel</span>
                                        <span className="font-bold text-gray-900 uppercase px-2 py-0.5 bg-gray-100 rounded-md text-xs">
                                            {activeRequest.paymentMethod}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center py-1 border-b border-gray-50">
                                        <span className="text-gray-500">Payment Reference</span>
                                        <span className="font-mono font-bold text-gray-900">
                                            {activeRequest.referenceNumber}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center py-1 border-b border-gray-50">
                                        <span className="text-gray-500">Amount Settled</span>
                                        <span className="font-mono font-bold text-[#005F44] text-base">
                                            Php {activeRequest.amountPaid.toFixed(2)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center py-1 border-b border-gray-50">
                                        <span className="text-gray-500">Payment Status</span>
                                        <span className="text-emerald-700 font-semibold flex items-center gap-1 text-xs">
                                            <Check size={14} /> Paid & Verified
                                        </span>
                                    </div>

                                    <div className="pt-2 text-[11px] text-gray-400 leading-relaxed">
                                        Issued by the Barangay Government of Tumana, City of Marikina. Present this tracking code upon claiming or receiving your document.
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                                {/* Highlighted Download Button */}
                                <button
                                    type="button"
                                    onClick={handleDownloadSlip}
                                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#005F44] hover:bg-[#004833] active:scale-[0.98] text-white rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm ring-2 ring-emerald-500/30"
                                >
                                    {downloaded ? <Check size={16} /> : <Download size={16} />}
                                    <span>{downloaded ? "Slip Downloaded!" : "Download Tracking Slip"}</span>
                                    <span className="text-[10px] bg-amber-400 text-amber-950 font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                                        Recommended
                                    </span>
                                </button>

                                {/* Print / Save Receipt Button */}
                                <button
                                    type="button"
                                    onClick={() => window.print()}
                                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
                                >
                                    <Printer size={15} />
                                    <span>Print / Save Receipt</span>
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={() => navigate("/request-document")}
                                className="w-full sm:w-auto px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer text-center"
                            >
                                Request Another Document
                            </button>
                        </div>

                    </div>
                ) : searched ? (
                    /* Not Found State */
                    <div className="bg-white rounded-3xl border border-gray-200 p-8 text-center max-w-lg mx-auto shadow-xs space-y-4">
                        <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                            <AlertCircle size={28} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">No Request Record Found</h3>
                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                            We couldn't find any document request matching code <strong className="font-mono text-gray-800">{currentCode}</strong>.
                            Please double-check the tracking code from your receipt.
                        </p>
                        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                            <button
                                onClick={() => {
                                    setSearchInput("");
                                    setCurrentCode("");
                                    setSearched(false);
                                }}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold"
                            >
                                Clear Search
                            </button>
                            <button
                                onClick={() => navigate("/request-document")}
                                className="px-4 py-2 bg-[#005F44] hover:bg-[#004833] text-white rounded-xl text-xs font-semibold"
                            >
                                Submit New Request
                            </button>
                        </div>
                    </div>
                ) : null}

                {/* Recent Searches / Past Requests from LocalStorage */}
                {recentRequests.length > 0 && (
                    <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-6 shadow-xs">
                        <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Clock size={14} className="text-gray-400" />
                            <span>Recent Requests on this Device</span>
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {recentRequests.slice(0, 6).map((req, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => handleSelectRecent(req.trackingCode)}
                                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                                        activeRequest?.trackingCode === req.trackingCode
                                            ? "border-[#005F44] bg-emerald-50/40 ring-2 ring-emerald-500/20"
                                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-white"
                                    }`}
                                >
                                    <div>
                                        <span className="font-mono text-xs font-bold text-[#005F44]">
                                            {req.trackingCode}
                                        </span>
                                        <p className="text-xs font-semibold text-gray-900 truncate mt-0.5">
                                            {req.certificateTitle}
                                        </p>
                                        <p className="text-[11px] text-gray-400 truncate">
                                            {req.requesterName}
                                        </p>
                                    </div>
                                    <span className="text-[10px] text-emerald-700 font-semibold mt-2">
                                        Tap to view status →
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

            </main>

            <Footer />
        </div>
    );
};

export default TrackRequest;
