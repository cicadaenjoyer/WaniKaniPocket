/**
 * ContinueModal component is used by Review screen. Asks the user if they wish to continue lessons
 * or return to home screen when finished with an assignment batch.
 *
 * @param {boolean} isVisible - The modal's visibility
 * @param {() => void} returnHome - Navigates back to home page
 * @param {() => void} backToLessons - Navigates back to lessons page and updates lesson batch
 *
 * @returns {JSX.Element}
 */
import React from "react";
import { Modal, View, Text, Pressable } from "react-native";

// Styling
import { ContinueModalStyles as styles } from "../../styles/review/review.continue.modal.styles";

const ContinueModal: React.FC<{
    isVisible: boolean;
    returnHome: () => void;
    backToLessons: () => void;
}> = ({ isVisible, returnHome, backToLessons }) => {
    return (
        <Modal transparent={true} visible={isVisible}>
            <View style={styles.dimmed} />
            <View style={styles.modal_centered_view}>
                <View style={styles.modal_box}>
                    <Text style={styles.modal_text}>
                        Good job! The items you have just finished quizzing on
                        have been moved to your review queue. What would you
                        like to do now?
                    </Text>
                    <View style={{ flexDirection: "row", gap: 20 }}>
                        <Pressable
                            style={styles.modal_button}
                            onPress={returnHome}
                        >
                            <Text style={styles.modal_button_text}>
                                Return to Dashboard
                            </Text>
                        </Pressable>
                        <Pressable
                            style={styles.modal_button}
                            onPress={backToLessons}
                        >
                            <Text style={styles.modal_button_text}>
                                Continue Lessons
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ContinueModal;
