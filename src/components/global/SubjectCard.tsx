/**
 * SubjectCard component shows the subject's slug, main reading, and meaning in a condensed
 * card format.
 *
 * @param {SubjectProps} subject - The subject to display.
 * @param {SubjectProps} s_idx - The unique subject view id.
 *
 * @returns {JSX.Element}
 */
import React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/navigation";

// Styling
import { Colors } from "../../constants/colors";

// Interfaces
import { SubjectProps } from "../../interfaces/Subject";

const SubjectCard: React.FC<{ subject: SubjectProps; s_idx: number }> = ({
    subject,
    s_idx,
}) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const goToSubject = (converted_subject: SubjectProps) => {
        navigation.push("Subject", { subject: converted_subject });
    };

    const subject_main_reading =
        subject?.readings?.find((reading) => reading.primary)?.reading || "";
    const subject_main_meaning =
        subject?.meanings?.find((meaning) => meaning.primary)?.meaning || "";

    return (
        <View key={s_idx}>
            <Pressable
                style={{
                    height: "auto",
                    backgroundColor: Colors.HEADER_WHITE,
                    borderColor: Colors.LESSON_GREY,
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 8,
                    borderWidth: 1,
                    alignItems: "center",
                }}
                onPress={() => goToSubject(subject)}
            >
                {/* Main Character/Symbol */}
                <View
                    style={{
                        backgroundColor: subject.fill,
                        borderRadius: 8,
                        paddingVertical: 4,
                        paddingHorizontal: 10,
                    }}
                >
                    <Text
                        style={{
                            color: "#ffffff",
                            fontSize: 24,
                            fontFamily: "NotoSans-Bold",
                        }}
                    >
                        {subject.type === "radical"
                            ? subject?.characters?.[0]
                            : subject?.slug}
                    </Text>
                </View>

                {/* Main Reading */}
                {subject_main_reading && (
                    <Text
                        style={{
                            color: Colors.BASIC_BLACK,
                            fontFamily: "NotoSans-Regular",
                            fontSize: 13,
                        }}
                    >
                        {subject_main_reading}
                    </Text>
                )}

                {/* Main Meaning */}
                {subject_main_meaning && (
                    <Text
                        style={{
                            color: Colors.READING_HIGHLIGHT_FILL,
                            fontFamily: "NotoSans-Regular",
                            fontSize: 13,
                        }}
                    >
                        {subject_main_meaning}
                    </Text>
                )}
            </Pressable>
        </View>
    );
};

export default SubjectCard;
