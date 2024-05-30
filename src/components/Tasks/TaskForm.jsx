import React, { useState, useEffect } from "react";

const TaskForm = ({ addTask, editingTask, updateTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    editingTask &&
      (setTitle(editingTask.title),
      setDescription(editingTask.description),
      setDueDate(editingTask.dueDate),
      setStatus(editingTask.status));
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !dueDate)
      return alert("Please fill out all fields.");

    const task = { title, description, dueDate, status };
    editingTask ? updateTask(task) : addTask(task);
    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("Pending");
  };

  return (
    <div className="mt-2 container">
      <h2>Task Form</h2>
      <form className="" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            className="form-control"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3 mb-3">
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
