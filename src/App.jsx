import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import InputText from "./InputText";
import TodoList from "./TodoList";
import CountTask from "./CountTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const savedTasks = localStorage.getItem("tasks");

  useEffect(() => {
    console.log("Загрузка из localStorage:");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    console.log("загружаем в localStorage:");
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const deleteTask = useCallback((id) => {
    setTasks((tasks) => tasks.filter((item) => item.id !== id));
  }, []);

  const isDoneCheck = useCallback((id) => {
    setTasks((tasks) =>
      tasks.map((item) => {
        if (item.id == id) {
          return { ...item, isDone: !item.isDone };
        }
        return { ...item };
      }),
    );
  }, []);

  const editTask = useCallback((id, newTitle) => {
    setTasks((tasks) =>
      tasks.map((item) => {
        if (item.id == id) {
          return { ...item, title: newTitle };
        }
        return { ...item };
      }),
    );
  }, []);

  const clearTasks = useCallback(() => {
    setTasks((tasks) => tasks.filter((item) => item.isDone === false));
  }, []);

  return (
    <>
      <Header />
      <InputText setTasks={setTasks} />
      <TodoList
        tasks={tasks}
        deleteTask={deleteTask}
        isDoneCheck={isDoneCheck}
        editTask={editTask}
      />
      <CountTask tasks={tasks} clearTasks={clearTasks} />
    </>
  );
}

export default App;
