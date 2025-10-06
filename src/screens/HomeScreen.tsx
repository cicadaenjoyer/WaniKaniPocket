import React from 'react';
import { View, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ReviewsButton from '../components/ReviewsButton';
import AssignmentsButton from '../components/AssignmentsButton';
import ProgressView from '../components/ProgressView';

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
        <AssignmentsButton label="Assignments"></AssignmentsButton>
        <ReviewsButton label="Reviews"></ReviewsButton>
      </View>

      <ProgressView label='Progress'/>

    </SafeAreaView>
  );
}

export default HomeScreen;
