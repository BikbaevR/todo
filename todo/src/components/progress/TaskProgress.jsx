import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar, Card } from 'react-native-paper';
import {TaskContext} from "../../contexts/task/TaskProvider";
import {deadlines} from "../../classes/deadlines";
import {formatUnixTime} from "../../scripts/unixToDate";

const taskProgress = (createdAt, updatedAt) => {
    const now = Date.now();
    const totalDuration = updatedAt - createdAt;
    const elapsedTime = now - createdAt;
    return Math.min(elapsedTime / totalDuration, 1);
};

export const TaskProgress = ({taskId}) => {

    const { getTask } = useContext(TaskContext);

    const {id, title, description, type, taskStatus, created_at, updated_at, color} = getTask(taskId)[0];

    const deadlineType = () => {
        for(let obj of deadlines){
            if(obj.taskId === id){
                return obj.deadline
            }
        }
    }

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            let progress = taskProgress(created_at, deadlineType())
            // console.log(progress);
            setProgress(progress);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <ProgressBar progress={progress} color={color} style={styles.progressBar}><Text>ТЕСТ</Text></ProgressBar>
            {/*<Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>*/}
        </View>
        // <Card style={styles.card}>
        //     <View style={styles.progressBarWrapper}>
        //         <ProgressBar progress={progress} color={color} style={styles.progressBar} />
        //     </View>
        //     <Text style={styles.text}>ТЕСТ</Text>
        // </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        // padding: 20,
        // marginVertical: 10,
        // backgroundColor: '#f9f9f9',
        // borderRadius: 10,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        // shadowRadius: 4,
        // elevation: 3,
        paddingTop: 20,
        marginBottom: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    progressBar: {
        height: 10,
        borderRadius: 5,
    },
    progressText: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },


    // card: {
    //     width: '80%',
    //     height: 200, // Высота карточки
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderRadius: 10,
    //     // overflow: 'hidden', // Обеспечивает, чтобы элементы не выходили за пределы карточки
    //     backgroundColor: '#f0f0f0', // Цвет фона карточки, можно изменить по желанию
    // },
    // progressBarWrapper: {
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#882828', // Фон прогресс-бара, если необходимо
    // },
    // progressBar: {
    //     height: '100%', // Прогресс-бар занимает всю высоту
    //     width: '100%', // Прогресс-бар занимает всю ширину
    //     position: 'absolute',
    //     borderRadius: 10,
    // },
    // text: {
    //     position: 'absolute',
    //     color: '#000000', // Белый цвет текста
    //     fontSize: 20,
    //     fontWeight: 'bold',
    //     zIndex: 1, // Текст будет поверх прогресс-бара
    // },
});

