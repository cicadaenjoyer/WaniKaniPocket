/**
 * @file LoginScreen.tsx
 * @description
 *   Login screen for WaniKaniPocket.
 *   Allows the user to enter their API token and handles authentication.
 *   Redirects to Home if a valid token is already stored.
 */

import React, { useState } from 'react';
import { SafeAreaView, TextInput, Button } from 'react-native';
import { AuthAPI } from '../api/auth';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from "expo-secure-store";

// Styling
import { LoginStyles } from '../styles/globals';

const LoginScreen = () => {
  const [token, setToken] = useState('');
  const navigation = useNavigation();
  const hasToken = SecureStore.getItem('WK_TOKEN');

  if (hasToken) navigation.navigate('Home');

  return (
  <SafeAreaView style={LoginStyles.container}>
    <TextInput style={LoginStyles.input}
      placeholder="API Token"
      onChangeText={setToken}
    />
    <Button title="Login" onPress={() => AuthAPI.login(token)} />
  </SafeAreaView>
  );
}

export default LoginScreen;
