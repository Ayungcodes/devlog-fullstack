let logs = {};

// GET /api/logs
export const getLogs = (req, res) => {
  res.status(200).json(logs);
};

// GET single log by id
export const getLogById = (req, res) => {
  const id = parseInt(req.params.id);
  const log = logs.find((log) => log.id === id);

  if (!log) {
    return res.status(404).json({ error: "Log not found" });
  }
  res.status(200).json(log);
};

// POST /api/logs
export const createLog = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }

  const newLog = {
    id: Date.now(),
    title,
    description,
    date: new Date().toISOString().split("T")[0],
  };
  logs.push(newLog);

  res.status(201).json({
    message: "Log created successfully",
    data: newLog,
  });
};

// PUT /api/logs/:id
export const updateLog = (req, res) => {
  const id = Number(req.params.id);
  const logIndex = logs.findIndex((log) => log.id === id);

  if (logIndex === -1) {
    const error = new Error("Log not found");
    error.status = 404;
    return res.status(404).json({ error: error.message });
  }

  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }

  logs[logIndex] = {
    ...logs[logIndex],
    title,
    description,
    date: new Date().toISOString().split("T")[0],
  };

  res.status(200).json({
    message: "Log updated successfully",
    data: logs[logIndex],
  });
};

// DELETE /api/logs/:id
export const deleteLog = (req, res) => {
  const id = Number(req.params.id);
  const index = logs.some((log) => log.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Log not found" });
  }

  logs = logs.filter((log) => log.id !== id);

  res.status(200).json({ message: "Log deleted successfully" });
};
