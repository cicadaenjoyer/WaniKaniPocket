import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const LoginScreen = () => {
  return (
        <View style={styles.container}>
            <Text>This is the login screen</Text>
            <StatusBar style="auto" />
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
