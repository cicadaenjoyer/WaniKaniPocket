/**
 * @file HomeScreen.tsx
 * @description
 *   Main home screen for WaniKaniPocket.
 *   Displays the app banner, assignment and review dashboard cards, and the user's progress and current level.
 */

import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import Reviews from '../components/home/dashboard/Reviews';
import Assignments from '../components/home/dashboard/Assignments';
import ProgressSection from '../components/home/progress/ProgressSection';

import { HomeStyles } from '../styles/globals';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={HomeStyles.container}>

          {/* Menu Bar */}
          <View style={HomeStyles.header_container}>
            <Image
              style={HomeStyles.header_image}
              source={require('../../assets/images/icons/wk_banner_logo.png')}>
            </Image>
          </View>

          {/* Assignments & Reviews Dashboard */}
          <View style={HomeStyles.review_container}>
            <Assignments label="Assignments"></Assignments>
            <Reviews label="Reviews"></Reviews>
          </View>

          {/* Current Level & Radical/Kanji Progress */}
          <ProgressSection label='Progress' />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
