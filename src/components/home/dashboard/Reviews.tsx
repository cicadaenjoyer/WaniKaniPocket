/**
 * Reviews component displays the user's current review count and provides
 * a button to start reviews. It fetches assignment data from the API on mount,
 * handles loading and authorization states.
 *
 * @param {ReviewsProps} props - The props for the Reviews component.
 * @param {string} props.label - The label to display for the reviews section.
 * @param {Array<RawAssignmentProps>} props.reviews - The assignments available for review
 *
 * @returns {JSX.Element} The rendered Reviews component.
 */

import React, { useState } from "react";
import { View, Image, Pressable, LayoutChangeEvent } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../navigation/navigation";

// Styling
import { HomeStyles } from "../../../styles/globals";
import { DashboardStyles } from "../../../styles/home/dashboard.styles";
import { Colors } from "../../../constants/colors";

// API
import { SubjectsAPI } from "../../../api/subjects";

// Interfaces
import { RawAssignmentProps } from "../../../interfaces/RawAssignment";
import { SubjectProps } from "../../../interfaces/Subject";

// Utils
import { C_Utils } from "../../../utils/convert";

// Components
import ButtonText from "./ButtonText";

interface ReviewsProps {
    label: string;
    reviews: Array<RawAssignmentProps>;
}

const Reviews: React.FC<ReviewsProps> = ({ label, reviews }) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    const goToReviews = async () => {
        const reviewIds = reviews
            .map((review) => {
                return review.data.subject_id;
            })
            .join(",");
        const subjectsRaw = await SubjectsAPI.getSubjectsWithId(reviewIds);
        const subjects = C_Utils.convertSubjects(subjectsRaw.data);

        // Creating a map to assign assignment ids to subjects
        const subject_to_assignment_map = new Map(
            reviews.map((review) => {
                return [review.data.subject_id, review.id];
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

    // Handle layout changes to update container size
    const onLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setContainerSize({ width, height });
    };
    // Calculate image max dimensions based on container size
    const maxWidth = containerSize.width * 0.5; // 50% of container width
    const maxHeight = containerSize.height * 0.75; // 75% of container height

    return (
        <Pressable
            style={[
                HomeStyles.review_box,
                reviews.length !== 0
                    ? { backgroundColor: Colors.RADICAL_BLUE }
                    : { backgroundColor: "gray" },
            ]}
            onLayout={onLayout}
            onPress={goToReviews}
            disabled={reviews.length === 0}
        >
            {/* Review count and description */}
            <View style={DashboardStyles.count}>
                <ButtonText>Reviews {reviews.length}</ButtonText>
                <ButtonText>Review these items to level them up!</ButtonText>
            </View>

            {/* Themed image */}
            <View style={DashboardStyles.icon}>
                {containerSize.width > 0 && (
                    <Image
                        source={require("../../../assets/images/buttons/review_kappa.png")}
                        style={{
                            width: maxWidth,
                            height: maxHeight,
                            resizeMode: "contain",
                        }}
                    />
                )}
            </View>

            {/* Start Reviews button */}
            <View style={DashboardStyles.button_container}>
                <Pressable
                    style={DashboardStyles.button}
                    onPress={goToReviews}
                    disabled={reviews.length === 0}
                >
                    <ButtonText
                        style={{
                            ...DashboardStyles.button_text,
                            color: "black",
                        }}
                    >
                        Start Reviews
                    </ButtonText>
                </Pressable>
            </View>
        </Pressable>
    );
};

export default Reviews;
