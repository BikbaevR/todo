import {createContext, useState} from "react";
import {logger} from "../../scripts/logger";
import {Task} from "../../classes/task";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const addTask = (id, taskName, taskDescription, value) => {
        logger.writeLog(`Задача [${taskName}] создана`);
        setTasks((prevTasks) => [...prevTasks, new Task(id, taskName, taskDescription, value, 'Новый')]);
    };

    const removeTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    }

    const getTask = (id) => {
       return tasks.filter((task) => task.id === id);
    }

    const setDone = (id) => {
        console.log(getTask(id)[0])
        let task = getTask(id)[0].taskStatus = 'Закрыт';
        console.log(getTask(id)[0])

        // removeTask(id)
        setTasks((prevTasks) => [...tasks, task]);
    }

    return (
        <TaskContext.Provider value={{ tasks, addTask, removeTask, getTask, setDone }}>
            {children}
        </TaskContext.Provider>
    );
};