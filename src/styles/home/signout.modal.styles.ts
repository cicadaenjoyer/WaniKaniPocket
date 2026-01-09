/**
 * @file signout.modal.styles.ts
 * @description
 *   Style sheets for the Sign Out modal in Home screen.
 */

import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export const SignOutModalStyles = StyleSheet.create({
    dimmed: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modal_centered_view: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        padding: 10,
    },
    modal_box: {
        flexDirection: "column",
        gap: 20,
        padding: 20,
        backgroundColor: Colors.HEADER_WHITE,
        shadowColor: Colors.BASIC_BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 10,
    },
    modal_text: {
        fontFamily: "NotoSans-Bold",
        fontSize: 18,
        color: Colors.BASIC_BLACK,
    },
    modal_button: {
        height: 40,
        paddingHorizontal: 12,
        justifyContent: "center",
        borderColor: Colors.LESSON_GREY,
        borderWidth: 1,
        borderRadius: 5,
        borderBottomWidth: 5,
    },
    modal_button_text: {
        fontFamily: "NotoSans-Bold",
        fontSize: 13,
        color: Colors.READING_HIGHLIGHT_FILL,
    },
});
