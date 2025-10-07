/**
 * @file HomeScreen.tsx
 * @description
 *   Main home screen for WaniKaniPocket.
 *   Displays the app banner, assignment and review dashboard cards, and the user's progress and current level.
 */

import React from 'react';
import { View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import Reviews from '../components/home/dashboard/Reviews';
import Assignments from '../components/home/dashboard/Assignments';
import ProgressSection from '../components/home/progress/ProgressSection';

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

      <ProgressSection label='Progress'/>

    </SafeAreaView>
  );
}

export default HomeScreen;
