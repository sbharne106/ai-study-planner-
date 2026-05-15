import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    course: "",
    taskName: "",
    dueDate: "",
    difficulty: "Medium",
    estimatedHours: "",
  });
  const sortedTasks = [...tasks].sort(
  (a, b) => b.priorityScore - a.priorityScore
);

const topTask = sortedTasks.length > 0 ? sortedTasks[0] : null;

  function calculatePriorityScore(dueDate, difficulty, estimatedHours) {
    const today = new Date();
    const deadline = new Date(dueDate);

    const timeDifference = deadline - today;
    const daysUntilDue = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    let urgencyScore;

    if (daysUntilDue <= 1) {
      urgencyScore = 50;
    } else if (daysUntilDue <= 3) {
      urgencyScore = 35;
    } else if (daysUntilDue <= 7) {
      urgencyScore = 20;
    } else {
      urgencyScore = 10;
    }

    let difficultyScore;

    if (difficulty === "Hard") {
      difficultyScore = 30;
    } else if (difficulty === "Medium") {
      difficultyScore = 20;
    } else {
      difficultyScore = 10;
    }

    const timeScore = estimatedHours * 5;

    return urgencyScore + difficultyScore + timeScore;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newTask = {
      id: Date.now(),
      course: formData.course,
      taskName: formData.taskName,
      dueDate: formData.dueDate,
      difficulty: formData.difficulty,
      estimatedHours: Number(formData.estimatedHours),
      priorityScore: calculatePriorityScore(
        formData.dueDate,
        formData.difficulty,
        Number(formData.estimatedHours)
      ),
    };

    setTasks([...tasks, newTask]);

    setFormData({
      course: "",
      taskName: "",
      dueDate: "",
      difficulty: "Medium",
      estimatedHours: "",
    });
  }

  return (
    <main className="app">
      <section className="hero">
        <h1>AI Study Planner</h1>
        <p>
          Organize courses, deadlines, and weak topics into a smarter study plan.
        </p>
      </section>

      <section className="card">
        <h2>Add Study Task</h2>

        <form onSubmit={handleSubmit} className="task-form">
          <label>
            Course
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Example: CS 200"
              required
            />
          </label>

          <label>
            Task Name
            <input
              type="text"
              name="taskName"
              value={formData.taskName}
              onChange={handleChange}
              placeholder="Example: Study arrays"
              required
            />
          </label>

          <label>
            Due Date
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Difficulty
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </label>

          <label>
            Estimated Hours
            <input
              type="number"
              name="estimatedHours"
              value={formData.estimatedHours}
              onChange={handleChange}
              placeholder="Example: 3"
              min="1"
              required
            />
          </label>

          <button type="submit">Add Task</button>
        </form>
      </section>

      <section className="card">
        <h2>Your Study Tasks</h2>

        {tasks.length === 0 ? (
          <p className="empty-text">No tasks added yet.</p>
        ) : (
          <div className="task-list">
            {[...tasks]
              .sort((a, b) => b.priorityScore - a.priorityScore)
              .map((task) => (
                <article key={task.id} className="task-item">
                  <h3>{task.taskName}</h3>

                  <p>
                    <strong>Course:</strong> {task.course}
                  </p>

                  <p>
                    <strong>Due:</strong> {task.dueDate}
                  </p>

                  <p>
                    <strong>Difficulty:</strong> {task.difficulty}
                  </p>

                  <p>
                    <strong>Estimated Time:</strong> {task.estimatedHours} hours
                  </p>

                  <p>
                    <strong>Priority Score:</strong> {task.priorityScore}
                  </p>
                </article>
              ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;