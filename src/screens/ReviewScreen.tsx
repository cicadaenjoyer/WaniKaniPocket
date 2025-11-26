/**
 * @file ReviewScreen.tsx
 * @description
 *   Subject review screen for WaniKaniPocket.
 */

import React, { useState, useEffect, useRef } from "react";
import { Text, View, ScrollView, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/navigation"; // adjust path as needed

// Components
import WanaKanaInput, {
    WanaKanaInputRef,
} from "../components/global/WanaKanaInput";

// Styles
import { ReviewStyles } from "../styles/globals";
import { Colors } from "../constants/colors";

interface Subject {
    fill: string;
    type: string;
    q_type: "meaning" | "reading";
    slug: string;
    characters: Array<string>;
    readings: Array<{ reading: string; meaning: string }>;
    meanings: Array<{ reading: string; meaning: string }>;
}

const ReviewScreen = (nav: {
    route: { params: { subjects: Array<Subject | null> } };
}) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { width, height } = useWindowDimensions();
    const inputRef = useRef<WanaKanaInputRef>(null);

    const subjects = nav.route.params.subjects;

    const [subject, setSubject] = useState<Subject | null>(null);
    const [txt_box_fill, setTxtBoxFill] = useState(Colors.HEADER_WHITE);
    const [txt_fill, setTxtFill] = useState(Colors.BASIC_BLACK);
    const [submitted, setSubmitted] = useState(false);
    const [init_size, _] = useState(subjects.length);
    const [progress, setProgress] = useState(0);

    const submitResponse = (event: { nativeEvent: { key: string } }) => {
        if (event.nativeEvent.key === "Enter") {
            const is_valid = inputRef.current?.isValid();

            if (is_valid) {
                const is_correct = inputRef.current?.isCorrect();

                // TODO: make text unchangeable, undim box
                setTxtFill(Colors.HEADER_WHITE);
                if (is_correct) {
                    setTxtBoxFill(Colors.CORRECT_GREEN);
                } else {
                    setTxtBoxFill(Colors.INCORRECT_RED);
                    const idx = Math.floor(Math.random() * subjects.length);
                    subjects.splice(idx, 0, subject);
                }
                setSubmitted(true);
            }
        }
    };

    const nextSubject = () => {
        if (subjects.length === 0) {
            setSubject(null);
            return;
        }

        // Reset current subject props
        setSubject(subjects.pop() || null);
        setSubmitted(false);

        // Update progress meter
        setProgress((1 - subjects.length / init_size) * 100);

        // Reset text box props
        setTxtBoxFill(Colors.HEADER_WHITE);
        setTxtFill(Colors.BASIC_BLACK);
        inputRef.current?.clear();
    };

    // Getting the first subject from array
    useEffect(() => {
        nextSubject();
    }, []);

    // Go back to Home screen once all subjects have been studied
    useEffect(() => {
        if (subjects.length === 0) {
            navigation.navigate("Home");
        }
    }, [subject, subjects.length, navigation]);

    // NOTE: Replace with better loading screen
    if (!subject) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View>
                    <Text>Loading...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                {/* Progression Bar */}
                <View
                    style={{
                        width: "100%",
                        height: "2.5%",
                        backgroundColor: Colors.BASIC_BLACK,
                        flexDirection: "row",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: Colors.HEADER_WHITE,
                            height: "100%",
                            width: `${progress}%`,
                        }}
                    />
                </View>

                {/* Subject Character */}
                <View
                    style={[
                        ReviewStyles.subject_container,
                        {
                            backgroundColor: subject.fill,
                            height: height * 0.17,
                            width: width,
                        },
                    ]}
                >
                    <Text
                        style={{
                            ...ReviewStyles.subject_text,
                            fontSize: height * 0.08,
                        }}
                    >
                        {subject.characters[0]}
                    </Text>
                </View>

                {/* Subject Type */}
                <View
                    style={[
                        ReviewStyles.subject_container,
                        {
                            backgroundColor:
                                subject.type === "vocabulary"
                                    ? "#000000"
                                    : Colors.OPTIONS_GREY,
                            height: height * 0.05,
                            width: width,
                        },
                    ]}
                >
                    <Text
                        style={{
                            ...ReviewStyles.subject_text,
                            fontSize: height * 0.015,
                            color:
                                subject.type === "vocabulary"
                                    ? "#ffffff"
                                    : "#000000",
                            fontFamily: "NotoSans-Bold",
                        }}
                    >
                        {subject.type.charAt(0).toUpperCase() +
                            subject.type.slice(1)}{" "}
                        {subject.q_type === "meaning" ? "Meaning" : "Reading"}
                    </Text>
                </View>

                {/* Text Box */}
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <WanaKanaInput
                        ref={inputRef}
                        style={{
                            ...ReviewStyles.input,
                            height: height * 0.045,
                            backgroundColor: txt_box_fill,
                            color: txt_fill,
                        }}
                        placeholder="Your Response"
                        q_type={subject.q_type}
                        answers={subject.readings || subject.meanings}
                        onKeyPress={submitResponse}
                    />
                    {submitted && (
                        <Button
                            color={"#000000"}
                            title="˃"
                            onPress={nextSubject}
                        />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ReviewScreen;
