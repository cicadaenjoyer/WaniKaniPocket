/**
 * @file menu.modal.styles.ts
 * @description
 *   Style sheets for the Menu modal in Home screen.
 */

import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export const MenuModalStyles = StyleSheet.create({
    modal_box: {
        position: "absolute",
        right: 0,
        height: "100%",
        width: "50%",
        backgroundColor: Colors.OPTIONS_GREY,
    },
});
