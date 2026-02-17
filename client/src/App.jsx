import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import LogDetails from "./pages/LogDetails";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/logDetails" element={<LogDetails />} />
      </Routes>
    </>
  );
};

export default App;
