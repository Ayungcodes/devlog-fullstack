const API_URL = "http://127.0.0.1:8080/api/logs";

// post request to create a log
export const createLog = async (title, description) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to create log");
    }

    const data = await res.json();
    console.log("Created log:", data);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

// get all logs
export const getLogs = async () => {
  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

// update log by id
export const updateLogService = async (id, updatedData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error("Failed to update log");
    return await response.json();
  } catch (error) {
    console.error("Update Error:", error);
    return null;
  }
};

// delete log by id
export const deleteLogService = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete log");
    return true;
  } catch (error) {
    console.error("Delete Error:", error);
    return false;
  }
};
