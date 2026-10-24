import { Route, Routes } from "react-router";
import Landing from "./pages/Landing";
import RequestDocuments from "./pages/RequestDocuments";
import Contact from "./pages/Contact";
import Announcements from "./pages/Announcements";
import AnnouncementDetail from "./pages/AnnouncementDetail";
import Officials from "./pages/Officials";
import Payment from "./pages/Payment";
import TrackRequest from "./pages/TrackRequest";
import AdminOverview from "./pages/AdminOverview";
import { OfficerRequests, ReviewRequest } from "./pages/OfficerRequests";
import { CertificateFees, StaffRoles } from "./pages/OfficerManagement";
import { AuditLog, ReportsPayments } from "./pages/OfficerReports";
import OfficerSettings from "./pages/OfficerSettings";
import PlasticPickupRequest from "./pages/PlasticPickupRequest";
import VolunteerApplication from "./pages/VolunteerApplication";

const App = () => {
    return (
        <>
          <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/request-document" element={<RequestDocuments/>}/>
            <Route path="/contact-us" element={<Contact/>}/>
            <Route path="/announcements" element={<Announcements/>}/>
            <Route path="/announcements/:slug" element={<AnnouncementDetail/>}/>
            <Route path="/officials" element={<Officials/>}/>
            <Route path="/payment" element={<Payment/>}/>
            <Route path="/track-request" element={<TrackRequest/>}/>
            <Route path="/admin/overview" element={<AdminOverview/>}/>
            <Route path="/admin/requests" element={<OfficerRequests/>}/>
            <Route path="/admin/requests/:reference" element={<ReviewRequest/>}/>
            <Route path="/admin/certificates" element={<CertificateFees/>}/>
            <Route path="/admin/staff" element={<StaffRoles/>}/>
            <Route path="/admin/reports" element={<ReportsPayments/>}/>
            <Route path="/admin/audit" element={<AuditLog/>}/>
            <Route path="/admin/settings" element={<OfficerSettings/>}/>
            <Route path="/plastic-for-bigas/pickup-request" element={<PlasticPickupRequest/>}/>
            <Route path="/clean-up/volunteer" element={<VolunteerApplication/>}/>
          </Routes>
        </>
    );
};

export default App;
