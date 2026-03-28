import { useState, memo } from "react";

const InputText = ({ setTasks }) => {
  console.log("render InputText");
  const [text, setText] = useState("");
  const [textError, setTextError] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);

    if (value.trim().length > 0) {
      setTextError(false);
    }
  };

  const handleClick = () => {
    const trimText = text.trim();
    if (trimText === "") {
      setTextError(true);
      return;
    }

    setTasks((tasks) => [
      ...tasks,
      { id: crypto.randomUUID(), title: text, isDone: false },
    ]);
    setText("");
    setTextError(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Введите задачу"
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleClick}>Добавить</button>
      {textError && <p className="errorText">❌ Введите задачу!</p>}
    </div>
  );
};

export default memo(InputText);
