import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import LandingPage from "@/pages/LandingPage";

export default function App() {
  return (
    <>
      <Toaster richColors />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </>
  );
}
