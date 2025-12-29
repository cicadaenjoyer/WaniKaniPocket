/**
 * SubjectSelector component acts as the button to change the current subject on
 * the Lessons screen.
 *
 * @param {SubjectProps} subject - The subject to display.
 *
 * @returns {JSX.Element}
 */
import React from "react";
import { View, Text, Pressable } from "react-native";

// Styling
import { LessonNavigatorStyles as styles } from "../../styles/lesson/lesson.navigator.styles";

// Interfaces
import { SubjectProps } from "../../interfaces/Subject";

const SubjectSelector: React.FC<{
    subject: SubjectProps;
    onSelect: (subject: SubjectProps) => void;
}> = ({ subject, onSelect }) => {
    return (
        <Pressable
            style={styles.subject_button_view}
            onPress={() => onSelect(subject)}
        >
            {/* Main Character/Symbol */}
            <View
                style={{
                    ...styles.slug,
                    backgroundColor: subject.fill,
                }}
            >
                <Text style={styles.slug_text}>
                    {subject.type === "radical"
                        ? subject?.characters?.[0]
                        : subject?.slug}
                </Text>
            </View>
        </Pressable>
    );
};

export default SubjectSelector;
