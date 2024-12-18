import {View, Text, TouchableOpacity, SafeAreaView, Button} from 'react-native'
import {useContext, useState} from "react";
import {TaskContext} from "../../contexts/task/TaskProvider";
import {styles} from "./Style";
import { useRoute } from '@react-navigation/native';
import {taskTypes} from "../../classes/taskType";
import {formatUnixTime} from "../../scripts/unixToDate";
import {getTypeNameViaId} from "../../scripts/getTypeNameViaId";
import {deadlines} from "../../classes/deadlines";

import {TaskProgress} from "../../components/progress/TaskProgress";

export const TaskDetails = ({navigation}) => {
    const route = useRoute();
    const { taskId } = route.params;

    const [hideButton, setHideButton] = useState(false);

    console.log("TaskDetails --> " + taskId)


    const { getTask, setDone } = useContext(TaskContext);

    console.log(getTask(taskId)[0])

    const {id, title, description, type, taskStatus, created_at, updated_at, color} = getTask(taskId)[0];

    const typeName = getTypeNameViaId(type, taskTypes);

    let deadline = ''

    const deadlineType = () => {

        if(typeName === 'С датой окончания'){
            let date = ''
            for(let obj of deadlines){
                if(obj.taskId === id){
                    date = obj.deadline
                    console.log("date --> " + date)
                }
            }
            return(
                <>
                    <Text style={styles.text}>Дата окончания: {formatUnixTime(date)}</Text>
                    <TaskProgress taskId={id} />
                </>

            )
        }
    }

   const setButtonHide = () => {
        if(taskStatus === 'Закрыт'){
            setHideButton(true);
        }
   }




    return (
        <SafeAreaView style={styles.container}>
            {/*<Text style={styles.text}>{id}</Text>*/}
            <Text style={styles.text}>Заголовок: {title}</Text>
            <Text style={styles.text}>Описание: {description}</Text>
            <Text style={styles.text}>Тип: {typeName}</Text>
            <Text style={styles.text}>Статус: {taskStatus}</Text>
            <Text style={styles.text}>Дата создания: {formatUnixTime(created_at)}</Text>
            {deadlineType()}

            {taskStatus !== 'Закрыт' && (
                <Button title='Закрыть' onPress={() => setDone(id)} />
            )}

        </SafeAreaView>
    )
}