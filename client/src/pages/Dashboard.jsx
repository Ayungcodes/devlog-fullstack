import { useState, useEffect } from "react";
import gsap from "gsap";

import Navbar from "../components/Navbar";
import LogForm from "../components/LogForm";
import EditLog from "../components/EditLog";
import LogList from "../components/LogList";
import initialLogs from "../data";
import {
  createLog,
  getLogs,
  updateLogService,
  deleteLogService,
} from "../services";
import PageLoader from "../components/PageLoader";

const Dashboard = () => {
  const [logs, setLogs] = useState(() => {
    const savedLogs = localStorage.getItem("devlogs");
    return savedLogs ? JSON.parse(savedLogs) : initialLogs;
  });
  const [openLog, setOpenLog] = useState(false);
  const [editLog, setEditLog] = useState(false);
  const [editingLogId, setEditingLogId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadLogs = async () => {
    setFetching(true);

    const startTime = Date.now();

    try {
      const fetchedLogs = await getLogs();

      if (fetchedLogs) {
        setLogs(fetchedLogs);
        localStorage.setItem("devlogs", JSON.stringify(fetchedLogs));
      }
    } catch (error) {
      console.error("Failed to load logs:", error);
    } finally {
      const elapsed = Date.now() - startTime;
      const minimumDelay = 4000;

      const remainingTime = minimumDelay - elapsed;

      if (remainingTime > 0) {
        setTimeout(() => setFetching(false), remainingTime);
      } else {
        setFetching(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newLog = await createLog(title, description);

    if (newLog) {
      await loadLogs();

      setTitle("");
      setDescription("");
      setOpenLog(false);
    }
  };

  const handleLogEdit = (log) => {
    setTitle(log.title);
    setDescription(log.description);
    setEditingLogId(log.id);
    setEditLog(true);
  };

  const updateLog = async () => {
    const updatedData = { title, description };

    const result = await updateLogService(editingLogId, updatedData);

    if (result) {
      const updatedLogs = logs.map((log) =>
        log.id === editingLogId ? { ...log, ...updatedData } : log,
      );
      setLogs(updatedLogs);
      localStorage.setItem("devlogs", JSON.stringify(updatedLogs));

      setEditLog(false);
      setEditingLogId(null);
      setTitle("");
      setDescription("");
    }
  };

  const deleteLog = async (id) => {
    const success = await deleteLogService(id);

    if (success) {
      const updatedLogs = logs.filter((log) => log.id !== id);
      setLogs(updatedLogs);
      localStorage.setItem("devlogs", JSON.stringify(updatedLogs));
    }
  };

  // fetching loader animation
  useEffect(() => {
    if (!loading && !fetching && logs.length > 0) {
      gsap.fromTo(
        ".card",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    }
  }, [loading, fetching, logs.length]);

  // initial page load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // animate logs and navbar on load
  useEffect(() => {
    if (!loading && logs.length > 0) {
      gsap.fromTo(
        ".card",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
        },
      );
    }
  }, [loading, logs]);

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(
        ".navbar",
        {
          y: -80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
      );
    }
  }, [loading]);

  if (loading) return <PageLoader />;

  return (
    <div>
      <Navbar openLog={openLog} setOpenLog={setOpenLog} editLog={editLog} />
      <div className="mt-20 px-3 py-5">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600 text-[15px] mt-0.5">
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
        {fetching ? (
          <div className="flex flex-col items-center justify-center mt-16">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-3 text-sm">Loading logs...</p>
          </div>
        ) : logs.length > 0 ? (
          <LogList
            logs={logs}
            deleteLog={deleteLog}
            editLog={editLog}
            setEditLog={setEditLog}
            handleLogEdit={handleLogEdit}
            className="card"
          />
        ) : (
          <div className="text-center mt-16">
            <p className="text-gray-600">
              No logs yet. Start documenting your journey.
            </p>

            <button
              onClick={() => setOpenLog(true)}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg mt-4 hover:opacity-80 transition"
            >
              Add Your First Log
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
