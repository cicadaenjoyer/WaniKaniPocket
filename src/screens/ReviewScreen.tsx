/**
 * @file ReviewScreen.tsx
 * @description
 *   Subject review screen for WaniKaniPocket.
 */

import React, { useState, useEffect, useRef } from "react";
import { Text, View, ScrollView, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/navigation";

// API
import { ReviewsAPI } from "../api/reviews";
import { AssignmentsAPI } from "../api/assignments";

// Components
import WanaKanaInput, {
    WanaKanaInputRef,
} from "../components/global/WanaKanaInput";
import SubjectDefinition from "../components/global/SubjectDefinition";

// Interfaces
import { SubjectProps } from "../interfaces/Subject";
import { ReviewProps } from "../interfaces/Review";

// Styles
import { ReviewStyles } from "../styles/globals";
import { Colors } from "../constants/colors";

interface QuizState {
    last_quizzed_type: "meaning" | "reading" | null;
    meaning_attempt: boolean;
    reading_attempt: boolean;
    num_meaning_incorrect: number;
    num_reading_inccorect: number;
}

const ReviewScreen = (nav: {
    route: { params: { subjects: Array<SubjectProps> } };
}) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { width, height } = useWindowDimensions();
    const inputRef = useRef<WanaKanaInputRef>(null);

    const subjects = nav.route.params.subjects;
    const prog_bar_height = height * 0.01;

    const [subject, setSubject] = useState<SubjectProps | null>(null);
    const [txtBoxFill, setTxtBoxFill] = useState(Colors.HEADER_WHITE);
    const [txtFill, setTxtFill] = useState(Colors.BASIC_BLACK);
    const [submitted, setSubmitted] = useState(false);
    const [initSize, _] = useState(subjects.length);
    const [progress, setProgress] = useState(0);
    const [quizStates, setQuizStates] = useState<Map<number, QuizState>>(
        new Map()
    );
    const [quizType, setQuizType] = useState<"meaning" | "reading" | null>(
        null
    );

    const createReview = (
        s_type: string,
        quiz_state: QuizState
    ): ReviewProps => {
        const timestamp = new Date().toISOString();
        const review = Object.create(null);

        if (subject) {
            switch (s_type) {
                case "assignment":
                    review.started_at = timestamp;
                case "review":
                    review.assignment_id = subject?.assignment_id;
                    review.incorrect_meaning_answers =
                        quiz_state.num_meaning_incorrect;
                    review.incorrect_reading_answers =
                        quiz_state.num_reading_inccorect;
            }
        } else {
            console.error("Error: Null Subject when creating review");
        }

        return review;
    };

    const submitResponse = () => {
        const is_valid = inputRef.current?.isValid();

        if (is_valid) {
            const is_correct = inputRef.current?.isCorrect();

            setTxtFill(Colors.HEADER_WHITE);
            if (is_correct) {
                setTxtBoxFill(Colors.CORRECT_GREEN);
            } else {
                setTxtBoxFill(Colors.INCORRECT_RED);
            }

            // Update the quiz state for the current subject
            if (subject) {
                let quiz_state = quizStates.get(subject.id);

                if (quiz_state) {
                    quizStates.set(subject.id, {
                        last_quizzed_type: quizType,
                        reading_attempt:
                            quizType === "reading" && is_correct
                                ? true
                                : quiz_state.reading_attempt,
                        meaning_attempt:
                            quizType === "meaning" && is_correct
                                ? true
                                : quiz_state.meaning_attempt,
                        num_meaning_incorrect:
                            quiz_state.num_meaning_incorrect +
                            Number(quizType === "meaning" && !is_correct),
                        num_reading_inccorect:
                            quiz_state.num_reading_inccorect +
                            Number(quizType === "reading" && !is_correct),
                    });
                }

                quiz_state = quizStates.get(subject.id);

                // pass the subject back into array if user hasn't been quizzed on both
                // reading and meaning (meaning for radicals)
                if (
                    (subject.type === "radical" &&
                        !quiz_state?.meaning_attempt) ||
                    (subject.type !== "radical" &&
                        (!quiz_state?.reading_attempt ||
                            !quiz_state?.meaning_attempt))
                ) {
                    const idx = Math.floor(Math.random() * subjects.length);
                    subjects.splice(idx, 0, subject);
                }

                // create a review object to send to API once user has been fully quizzed
                if (
                    (subject.type === "radical" &&
                        quiz_state?.meaning_attempt) ||
                    (subject.type !== "radical" &&
                        quiz_state?.reading_attempt &&
                        quiz_state?.meaning_attempt)
                ) {
                    const assignment_type = "review"; // NOTE: hard coding to create a review of type 'Review'...changing once AssignmentScreen is finished.
                    const review = createReview("review", quiz_state);

                    const sendReview =
                        assignment_type === "review"
                            ? ReviewsAPI.postReview
                            : AssignmentsAPI.putAssignment;

                    sendReview(review);
                }
            }

            setSubmitted(true);
        }
    };

    const nextSubject = () => {
        if (subjects.length === 0) {
            navigation.navigate("Home");
        }

        const nextSubj = subjects.pop();

        if (!nextSubj) return;

        // Get quiz type for the NEW subject
        const quiz_state = quizStates.get(nextSubj.id);

        const getQuizType = (): "meaning" | "reading" => {
            const meaning_attempted = quiz_state?.meaning_attempt;
            const reading_attempted = quiz_state?.reading_attempt;

            // Both false - choose randomly
            if (!meaning_attempted && !reading_attempted) {
                if (nextSubj?.type === "radical") {
                    return "meaning";
                } else {
                    return Math.random() > 0.5 ? "meaning" : "reading";
                }
            }

            // One is false - choose the one that hasn't been attempted
            if (!meaning_attempted) return "meaning";
            if (!reading_attempted) return "reading";

            // Both attempted - this shouldn't happen, but default to meaning
            return "meaning";
        };

        const quiz_type = getQuizType();

        // Setting all states
        setSubject(nextSubj);
        setQuizType(quiz_type);
        setSubmitted(false);
        setProgress((1 - (subjects.length - 1) / initSize) * 100);
        setTxtBoxFill(Colors.HEADER_WHITE);
        setTxtFill(Colors.BASIC_BLACK);

        // Clear text box
        inputRef.current?.clear();
    };

    // Getting the first subject from array and initializing quiz states
    useEffect(() => {
        const quiz_states = new Map<number, QuizState>();
        subjects.forEach((subject) => {
            if (!quiz_states.has(subject?.id)) {
                quiz_states.set(subject?.id, {
                    last_quizzed_type: null,
                    meaning_attempt: false,
                    reading_attempt: false,
                    num_meaning_incorrect: 0,
                    num_reading_inccorect: 0,
                });
            }
        });
        setQuizStates(quiz_states);
        nextSubject();
    }, []);

    // NOTE: Replace with better loading screen
    if (!subject) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View>
                    <Text>Loading...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                {/* Progression Bar */}
                <View
                    style={{
                        width: "100%",
                        height: prog_bar_height,
                        backgroundColor: Colors.BASIC_BLACK,
                        flexDirection: "row",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: Colors.HEADER_WHITE,
                            height: "100%",
                            width: `${progress}%`,
                        }}
                    />
                </View>

                {/* Subject Character */}
                <View
                    style={[
                        ReviewStyles.subject_container,
                        {
                            backgroundColor: subject.fill,
                            height: height * 0.17,
                            width: width,
                        },
                    ]}
                >
                    <Text
                        style={{
                            ...ReviewStyles.subject_text,
                            fontSize: height * 0.08,
                        }}
                    >
                        {subject.type === "radical"
                            ? subject?.characters?.[0]
                            : subject.slug}
                    </Text>
                </View>

                {/* Subject Type */}
                <View
                    style={[
                        ReviewStyles.subject_container,
                        {
                            backgroundColor:
                                subject.type === "vocabulary"
                                    ? Colors.BASIC_BLACK
                                    : Colors.OPTIONS_GREY,
                            height: height * 0.05,
                            width: width,
                        },
                    ]}
                >
                    <Text
                        style={{
                            ...ReviewStyles.subject_text,
                            fontSize: height * 0.015,
                            color:
                                subject.type === "vocabulary"
                                    ? Colors.HEADER_WHITE
                                    : Colors.BASIC_BLACK,
                            fontFamily: "NotoSans-Bold",
                        }}
                    >
                        {subject.type.charAt(0).toUpperCase() +
                            subject.type.slice(1)}{" "}
                        {(quizType?.charAt(0).toUpperCase() || "") +
                            (quizType?.slice(1) || "")}{" "}
                    </Text>
                </View>

                {/* Text Box */}
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <WanaKanaInput
                        ref={inputRef}
                        style={{
                            ...ReviewStyles.input,
                            height: height * 0.045,
                            backgroundColor: txtBoxFill,
                            color: txtFill,
                        }}
                        placeholder="Your Response"
                        q_type={quizType || "meaning"}
                        answers={
                            quizType === "meaning"
                                ? subject.meanings
                                : subject.readings
                        }
                        is_kana={subject.is_kana}
                        editable={!submitted}
                        onSubmitEditing={submitResponse}
                    />
                    {submitted && (
                        <Button
                            color={"#000000"}
                            title="˃"
                            onPress={nextSubject}
                        />
                    )}
                </View>

                {/* Detailed Subject Definition */}
                {submitted && <SubjectDefinition subject={subject} />}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ReviewScreen;
