import React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../navigation/navigation";

// Utils
import { C_Utils } from "../../../utils/convert";

// Interfaces
import { RawSubjectProps } from "../../../interfaces/RawSubject";

// Styling
import { Colors } from "../../../constants/colors";
import { ProgressStyles } from "../../../styles/home/progress.styles";

interface SubjectProps {
    type: "radicals" | "kanji";
    subject: RawSubjectProps;
}

const typeColors: Record<"radicals" | "kanji", string> & { default: string } = {
    radicals: Colors.RADICAL_BLUE,
    kanji: Colors.KANJI_PINK,
    default: Colors.OPTIONS_GREY,
};

const Subject: React.FC<SubjectProps> = ({ type, subject }) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const characterColor =
        subject.srs_stage === 0
            ? Colors.OPTIONS_GREY
            : typeColors[type] || typeColors.default;

    const goToSubject = () => {
        const converted_subject = C_Utils.convertSubject(subject)?.[0];
        navigation.navigate("Subject", { subject: converted_subject });
    };

    return (
        <View style={ProgressStyles.subject}>
            {/* Subject Text and Background */}
            <Pressable
                style={[
                    ProgressStyles.subject_character,
                    { backgroundColor: characterColor },
                ]}
                onPress={goToSubject}
            >
                <Text style={{ color: "#ffffff", fontFamily: "NotoSans-Bold" }}>
                    {subject?.data?.characters || "?"}
                </Text>
            </Pressable>

            {/* SRS Progression */}
            <View style={ProgressStyles.subject_bar}>
                <View
                    style={[
                        ProgressStyles.subject_bar_filler,
                        {
                            width: `${
                                Math.min(subject.srs_stage / 5, 1) * 100
                            }%`,
                        },
                    ]}
                />
            </View>
        </View>
    );
};

export default Subject;
