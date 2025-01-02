import {createContext, useState} from "react";
import {logger} from "../../scripts/logger";
import {Task} from "../../classes/task";
import {darkenColorComponent} from "../../scripts/generateRandomColor";

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
        return tasks.find((task) => task.id === id)
    }


    const updateTask = (id, updatedFields) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.id === id) {
                    task.update(updatedFields);
                    return task;
                }
                return task;
            })
        );
    };


    return (
        <TaskContext.Provider value={{ tasks, addTask, removeTask, getTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
};