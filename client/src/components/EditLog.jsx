const EditLog = ({ editLog, setEditLog, title, setTitle, description, setDescription, updateLog }) => {
  return (
    <>
      <div
        onClick={() => setEditLog(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          editLog ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50
        transform transition-transform duration-300 ease-out
        ${editLog ? "translate-x-0" : "translate-x-full"}`}
      >
        <form onSubmit={updateLog} className="p-6 h-full flex flex-col">
          {/* header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Edit Log</h2>
            <button
              type="button"
              onClick={() => setEditLog(false)}
              className="text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>
          </div>

          {/* inputs */}
          <input
            type="text"
            placeholder="Edit Title"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Edit Description"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black resize-none h-32"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* spacer */}
          <div className="flex-grow" />

          {/* submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition"
          >
            Edit Log
          </button>
        </form>
      </div>
    </>
  );
};

export default EditLog;
