import {View, Text, TextInput, Alert, TouchableOpacity} from "react-native";
import { styles } from "./Style";
import {useContext, useState} from "react";
import {AuthContext} from "../../contexts/user/UserProvider";
import { logger } from '../../scripts/logger'

export const Login = () => {

    const [loginValue, setLogin] = useState('');
    const [passwordValue, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const [error, setError] = useState('');

    const clearFields = () => {
        setLogin('')
        setPassword('')
    }

    const viewError = () => {
        setError('Не верные логин или пароль')
        setTimeout(() => {
            setError('')
        }, 5000)
    }

    const handleSubmit = () => {
        logger.writeLog("Login.handleSubmit | " + loginValue + " | " + passwordValue);

        if (!loginValue.trim() || !passwordValue.trim()) {
            Alert.alert('Ошибка', 'Все поля должны быть заполнены!');
            return;
        }

        let loginResult = login({ loginValue, passwordValue })

        if(!loginResult){
            clearFields()
            viewError()
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.mainText}>Авторизация</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Логин'
                    value={loginValue}
                    onChangeText={setLogin}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Пароль'
                    value={passwordValue}
                    onChangeText={setPassword}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Войти</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.errorText}>{error}</Text>

            </View>
        </View>
    )
}