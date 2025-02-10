import React, { useState, useEffect } from "react";

const ToDoApp = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedCompleted = localStorage.getItem("completedTasks");
    return savedCompleted ? JSON.parse(savedCompleted) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const toggleTask = (index) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        if (!task.completed) {
          const completionTime = new Date().toLocaleString();
          setCompletedTasks([...completedTasks, { ...task, completedAt: completionTime }]);
        }
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>To-Do List</h1>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          style={{ padding: "8px", width: "200px", marginRight: "10px" }}
          placeholder="Adicione uma tarefa..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          style={{ padding: "8px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" }}
          onClick={addTask}
        >
          Adicionar
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              borderBottom: "1px solid #ccc",
              textDecoration: task.completed ? "line-through" : "none"
            }}
          >
            <span onClick={() => toggleTask(index)} style={{ cursor: "pointer" }}>
              {task.text}
            </span>
            <button
              style={{ backgroundColor: "red", color: "white", border: "none", cursor: "pointer", padding: "5px" }}
              onClick={() => removeTask(index)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <h2>Histórico de Concluídas</h2>
      <ul style={{ listStyle: "none", padding: 0, color: "gray" }}>
        {completedTasks.map((task, index) => (
          <li key={index} style={{ padding: "5px", borderBottom: "1px solid #ccc" }}>
            {task.text} - <small>{task.completedAt}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoApp;
