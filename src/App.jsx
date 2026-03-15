import { useEffect, useState } from 'react'
import './App.css'

function App() {
  
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      text: task,
      completed: false
    }

    console.log("Adding:", newTask);

    setTodos((prevTodos) => [...prevTodos, newTask]);
    setTask("");
  }

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  }

  const deleteTask = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  }

  const completedTaskCount = todos.filter((task) => task.completed).length;
  const remainingTaskCount = todos.length - completedTaskCount;

  return (
    <div className='container'>
        <h1>Todo App</h1>

        <div className='input-section'>
          <input 
            type="text" 
            placeholder='Enter Task'
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter"){
                addTask();
              }
            }}
          />

          <button onClick={addTask}>Add</button>
        </div>

        <div className="task-stats">
          <p>Total: {todos.length}</p>
          <p>Completed: {completedTaskCount}</p>
          <p>Remaining: {remainingTaskCount}</p>
        </div>

        {
          todos.map((todo, index) => (
            <div className='todo-item' key={index}>
              <span 
                className={todo.completed ? "completed" : ""}
                onClick={() => toggleComplete(index)}
              >
                {todo.text}
              </span>

              <button onClick={() => deleteTask(index)}>Delete</button>
            </div>
          ))
        }
    </div>
  )
}

export default App
