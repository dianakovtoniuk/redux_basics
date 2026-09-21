const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let users = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Jane",
  },
];

let bugs = [
  {
    id: 1,
    description: "Bug 1",
    userId: 1,
    resolved: true,
  },
  {
    id: 2,
    description: "Bug 2",
    userId: 1,
  },
  {
    id: 3,
    description: "Bug 3",
    userId: 2,
  },
  {
    id: 4,
    description: "Bug 4",
  },
];

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/bugs", (req, res) => {
  res.json(bugs);
});

app.get("/api/bugs/:id", (req, res) => {
  const bug = bugs.find((bug) => bug.id === Number(req.params.id));

  if (!bug) {
    return res.status(404).json({
      message: "Bug not found",
    });
  }

  res.json(bug);
});

app.post("/api/bugs", (req, res) => {
  const newBug = {
    id: bugs.length ? bugs[bugs.length - 1].id + 1 : 1,
    description: req.body.description,
    userId: req.body.userId,
    resolved: false,
  };

  bugs.push(newBug);

  res.status(201).json(newBug);
});

app.patch("/api/bugs/:id", (req, res) => {
  const bug = bugs.find((bug) => bug.id === Number(req.params.id));

  if (!bug) {
    return res.status(404).json({
      message: "Bug not found",
    });
  }

  Object.assign(bug, req.body);

  res.json(bug);
});

app.delete("/api/bugs/:id", (req, res) => {
  const bugIndex = bugs.findIndex(
    (bug) => bug.id === Number(req.params.id)
  );

  if (bugIndex === -1) {
    return res.status(404).json({
      message: "Bug not found",
    });
  }

  const deletedBug = bugs.splice(bugIndex, 1)[0];

  res.json(deletedBug);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});