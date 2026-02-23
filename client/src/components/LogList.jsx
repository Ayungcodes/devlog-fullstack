import { NavLink } from "react-router-dom";

const LogList = ({ deleteLog, handleLogEdit, filteredLogs }) => {
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  return (
    <div className="space-y-4">
      {filteredLogs.map((log) => (
        <div
          key={log.id}
          className="card group bg-white border border-gray-200 rounded-2xl p-5 shadow-sm transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lg"
        >
          {/* title and description */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {log.title}
              </h3>
              <p className="text-gray-600 text-[15px] mt-1 leading-relaxed">
                {truncateText(log.description, 130)}
              </p>
            </div>

            <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
              {log.date}
            </span>
          </div>

          {/* divider */}
          <div className="h-px bg-gray-200 my-4"></div>

          {/* actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => deleteLog(log.id)}
              className="text-red-500 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition cursor-pointer"
            >
              Delete
            </button>

            <button
              onClick={() => {
                handleLogEdit(log);
              }}
              className="text-gray-700 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer"
            >
              Edit
            </button>

            <NavLink
              to={`/logDetails/${log.id}`}
              className="ml-auto text-sm font-medium bg-black text-white px-4 py-1.5 rounded-lg duration-300 hover:opacity-90 transition cursor-pointer"
            >
              View Details
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LogList;
