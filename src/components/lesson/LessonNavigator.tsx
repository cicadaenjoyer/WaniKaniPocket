/**
 * LessonNavigator component houses SubjectSelector child components and the button to
 * move onto review.
 *
 * @param {SubjectProps} subjects - The subjects to display.
 *
 * @returns {JSX.Element}
 */
import React from "react";
import { View, Text, Pressable } from "react-native";

// Components
import SubjectSelector from "./SubjectSelector";

// Styling
import { LessonNavigatorStyles as styles } from "../../styles/lesson/lesson.navigator.styles";

// Interfaces
import { SubjectProps } from "../../interfaces/Subject";

const LessonNavigator: React.FC<{
    subjects: Array<SubjectProps>;
    onSelectSubject: (subject: SubjectProps) => void;
}> = ({ subjects, onSelectSubject }) => {
    return (
        <View style={styles.navigator}>
            {/* Subjects */}
            {subjects.map((subject, idx) => {
                return (
                    <View key={idx}>
                        <SubjectSelector
                            subject={subject}
                            onSelect={onSelectSubject}
                        />
                    </View>
                );
            })}

            {/* Go To Review/Quiz Button */}
            <Pressable
                style={styles.reviews}
                onPress={() => console.log("Go to Reviews screen!")}
            >
                <Text style={styles.slug_text}>Quiz</Text>
            </Pressable>
        </View>
    );
};

export default LessonNavigator;
