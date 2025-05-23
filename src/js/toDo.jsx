import { useEffect, useState } from "react";

const ToDoList = () => {
    const [list, setList] = useState("");
    const [task, setTask] = useState([]);

    const addUser = () => {
        fetch ("https://playground.4geeks.com/todo/users/test95", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => {
            return resp.json();
        })
        .catch(error => {
            console.log(error);
        });
    }



    const listTaskApi = () => {
        fetch(`https://playground.4geeks.com/todo/users/test95`)
            .then(resp => {
                console.log(resp.ok);
                return resp.json();
            })
            .then(data => {
                setTask(data.todos);
            })
            .catch(error => {
                console.log(error);
            });
    }


    const getTask = (inputTask) => {

        fetch(`https://playground.4geeks.com/todo/todos/test95`, {

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
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE",
        })
            .then(resp => {
                if (resp.ok) {
                    setTask(prevTask => prevTask.filter(item => item.id !== id));
                }

            })
            .catch(error => {
                console.log(error);
            });

    }

    useEffect(() => {
        listTaskApi();
    }, []);





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
                        <li key={item.id} onClick={() => deleteTask(item.id)} >{item.label} <i className="far fa-trash"></i></li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ToDoList;