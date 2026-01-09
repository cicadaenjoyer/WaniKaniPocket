/**
 * SignOutModal component used by the HomeScreen. Warns the user before they sign out
 *
 * @param {boolean} isVisible - The modal's visibility
 * @param {() => void} handleVisible - Changes the modal's visibility
 *
 * @returns {JSX.Element}
 */
import React from "react";
import { View, Text, Pressable } from "react-native";
import Modal from "react-native-modal";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../navigation/navigation";

// API
import { AuthAPI } from "../../../api/auth";

// Styling
import { SignOutModalStyles as styles } from "../../../styles/home/signout.modal.styles";

const SignOutModal: React.FC<{
    isVisible: boolean;
    handleVisible: (arg0: boolean) => void;
}> = ({ isVisible, handleVisible }) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <Modal
            style={{ margin: 0 }}
            backdropOpacity={0.5}
            isVisible={isVisible}
            onBackdropPress={() => {
                handleVisible(false);
            }}
        >
            <View style={styles.modal_centered_view}>
                <View style={styles.modal_box}>
                    <Text style={styles.modal_text}>
                        Are you sure you want to logout?
                    </Text>
                    <View style={{ flexDirection: "row", gap: 20 }}>
                        <Pressable
                            style={styles.modal_button}
                            onPress={async () => {
                                try {
                                    await AuthAPI.logout(navigation);
                                } catch (e) {
                                    console.error("Logout failed:", e);
                                }
                            }}
                        >
                            <Text style={styles.modal_button_text}>Yes</Text>
                        </Pressable>
                        <Pressable
                            style={styles.modal_button}
                            onPress={() => handleVisible(false)}
                        >
                            <Text style={styles.modal_button_text}>No</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default SignOutModal;
