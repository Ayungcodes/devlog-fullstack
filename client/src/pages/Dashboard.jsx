import { useState } from "react";

import Navbar from "../components/Navbar";
import LogForm from "../components/LogForm";
import LogList from "../components/LogList";
import initialLogs from "../index";

const Dashboard = () => {
  const [logs, setLogs] = useState(initialLogs);
  const [openLog, setOpenLog] = useState(false);

  const addLog = (log) => {
    setLogs([log, ...logs]);
  };

  const deleteLog = (id) => {
    setLogs(logs.filter((log) => log.id !== id));
  };

  return (
    <div>
      <Navbar openLog={openLog} setOpenLog={setOpenLog} />
      <div className="mt-20 px-3 py-5">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-0.5">
          Welcome to your DevLog dashboard.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-3 py-6">
        <LogForm openLog={openLog} setOpenLog={setOpenLog} addLog={addLog} />
        <LogList logs={logs} deleteLog={deleteLog} />
      </div>
    </div>
  );
};

export default Dashboard;
