/**
 * @file LoginScreen.tsx
 * @description
 *   Login screen for WaniKaniPocket.
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
import { LoginStyles } from "../styles/globals";
import { Colors } from "../constants/colors";

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

    return (
        <SafeAreaView style={LoginStyles.container}>
            {/* Main Graphic */}
            <Image
                source={require("../../assets/images/login/sign_in.png")}
                style={{
                    width: "90%",
                    height: height * 0.15,
                    resizeMode: "contain",
                }}
            />

            <View style={{ gap: 20, width: "65%" }}>
                {/* API Token Text Box */}
                <View>
                    <Text style={LoginStyles.label}>API Token</Text>
                    <TextInput
                        style={LoginStyles.input}
                        onChangeText={setToken}
                    />
                </View>

                {/* Login Button */}
                <Pressable
                    style={LoginStyles.submit}
                    onPress={() => AuthAPI.login(token)}
                >
                    <Text style={LoginStyles.label}>Login</Text>
                </Pressable>
            </View>

            {/* Divider Graphic */}
            <View
                style={{
                    height: 1.5,
                    width: "65%",
                    backgroundColor: Colors.OPTIONS_GREY,
                    margin: 20,
                }}
            />

            {/* Sign Up Link */}
            <Pressable onPress={() => goToSignUp(SIGNUP_URL)}>
                <Text style={LoginStyles.hyperlink}>Sign Up</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default LoginScreen;
