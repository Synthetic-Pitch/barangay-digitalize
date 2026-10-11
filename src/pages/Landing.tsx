import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import FeatureHighlightsBar from "../components/FeatureHighlightsBar";
import ServicesSection from "../components/ServicesSection";
import AnnouncementsSection from "../components/AnnouncementsSection";
import CommunityProgramsBanner from "../components/CommunityProgramsBanner";
import { announcements } from "../data/announcements";

const Landing = () => {
    const featuredAnnouncements = announcements.slice(0, 3);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />

            {/* Hero Section */}
            <HeroSection />

            {/* Feature Highlights Bar */}
            <FeatureHighlightsBar />

            {/* Online Barangay Services Section */}
            <ServicesSection />

            {/* Announcements Section */}
            <AnnouncementsSection announcements={featuredAnnouncements} />

            {/* Community Programs Callout Banner */}
            <CommunityProgramsBanner />

            {/* Reusable Footer Component */}
            <Footer />
        </div>
    );
};

export default Landing;
