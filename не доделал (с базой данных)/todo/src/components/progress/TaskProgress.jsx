//
// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { ProgressBar } from 'react-native-paper';
// import { TaskContext } from "../../contexts/task/TaskProvider";
// import { deadlines } from "../../classes/deadlines";
//
// // Функция для вычисления прогресса
// const taskProgress = (createdAt, deadline) => {
//     if (!createdAt || !deadline || deadline <= createdAt) return 0; // Проверка на корректность времён
//     const now = Date.now();
//     const totalDuration = deadline - createdAt;
//     const elapsedTime = now - createdAt;
//     const progress = elapsedTime / totalDuration;
//     return parseFloat(Math.min(progress, 1).toFixed(4)); // Ограничение и приведение к float
// };
//
// export const TaskProgress = ({ taskId }) => {
//     const { getTask } = useContext(TaskContext);
//
//     // Получаем задачу из контекста
//     const task = getTask(taskId);
//
//     // Проверка на существование задачи
//     if (!task) {
//         console.warn(`Task with ID ${taskId} not found.`);
//         return (
//             <View style={styles.errorContainer}>
//                 <Text style={styles.errorText}>Task not found</Text>
//             </View>
//         );
//     }
//
//     const { id, title, created_at, color } = task;
//
//     // Получение дедлайна задачи
//     const getDeadline = () => {
//         const deadlineObj = deadlines.find((obj) => obj.taskId === id);
//         return deadlineObj ? deadlineObj.deadline : null;
//     };
//
//     const [progress, setProgress] = useState(0);
//
//     useEffect(() => {
//         const interval = setInterval(() => {
//             const deadline = getDeadline();
//             if (!deadline) {
//                 console.warn(`Deadline not found for task with ID ${id}.`);
//                 setProgress(0);
//                 return;
//             }
//             const progressValue = taskProgress(created_at, deadline);
//             setProgress(progressValue);
//
//             // Если прогресс достиг 100%, останавливаем интервал
//             if (progressValue >= 1) clearInterval(interval);
//         }, 1000);
//
//         return () => clearInterval(interval);
//     }, [created_at, id]);
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>{title}</Text>
//             <ProgressBar progress={progress} color={color} style={styles.progressBar} />
//             <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
//         </View>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         paddingTop: 20,
//         marginBottom: 20,
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     progressBar: {
//         height: 10,
//         borderRadius: 5,
//     },
//     progressText: {
//         marginTop: 10,
//         fontSize: 16,
//         textAlign: 'center',
//         marginBottom: 20,
//     },
//     errorContainer: {
//         padding: 20,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     errorText: {
//         fontSize: 16,
//         color: 'red',
//     },
// });
//

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TaskContext } from "../../contexts/task/TaskProvider";
import { deadlines } from "../../classes/deadlines";

// Функция для вычисления оставшегося времени
const calculateRemainingTime = (deadline) => {
    const now = Date.now();
    const remainingTime = Math.max(deadline - now, 0); // Не допускаем отрицательных значений

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
};

export const TaskProgress = ({ taskId }) => {
    const { getTask } = useContext(TaskContext);

    const task = getTask(taskId);

    if (!task) {
        console.warn(`Task with ID ${taskId} not found.`);
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Task not found</Text>
            </View>
        );
    }

    const { id, title, created_at, color } = task;

    const getDeadline = () => {
        const deadlineObj = deadlines.find((obj) => obj.taskId === id);
        return deadlineObj ? deadlineObj.deadline : null;
    };

    const deadline = getDeadline();

    const [timeLeft, setTimeLeft] = useState(() =>
        deadline ? calculateRemainingTime(deadline) : { days: 0, hours: 0, minutes: 0, seconds: 0 }
    );

    useEffect(() => {
        if (!deadline) {
            console.warn(`Deadline not found for task with ID ${id}.`);
            return;
        }

        const interval = setInterval(() => {
            const remainingTime = calculateRemainingTime(deadline);
            setTimeLeft(remainingTime);

            if (remainingTime.days === 0 && remainingTime.hours === 0 && remainingTime.minutes === 0 && remainingTime.seconds === 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [deadline]);

    return (
        <View style={styles.container}>
            {deadline ? (
                <Text style={styles.timeText}>
                    Осталось: {timeLeft.days} дней, {timeLeft.hours} часов, {timeLeft.minutes} минут, {timeLeft.seconds} секунд
                </Text>
            ) : (
                <Text style={styles.errorText}>Дедлайн не установлен</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // padding: 20,
        // marginBottom: 20,
        // borderWidth: 1,
        // borderColor: '#ccc',
        // borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    timeText: {
        fontSize: 16,
        color: '#333',
    },
    errorContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
});

