import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { 
    ArrowLeft, 
    Users, 
    ShieldCheck, 
    Clock, 
    LogIn, 
    LogOut, 
    KeyRound, 
    X, 
    CheckCircle2, 
    AlertCircle,
    FileText,
    Bell,
    Settings
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Official {
    initials: string;
    name: string;
    role: string;
    committee: string;
}

interface LoggedOfficer {
    name: string;
    role: "Kapitan" | "Admin";
    title: string;
    username: string;
}

const kagawadList: Official[] = [
    {
        initials: "BR",
        name: "Maria Clara B. Reyes",
        role: "Barangay Kagawad",
        committee: "Committee: Health & Sanitation",
    },
    {
        initials: "DC",
        name: "Juan Miguel C. dela Cruz",
        role: "Barangay Kagawad",
        committee: "Committee: Peace & Order",
    },
    {
        initials: "LF",
        name: "Patricia Ann L. Flores",
        role: "Barangay Kagawad",
        committee: "Committee: Education & Youth",
    },
    {
        initials: "FM",
        name: "Roberto F. Mercado",
        role: "Barangay Kagawad",
        committee: "Committee: Infrastructure",
    },
    {
        initials: "SV",
        name: "Cristina S. Villanueva",
        role: "Barangay Kagawad",
        committee: "Committee: Social Services",
    },
    {
        initials: "PG",
        name: "Antonio P. Garcia",
        role: "Barangay Kagawad",
        committee: "Committee: Environment",
    },
];

const staffList: Official[] = [
    {
        initials: "ML",
        name: "Eduardo M. Lim",
        role: "SK Chairperson",
        committee: "Committee: Youth Development",
    },
    {
        initials: "RT",
        name: "Janine R. Tan",
        role: "Barangay Secretary",
        committee: "Committee: Administrative",
    },
    {
        initials: "AC",
        name: "Ferdinand A. Cruz",
        role: "Barangay Treasurer",
        committee: "Committee: Finance",
    },
];

const Officials = () => {
    const navigate = useNavigate();

    // Login modal state
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [currentUser, setCurrentUser] = useState<LoggedOfficer | null>(null);

    // Load session from localStorage on initial render
    useEffect(() => {
        try {
            const savedSession = localStorage.getItem("tumana_officer_session");
            if (savedSession) {
                setCurrentUser(JSON.parse(savedSession));
            }
        } catch {
            // ignore JSON error
        }
    }, []);

    const handleLogin = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setErrorMsg("");

        const cleanUser = username.trim().toLowerCase();
        const cleanPass = password.trim();

        if (cleanUser === "kapitan" && cleanPass === "password123") {
            const user: LoggedOfficer = {
                name: "Hon. Ramon D. Santos",
                role: "Kapitan",
                title: "Punong Barangay",
                username: "kapitan",
            };
            setCurrentUser(user);
            localStorage.setItem("tumana_officer_session", JSON.stringify(user));
            setIsLoginOpen(false);
            setSuccessMsg("Welcome back, Kapitan Ramon D. Santos!");
            setUsername("");
            setPassword("");
            setTimeout(() => setSuccessMsg(""), 4000);
            return;
        }

        if (cleanUser === "admin" && cleanPass === "admin123") {
            const user: LoggedOfficer = {
                name: "Admin Operations Desk",
                role: "Admin",
                title: "Barangay Administrator",
                username: "admin",
            };
            setCurrentUser(user);
            localStorage.setItem("tumana_officer_session", JSON.stringify(user));
            setIsLoginOpen(false);
            setSuccessMsg("Welcome back, Barangay Admin!");
            setUsername("");
            setPassword("");
            navigate("/admin/overview");
            return;
        }

        setErrorMsg("Invalid username or password. Check credentials or use quick login buttons.");
    };

    const handleQuickLogin = (role: "kapitan" | "admin") => {
        if (role === "kapitan") {
            const user: LoggedOfficer = {
                name: "Hon. Ramon D. Santos",
                role: "Kapitan",
                title: "Punong Barangay",
                username: "kapitan",
            };
            setCurrentUser(user);
            localStorage.setItem("tumana_officer_session", JSON.stringify(user));
            setIsLoginOpen(false);
            setSuccessMsg("Logged in successfully as Kapitan (Hon. Ramon D. Santos)");
        } else {
            const user: LoggedOfficer = {
                name: "Admin Operations Desk",
                role: "Admin",
                title: "Barangay Administrator",
                username: "admin",
            };
            setCurrentUser(user);
            localStorage.setItem("tumana_officer_session", JSON.stringify(user));
            setIsLoginOpen(false);
            setSuccessMsg("Logged in successfully as Barangay Administrator");
            navigate("/admin/overview");
        }
        setTimeout(() => setSuccessMsg(""), 4000);
    };

    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem("tumana_officer_session");
        setSuccessMsg("You have logged out successfully.");
        setTimeout(() => setSuccessMsg(""), 3000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50/50 font-dm-sans">
            <Navbar />

            {/* Top Green Banner */}
            <div className="w-full bg-[#005F44] text-white pt-6 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Top Row: Back to Home + Officer Login Status */}
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={() => navigate("/")}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-emerald-100 hover:text-white transition-colors cursor-pointer group"
                        >
                            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                            <span>Back to Home</span>
                        </button>

                        {/* Top-Right Login / Officer Status */}
                        {currentUser ? (
                            <div className="flex items-center gap-2 sm:gap-3 bg-white/10 border border-white/20 rounded-xl px-3 py-1.5 backdrop-blur-xs">
                                <div className="w-7 h-7 rounded-full bg-emerald-300 text-[#005F44] font-bold text-xs flex items-center justify-center shrink-0">
                                    {currentUser.role === "Kapitan" ? "DS" : "AD"}
                                </div>
                                <div className="hidden sm:flex flex-col text-left leading-none">
                                    <span className="text-xs font-semibold text-white truncate max-w-[150px]">
                                        {currentUser.name}
                                    </span>
                                    <span className="text-[10px] text-emerald-200 uppercase font-medium">
                                        {currentUser.role}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="inline-flex items-center gap-1 text-xs bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                                    title="Log out"
                                >
                                    <LogOut size={13} />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => {
                                    setErrorMsg("");
                                    setIsLoginOpen(true);
                                }}
                                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl transition-all backdrop-blur-xs cursor-pointer shadow-xs hover:border-white/40"
                            >
                                <KeyRound size={15} />
                                <span>Officer Login</span>
                            </button>
                        )}
                    </div>

                    {/* Banner Title */}
                    <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                                Barangay Officials
                            </h1>
                            <p className="text-xs sm:text-sm text-emerald-100/85 mt-0.5">
                                Your elected leaders serving Barangay Tumana (2023-2026)
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-10 flex flex-col gap-8 sm:gap-10">
                {/* Notification Toast */}
                {successMsg && (
                    <div className="bg-emerald-50 border border-emerald-300/80 text-emerald-900 px-4 py-3 rounded-xl flex items-center justify-between text-xs sm:text-sm shadow-xs animate-in fade-in">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-emerald-700 shrink-0" />
                            <span>{successMsg}</span>
                        </div>
                        <button
                            onClick={() => setSuccessMsg("")}
                            className="text-emerald-700 hover:text-emerald-900"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}

                {/* Officer Quick Actions Panel (Active when logged in) */}
                {currentUser && (
                    <div className="bg-white border border-emerald-600/30 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#005F44] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                {currentUser.role} Session Active
                            </span>
                            <h4 className="text-sm sm:text-base font-bold text-gray-900 mt-1">
                                Welcome, {currentUser.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                                You have executive access to view and manage official barangay affairs.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                            <button
                                onClick={() => navigate("/request-document")}
                                className="inline-flex items-center gap-1.5 bg-[#005F44] hover:bg-[#004833] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer"
                            >
                                <FileText size={14} />
                                <span>Document Requests</span>
                            </button>
                            <button
                                onClick={() => navigate("/announcements")}
                                className="inline-flex items-center gap-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-medium px-3 py-2 rounded-lg transition-colors cursor-pointer"
                            >
                                <Bell size={14} />
                                <span>Announcements</span>
                            </button>
                            <button
                                onClick={() => alert("Officer Profile Settings: Committee assignments are up to date.")}
                                className="inline-flex items-center gap-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-medium px-3 py-2 rounded-lg transition-colors cursor-pointer"
                            >
                                <Settings size={14} />
                                <span>Settings</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Featured Card: Punong Barangay */}
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 shadow-xs overflow-hidden flex flex-col md:flex-row items-stretch">
                    {/* Left Dark Green Block with Avatar */}
                    <div className="bg-[#005F44] md:w-2/5 p-8 sm:p-10 flex flex-col items-center justify-center relative min-h-[220px] md:min-h-[260px] shrink-0">
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#1b7355] border-4 border-white/20 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-md">
                            DS
                        </div>
                        <span className="absolute bottom-4 left-4 bg-black/30 backdrop-blur-xs text-white text-[11px] font-medium px-3 py-1 rounded-full border border-white/10">
                            Punong Barangay
                        </span>
                    </div>

                    {/* Right Details Block */}
                    <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center md:w-3/5 gap-3 sm:gap-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#005F44] border border-emerald-200/60 text-xs font-semibold w-fit">
                            <ShieldCheck size={14} />
                            <span>Barangay Chairman</span>
                        </span>

                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                                Hon. Ramon D. Santos
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 font-medium mt-0.5">
                                Punong Barangay, Barangay Tumana
                            </p>
                        </div>

                        <div className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1 rounded-full w-fit">
                            <Clock size={13} className="text-[#005F44]" />
                            <span>Term: 2023 - 2026</span>
                        </div>

                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal pt-1">
                            The Punong Barangay serves as the chief executive of the barangay, responsible for enforcing laws,
                            implementing programs, and leading the community toward progress and development.
                        </p>
                    </div>
                </div>

                {/* Section: Barangay Kagawad (Councilors) */}
                <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-5">
                        Barangay Kagawad (Councilors)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                        {kagawadList.map((official, idx) => (
                            <div
                                key={idx}
                                className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 flex items-center gap-4 hover:shadow-md hover:border-[#005F44]/40 transition-all group"
                            >
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#005F44] text-white flex items-center justify-center font-bold text-base sm:text-lg shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                                    {official.initials}
                                </div>
                                <div className="flex flex-col text-left leading-tight">
                                    <h4 className="font-bold text-gray-900 text-sm sm:text-base leading-snug">
                                        {official.name}
                                    </h4>
                                    <p className="text-xs sm:text-sm font-semibold text-[#005F44] mt-0.5">
                                        {official.role}
                                    </p>
                                    <p className="text-[11px] sm:text-xs text-gray-400 font-normal mt-1">
                                        {official.committee}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section: Barangay Staff */}
                <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-5">
                        Barangay Staff
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                        {staffList.map((official, idx) => (
                            <div
                                key={idx}
                                className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 flex items-center gap-4 hover:shadow-md hover:border-[#005F44]/40 transition-all group"
                            >
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#005F44] text-white flex items-center justify-center font-bold text-base sm:text-lg shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                                    {official.initials}
                                </div>
                                <div className="flex flex-col text-left leading-tight">
                                    <h4 className="font-bold text-gray-900 text-sm sm:text-base leading-snug">
                                        {official.name}
                                    </h4>
                                    <p className="text-xs sm:text-sm font-semibold text-[#005F44] mt-0.5">
                                        {official.role}
                                    </p>
                                    <p className="text-[11px] sm:text-xs text-gray-400 font-normal mt-1">
                                        {official.committee}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>

            {/* Officer Login Modal */}
            {isLoginOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
                    <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative">
                        {/* Close button */}
                        <button
                            onClick={() => setIsLoginOpen(false)}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <X size={18} />
                        </button>

                        {/* Modal Header */}
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#005F44] border border-emerald-100 flex items-center justify-center mx-auto mb-3">
                                <KeyRound size={22} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Officer Portal Login</h3>
                            <p className="text-xs text-gray-500 mt-1">
                                Secure access for Punong Barangay (Kapitan) and Barangay Administrators.
                            </p>
                        </div>

                        {/* Error Message */}
                        {errorMsg && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                                <AlertCircle size={16} className="shrink-0 text-red-600" />
                                <span>{errorMsg}</span>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="kapitan or admin"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#005F44] focus:ring-2 focus:ring-emerald-100 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#005F44] focus:ring-2 focus:ring-emerald-100 text-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#005F44] hover:bg-[#004833] text-white text-sm font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                            >
                                <LogIn size={16} />
                                <span>Sign In</span>
                            </button>
                        </form>

                        {/* Quick Demo Login Option */}
                        <div className="mt-6 pt-5 border-t border-gray-100">
                            <p className="text-[11px] font-semibold text-gray-400 uppercase text-center mb-3">
                                Quick Demo Login
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleQuickLogin("kapitan")}
                                    className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/70 text-[#005F44] rounded-xl text-xs font-semibold transition-colors cursor-pointer flex flex-col items-center"
                                >
                                    <span>👑 Kapitan</span>
                                    <span className="text-[10px] font-normal text-emerald-700">Ramon D. Santos</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleQuickLogin("admin")}
                                    className="px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex flex-col items-center"
                                >
                                    <span>⚙️ Admin</span>
                                    <span className="text-[10px] font-normal text-gray-500">Operations Desk</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Officials;

