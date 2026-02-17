import { useState } from "react";

import Navbar from "../components/Navbar";
import LogForm from "../components/LogForm";
import LogList from "../components/LogList";

const initialLogs = [
  {
    id: 1,
    title: "Created Express API",
    description: "Built GET and POST routes for DevLog",
    date: "2026-02-17",
  },
  {
    id: 2,
    title: "Designed Dashboard UI",
    description: "Built React components and styled with Tailwind",
    date: "2026-02-16",
  },
  {
    id: 3,
    title: "Initialized Git repo",
    description: "Added proper .gitignore and project structure",
    date: "2026-02-16",
  },
];

const Dashboard = () => {
  const [logs, setLogs] = useState(initialLogs);

  const addLog = (log) => {
    setLogs([log, ...logs]);
  };

  const deleteLog = (id) => {
    setLogs(logs.filter((log) => log.id !== id));
  };

  return (
    <div>
      <Navbar addLog={addLog} />
      <div className="mt-20 p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-0.5">
          Welcome to your DevLog dashboard.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-3.5 py-5">
        <LogForm addLog={addLog} />

        <LogList logs={logs} deleteLog={deleteLog} />
      </div>
    </div>
  );
};

export default Dashboard;
