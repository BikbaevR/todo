import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { useContext } from "react";
import { TaskContext } from '../../contexts/task/TaskProvider'
import { styles } from './Style'
import { useNavigation } from '@react-navigation/native';
import {taskTypes} from "../../classes/taskType";

export const TaskCard = ({ id, title, description, type, taskStatus, created_at, updated_at, color }) => {
    const { removeTask } = useContext(TaskContext);
    const navigation = useNavigation();



    const handleDelete = () => {
        removeTask(id)
    };

    const openDetails = () => {
        navigation.navigate('Details', { taskId: id});

    }

    const getTypeNameViaId = (typeId) => {
        for(let typeObj of taskTypes){
            if(typeObj.id === typeId){
                return typeObj.typeName;
            }
        }
    }

    return (

        <TouchableOpacity style={styles.button} onPress={openDetails}>
            <View style={[styles.container, { backgroundColor: color,}]} key={id}>
                {/*<Text style={styles.text}>{id}</Text>*/}
                <Text style={styles.textTitle}>{title}</Text>
                {/*<Text style={styles.text}>{description}</Text>*/}
                <Text style={styles.text}>{getTypeNameViaId(type)}</Text>
                <Text style={styles.text}>{taskStatus}</Text>
                {/*<Text style={styles.text}>{created_at}</Text>*/}
                {/*<Text style={styles.text}>{updated_at}</Text>*/}
                {/*<Button title='Удалить' onPress={handleDelete}*/}
            </View>
        </TouchableOpacity>



    );
};