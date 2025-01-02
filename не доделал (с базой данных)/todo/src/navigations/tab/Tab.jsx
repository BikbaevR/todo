import {NavigationContainer} from "@react-navigation/native";
import React, {useContext} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Stack} from "../stack/Stack";
import {User} from "../../screens/user/User";
import {AuthContext, UserProvider} from "../../contexts/user/UserProvider";
import {Login} from "../../screens/login/Login";
import {SafeAreaView} from "react-native";
import { styles } from "./Style";
import {logger} from "../../scripts/logger";
import {TaskProvider} from "../../contexts/task/TaskProvider";

const TabNavigator = createBottomTabNavigator();

export const Tab = () => {
    return (
        <SafeAreaView style={styles.container}>
            <TaskProvider>
                <UserProvider>
                    <Tabs/>
                </UserProvider>
            </TaskProvider>
        </SafeAreaView>
    );
}

const Tabs = () => {
    const { authorized, getToken } = useContext(AuthContext);

    logger.writeLog("getToken --> " + getToken());
    if (!authorized && !getToken()) {
        return (
            <Login />
        );
    }

    return (
        <NavigationContainer>
            <TabNavigator.Navigator id="tabs" screenOptions={{ headerShown: false, tabBarIcon: () => null }}>
                <TabNavigator.Screen name="Stack" component={Stack} />
                <TabNavigator.Screen name="User" component={User} />
            </TabNavigator.Navigator>
        </NavigationContainer>
    );
}
