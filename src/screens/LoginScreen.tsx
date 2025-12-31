/**
 * @file LoginScreen.tsx
 * @description
 *   Login screen for Tabi.
 *   Allows the user to enter their API token and handles authentication.
 *   Redirects to Home if a valid token is already stored.
 */

import React, { useState } from "react";
import {
    View,
    SafeAreaView,
    TextInput,
    Linking,
    Text,
    Image,
    Pressable,
} from "react-native";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/navigation";

// API
import { AuthAPI } from "../api/auth";
import * as SecureStore from "expo-secure-store";

// Styling
import { LoginStyles as styles } from "../styles/globals";

const SIGNUP_URL = "https://www.wanikani.com/signup";

const LoginScreen = () => {
    const [token, setToken] = useState("");
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const hasToken = SecureStore.getItem("WK_TOKEN");
    const { width, height } = useWindowDimensions();

    if (hasToken) navigation.navigate("Home");

    const goToSignUp = async (url: string) => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            console.error(`Error: Cannot open URL ${url}`);
        }
    };

    const handleLogin = async () => {
        await AuthAPI.login(token);
        const has_token = SecureStore.getItem("WK_TOKEN");

        if (has_token) navigation.navigate("Home");
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Main Graphic */}
            <Image
                source={require("../assets/images/login/sign_in.png")}
                style={{
                    ...styles.banner,
                    height: height * 0.15,
                }}
            />

            <View style={{ gap: 20, width: "65%" }}>
                {/* API Token Text Box */}
                <View>
                    <Text style={styles.label}>API Token</Text>
                    <TextInput style={styles.input} onChangeText={setToken} />
                </View>

                {/* Login Button */}
                <Pressable style={styles.submit} onPress={handleLogin}>
                    <Text style={styles.label}>Login</Text>
                </Pressable>
            </View>

            {/* Divider Graphic */}
            <View style={styles.divider} />

            {/* Sign Up Link */}
            <Pressable onPress={() => goToSignUp(SIGNUP_URL)}>
                <Text style={styles.hyperlink}>Sign Up</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default LoginScreen;
