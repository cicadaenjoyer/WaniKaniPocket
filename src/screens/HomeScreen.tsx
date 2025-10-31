/**
 * @file HomeScreen.tsx
 * @description
 *   Main home screen for WaniKaniPocket.
 *   Displays the app banner, assignment and review dashboard cards, and the user's progress and current level.
 */

import React, { useState, useEffect } from "react";
import { View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// API
import { UserAPI } from "../api/user";

// Components
import Reviews from "../components/home/dashboard/Reviews";
import Assignments from "../components/home/dashboard/Assignments";
import ProgressSection from "../components/home/progress/ProgressSection";

import { HomeStyles } from "../styles/globals";

const HomeScreen = () => {
    const [userLevel, setUserLevel] = useState(0);
    const [userPref, setUserPref] = useState({});

    useEffect(() => {
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
        fetchUser();
    }, []);

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
                        <Assignments
                            label="Assignments"
                            userPref={userPref}
                        ></Assignments>
                        <Reviews label="Reviews"></Reviews>
                    </View>

                    {/* Current Level & Radical/Kanji Progress */}
                    <ProgressSection label="Progress" userLevel={userLevel} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
