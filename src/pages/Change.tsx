import { Check, MapPinned } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BARANGAYS, useBarangay, type BarangayName } from "../context/BarangayContext";

const Change = () => {
    const { barangay, setBarangay } = useBarangay();

    return (
        <div className="min-h-screen bg-[#f6faf8] font-dm-sans text-slate-800 flex flex-col">
            <Navbar />
            <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
                <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-10">
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-[#005F44]"><MapPinned size={24} /></div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#007255]">Presentation settings</p>
                        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Change barangay name</h1>
                        <p className="mt-3 text-sm leading-6 text-slate-600">Choose the barangay you are presenting to. Every visible “Tumana” label across this website will update for this browser.</p>
                    </div>

                    <div className="mx-auto mt-9 grid max-w-2xl gap-3 sm:grid-cols-2">
                        {BARANGAYS.map((name) => {
                            const selected = name === barangay;
                            return <button key={name} type="button" onClick={() => setBarangay(name as BarangayName)} className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${selected ? "border-[#005F44] bg-emerald-50 text-[#005F44] ring-1 ring-[#005F44]" : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/40"}`}>
                                <span className="font-bold">Barangay {name}</span>
                                {selected && <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#005F44] text-white"><Check size={15} strokeWidth={3} /></span>}
                            </button>;
                        })}
                    </div>

                    <div className="mx-auto mt-8 max-w-2xl rounded-xl bg-slate-50 px-4 py-3 text-center text-sm text-slate-600">Currently showing: <span className="font-bold text-[#005F44]">Barangay {barangay}</span></div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Change;
