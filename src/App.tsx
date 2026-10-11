import { Route, Routes } from "react-router";
import Landing from "./pages/Landing";
import RequestDocuments from "./pages/RequestDocuments";
import Contact from "./pages/Contact";
import Announcements from "./pages/Announcements";
import AnnouncementDetail from "./pages/AnnouncementDetail";
import Officials from "./pages/Officials";
import Payment from "./pages/Payment";
import TrackRequest from "./pages/TrackRequest";

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
          </Routes>
        </>
    );
};

export default App;