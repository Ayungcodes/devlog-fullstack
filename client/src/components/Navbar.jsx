const Navbar = () => {
    const today = new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
    })
  return (
    <nav className="flex items-center justify-between bg-white px-4 py-5 shadow-md rounded-b-xl">
      <h1 className="text-xl font-bold text-black">DevLog</h1>
      <span className="text-gray-500">{today}</span>
      <button className="bg-black text-white px-4 py-1 rounded-lg hover:opacity-90">
        Add Log
      </button>
    </nav>
  );
};

export default Navbar;
