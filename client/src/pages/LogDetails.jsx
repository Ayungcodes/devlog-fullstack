import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import gsap from "gsap";

const LogDetails = () => {
  const { id } = useParams();

  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(true);

  const getLogById = async () => {
    const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

    try {
      const res = await fetch(`${API_URL}/api/logs/${id}`);

      if (!res.ok) {
        throw new Error("Log not found");
      }

      const data = await res.json();
      setLog(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLogById();
  }, [id]);

  useEffect(() => {
    if (!loading && log) {
      gsap.from(".details-card", {
        y: 40,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, [loading, log]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!log) {
    return (
      <div className="text-center mt-20 space-y-5">
        <p className="text-gray-900">Log not found.</p>
        <NavLink to="/" className="px-4 py-2 bg-gray-900 text-white rounded-lg">
          Go Back
        </NavLink>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 mt-24">
      <NavLink
        to="/"
        className="text-sm text-gray-600 hover:text-black mb-6 cursor-pointer transition duration-200"
      >
        ← Back
      </NavLink>

      <div className="details-card bg-white shadow-lg rounded-2xl p-6 border">
        <h1 className="text-2xl font-bold mb-2">{log.title}</h1>

        <p className="text-sm text-gray-900 mb-6">
          {log.date || new Date().toISOString().split("T")[0]}
        </p>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {log.description}
        </p>
      </div>
    </div>
  );
};

export default LogDetails;
