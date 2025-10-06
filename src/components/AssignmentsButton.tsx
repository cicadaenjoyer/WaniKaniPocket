import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, Pressable, LayoutChangeEvent} from 'react-native';

import { AssignmentsAPI } from '../api/assignments';
import { HomeStyles } from '../styles/globals';
import { HomeButtonStyles } from '../styles/homebutton.styles';
import { Colors } from '../constants/colors';

import ButtonText from './ButtonText';

interface LessonsButtonProps {
    label: string
}

const AssignmentsButton: React.FC<LessonsButtonProps> = ({ label }) => {
    const [assignmentCount, setAssignmentCount] = useState(0);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const result = await AssignmentsAPI.getAssignments();
                if (result) {
                    setAssignmentCount(result.total_count);
                    setAuthorized(true);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchAssignments();
    }, []);

    const onLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setContainerSize({ width, height });
    };
    const maxWidth = containerSize.width * 0.5; // 50% of container width
    const maxHeight = containerSize.height * 0.75; // 75% of container height

    if (loading) {
        return (
            <View style={[HomeStyles.review_box, { justifyContent: 'center', alignItems: 'center' }]}>
            </View>
        );
    }

  return (
    <Pressable
      style={[
        HomeStyles.review_box,
        authorized ? { backgroundColor: Colors.KANJI_PINK } : { backgroundColor: 'gray' },
      ]}
      onLayout={onLayout}
    >
      <View style={HomeButtonStyles.count}>
        <ButtonText>Assignments {assignmentCount}</ButtonText>
        <ButtonText>We cooked up these lessons just for you.</ButtonText>
      </View>

      <View style={HomeButtonStyles.icon}>
        {containerSize.width > 0 && (
          <Image
            source={require('../assets/images/buttons/lessons_crab.png')}
            style={{
              width: maxWidth,
              height: maxHeight,
              resizeMode: 'contain',
            }}
          />
        )}
      </View>
      
      <View style={HomeButtonStyles.button_container}>
        <Pressable style={HomeButtonStyles.button}>
          <ButtonText style={{color: 'black'}}>Start Lessons</ButtonText>
        </Pressable>
      </View>
    </Pressable>
  );
}

export default AssignmentsButton;