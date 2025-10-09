import React from "react";
import { View, Text } from "react-native";

// Styling
import { Colors } from '../../../constants/colors';
import { ProgressStyles } from '../../../styles/home/progress.styles';

type SubjectType = 'radicals' | 'kanji';

interface SubjectProps {
  type: SubjectType,
  data: { data: { characters: string }, srs_stage: number }
}

const typeColors: Record<SubjectType, string> & { default: string } = {
  radicals: Colors.RADICAL_BLUE,
  kanji: Colors.KANJI_PINK,
  default: Colors.OPTIONS_GREY
};

const Subject: React.FC<SubjectProps> = ({ type, data }) => {

  const characterColor = data.srs_stage === 0 ? Colors.OPTIONS_GREY : (typeColors[type] || typeColors.default);

  return (
    <View style={ProgressStyles.subject}>

      {/* Subject Text and Background */}
      <View style={[ProgressStyles.subject_character, { backgroundColor: characterColor }]}>
        <Text style={{ color: '#ffffff' }}>{data?.data?.characters || '?'}</Text>
      </View>

      {/* SRS Progression */}
      <View style={ProgressStyles.subject_bar}>
        <View style={[ProgressStyles.subject_bar_filler, { width: `${Math.min((data.srs_stage / 5), 1) * 100}%` }]}/>
      </View>

    </View>
  )
}

export default Subject;