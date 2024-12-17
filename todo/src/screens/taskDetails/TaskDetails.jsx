import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native'
import {useContext} from "react";
import {TaskContext} from "../../contexts/task/TaskProvider";
import {styles} from "../../components/card/Style";
import { useRoute } from '@react-navigation/native';
import {taskTypes} from "../../classes/taskType";

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
            <Text style={styles.text}>{id}</Text>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.text}>{description}</Text>
            <Text style={styles.text}>{getTypeNameViaId(type)}</Text>
            <Text style={styles.text}>{taskStatus}</Text>
            <Text style={styles.text}>{created_at}</Text>
            <Text style={styles.text}>{updated_at}</Text>
        </SafeAreaView>
    )
}