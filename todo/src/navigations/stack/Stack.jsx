import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {CreateTask} from "../../screens/createTask/CreateTask";
import {Home} from "../../screens/home/Home";

export const Stack = () => {

    const HomeStack = createStackNavigator();

    return (
        <HomeStack.Navigator id='stacks' screenOptions={{ headerShown: false, tabBarIcon: () => null }} initialRouteName='Home'>
            <HomeStack.Screen name="Home" component={Home} />
            <HomeStack.Screen name="CreateTask" component={CreateTask} />
        </HomeStack.Navigator>
    );
}
