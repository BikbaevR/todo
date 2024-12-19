import {useState, useContext, useEffect} from 'react';
import {Text, SafeAreaView, Button, View} from 'react-native';
import {TaskContext} from "../../contexts/task/TaskProvider";
import {styles} from "./Style";
import {useRoute} from '@react-navigation/native';
import {formatUnixTime} from "../../scripts/unixToDate";
import {getTypeNameViaId} from "../../scripts/getTypeNameViaId";
import {dailys} from "../../classes/dailys";
import {TaskProgress} from "../../components/progress/TaskProgress";
import {darkenColorComponent} from "../../scripts/generateRandomColor";
import {taskTypes} from "../../classes/taskType";

export const TaskDetails = ({navigation}) => {
    const route = useRoute();
    const { taskId } = route.params;
    const [hideButton, setHideButton] = useState(false);
    const { getTask, updateTask } = useContext(TaskContext);
    const {id, title, description, type, taskStatus, created_at, updated_at, color} = getTask(taskId);
    const typeName = getTypeNameViaId(type, taskTypes);

    const [completeTask, setCompleteTask] = useState(null);

    const setDaily = (id) => {
        dailys.map((obj) => {
            if(obj.taskId === id) {
                console.log('setDaily - найден');
                obj.update({lastCompleted: Date.now()})
            }
        })
    }

    const viewCompleted = (id) => {
        dailys.map((obj) => {
            if(obj.taskId === id) {
                console.log("viewCompleted --> " + obj.lastCompleted);
                setCompleteTask(obj.lastCompleted);
                console.log("completeTask --> " + completeTask);
            }
        })
    }

    useEffect(() => {
        console.log("completeTask --> " + completeTask);
    }, [completeTask]);

    const choseTaskType = () => {
        if (typeName === 'С датой окончания') {
            let date = '';
            for (let obj of deadlines) {
                if (obj.taskId === id) {
                    date = obj.deadline;
                    console.log("date --> " + date);
                }
            }
            return (
                <>
                    <Text style={styles.text}>Дата окончания: {formatUnixTime(date)}</Text>
                    <TaskProgress taskId={id} />
                </>
            );
        } else if (typeName === 'Ежедневные') {
            return (
                <View style={styles.buttonContainer}>
                    <Button title='Отметить' onPress={() => {
                        setDaily(id);
                        viewCompleted(id);
                    }} />
                </View>
            );
        }
    }

    const setButtonHide = () => {
        if (taskStatus === 'Закрыт') {
            setHideButton(true);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Заголовок: {title}</Text>
            <Text style={styles.text}>Описание: {description}</Text>
            <Text style={styles.text}>Тип: {typeName}</Text>
            <Text style={styles.text}>Статус: {taskStatus}</Text>
            <Text style={styles.text}>Дата создания: {formatUnixTime(created_at)}</Text>
            {choseTaskType()}

            {completeTask && (
                <Text style={styles.text}>Последнее выполнение: {completeTask}</Text>
            )}

            {/*{taskStatus !== 'Закрыт' && (*/}
            {/*    <View style={styles.buttonContainer}>*/}
            {/*        <Button title='Закрыть' onPress={() => updateTask(id, {taskStatus: 'Закрыт', color: darkenColorComponent(color, 60)})} />*/}
            {/*    </View>*/}
            {/*)}*/}
        </SafeAreaView>
    )
}
