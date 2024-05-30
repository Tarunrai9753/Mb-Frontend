import React, { useState } from "react";
import { Pagination, Modal, Button, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const TaskList = ({ tasks, deleteTask, editTask, toggleTaskStatus }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTask, setSelectedTask] = useState(null);
  const tasksPerPage = 2;

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this task?"))
      deleteTask(index);
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const openTaskModal = (index) => setSelectedTask(tasks[index]);
  const closeTaskModal = () => setSelectedTask(null);

  const handleChangePriority = (index, priority) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].priority = priority;
    editTask(index, updatedTasks[index]);
  };

  // Calculate the tasks to be displayed on the current page
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = currentPage * tasksPerPage;
  const tasksOnPage = tasks.slice(startIndex, endIndex);

  // Sort tasks by priority only for the current page
  const sortedTasks = tasksOnPage.sort((a, b) => {
    const priorityOrder = { "High": 3, "Medium": 2, "Low": 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  return (
    <div className="container mx-sm-3">
      <h2>Task List</h2>
      <ul className="list-group w-100 ">
        {sortedTasks.map((task, index) => (
          <li
            key={startIndex + index}
            className="list-group-item d-flex justify-content-between  w-100"
            style={{ position: "relative" }}
          >
            <div className="w-100">
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>
              <div>
                <p>Due Date: {task.dueDate}</p>
              </div>
              <div>
                <p>
                  Status:{" "}
                  <span
                    className="fw-bold"
                    style={{
                      color: task.status === "Pending" ? "#e9ad09" : "green",
                    }}
                  >
                    {task.status}
                  </span>
                </p>
              </div>
              <div className="gap-2 d-flex justify-content-evenly w-50 ">
                <button
                  className="btn btn-primary"
                  onClick={() => editTask(index + startIndex)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(index + startIndex)}
                >
                  Delete
                </button>
                <Dropdown>
                  <Dropdown.Toggle variant="warning" id="dropdown-basic">
                    Change Status
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() =>
                        toggleTaskStatus(index + startIndex, "Pending")
                      }
                    >
                      Pending
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        toggleTaskStatus(index + startIndex, "Completed")
                      }
                    >
                      Completed
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Priority
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() =>
                        handleChangePriority(index + startIndex, "High")
                      }
                    >
                      High
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        handleChangePriority(index + startIndex, "Medium")
                      }
                    >
                      Medium
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        handleChangePriority(index + startIndex, "Low")
                      }
                    >
                      Low
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <button
                  className="btn btn-info"
                  onClick={() => openTaskModal(index + startIndex)}
                >
                  View
                </button>
              </div>
            </div>
            {/* Priority icon container */}
            <div style={{ position: "absolute", top: 10, right: 10 }}>
              {task.priority === "High" && (
                <FontAwesomeIcon icon={faCircle} style={{ color: "red" }} />
              )}
              {task.priority === "Medium" && (
                <FontAwesomeIcon icon={faCircle} style={{ color: "orange" }} />
              )}
              {task.priority === "Low" && (
                <FontAwesomeIcon icon={faCircle} style={{ color: "gray" }} />
              )}
            </div>
          </li>
        ))}
      </ul>
      {tasks.length < 3 ? (
        ""
      ) : (
        <Pagination className="mt-3">
          {Array.from(
            { length: Math.ceil(tasks.length / tasksPerPage) },
            (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      )}
      <Modal show={selectedTask !== null} onHide={closeTaskModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTask && (
            <div>
              <h3>{selectedTask.title}</h3>
              <p>{selectedTask.description}</p>
              <p>Due Date: {selectedTask.dueDate}</p>
              <p>Status: {selectedTask.status}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeTaskModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskList;
