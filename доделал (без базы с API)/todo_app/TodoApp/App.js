import React, {useEffect, useState} from 'react';
import {AppNavigator} from './src/navigation/AppNavigator';
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                setIsAuthenticated(true);
            }
        };

        checkAuthentication();
    }, []);

    return (
        <AppNavigator/>
    )
}
export default App;
