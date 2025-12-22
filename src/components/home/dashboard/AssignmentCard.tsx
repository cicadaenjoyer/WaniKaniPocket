/**
 * A component meant to display the user's current lessons/reviews for the day.
 *
 * Displays the assignment count and a button that will redirect user to the
 * Lesson/Review screen to start their assignments.
 *
 * Fetches assignment data from WK API on mount and handles loading/authorization
 * states
 *
 * @param {AssignmentsProps} props - The props for the Assignments component.
 * @param {string} props.label - The label used to determine if card is type Lessons or Reviews.
 * @param {Array<RawAssignmentProps>} props.assignments - The assignments currently available.
 * @param {object} props.userPref - A JSON object containing user preferred settings.
 *
 * @returns {JSX.Element} The rendered Assignments component.
 */

import React, { useState } from "react";
import { View, Image, Pressable } from "react-native";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../navigation/navigation";

// Styling
import { HomeStyles } from "../../../styles/globals";
import { DashboardStyles } from "../../../styles/home/dashboard.styles";
import { Colors } from "../../../constants/colors";

// API
import { SubjectsAPI } from "../../../api/subjects";

// Utils
import { C_Utils } from "../../../utils/convert";

// Components
import ButtonText from "./ButtonText";

// Interfaces
import { RawAssignmentProps } from "../../../interfaces/RawAssignment";
import { SubjectProps } from "../../../interfaces/Subject";

interface AssignmentProps {
    label: "Lessons" | "Reviews";
    assignments: Array<RawAssignmentProps>;
    userPref?: object; // NOTE: leaving as object for now until I know what to use for
}

const AssignmentCard: React.FC<AssignmentProps> = ({ label, assignments }) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { width, height } = useWindowDimensions();

    const goToReviews = async () => {
        const review_ids = assignments
            .map((assignment) => {
                return assignment.data.subject_id;
            })
            .join(",");
        const subjects_raw = await SubjectsAPI.getSubjectsWithId(review_ids);
        const subjects = C_Utils.convertSubjects(subjects_raw.data);

        // Creating a map to assign assignment ids to subjects
        const subject_to_assignment_map = new Map(
            assignments.map((assignment) => {
                return [assignment.data.subject_id, assignment.id];
            })
        );

        const subjects_with_assignments = subjects.map(
            (subject: SubjectProps) => ({
                ...subject,
                assignment_id: subject_to_assignment_map.get(subject.id),
            })
        );

        navigation.navigate("Review", { subjects: subjects_with_assignments });
    };
    const goToLessons = async () => {
        console.log("WIP");
    };

    const AssignmentStyles = {
        color: label === "Lessons" ? Colors.KANJI_PINK : Colors.RADICAL_BLUE,
        description:
            label === "Lessons"
                ? "We cooked up these lessons just for you."
                : "Review these items to level them up!",
        image:
            label === "Lessons"
                ? require("../../../assets/images/buttons/lessons_crab.png")
                : require("../../../assets/images/buttons/review_kappa.png"),
        goTo: label === "Lessons" ? goToLessons : goToReviews,
    };

    return (
        <Pressable
            style={[
                HomeStyles.assignment,
                assignments.length !== 0
                    ? { backgroundColor: AssignmentStyles.color }
                    : { backgroundColor: "gray" },
            ]}
            onPress={AssignmentStyles.goTo}
            disabled={assignments.length === 0}
        >
            {/* Review Count and Description */}
            <View style={DashboardStyles.count}>
                <ButtonText>
                    {label} {assignments.length}
                </ButtonText>
                <ButtonText>{AssignmentStyles.description}</ButtonText>
            </View>

            {/* Themed Image */}
            <View style={DashboardStyles.icon}>
                <Image
                    source={AssignmentStyles.image}
                    style={{
                        width: width * 0.22,
                        height: height * 0.1,
                        resizeMode: "contain",
                    }}
                />
            </View>

            {/* Start Assignments Button */}
            <View style={DashboardStyles.button_container}>
                <Pressable
                    style={DashboardStyles.button}
                    onPress={AssignmentStyles.goTo}
                    disabled={assignments.length === 0}
                >
                    <ButtonText
                        style={{
                            ...DashboardStyles.button_text,
                            color: "black",
                        }}
                    >
                        Start {label}
                    </ButtonText>
                </Pressable>
            </View>
        </Pressable>
    );
};

export default AssignmentCard;
