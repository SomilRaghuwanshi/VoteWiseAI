import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { About } from "@/pages/About";
import { Candidate } from "@/pages/Candidate";
import { Compare } from "@/pages/Compare";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";

export function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/candidates" element={<Candidate />} />
          <Route path="/candidates/:id" element={<Candidate />} />
          <Route path="/candidate" element={<Candidate />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
