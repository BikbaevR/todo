import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import API from '../utils/api';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await API.post('register/', {
        username: username,
        password: password,
      });
      Alert.alert('Регистрация успешна');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Ошибка регистрации', error.response?.data?.detail || 'Невозможно зарегистрировать пользователя');
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
        <Button title="Зарегистрироваться" onPress={handleRegister} />
        <Button
            title="Уже есть аккаунт? Войти"
            onPress={() => navigation.navigate('Login')}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10, borderRadius: 5 },
});

export default RegisterScreen;
