import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {CreateTask} from "../../screens/createTask/CreateTask";
import {Home} from "../../screens/home/Home";
import {TaskDetails} from "../../screens/taskDetails/TaskDetails";

export const Stack = () => {

    const HomeStack = createStackNavigator();

    return (
        <HomeStack.Navigator id='stacks' screenOptions={{ headerShown: false, tabBarIcon: () => null }} initialRouteName='Home'>
            <HomeStack.Screen name="Home" component={Home} />
            <HomeStack.Screen name="CreateTask" component={CreateTask} />
            <HomeStack.Screen name="Details" component={TaskDetails} />
        </HomeStack.Navigator>
    );
}
