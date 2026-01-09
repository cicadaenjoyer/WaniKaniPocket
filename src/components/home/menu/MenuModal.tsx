/**
 * MenuModal component used by the HomeScreen. Used primarily for settings
 *
 * @param {boolean} isVisible - The modal's visibility
 * @param {() => void} handleVisible - Changes the modal's visibility
 *
 * @returns {JSX.Element}
 */
import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import Modal from "react-native-modal";

// Components
import SignOutModal from "./SignOutModal";

// Styling
import { MenuModalStyles as styles } from "../../../styles/home/menu.modal.styles";

const MenuModal: React.FC<{
    isVisible: boolean;
    handleVisible: (arg0: boolean) => void;
}> = ({ isVisible, handleVisible }) => {
    const [signOutVisible, setSignOutVisible] = useState(false);

    return (
        <View>
            <SignOutModal
                isVisible={signOutVisible}
                handleVisible={setSignOutVisible}
            />

            <Modal
                style={{ margin: 0 }}
                isVisible={isVisible}
                animationIn="slideInRight"
                animationOut="slideOutRight"
                backdropOpacity={0.5}
                onBackdropPress={() => {
                    handleVisible(false);
                }}
            >
                <View style={styles.modal_box}>
                    <Pressable
                        style={styles.modal_item}
                        onPress={() => setSignOutVisible(true)}
                    >
                        <Text style={styles.modal_text}>Sign Out</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
};

export default MenuModal;
