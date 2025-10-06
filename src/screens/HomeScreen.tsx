import React from 'react';
import { View, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Reviews from '../components/home/dashboard/Reviews';
import Assignments from '../components/home/dashboard/Assignments';
import ProgressView from '../components/home/progress/ProgressView';

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
        <Assignments label="Assignments"></Assignments>
        <Reviews label="Reviews"></Reviews>
      </View>

      <ProgressView label='Progress'/>

    </SafeAreaView>
  );
}

export default HomeScreen;
