/**
 * @file ProgressSection.tsx
 * @description
 *   Displays the user's current level and a progress bar for kanji mastery at that level.
 *   Fetches user info on mount to determine the current level, then renders a Progress Bar.
 *
 *   - Fetches user level from UserAPI on mount.
 *   - Renders the level and a Progress Bar for that level.
 *   - Handles loading state.
 *
 * @module components/home/progress/ProgressSection
 */

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

// Styling
import { HomeStyles } from '../../../styles/globals';

// API
import { UserAPI } from '../../../api/user';

// Components
import Bar from './Bar';

interface ProgressSectionProps {
  label: string
}

const ProgressSection: React.FC<ProgressSectionProps> = ({ label }) => {
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
      <Bar level={userLevel}/>
    </View>
  );
}

export default ProgressSection;