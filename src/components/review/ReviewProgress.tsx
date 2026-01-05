/**
 * ReviewProgress is the component that displays the user's progress on the current batch of
 * reviews. Shows the current percentage of "passed" subjects, number of assignments left, and a button
 * to return home.
 *
 * @param {string} type - The assignment type (lesson or review)
 * @param {number} remaining_subjects - The number of remaning subjects in review queue
 * @param {number} progress - The percentage of passed subjects
 * @param {() => void} returnHome - Event handler that returns user to home page
 *
 * @returns {JSX.Element}
 */
import React from "react";
import FontAwesome from "@react-native-vector-icons/fontawesome";
import { View, Text, Pressable } from "react-native";

// Styling
import { ReviewProgressStyles as styles } from "../../styles/review/review.progress.styles";
import { Colors } from "../../constants/colors";

const ReviewProgress: React.FC<{
    type: "review" | "lesson";
    remaining_subjects: number;
    progress: number;
    returnHome: () => void;
}> = ({ type, remaining_subjects, progress, returnHome }) => {
    return (
        <View style={styles.icon_view}>
            {/* Home Button */}
            <Pressable style={{ marginRight: "auto" }} onPress={returnHome}>
                <FontAwesome
                    name="home"
                    size={22}
                    color={Colors.HEADER_WHITE}
                />
            </Pressable>

            {/* Number of Passed Subjects (Only for Reviews) */}
            {type === "review" && (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 3,
                    }}
                >
                    <FontAwesome
                        name="thumbs-up"
                        size={18}
                        color={Colors.HEADER_WHITE}
                    />
                    <Text style={styles.icon_text}>{progress}%</Text>
                </View>
            )}

            {/* Subjects Left in Queue */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                }}
            >
                <FontAwesome
                    name="inbox"
                    size={20}
                    color={Colors.HEADER_WHITE}
                />
                <Text style={styles.icon_text}>{remaining_subjects + 1}</Text>
            </View>
        </View>
    );
};

export default ReviewProgress;
