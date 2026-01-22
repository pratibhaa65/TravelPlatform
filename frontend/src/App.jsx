import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
        <Route path="/admindashboard/*" element={<AdminRoutes />} />
        <Route path="/userdashboard/*" element={<UserRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
