import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
    ArrowLeft,
    Check,
    Copy,
    CreditCard,
    Building2,
    ShieldCheck,
    Upload,
    Clock,
    FileText,
    QrCode,
    AlertCircle,
    MapPin,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type PaymentMethod = "gcash" | "maya" | "bank";

interface OrderData {
    certificateId?: string;
    certificateTitle?: string;
    certificateFee?: number;
    deliveryFee?: number;
    totalAmount?: number;
    claiming?: string;
    selectedDate?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    mobile?: string;
    email?: string;
    house?: string;
    purok?: string;
    purpose?: string;
    notification?: string;
    repName?: string;
    repContact?: string;
}

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Retrieve order data from location.state or sessionStorage fallback
    const [order] = useState<OrderData>(() => {
        const stateData = location.state as OrderData | null;
        if (stateData && stateData.certificateTitle) return stateData;

        try {
            const saved = sessionStorage.getItem("tumana_pending_payment");
            if (saved) return JSON.parse(saved);
        } catch {
            // ignore JSON error
        }

        // Fallback default if visited directly
        return {
            certificateTitle: "Barangay Clearance",
            certificateFee: 50,
            deliveryFee: 0,
            totalAmount: 50,
            claiming: "pickup",
            firstName: "Resident",
            lastName: "Applicant",
            purpose: "Official / Employment Use",
            selectedDate: new Date().toISOString(),
        };
    });

    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("gcash");
    const [referenceNumber, setReferenceNumber] = useState("");
    const [uploadedReceipt, setUploadedReceipt] = useState<string | null>(null);
    const [copiedAccount, setCopiedAccount] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const totalDue = order.totalAmount ?? (order.certificateFee ?? 50) + (order.deliveryFee ?? 0);
    const fullName = [order.firstName, order.middleName, order.lastName].filter(Boolean).join(" ") || "Resident Applicant";

    // Copy account number helper
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedAccount(true);
        setTimeout(() => setCopiedAccount(false), 2000);
    };

    // Handle receipt image upload preview
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedReceipt(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle final payment submission
    const handleConfirmPayment = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        if (!referenceNumber.trim()) {
            setErrorMessage("Please enter your transaction reference number to verify payment.");
            return;
        }

        if (referenceNumber.trim().length < 6) {
            setErrorMessage("Reference number seems too short. Please verify the code on your receipt.");
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            const newTracking = `TUM-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

            try {
                const existing = JSON.parse(localStorage.getItem("tumana_requests") || "[]");
                const newRecord = {
                    trackingCode: newTracking,
                    certificateTitle: order.certificateTitle || "Barangay Clearance",
                    requesterName: fullName,
                    status: "Payment Received • Under Review",
                    statusStep: 1,
                    amountPaid: totalDue,
                    paymentMethod: selectedMethod.toUpperCase(),
                    referenceNumber: referenceNumber.trim(),
                    claiming: order.claiming || "pickup",
                    scheduledDate: order.selectedDate || new Date().toISOString(),
                    purpose: order.purpose || "Official & Employment Requirements",
                    submittedAt: new Date().toISOString(),
                };
                localStorage.setItem("tumana_requests", JSON.stringify([newRecord, ...existing.filter((x: any) => x.trackingCode !== newTracking)]));
                localStorage.setItem("tumana_latest_tracking_code", newTracking);
                sessionStorage.removeItem("tumana_pending_payment");
            } catch {
                // ignore storage error
            }

            setIsSubmitting(false);
            navigate(`/track-request?code=${newTracking}&new=true`);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50/60 font-dm-sans">
            <Navbar />

            {/* Main Container */}
            <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                
                {/* Back Link */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate("/request-document")}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#005F44] hover:underline cursor-pointer"
                    >
                        <ArrowLeft size={16} />
                        <span>Back to Request Form</span>
                    </button>
                </div>

                {/* Header Banner */}
                <div className="mb-8">
                    <span className="text-[11px] font-bold text-[#005F44] uppercase tracking-wider bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full">
                        Step 4 of 4 • Payment Processing
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mt-2">
                        Choose Payment Method
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Settle the barangay fee using your preferred online payment channel to process your document.
                    </p>
                </div>

                        {/* Two Columns Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                            
                            {/* Left Column: Payment Methods & Instructions (2 Cols) */}
                            <div className="lg:col-span-2 space-y-6">
                                
                                {/* 1. Method Selector */}
                                <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs">
                                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                                        Select Payment Channel
                                    </h2>

                                    <div className="grid grid-cols-3 gap-3">
                                        {/* GCash */}
                                        <button
                                            type="button"
                                            onClick={() => setSelectedMethod("gcash")}
                                            className={`p-3.5 sm:p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer text-center relative ${
                                                selectedMethod === "gcash"
                                                    ? "border-blue-500 bg-blue-50/40 ring-2 ring-blue-400/30"
                                                    : "border-gray-200 hover:border-gray-300 bg-white"
                                            }`}
                                        >
                                            <div className="w-9 h-9 rounded-full bg-[#005ce6] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                                                G
                                            </div>
                                            <div>
                                                <p className="text-xs sm:text-sm font-bold text-gray-900">GCash</p>
                                                <span className="text-[10px] text-gray-500">e-Wallet</span>
                                            </div>
                                            {selectedMethod === "gcash" && (
                                                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500" />
                                            )}
                                        </button>

                                        {/* Maya */}
                                        <button
                                            type="button"
                                            onClick={() => setSelectedMethod("maya")}
                                            className={`p-3.5 sm:p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer text-center relative ${
                                                selectedMethod === "maya"
                                                    ? "border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-400/30"
                                                    : "border-gray-200 hover:border-gray-300 bg-white"
                                            }`}
                                        >
                                            <div className="w-9 h-9 rounded-full bg-black text-emerald-400 flex items-center justify-center font-bold text-xs shadow-xs">
                                                M
                                            </div>
                                            <div>
                                                <p className="text-xs sm:text-sm font-bold text-gray-900">Maya</p>
                                                <span className="text-[10px] text-gray-500">e-Wallet</span>
                                            </div>
                                            {selectedMethod === "maya" && (
                                                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500" />
                                            )}
                                        </button>

                                        {/* Bank Transfer */}
                                        <button
                                            type="button"
                                            onClick={() => setSelectedMethod("bank")}
                                            className={`p-3.5 sm:p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer text-center relative ${
                                                selectedMethod === "bank"
                                                    ? "border-indigo-500 bg-indigo-50/40 ring-2 ring-indigo-400/30"
                                                    : "border-gray-200 hover:border-gray-300 bg-white"
                                            }`}
                                        >
                                            <div className="w-9 h-9 rounded-full bg-indigo-700 text-white flex items-center justify-center shadow-xs">
                                                <Building2 size={16} />
                                            </div>
                                            <div>
                                                <p className="text-xs sm:text-sm font-bold text-gray-900">Bank</p>
                                                <span className="text-[10px] text-gray-500">Land Bank (LBP)</span>
                                            </div>
                                            {selectedMethod === "bank" && (
                                                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* 2. QR & Account Transfer Details */}
                                <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs space-y-5">
                                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                                        Payment Instructions
                                    </h2>

                                    {/* Channel Specific Box */}
                                    <div className="flex flex-col sm:flex-row items-center gap-6 p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-200">
                                        {/* Simulated QR Code Container */}
                                        <div className="flex flex-col items-center justify-center bg-white p-3 rounded-xl border border-gray-200 shadow-xs shrink-0 w-36 h-36">
                                            <div className="w-28 h-28 border-2 border-gray-800 rounded-lg flex flex-col items-center justify-center p-1 bg-white relative">
                                                <QrCode size={70} className="text-gray-800" />
                                                <span className="text-[8px] font-bold uppercase tracking-wider mt-0.5 text-[#005F44]">
                                                    {selectedMethod === "bank" ? "LBP PAY" : selectedMethod}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Account Info Details */}
                                        <div className="space-y-2 w-full text-left">
                                            <div>
                                                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                                                    Account Name
                                                </span>
                                                <p className="text-xs sm:text-sm font-bold text-gray-900">
                                                    {selectedMethod === "bank" 
                                                        ? "BARANGAY TUMANA GENERAL FUND" 
                                                        : "BARANGAY TUMANA TREASURY"}
                                                </p>
                                            </div>

                                            <div>
                                                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                                                    {selectedMethod === "bank" ? "Account Number" : `${selectedMethod.toUpperCase()} Mobile Number`}
                                                </span>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="font-mono text-base sm:text-lg font-bold text-[#005F44] tracking-wide">
                                                        {selectedMethod === "gcash" && "0917-839-2011"}
                                                        {selectedMethod === "maya" && "0928-412-8823"}
                                                        {selectedMethod === "bank" && "0122-3456-78"}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const num = selectedMethod === "gcash" ? "09178392011" : selectedMethod === "maya" ? "09284128823" : "0122345678";
                                                            handleCopy(num);
                                                        }}
                                                        className="px-2 py-1 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-100 flex items-center gap-1 shadow-xs cursor-pointer"
                                                    >
                                                        {copiedAccount ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                                                        <span>{copiedAccount ? "Copied" : "Copy"}</span>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="text-[11px] text-gray-500 pt-1 leading-relaxed">
                                                Please send the exact amount of <strong className="text-gray-900 font-bold">Php {totalDue.toFixed(2)}</strong>.
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3. Reference Number Form */}
                                    <form onSubmit={handleConfirmPayment} className="space-y-4 pt-2">
                                        {errorMessage && (
                                            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                                                <AlertCircle size={16} className="text-red-600 shrink-0" />
                                                <span>{errorMessage}</span>
                                            </div>
                                        )}

                                        <div>
                                            <label className="block text-xs font-bold text-gray-800 mb-1">
                                                Transaction Reference Number <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={referenceNumber}
                                                onChange={(e) => setReferenceNumber(e.target.value)}
                                                placeholder={
                                                    selectedMethod === "gcash"
                                                        ? "e.g., 9012 3456 7890 (from GCash SMS/Receipt)"
                                                        : selectedMethod === "maya"
                                                        ? "e.g., 4019 8234 1120"
                                                        : "e.g., Deposit Slip / Ref No."
                                                }
                                                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#005F44] focus:ring-2 focus:ring-emerald-100 text-sm font-mono tracking-wider"
                                            />
                                            <p className="text-[11px] text-gray-400 mt-1">
                                                Found in your confirmation screen or SMS message after completing the transfer.
                                            </p>
                                        </div>

                                        {/* Optional Proof of Payment upload */}
                                        <div>
                                            <label className="block text-xs font-bold text-gray-800 mb-1">
                                                Upload Screenshot / Receipt <span className="text-gray-400 font-normal">(Optional)</span>
                                            </label>
                                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-gray-300 transition-colors bg-gray-50/50">
                                                <input
                                                    type="file"
                                                    id="receipt-file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                                {uploadedReceipt ? (
                                                    <div className="flex flex-col items-center gap-2">
                                                        <img
                                                            src={uploadedReceipt}
                                                            alt="Receipt preview"
                                                            className="max-h-24 rounded-lg border border-gray-200 object-contain"
                                                        />
                                                        <label
                                                            htmlFor="receipt-file"
                                                            className="text-xs text-[#005F44] font-semibold cursor-pointer hover:underline"
                                                        >
                                                            Change image
                                                        </label>
                                                    </div>
                                                ) : (
                                                    <label
                                                        htmlFor="receipt-file"
                                                        className="flex flex-col items-center justify-center gap-1 cursor-pointer"
                                                    >
                                                        <Upload size={20} className="text-gray-400" />
                                                        <span className="text-xs font-semibold text-gray-700">
                                                            Click to upload transfer screenshot
                                                        </span>
                                                        <span className="text-[10px] text-gray-400">
                                                            PNG, JPG up to 5MB
                                                        </span>
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Right Column: Order Summary (1 Col) */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs space-y-5">
                                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-100">
                                    Summary of Request
                                </h2>

                                <div className="space-y-3 text-xs sm:text-sm">
                                    <div className="flex items-start gap-2.5">
                                        <FileText size={16} className="text-[#005F44] shrink-0 mt-0.5" />
                                        <div>
                                            <span className="text-gray-500 text-[11px]">Certificate</span>
                                            <p className="font-bold text-gray-900">{order.certificateTitle}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2.5">
                                        <MapPin size={16} className="text-[#005F44] shrink-0 mt-0.5" />
                                        <div>
                                            <span className="text-gray-500 text-[11px]">Applicant</span>
                                            <p className="font-semibold text-gray-900">{fullName}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2.5">
                                        <Clock size={16} className="text-[#005F44] shrink-0 mt-0.5" />
                                        <div>
                                            <span className="text-gray-500 text-[11px]">Fulfillment</span>
                                            <p className="font-semibold text-gray-900 capitalize">
                                                {order.claiming === "delivery" ? "Home Delivery" : "Barangay Hall Pickup"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Price Breakdown */}
                                <div className="pt-4 border-t border-gray-100 space-y-2 text-xs sm:text-sm">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Document Processing Fee</span>
                                        <span className="font-mono">Php {(order.certificateFee ?? 50).toFixed(2)}</span>
                                    </div>

                                    {order.claiming === "delivery" && (
                                        <div className="flex justify-between text-gray-600">
                                            <span>Door-to-door Delivery</span>
                                            <span className="font-mono">Php {(order.deliveryFee ?? 30).toFixed(2)}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between text-gray-600">
                                        <span>System & E-Payment Fee</span>
                                        <span className="text-emerald-700 font-semibold">Free</span>
                                    </div>

                                    <div className="flex justify-between items-center pt-3 border-t border-gray-200 text-sm sm:text-base font-bold text-gray-900">
                                        <span>Total Amount Due</span>
                                        <span className="font-mono text-lg text-[#005F44]">
                                            Php {totalDue.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* Submit & Pay Button */}
                                <button
                                    type="button"
                                    onClick={handleConfirmPayment}
                                    disabled={isSubmitting}
                                    className="w-full bg-[#005F44] hover:bg-[#004833] disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 text-sm"
                                >
                                    {isSubmitting ? (
                                        <span>Verifying Transaction...</span>
                                    ) : (
                                        <>
                                            <CreditCard size={16} />
                                            <span>Verify & Complete Request</span>
                                        </>
                                    )}
                                </button>

                                {/* Trust footnote */}
                                <div className="pt-2 flex items-center gap-2 text-[10px] text-gray-400 justify-center">
                                    <ShieldCheck size={14} className="text-emerald-600" />
                                    <span>Official Barangay Tumana Financial Portal</span>
                                </div>
                        </div>

                    </div>
            </main>

            <Footer />
        </div>
    );
};

export default Payment;

