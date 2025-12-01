import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import AppNavigator from "./src/navigation/app.navigator";

const App = () => {
    const [fontsLoaded] = useFonts({
        "NotoSans-Regular": require("./assets/fonts/NotoSans-Regular.ttf"),
        "NotoSans-Bold": require("./assets/fonts/NotoSans-Bold.ttf"),
        "NotoSans-Light": require("./assets/fonts/NotoSans-Light.ttf"),
    });

    if (!fontsLoaded) {
        // Return a simple placeholder while fonts load
        return (
            <SafeAreaView style={styles.container}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text>Loading fonts...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <AppNavigator />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
