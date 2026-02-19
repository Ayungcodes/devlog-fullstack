import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";

const LogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(true);

  const getLogById = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/logs/${id}`);

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
        opacity: 0,
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
      <div className="text-center mt-20">
        <p className="text-gray-600">Log not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 mt-24">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-500 hover:text-black mb-6"
      >
        ← Back
      </button>

      <div className="details-card bg-white shadow-lg rounded-2xl p-6 border">
        <h1 className="text-2xl font-bold mb-2">{log.title}</h1>

        <p className="text-sm text-gray-500 mb-6">
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
