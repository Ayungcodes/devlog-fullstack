import { NavLink } from "react-router-dom";

const Navbar = ({ openLog, setOpenLog, editLog }) => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <>
      <nav className={`navbar fixed top-0 left-0 w-full flex items-center justify-between bg-white px-3 py-5 shadow-md rounded-b-xl z-50 ${editLog ? "blur-sm" : ""} ${openLog ? "blur-sm" : ""}`}>
        <NavLink to="/" className="text-[19px] font-bold text-gray-800 italic">
          DevLog
        </NavLink>
        <span className="text-gray-600 text-sm tracking-tight">{today}</span>
        <button
          onClick={() => setOpenLog(!openLog)}
          className="bg-gray-900 text-white text-[15px] px-4 py-1 rounded-lg cursor-pointer duration-300 hover:opacity-90 transition"
        >
          Add Log
        </button>
      </nav>
    </>
  );
};

export default Navbar;
