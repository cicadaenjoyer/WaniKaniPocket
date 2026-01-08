/**
 * @file globals.ts
 * @description
 *   Styles for basic UI elements for each screen (Login, Home, Review, etc).
 */

import { StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    banner: {
        width: "90%",
        resizeMode: "contain",
    },
    label: {
        fontFamily: "NotoSans-Bold",
        fontSize: 13,
        color: Colors.READING_HIGHLIGHT_FILL,
    },
    input: {
        height: 40,
        backgroundColor: Colors.HEADER_WHITE,
        color: Colors.BASIC_BLACK,
        borderColor: Colors.LESSON_GREY,
        borderWidth: 1,
        borderRadius: 5,
    },
    submit: {
        height: 40,
        paddingLeft: 12,
        justifyContent: "center",
        borderColor: Colors.LESSON_GREY,
        borderWidth: 1,
        borderRadius: 5,
        borderBottomWidth: 5,
    },
    divider: {
        height: 1.5,
        width: "65%",
        backgroundColor: Colors.OPTIONS_GREY,
        margin: 20,
    },
    hyperlink: {
        fontFamily: "NotoSans-Regular",
        fontSize: 13,
        color: "#08c",
    },
});

const HomeStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.OPTIONS_GREY,
        flex: 1,
        gap: 20,
        alignItems: "center",
    },
    menu: {
        height: 45,
        width: "100%",
        backgroundColor: Colors.HEADER_WHITE,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderColor: Colors.READING_HIGHLIGHT_BACK,
        borderBottomWidth: 1,
    },
    logo: {
        position: "absolute",
        resizeMode: "contain",
        maxWidth: "30%",
    },
    dashboard: {
        backgroundColor: Colors.OPTIONS_GREY,
        gap: 10,
    },
    progress: {
        backgroundColor: Colors.LESSON_LIGHT_GREY,
        justifyContent: "space-around",
        width: "95%",
        padding: 10,
        gap: 10,
        borderRadius: 10,
    },
    level_header: {
        fontFamily: "NotoSans-Bold",
        fontSize: 14,
    },
    level_subheader: {
        fontFamily: "NotoSans-Regular",
        fontSize: 13,
    },
});

const ReviewStyles = StyleSheet.create({
    subject_container: {
        alignItems: "center",
    },
    subject_text: {
        color: "#ffffff",
        fontFamily: "NotoSans-Regular",
    },
    input: {
        width: "85%",
        margin: 12,
        padding: 10,
        textAlign: "center",
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: 1,
    },
    next: {
        color: "#000000",
    },
});

const LessonStyles = StyleSheet.create({
    subject_bar: {
        justifyContent: "center",
        alignItems: "center",
    },
    subject_reading: {
        color: "#ffffff",
        fontFamily: "NotoSans-Regular",
        paddingTop: 15,
    },
    subject_meaning: {
        color: "#ffffff",
        fontFamily: "NotoSans-Bold",
        paddingBottom: 15,
    },
    tab_bar: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    tab_text: {
        fontFamily: "NotoSans-Regular",
        fontSize: 12,
        color: Colors.HEADER_WHITE,
    },
});

export { LoginStyles, HomeStyles, ReviewStyles, LessonStyles };
