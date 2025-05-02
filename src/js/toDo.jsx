import { useEffect, useState } from "react";

const ToDoList = () => {
    const [list, setList] = useState("");
    const [task, setTask] = useState([]);

    return (
        <div className="container">
            <div className="principal">
                <h1>To-Do List</h1>
                <input type="text" value={list} onChange={(e) => setList(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setTask(task.concat(list));
                            setList("")
                        }
                    }} placeholder="Escribe tu tarea aquí..." />
                <ul>
                    {task.map((item, index) => (
                        <li key={index} onClick={() => setTask(task.filter((item, currentIndex) => currentIndex !== index))}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ToDoList;