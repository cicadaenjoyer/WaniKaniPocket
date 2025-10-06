/**
 * @file ProgressView.tsx
 * @description
 *   Displays the user's current level and a progress bar for kanji mastery at that level.
 *   Fetches user info on mount to determine the current level, then renders a ProgressBar.
 *
 *   - Fetches user level from UserAPI on mount.
 *   - Renders the level and a ProgressBar for that level.
 *   - Handles loading state.
 *
 * @module components/home/progress/ProgressView
 */

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

// Styling
import { HomeStyles } from '../../../styles/globals';

// API
import { UserAPI } from '../../../api/user';

// Components
import ProgressBar from './ProgressBar';

interface ProgressViewProps {
  label: string
}

const ProgressView: React.FC<ProgressViewProps> = ({ label }) => {
  const [userLevel, setUserLevel] = useState(0);
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

  // Default loading state view
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