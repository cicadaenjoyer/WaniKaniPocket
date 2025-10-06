import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, Pressable, LayoutChangeEvent } from 'react-native';

import { UserAPI } from '../api/user';
import { HomeStyles } from '../styles/globals';
import { HomeButtonStyles } from '../styles/homebutton.styles';
import { Colors } from '../constants/colors';

import ButtonText from './ButtonText';
import ProgressBar from './ProgressBar';

interface ProgressViewProps {
  label: string
}

const ProgressView: React.FC<ProgressViewProps> = ({ label }) => {
  const [userLevel, setUserLevel] = useState(0);
  // const [assignmentCount, setAssignmentCount] = useState(0);
  // const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  // const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await UserAPI.getUserInfo();
        if (user) {
          setUserLevel(user.data.level);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  });

  // const onLayout = (event: LayoutChangeEvent) => {
  //     const { width, height } = event.nativeEvent.layout;
  //     setContainerSize({ width, height });
  // };
  // const maxWidth = containerSize.width * 0.5; // 50% of container width
  // const maxHeight = containerSize.height * 0.75; // 75% of container height

  if (loading) {
      return (
          <View style={[HomeStyles.progress_container, { justifyContent: 'center', alignItems: 'center' }]}>
          </View>
      );
  }

  return (
    <View style={HomeStyles.progress_container}>
      <Text>Level {userLevel} Progress</Text>
      <ProgressBar level={userLevel}/>
    </View>
  );
}

export default ProgressView;