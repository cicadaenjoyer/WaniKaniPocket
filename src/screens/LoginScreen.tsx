import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Button } from 'react-native';
import { AuthAPI } from '../api/auth';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from "expo-secure-store";

const LoginScreen = () => {
  const [token, setToken] = useState('');
  const navigation = useNavigation();
  const hasToken = SecureStore.getItem('WK_TOKEN');

  if (hasToken) navigation.navigate('Home');

  return (
  <SafeAreaView style={styles.container}>
    <TextInput style={styles.input}
      placeholder="API Token"
      onChangeText={setToken}
    />
    <Button title="Login" onPress={() => AuthAPI.login(token)} />
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    margin: 12,
    padding: 10,
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderWidth: 1,
  },
});

export default LoginScreen;
