import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { RootStackParamList } from "../navigation/navigation";

const Stack = createStackNavigator<RootStackParamList>();

// Screens
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ReviewScreen from "../screens/ReviewScreen";
import SubjectScreen from "../screens/SubjectScreen";

const AppNavigator = () => {
    const hasToken = SecureStore.getItem("WK_TOKEN");
    const initialRoute = hasToken ? "Home" : "Login";

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={initialRoute}
                screenOptions={navigatorOptions}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Review" component={ReviewScreen} />
                <Stack.Screen name="Subject" component={SubjectScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const navigatorOptions = {
    headerShown: false,
};

export default AppNavigator;
