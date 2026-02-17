const logDate = new Date().toLocaleDateString("en-US");

const initialLogs = [
  {
    id: 1,
    title: "Created Express API",
    description: "Built GET and POST routes for DevLog",
    date: logDate,
  },
  {
    id: 2,
    title: "Designed Dashboard UI",
    description: "Built React components and styled with Tailwind",
    date: logDate,
  },
  {
    id: 3,
    title: "Initialized Git repo",
    description: "Added proper .gitignore and project structure",
    date: logDate,
  },
];

export default initialLogs;