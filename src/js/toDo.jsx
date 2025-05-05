import { useEffect, useState } from "react";

const ToDoList = () => {
    const [list, setList] = useState("");
    const [task, setTask] = useState([]);
    useEffect(() => {
        listTaskApi();
    }, [])

    const listTaskApi = () => {
        fetch("https://playground.4geeks.com/todo/users/caarlos3")
            .then(resp => {
                console.log(resp.ok);
                return resp.json();
            })
            .then(data => {
                setTask(data);
            })
            .catch(error => {
                console.log(error);
            });
    }


    const getTask = (inputTask) => {

        fetch("https://playground.4geeks.com/todo/todos/caarlos3", {

            method: "POST",
            body: JSON.stringify({
                label: inputTask,
                done: false
            }),
            headers: {
                "Content-Type": "application/json"
            }

        })
            .then(resp => {
                console.log(resp.ok);
                console.log(resp.status);
                return resp.json();
            })
            .then(data => {
                console.log(data);
                setTask(prevTask => [...prevTask, data]);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const deleteTask = (id) => {

        fetch(`https://playground.4geeks.com/todo/todos/caarlos3/${id}`, {
            method: "DELETE"
        })
            .then(resp => {
                if (resp.ok) {
                    setTask((prevTask)=>prevTask.filter(item => item.id !== id));
                }

            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="container">
            <div className="principal">
                <h1>To-Do List</h1>
                <input type="text" value={list} onChange={(e) => setList(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && list.trim() !== "") {
                            getTask(list.trim());
                            setList("");

                        }
                    }} placeholder="Escribe tu tarea aquí..." />
                <ul>
                    {task.map((item) => (
                        <li key={item.id} onClick={() => deleteTask(item.id)}>{item.label}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ToDoList;