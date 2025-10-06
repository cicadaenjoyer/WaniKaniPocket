import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { ProgressStyles } from '../styles/progress.styles';

import { SubjectsAPI } from '../api/subjects';
import { AssignmentsAPI } from '../api/assignments';

interface ProgressBarProps {
  level: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ level }) => {
  const [learned, setLearned] = useState(0);
  const [kanji, setKanji] = useState(0);

  useEffect(() => {
    const fetchKanji = async () => {
      try {
        const allLearned = await AssignmentsAPI.getKanjiAssignmentsAtLevel(level);  // get all user seen kanji assignments at curr level
        const allKanji = await SubjectsAPI.getKanjiAtLevel(level);  // get all kanji assignments from site at curr level

        if (allLearned && allKanji) {
          // Calculating the number of mastered kanji by iterating through all kanji assignments
          // a kanji sign is considered 'mastered' if it has an SRS value of 5
          let numLearned = allLearned.data.reduce(
            (sum: number, kanji: { data: { srs_stage: number; }; }) => sum + (kanji?.data?.srs_stage === 5 ? 1 : 0),
            0
          );
          setLearned(numLearned);
          setKanji(allKanji.total_count);
        }
      } catch (e) {
        console.error(e);
      } finally {

      }
    }
    fetchKanji();
  });

  const progress = (learned / kanji) * 100 || 0;

  return (
    <View style={ProgressStyles.bar}>
      <View style={[ProgressStyles.filler, { width: `${progress}%` }]}>
        {progress >= 50 && <Text style={ProgressStyles.label}>{learned} of {kanji} kanji passed</Text>}
      </View>
      {progress < 50 && <Text style={ProgressStyles.label}>{learned} of {kanji} kanji passed</Text>}
    </View>

  );
};

export default ProgressBar;
