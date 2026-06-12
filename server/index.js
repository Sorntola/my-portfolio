const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.put("/api/projects/:title", (req, res) => {
  const oldTitle = req.params.title;
  const updatedProject = req.body;

  const index = projects.findIndex((project) => project.title === oldTitle);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  projects[index] = updatedProject;

  res.json({
    success: true,
    message: "Project updated",
    project: updatedProject,
  });
});

app.delete("/api/projects/:title", (req, res) => {
  const title = req.params.title;

  const index = projects.findIndex((project) => project.title === title);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  projects.splice(index, 1);

  res.json({
    success: true,
    message: "Project deleted",
  });
});

app.use(cors());
app.use(express.json());

const projects = [
  {
    title: "BLS School Management System",
    description:
      "Student, Attendance, Payment, Score and Report Management System",
    tech: "C#, WinForms, SQL Server",
    image: "/projects/bls.png",
    category: "Desktop",
  },
];

app.get("/", (req, res) => {
  res.send("TOLA Portfolio API is running");
});

app.get("/api/projects", (req, res) => {
  res.json(projects);
});

app.post("/api/projects", (req, res) => {
  const project = req.body;

  projects.push(project);

  res.status(201).json({
    success: true,
    message: "Project added.",
    project,
  });
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  console.log("New contact message:", {
    name,
    email,
    message,
  });

  res.status(201).json({
    success: true,
    message: "Message received successfully",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});