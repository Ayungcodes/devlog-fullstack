const LogList = ({ logs, deleteLog }) => {
  return (
    <div>
      {logs.map((log) => (
        <div key={log.id} className="border p-4 mb-2 rounded shadow duration-200 hover:bg-gray-100">
          <h3 className="font-bold">{log.title}</h3>
          <p className="text-gray-600">{log.description}</p>
          <p className="text-sm text-gray-500">{log.date}</p>
          <button
            onClick={() => deleteLog(log.id)}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded duration-200 hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default LogList
