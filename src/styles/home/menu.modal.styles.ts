/**
 * @file menu.modal.styles.ts
 * @description
 *   Style sheets for the Menu modal in Home screen.
 */

import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export const MenuModalStyles = StyleSheet.create({
    modal_box: {
        flexDirection: "column",
        position: "absolute",
        right: 0,
        height: "100%",
        width: "50%",
        padding: 10,
        gap: 10,
        backgroundColor: Colors.OPTIONS_GREY,
    },
    modal_item: {
        flexDirection: "row",
        backgroundColor: Colors.LESSON_LIGHT_GREY,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 10,
    },
    modal_text: {
        fontFamily: "NotoSans-Regular",
        fontSize: 14,
    },
});
