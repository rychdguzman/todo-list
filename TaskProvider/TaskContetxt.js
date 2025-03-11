"use client";
import React, { createContext, useState, useContext, useCallback } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasksCollection, setTasksCollection] = useState({});

  // Fetch tasks (reuse your fetchTasks logic)
  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch("/api/task");

      const data = await response.json();
      const taskCollection = data?.tasks.reduce((acc, task) => {
        const { status } = task;
        if (!acc[status]) acc[status] = [];
        acc[status].push(task);
        return acc;
      }, {});
      setTasksCollection(taskCollection);
      return response;
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  }, []);

  // Add task
  const addTask = async (newTask) => {
    try {
      const response = await fetch("/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      // Refresh tasks after adding
      await fetchTasks();
      return response;
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Update task
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await fetch(`/api/task/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      // Refresh tasks after updating
      await fetchTasks();
      return response;
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`/api/task/${taskId}`, {
        method: "DELETE",
      });
      // Refresh tasks after deleting
      await fetchTasks();
      return response;
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasksCollection,
        fetchTasks,
        addTask,
        updateTaskStatus,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
