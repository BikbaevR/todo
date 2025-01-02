import React, { useState, useEffect } from 'react';
import {View, FlatList, Text, Button, Alert, StyleSheet, TextInput} from 'react-native';
import API from '../utils/api';

const TodoScreen = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    const fetchTodos = async () => {
        try {
            const response = await API.get('todos/'); // Запрос для получения всех задач
            setTodos(response.data);  // Обновляем список задач
        } catch (error) {
            Alert.alert('Ошибка загрузки задач');
        }
    };

    const addTodo = async () => {
        try {
            await API.post('todos/', { title: newTodo, completed: false }); // Добавляем новую задачу
            setNewTodo('');  // Очищаем поле ввода
            fetchTodos();  // Обновляем список задач
        } catch (error) {
            Alert.alert('Ошибка добавления задачи');
        }
    };

    const changeTodoStatus = async (id, completed) => {
        try {
            await API.patch(`todos/${id}/change_status/`, { completed }); // Отправляем PATCH запрос на сервер
            fetchTodos();  // Обновляем список задач
        } catch (error) {
            Alert.alert('Ошибка обновления статуса задачи');
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={todos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.todoItem}>
                        <Text>{item.title}</Text>
                        <Button
                            title={item.completed ? 'Завершено' : 'Не завершено'}
                            onPress={() => changeTodoStatus(item.id, !item.completed)}
                        />
                    </View>
                )}
            />
            <TextInput
                style={styles.input}
                placeholder="Новая задача"
                value={newTodo}
                onChangeText={setNewTodo}
            />
            <Button title="Добавить" onPress={addTodo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    todoItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10, borderRadius: 5 },
});

export default TodoScreen;
