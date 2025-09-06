import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from "expo-secure-store";
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {
    const hasToken = SecureStore.getItem('WK_TOKEN');
    const initialRoute = hasToken ? 'Home' : 'Login';

    return (
    <NavigationContainer>
        <Navigator initialRouteName={initialRoute} screenOptions={navigatorOptions}>
            <Screen name='Home' component={HomeScreen}></Screen>
            <Screen name='Login' component={LoginScreen}></Screen>
        </Navigator>
    </NavigationContainer>
    )
}

const navigatorOptions = {
    headerShown: false
}

export default AppNavigator
