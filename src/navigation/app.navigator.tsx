import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Navigator initialRouteName='Login' screenOptions={navigatorOptions}>
            <Screen name='Login' component={LoginScreen}></Screen>
        </Navigator>
    </NavigationContainer>
)

const navigatorOptions = {
    headerShown: false
}

export default AppNavigator
