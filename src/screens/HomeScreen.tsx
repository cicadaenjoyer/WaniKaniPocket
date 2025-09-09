import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HomeStyles } from '../styles/globals';

const HomeScreen = () => {
  return (
    <SafeAreaView style={HomeStyles.container}>
      <View style={HomeStyles.header_container}>
        <Image 
          style={HomeStyles.header_image}
          source={require('../assets/images/icons/wk_banner_logo.png')}>
        </Image>
      </View>
      <View style={HomeStyles.review_container}>
        <View style={HomeStyles.review_box}/>
        <View style={HomeStyles.review_box}/>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
