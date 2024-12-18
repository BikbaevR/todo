import { styles } from './Style'
import {TouchableOpacity, View, Text, SafeAreaView, ScrollView, Button} from "react-native";
import {TaskContext} from "../../contexts/task/TaskProvider";
import {useContext, useEffect} from "react";
import {TaskCard} from "../../components/card/TaskCard";
import {AuthContext} from "../../contexts/user/UserProvider";

export const Home = ({ navigation }) => {

    const { tasks, addTask } = useContext(TaskContext);
    const { authorized, user, logout } = useContext(AuthContext);

    // useEffect(() => {
    //     createUserTable();
    // }, []);

    return (
        <>
        <ScrollView contentContainerStyle={{gap: 20}}>
            <SafeAreaView style={styles.container}>

                <Text style={styles.mainText}>Ваши задачи</Text>

                {tasks.length > 0 ? tasks.map((task, index) => (
                        <TaskCard
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            type={task.type}
                            taskStatus={task.taskStatus}
                            created_at={task.created_at}
                            updated_at={task.updated_at}
                            color={task.color}
                            key={index}
                        />
                    )):
                    <Text style={styles.mainText}>Задач нет</Text>
                }
            </SafeAreaView>
        </ScrollView>

            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => navigation.navigate('CreateTask')}
            >
                <Text style={styles.floatingButtonText}>+</Text>
            </TouchableOpacity>

        </>
    );
}