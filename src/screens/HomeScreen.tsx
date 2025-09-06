import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

const HomeScreen = () => {
  return (
  <SafeAreaView style={styles.container}>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF0000',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default HomeScreen;
