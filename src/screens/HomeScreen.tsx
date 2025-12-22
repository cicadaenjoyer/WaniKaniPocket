/**
 * @file HomeScreen.tsx
 * @description
 *   Main home screen for WaniKaniPocket.
 *   Displays assignment and review dashboard cards and the user's progress and current level.
 */

import React, { useState } from "react";
import { View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

// API
import { UserAPI } from "../api/user";
import { AssignmentsAPI } from "../api/assignments";

// Components
import AssignmentCard from "../components/home/dashboard/AssignmentCard";
import ProgressSection from "../components/home/progress/ProgressSection";

import { HomeStyles as styles } from "../styles/globals";

const HomeScreen = () => {
    const [userLevel, setUserLevel] = useState(0);
    const [userPref, setUserPref] = useState({});
    const [lessons, setLessons] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [loading, setLoading] = useState(false);

    // Login and get user level and other preferences
    const fetchUser = async () => {
        try {
            const user = await UserAPI.getUserInfo();
            if (user) {
                setUserLevel(user.data.level);
                setUserPref(user.data.preferences);
            }
        } catch (e) {
            console.error(e);
        }
    };

    // Get all available user lessons
    const fetchLessons = async () => {
        try {
            const lessons = await AssignmentsAPI.getAvailableLessons();
            if (lessons) {
                setLessons(lessons.data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    // Get all available user reviews
    const fetchReviews = async () => {
        try {
            const reviews = await AssignmentsAPI.getAvailableReviews();
            if (reviews) {
                setReviews(reviews.data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    // Refresh the page and its components on back page event
    useFocusEffect(
        React.useCallback(() => {
            fetchUser();
            fetchLessons();
            fetchReviews();
            setLoading(false);
        }, [])
    );

    // Default loading state view
    if (loading) {
        return (
            <View
                style={{
                    ...styles.assignment,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            ></View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.container}>
                    {/* Menu Bar */}
                    <View style={styles.menu}>
                        <Image
                            style={styles.logo}
                            source={require("../assets/images/icons/wk_banner_logo.png")}
                        ></Image>
                    </View>

                    {/* Assignments & Reviews Dashboard */}
                    <View style={styles.dashboard}>
                        {lessons && (
                            <AssignmentCard
                                label="Lessons"
                                assignments={lessons}
                                userPref={userPref}
                            ></AssignmentCard>
                        )}
                        {reviews && (
                            <AssignmentCard
                                label="Reviews"
                                assignments={reviews}
                            ></AssignmentCard>
                        )}
                    </View>

                    {/* Current Level & Radical/Kanji Progress */}
                    <ProgressSection label="Progress" userLevel={userLevel} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
