import {Button, Text, TouchableOpacity, View, SafeAreaView} from "react-native";
import React, {useContext} from "react";
import { styles } from './Style'
import {AuthContext} from "../../contexts/user/UserProvider";

export const User = () => {

    const { logout, authorized, user } = useContext(AuthContext);

    return (
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
        </SafeAreaView>

    );
}