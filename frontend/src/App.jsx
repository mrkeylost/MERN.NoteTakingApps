import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Detail from "./pages/Detail";
// import toast from "react-hot-toast";

export default function App() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#0a0a0a_55%,#00FF9D18_100%)]" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/note/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}
