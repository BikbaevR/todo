import { View, Text, StyleSheet, Button } from 'react-native';
import { useContext } from "react";
import { TaskContext } from '../../contexts/task/TaskProvider'
import { styles } from './Style'

export const TaskCard = ({ id, title, description, type, taskStatus, created_at, updated_at, color }) => {
    const { removeTask } = useContext(TaskContext);

    const handleDelete = () => {
        removeTask(id)

    };

    return (
        <View style={[styles.container, { backgroundColor: color,}]} key={id}>
            <Text style={styles.text}>{id}</Text>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.text}>{description}</Text>
            <Text style={styles.text}>{type}</Text>
            <Text style={styles.text}>{taskStatus}</Text>
            <Text style={styles.text}>{created_at}</Text>
            <Text style={styles.text}>{updated_at}</Text>
            {/*<Button title='Удалить' onPress={handleDelete}*/}
        </View>
    );
};