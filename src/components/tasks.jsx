import React, { useState } from "react";
import TaskForm from './Tasks/TaskForm'
import TaskList from './Tasks/TaskList'

function Tasks() {

     const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const addTask = (task) => setTasks([...tasks, task]);
  const deleteTask = (index) => setTasks(tasks.filter((_, i) => i !== index));
  const editTask = (index) => {
    setEditingTask(tasks[index]);
    setEditingIndex(index);
  };
  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task, index) => (index === editingIndex ? updatedTask : task))
    );
    setEditingTask(null);
    setEditingIndex(null);
  };
  const toggleTaskStatus = (index) =>
    setTasks(
      tasks.map((task, i) =>
        i === index
          ? {
              ...task,
              status: task.status === "Pending" ? "Complete" : "Pending",
            }
          : task
      )
    );
  return (
    <>
        <h1    className="pt-2 pb-2">Task Manager</h1>
      <div className="d-sm-flex justify-content-evenly">
        <TaskForm
          addTask={addTask}
          editingTask={editingTask}
          updateTask={updateTask}
        />
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          editTask={editTask}
          toggleTaskStatus={toggleTaskStatus}
        />
    </div>
   </>
  )
}

export default Tasks
