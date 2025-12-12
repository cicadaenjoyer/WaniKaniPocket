/**
 * @file HomeScreen.tsx
 * @description
 *   Main home screen for WaniKaniPocket.
 *   Displays the app banner, assignment and review dashboard cards, and the user's progress and current level.
 */

import React, { useState, useEffect } from "react";
import { View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

// API
import { UserAPI } from "../api/user";
import { AssignmentsAPI } from "../api/assignments";

// Components
import Reviews from "../components/home/dashboard/Reviews";
import Assignments from "../components/home/dashboard/Assignments";
import ProgressSection from "../components/home/progress/ProgressSection";

import { HomeStyles } from "../styles/globals";

const HomeScreen = () => {
    const [userLevel, setUserLevel] = useState(0);
    const [userPref, setUserPref] = useState({});
    const [assignments, setAssignments] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [loading, setLoading] = useState(false);

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
    const fetchAssignments = async () => {
        try {
            const assignments = await AssignmentsAPI.getAssignmentsBatch();
            if (assignments) {
                setAssignments(assignments.data);
            }
        } catch (e) {
            console.error(e);
        }
    };
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
            fetchAssignments();
            fetchReviews();
            setLoading(false);
        }, [])
    );

    // Default loading state view
    if (loading) {
        return (
            <View
                style={[
                    HomeStyles.review_box,
                    { justifyContent: "center", alignItems: "center" },
                ]}
            ></View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={HomeStyles.container}>
                    {/* Menu Bar */}
                    <View style={HomeStyles.header_container}>
                        <Image
                            style={HomeStyles.header_image}
                            source={require("../../assets/images/icons/wk_banner_logo.png")}
                        ></Image>
                    </View>

                    {/* Assignments & Reviews Dashboard */}
                    <View style={HomeStyles.review_container}>
                        {assignments && (
                            <Assignments
                                label="Assignments"
                                assignments={assignments}
                                userPref={userPref}
                            ></Assignments>
                        )}
                        {reviews && (
                            <Reviews
                                label="Reviews"
                                reviews={reviews}
                            ></Reviews>
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
