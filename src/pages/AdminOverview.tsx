import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ChevronRight, FileText, Landmark, LogOut, Settings, ShieldCheck, Users } from "lucide-react";

const requestTypes = [
    { label: "Barangay Clearance", count: 62, width: "100%" },
    { label: "Residency", count: 41, width: "66%" },
    { label: "Indigency", count: 22, width: "36%" },
    { label: "Business Clearance", count: 14, width: "23%" },
    { label: "Good Moral Character", count: 9, width: "15%" },
];

const AdminOverview = () => {
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const session = JSON.parse(localStorage.getItem("tumana_officer_session") || "null");
            if (session?.role !== "Admin") navigate("/officials", { replace: true });
        } catch {
            navigate("/officials", { replace: true });
        }
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("tumana_officer_session");
        navigate("/officials");
    };

    const navItems = [
        ["Overview", Landmark], ["Requests", FileText], ["Certificates and fees", ShieldCheck],
        ["Reports and payments", FileText], ["Staff and roles", Users], ["Audit log", FileText], ["Settings", Settings],
    ];

    return (
        <div className="min-h-screen bg-[#edebe4] font-dm-sans text-[#052b3c] lg:flex">
            <aside className="bg-[#00684d] text-white lg:w-56 xl:w-64 lg:min-h-screen flex flex-col shrink-0">
                <div className="px-5 pt-5 pb-4 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-white text-[#00684d] flex items-center justify-center text-[8px] font-bold">SEAL</div>
                    <div><p className="font-bold text-sm leading-tight">Tumana</p><p className="text-[10px] text-emerald-100">Admin</p></div>
                </div>
                <nav className="px-3 space-y-1">
                    {navItems.map(([label, Icon], index) => (
                        <button key={label as string} className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-left text-xs font-semibold transition-colors ${index === 0 ? "bg-white text-[#053247]" : "hover:bg-white/10"}`}>
                            <Icon size={14} strokeWidth={2.2} />{label as string}
                        </button>
                    ))}
                </nav>
                <div className="mt-auto border-t border-white/10 p-5 text-xs">
                    <p className="font-bold">Admin Operations Desk</p><p className="text-emerald-100 text-[10px] mb-3">Administrator</p>
                    <button onClick={logout} className="flex items-center gap-1.5 font-semibold hover:text-emerald-100"><LogOut size={13} />Sign out</button>
                </div>
            </aside>

            <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-7 py-5 sm:py-7">
                <header className="mb-5"><h1 className="text-2xl font-bold">Overview</h1><p className="text-xs text-[#53616a]">October 2026, up to today. Figures on this screen are sample data.</p></header>
                <section className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
                    {[["Requests received", "148", ""], ["Waiting for an official", "9", ""], ["Average time to approve", "1.4", "days"], ["Fees collected", "₱12,900", ""]].map(([label, value, suffix]) => <div key={label} className="bg-white rounded-lg px-4 py-3.5 shadow-sm"><p className="text-[10px] text-[#58717d]">{label}</p><p className="mt-1 text-2xl font-bold">{value} <span className="text-xs font-medium">{suffix}</span></p></div>)}
                </section>
                <div className="grid xl:grid-cols-[minmax(0,1fr)_240px] gap-4">
                    <div className="space-y-4">
                        <section className="bg-white rounded-lg p-4 shadow-sm"><h2 className="font-bold text-sm mb-3">Requests by certificate</h2><div className="space-y-2">{requestTypes.map((item) => <div key={item.label} className="grid grid-cols-[88px_1fr_22px] sm:grid-cols-[96px_1fr_24px] items-center gap-2 text-[9px]"><span>{item.label}</span><div className="h-2.5 rounded-full bg-[#ecece7]"><div className="h-full rounded-full bg-[#00684d]" style={{ width: item.width }} /></div><span className="text-right font-semibold">{item.count}</span></div>)}</div></section>
                        <section className="bg-white rounded-lg p-4 shadow-sm"><h2 className="font-bold text-sm mb-3">Where the 148 requests stand</h2><div className="h-3 flex rounded-sm overflow-hidden mb-3"><div className="bg-[#00684d] w-[80%]" /><div className="bg-[#4f9aab] w-[5%]" /><div className="bg-[#f4be3b] w-[6%]" /><div className="bg-[#92a0a4] w-[9%]" /></div><div className="grid grid-cols-2 gap-y-1 text-[9px]"><span>119 released</span><span>7 ready for pickup</span><span>9 waiting for an official</span><span>13 returned or rejected</span></div></section>
                    </div>
                    <div className="space-y-4">
                        <section className="bg-white rounded-lg p-4 shadow-sm"><h2 className="font-bold text-sm mb-3">Needs attention</h2><div className="space-y-2">{[["3 requests waiting over 2 days", "Open the queue"], ["2 online payments not matched to a request", "Reconcile payments"], ["1 text message failed to send", "Check SMS settings"]].map(([title, detail]) => <button key={title} className="block text-left w-full rounded-md border border-[#ece8df] p-2 hover:border-emerald-300"><p className="text-[10px] font-semibold leading-tight">{title}</p><p className="text-[9px] text-[#52717b] mt-0.5">{detail}</p></button>)}</div></section>
                        <section className="bg-white rounded-lg p-4 shadow-sm"><div className="flex justify-between items-center mb-3"><h2 className="font-bold text-sm">Recent activity</h2><button className="text-[9px] text-[#00684d] font-semibold flex items-center">Full log<ChevronRight size={11} /></button></div><div className="space-y-3 text-[9px]"><p>Clearance BRG-2026-0098 approved<br /><span className="text-[#52717b]">[OFFICIAL NAME], 10:52 AM</span></p><p>Fee for Business clearance changed<br /><span className="text-[#52717b]">[ADMIN NAME], 9:15 AM</span></p><p>New staff account created<br /><span className="text-[#52717b]">[ADMIN NAME], yesterday</span></p></div></section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminOverview;
