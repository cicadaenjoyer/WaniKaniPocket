/**
 * @file LessonsScreen.tsx
 * @description
 *  Screen dedicated to learning new Subjects. Displays Subjects in batches of
 *  five
 */
import React, { useState, useEffect, useRef } from "react";
import { Text, View, ScrollView, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/navigation";

// Interfaces
import { SubjectProps } from "../interfaces/Subject";

const LessonScreen = (nav: {
    route: { params: { subjects: Array<SubjectProps> } };
}) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { width, height } = useWindowDimensions();

    return <SafeAreaView style={{ flex: 1 }}></SafeAreaView>;
};

export default LessonScreen;
