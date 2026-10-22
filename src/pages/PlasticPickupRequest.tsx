import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { ArrowLeft, CheckCircle2, LoaderCircle, MapPin, Recycle, Scale } from "lucide-react";
import Navbar from "../components/Navbar";

type PickupRequest = {
    id: string;
    name: string;
    phone: string;
    address: string;
    plasticWeight: number;
    location: { latitude: number; longitude: number };
    status: "Pending weekly pickup";
    requestedAt: string;
};

const PlasticPickupRequest = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [weight, setWeight] = useState("");
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [locationError, setLocationError] = useState("");
    const [isLocating, setIsLocating] = useState(false);
    const [pickupRequest, setPickupRequest] = useState<PickupRequest | null>(() => {
        try {
            return JSON.parse(sessionStorage.getItem("tumana_plastic_pickup_request") || "null") as PickupRequest | null;
        } catch {
            return null;
        }
    });
    const [formError, setFormError] = useState("");

    const getCurrentLocation = () => {
        setLocationError("");
        if (!navigator.geolocation) {
            setLocationError("Location services are not supported by this browser.");
            return;
        }
        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                setLocation({ latitude: coords.latitude, longitude: coords.longitude });
                setIsLocating(false);
            },
            () => {
                setLocationError("We could not access your location. Please allow location access and try again.");
                setIsLocating(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 300000 },
        );
    };

    const submitRequest = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const plasticWeight = Number(weight);
        if (plasticWeight < 1) {
            setFormError("Plastic for pickup must weigh at least 1 kilogram.");
            return;
        }
        if (!location) {
            setFormError("Please share your current location so the barangay pickup team can find you.");
            return;
        }
        const request: PickupRequest = {
            id: `PFB-${Date.now()}`,
            name: name.trim(),
            phone: phone.trim(),
            address: address.trim(),
            plasticWeight,
            location,
            status: "Pending weekly pickup",
            requestedAt: new Date().toISOString(),
        };
        sessionStorage.setItem("tumana_plastic_pickup_request", JSON.stringify(request));
        setPickupRequest(request);
    };

    return (
        <div className="min-h-screen bg-[#F4F8F6] font-dm-sans">
            <Navbar />
            <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <Link to="/announcements/plastic-for-bigas-program" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#005F44] hover:underline mb-6"><ArrowLeft size={15} /> Back to announcement</Link>
                {pickupRequest ? (
                    <section className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-7 sm:p-10 text-center">
                        <CheckCircle2 className="w-14 h-14 text-[#005F44] mx-auto mb-4" />
                        <span className="inline-flex rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-xs font-bold mb-3">Pending weekly pickup</span>
                        <h1 className="text-2xl font-bold text-gray-900">Your pickup request is pending</h1>
                        <p className="mt-3 text-sm text-gray-600 leading-relaxed">Your location has been listed for the Barangay Tumana Plastic for Bigas pickup. The pickup team visits once a week and will contact you using the number you provided.</p>
                        <p className="mt-3 text-xs text-gray-500">Estimated plastic for collection: <strong className="text-gray-700">{pickupRequest.plasticWeight} kg</strong></p>
                        <Link to="/announcements" className="mt-6 inline-flex bg-[#005F44] hover:bg-[#004c37] text-white text-sm font-semibold px-5 py-3 rounded-xl">View announcements</Link>
                    </section>
                ) : (
                    <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <header className="bg-[#005F44] text-white p-6 sm:p-8"><div className="flex items-center gap-3"><div className="p-2.5 bg-white/15 rounded-xl"><Recycle size={24} /></div><div><h1 className="text-xl sm:text-2xl font-bold">Schedule Plastic Retrieval</h1><p className="text-sm text-emerald-100 mt-1">Plastic for Bigas Program</p></div></div></header>
                        <form onSubmit={submitRequest} className="p-6 sm:p-8 space-y-5">
                            <p className="text-sm text-gray-600 leading-relaxed">Fill in your details to add your location to the barangay pickup list. Collection is scheduled <strong>once every week</strong>. Please prepare at least <strong>1 kilogram</strong> of clean, dry recyclable plastic.</p>
                            {formError && <p className="rounded-lg bg-red-50 border border-red-200 px-3 py-2.5 text-xs text-red-700">{formError}</p>}
                            <div><label htmlFor="name" className="block text-xs font-bold text-gray-700 mb-1.5">Full name</label><input id="name" required value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-[#005F44]" /></div>
                            <div><label htmlFor="phone" className="block text-xs font-bold text-gray-700 mb-1.5">Mobile number</label><input id="phone" required type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="09XX XXX XXXX" className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-[#005F44]" /></div>
                            <div><label htmlFor="address" className="block text-xs font-bold text-gray-700 mb-1.5">Pickup address / landmark</label><textarea id="address" required value={address} onChange={(event) => setAddress(event.target.value)} rows={3} placeholder="House number, street, and nearby landmark" className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-[#005F44]" /></div>
                            <div><label htmlFor="weight" className="block text-xs font-bold text-gray-700 mb-1.5">Estimated plastic weight (kilograms)</label><div className="relative"><Scale size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" /><input id="weight" required min="1" step="0.1" type="number" value={weight} onChange={(event) => setWeight(event.target.value)} placeholder="Minimum: 1 kg" className="w-full rounded-xl border border-gray-200 pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-[#005F44]" /></div></div>
                            <div className="rounded-xl border border-[#005F44]/15 bg-[#F4F8F6] p-4"><div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"><div><p className="text-xs font-bold text-gray-800">Current pickup location</p><p className="text-[11px] text-gray-500 mt-0.5">Used only by the barangay pickup team.</p></div><button type="button" onClick={getCurrentLocation} disabled={isLocating} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#005F44] px-3 py-2 text-xs font-bold text-[#005F44] hover:bg-emerald-50 disabled:opacity-60">{isLocating ? <LoaderCircle size={14} className="animate-spin" /> : <MapPin size={14} />}{isLocating ? "Locating…" : location ? "Location captured" : "Use current location"}</button></div>{location && <p className="mt-3 text-[11px] text-[#005F44] font-medium">Location captured: {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}</p>}{locationError && <p className="mt-3 text-[11px] text-red-600">{locationError}</p>}</div>
                            <button type="submit" className="w-full rounded-xl bg-[#005F44] hover:bg-[#004c37] text-white py-3 text-sm font-bold transition-colors">Add my location to the weekly pickup list</button>
                        </form>
                    </section>
                )}
            </main>
        </div>
    );
};

export default PlasticPickupRequest;
