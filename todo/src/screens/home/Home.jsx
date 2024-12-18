import { styles } from './Style'
import {TouchableOpacity, View, Text, SafeAreaView, ScrollView, Button} from "react-native";
import {TaskContext} from "../../contexts/task/TaskProvider";
import {useContext} from "react";
import {TaskCard} from "../../components/card/TaskCard";
import {AuthContext} from "../../contexts/user/UserProvider";

export const Home = ({ navigation }) => {

    const { tasks, addTask } = useContext(TaskContext);
    const { authorized, user, logout } = useContext(AuthContext);

    return (
        <>
        <ScrollView contentContainerStyle={{gap: 20}}>
            <SafeAreaView style={styles.container}>

                {authorized ? (
                    <View style={styles.buttonPosition}>
                        <Text>Вы авторизованы - {user}</Text>
                        <View>
                            <TouchableOpacity style={styles.button} onPress={logout}>
                                <Text style={styles.buttonText}>Выйти</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <Text></Text>
                )}

                <Text style={styles.mainText}>Ваши задачи</Text>



                {tasks.length > 0 ? tasks.map((task) => (
                        <TaskCard
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            type={task.type}
                            taskStatus={task.taskStatus}
                            created_at={task.created_at}
                            updated_at={task.updated_at}
                            color={task.color}
                            key={task.id}
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