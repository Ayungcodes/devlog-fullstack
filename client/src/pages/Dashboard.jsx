import { useState } from "react";

import Navbar from "../components/Navbar";
import LogForm from "../components/LogForm";
import EditLog from "../components/EditLog";
import LogList from "../components/LogList";
import initialLogs from "../index";

const Dashboard = () => {
  const [logs, setLogs] = useState(() => {
    const savedLogs = localStorage.getItem("devlogs");
    return savedLogs ? JSON.parse(savedLogs) : initialLogs;
  });
  const [openLog, setOpenLog] = useState(false);
  const [editLog, setEditLog] = useState(false);
  const [editingLogId, setEditingLogId] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;

    const newLog = {
      id: Date.now(),
      title,
      description,
      date: new Date().toISOString().split("T")[0],
    };

    console.log("Adding log:", newLog);

    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem("devlogs", JSON.stringify(updatedLogs));

    // addLog(newLog);
    setTitle("");
    setDescription("");
    setOpenLog(false);
  };

  const handleLogEdit = (log) => {
      setTitle(log.title);
      setDescription(log.description);
      setEditingLogId(log.id);
      setEditLog(true);
  }

  const updateLog = () => {
  const updatedLogs = logs.map((log) =>
    log.id === editingLogId
      ? { ...log, title, description }
      : log
  );

  setLogs(updatedLogs);
  localStorage.setItem("devlogs", JSON.stringify(updatedLogs));

  setEditLog(false);
  setEditingLogId(null);
  setTitle("");
  setDescription("");
};

const deleteLog = (id) => {
  const updatedLogs = logs.filter((log) => log.id !== id);
  setLogs(updatedLogs);
  localStorage.setItem("devlogs", JSON.stringify(updatedLogs));
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
        {/* log form */}
        <LogForm
          openLog={openLog}
          setOpenLog={setOpenLog}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          handleSubmit={handleSubmit}
        />
        {/* edit log form */}
        <EditLog
          editLog={editLog}
          setEditLog={setEditLog}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          updateLog={updateLog}
        />
        {logs.length > 0 ? (
          <LogList logs={logs} deleteLog={deleteLog} editLog={editLog} setEditLog={setEditLog} handleLogEdit={handleLogEdit} />
        ) : (
          <div>
            <p className="text-gray-600 text-center mt-10">
              No logs yet. Start by adding a new log!
            </p>
            <button
              onClick={() => setOpenLog(true)}
              className="bg-gray-900 text-white px-4 py-1 rounded-lg cursor-pointer hover:opacity-80 mx-auto block mt-4"
            >
              Add Log
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
