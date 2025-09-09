import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HomeStyles } from '../styles/globals';

const HomeScreen = () => {
  return (
    <SafeAreaView style={HomeStyles.container}>
      <View style={HomeStyles.header_container}>
      </View>
      <View style={HomeStyles.review_container}>
        <View style={HomeStyles.review_box}/>
        <View style={HomeStyles.review_box}/>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
