/**
 * @file Bar.tsx
 * @description
 *   Progress bar component that displays the number of mastered and in-progress kanji items using
 *   a dynamic progress bar. Fetches kanji assignment data for the current level and calculates
 *   the percentage of kanji that have been mastered (SRS stage 5).
 *
 *   - Fetches user's kanji assignments and all kanji for the given level.
 *   - Calculates mastered kanji (SRS stage 5).
 *   - Renders a progress bar with a label showing progress.
 *
 * @returns {JSX.Element} The rendered Progress Bar component.
 */

import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

// Styling
import { ProgressStyles } from '../../../styles/home/progress.styles';

// API
import { SubjectsAPI } from '../../../api/subjects';
import { AssignmentsAPI } from '../../../api/assignments';

interface BarProps {
  level: number
}

const Bar: React.FC<BarProps> = ({ level }) => {
  const [learned, setLearned] = useState(0);
  const [kanji, setKanji] = useState(0);

  useEffect(() => {
    const fetchKanji = async () => {
      try {
        // Get all user-seen kanji assignments at current level
        const allLearned = await AssignmentsAPI.getKanjiAssignmentsAtLevel(level);
        // Get all kanji assignments from site at current level
        const allKanji = await SubjectsAPI.getKanjiAtLevel(level);

        if (allLearned && allKanji) {
          // Count mastered kanji (SRS stage 5)
          let numLearned = allLearned.data.reduce(
            (sum: number, kanji: { data: { srs_stage: number; }; }) => sum + (kanji?.data?.srs_stage >= 5 ? 1 : 0),
            0
          );
          setLearned(numLearned);
          setKanji(allKanji.total_count);
        }
      } catch (e) {
        console.error(e);
      } finally {
        // No cleanup needed
      }
    }
    fetchKanji();
  });

  // Calculate progress percentage
  const progress = (Math.min(learned / kanji, 1)) * 100 || 0;

  return (
    <View style={ProgressStyles.bar}>
      <View style={[ProgressStyles.filler, { width: `${progress}%` }]}>
        {/* Show label inside bar if progress >= 50% */}
        {progress >= 50 && <Text style={ProgressStyles.label}>{learned} of {kanji} kanji passed</Text>}
      </View>
      {/* Show label outside bar if progress < 50% */}
      {progress < 50 && <Text style={ProgressStyles.label}>{learned} of {kanji} kanji passed</Text>}
    </View>
  );
};

export default Bar;
