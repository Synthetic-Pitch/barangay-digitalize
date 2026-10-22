import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router";
import { ArrowLeft, CheckCircle2, HeartHandshake } from "lucide-react";
import Navbar from "../components/Navbar";

type VolunteerApplicationData = {
    name: string;
    phone: string;
    address: string;
    availability: string;
    submittedAt: string;
    status: "Pending volunteer application";
};

const VolunteerApplication = () => {
    const [application, setApplication] = useState<VolunteerApplicationData | null>(() => {
        try {
            return JSON.parse(sessionStorage.getItem("tumana_cleanup_volunteer_application") || "null") as VolunteerApplicationData | null;
        } catch {
            return null;
        }
    });
    const [form, setForm] = useState({ name: "", phone: "", address: "", availability: "Morning" });

    const updateForm = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    };

    const submitApplication = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data: VolunteerApplicationData = {
            ...form,
            status: "Pending volunteer application",
            submittedAt: new Date().toISOString(),
        };
        sessionStorage.setItem("tumana_cleanup_volunteer_application", JSON.stringify(data));
        setApplication(data);
    };

    return (
        <div className="min-h-screen bg-[#F4F8F6] font-dm-sans">
            <Navbar />
            <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <Link to="/announcements/clean-up" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#005F44] hover:underline mb-6"><ArrowLeft size={15} /> Back to announcement</Link>
                {application ? (
                    <section className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-7 sm:p-10 text-center">
                        <CheckCircle2 className="w-14 h-14 text-[#005F44] mx-auto mb-4" />
                        <span className="inline-flex rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-xs font-bold mb-3">Pending volunteer application</span>
                        <h1 className="text-2xl font-bold text-gray-900">Thank you for volunteering!</h1>
                        <p className="mt-3 text-sm text-gray-600 leading-relaxed">Your application for the Tumana community clean-up has been received. The barangay team will contact you using your mobile number to confirm your participation.</p>
                        <Link to="/announcements" className="mt-6 inline-flex bg-[#005F44] hover:bg-[#004c37] text-white text-sm font-semibold px-5 py-3 rounded-xl">View announcements</Link>
                    </section>
                ) : (
                    <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <header className="bg-[#005F44] text-white p-6 sm:p-8"><div className="flex items-center gap-3"><div className="p-2.5 bg-white/15 rounded-xl"><HeartHandshake size={24} /></div><div><h1 className="text-xl sm:text-2xl font-bold">Volunteer for the Clean-up</h1><p className="text-sm text-emerald-100 mt-1">Sama-sama para sa mas malinis na Tumana</p></div></div></header>
                        <form onSubmit={submitApplication} className="p-6 sm:p-8 space-y-5">
                            <p className="text-sm text-gray-600 leading-relaxed">Join fellow Tumanans in keeping our community clean and green. Complete the form below and the barangay team will confirm your volunteer schedule.</p>
                            <div><label htmlFor="name" className="block text-xs font-bold text-gray-700 mb-1.5">Full name</label><input id="name" name="name" required value={form.name} onChange={updateForm} className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-[#005F44]" /></div>
                            <div><label htmlFor="phone" className="block text-xs font-bold text-gray-700 mb-1.5">Mobile number</label><input id="phone" name="phone" required type="tel" value={form.phone} onChange={updateForm} placeholder="09XX XXX XXXX" className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-[#005F44]" /></div>
                            <div><label htmlFor="address" className="block text-xs font-bold text-gray-700 mb-1.5">Address / purok</label><textarea id="address" name="address" required value={form.address} onChange={updateForm} rows={3} className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-[#005F44]" /></div>
                            <div><label htmlFor="availability" className="block text-xs font-bold text-gray-700 mb-1.5">Preferred availability</label><select id="availability" name="availability" value={form.availability} onChange={updateForm} className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-[#005F44]"><option>Morning</option><option>Afternoon</option><option>Either morning or afternoon</option></select></div>
                            <button type="submit" className="w-full rounded-xl bg-[#005F44] hover:bg-[#004c37] text-white py-3 text-sm font-bold transition-colors">Submit volunteer application</button>
                        </form>
                    </section>
                )}
            </main>
        </div>
    );
};

export default VolunteerApplication;
