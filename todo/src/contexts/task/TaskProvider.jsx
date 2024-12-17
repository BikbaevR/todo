import {createContext, useState} from "react";
import {logger} from "../../scripts/logger";
import {Task} from "../../classes/task";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const addTask = (taskName, taskDescription, value) => {
        logger.writeLog(`Задача [${taskName}] создана`);
        setTasks((prevTasks) => [...prevTasks, new Task(taskName, taskDescription, value, 'Новый')]);
    };

    const removeTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    }

    const getTask = (id) => {
       return tasks.filter((task) => task.id === id);
    }

    return (
        <TaskContext.Provider value={{ tasks, addTask, removeTask, getTask }}>
            {children}
        </TaskContext.Provider>
    );
};