import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native'
import {useContext} from "react";
import {TaskContext} from "../../contexts/task/TaskProvider";
import {styles} from "./Style";
import { useRoute } from '@react-navigation/native';
import {taskTypes} from "../../classes/taskType";
import {formatUnixTime} from "../../scripts/unixToDate";

export const TaskDetails = ({navigation}) => {
    const route = useRoute();
    const { taskId } = route.params;
    console.log("TaskDetails --> " + taskId)


    const { getTask } = useContext(TaskContext);

    // console.log(getTask(taskId))

    const {id, title, description, type, taskStatus, created_at, updated_at, color} = getTask(taskId)[0];

    const getTypeNameViaId = (typeId) => {
        for(let typeObj of taskTypes){
            if(typeObj.id === typeId){
                return typeObj.typeName;
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {/*<Text style={styles.text}>{id}</Text>*/}
            <Text style={styles.text}>Заголовок: {title}</Text>
            <Text style={styles.text}>Описание: {description}</Text>
            <Text style={styles.text}>Тип: {getTypeNameViaId(type)}</Text>
            <Text style={styles.text}>Статус: {taskStatus}</Text>
            <Text style={styles.text}>Дата создания: {formatUnixTime(created_at)}</Text>
            {/*<Text style={styles.text}>{formatUnixTime(updated_at)}</Text>*/}
        </SafeAreaView>
    )
}