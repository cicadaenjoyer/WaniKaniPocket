import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Button } from 'react-native';
import { AuthAPI } from '../api/auth';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from "expo-secure-store";

import { Colors } from '../constants/colors';
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
