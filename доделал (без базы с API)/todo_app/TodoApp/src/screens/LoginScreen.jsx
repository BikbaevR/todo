import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import API from '../utils/api'; // Путь к вашему API файлу
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await API.post('token/', {
                username: username,
                password: password,
            });

            const { access } = response.data;

            console.log(access);

            await AsyncStorage.setItem('token', access);

            Alert.alert('Авторизация успешна');

            navigation.navigate('Todos');
        } catch (error) {
            Alert.alert('Ошибка авторизации', error.response?.data?.detail || 'Невозможно авторизоваться');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Войти" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10, borderRadius: 5 },
});

export default LoginScreen;
