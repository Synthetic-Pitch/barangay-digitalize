import Navbar from "../components/Navbar";
import AnnouncementsSection from "../components/AnnouncementsSection";
import Footer from "../components/Footer";

const Announcements = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#F4F8F6]">
            <Navbar />
            <AnnouncementsSection
                title="Announcements and community updates"
                description="Browse the latest barangay news, programs, service reminders, and community activities for Tumana residents."
                badgeLabel="Barangay update"
                showViewAll={false}
            />
            <Footer />
        </div>
    );
};

export default Announcements;
