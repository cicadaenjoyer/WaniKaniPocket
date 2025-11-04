/**
 * @file ReviewScreen.tsx
 * @description
 *   Subject review screen for WaniKaniPocket.
 */

import React, { useState, useEffect } from "react";
import { Text, TextInput, View, ScrollView, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Styles
import { ReviewStyles } from "../styles/globals";
import { Colors } from "../constants/colors";

const ReviewScreen = (nav: {}) => {
    const navigation = useNavigation();
    const { width, height } = useWindowDimensions();

    const [subject, setSubject] = useState<{
        fill: string;
        type: string;
        slug: string;
        characters: Array<string>;
    } | null>(null);

    let subjects = nav.route.params.subjects.data;

    const nextSubject = () => {
        if (subjects.length === 0) {
            setSubject(null);
            return;
        }

        const subjectRaw = subjects.pop();

        const subject = {
            fill: "",
            type: subjectRaw.object,
            slug: subjectRaw.data.slug,
            characters: subjectRaw.data.characters,
        };

        switch (subject.type) {
            case "radical":
                subject.fill = Colors.RADICAL_BLUE;
                break;
            case "kanji":
                subject.fill = Colors.KANJI_PINK;
                break;
            case "vocabulary":
                subject.fill = Colors.VOCAB_PURPLE;
                break;
        }

        setSubject(subject);
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
                        Meaning
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
                    <TextInput
                        style={{
                            ...ReviewStyles.input,
                            height: height * 0.045,
                        }}
                        placeholder="Your Response"
                    />
                    <Button color={"#000000"} title="˃" onPress={nextSubject} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ReviewScreen;
