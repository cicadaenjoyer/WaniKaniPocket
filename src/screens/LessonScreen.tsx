/**
 * @file LessonsScreen.tsx
 * @description
 *  Screen dedicated to learning new Subjects. Displays Subjects in batches of
 *  five
 */
import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/navigation";

// Components
import SubjectMeaning from "../components/subject/SubjectMeaning";
import SubjectReading from "../components/subject/SubjectReading";
import SubjectContext from "../components/subject/SubjectContext";
import RelatedSubjects from "../components/subject/RelatedSubjects";
import LessonNavigator from "../components/lesson/LessonNavigator";

// Interfaces
import { SubjectProps } from "../interfaces/Subject";

// Utils
import { R_Utils } from "../utils/related";

// Styles
import { ReviewStyles } from "../styles/globals";
import { LessonStyles } from "../styles/globals";
import { Colors } from "../constants/colors";

const BATCH_SIZE = 5;

const LessonScreen = (nav: {
    route: { params: { subjects: Array<SubjectProps> } };
}) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { width, height } = useWindowDimensions();

    const subjects = nav.route.params.subjects;

    const [subjectBatch, setSubjectBatch] = useState<Array<SubjectProps>>([]);
    const [currentSubject, setCurrentSubject] = useState<SubjectProps>();
    const [activeTab, setActiveTab] = useState<string>();

    // Getting the first batch of subjects and setting the current subject
    useEffect(() => {
        const init = async () => {
            const subject_batch = subjects.slice(0, BATCH_SIZE);
            const updated_batch = await Promise.all(
                subject_batch.map(async (subject) => {
                    const related = await R_Utils.getRelatedSubjects(
                        subject.related_subject_ids
                    );
                    return { ...subject, related_subjects: related };
                })
            );
            const current_subject = updated_batch[0];
            setSubjectBatch(updated_batch);
            setCurrentSubject(current_subject);
            setActiveTab("meaning");
        };
        init();
    }, []);

    // Going back to home page if no more subjects to study
    useEffect(() => {
        if (subjects.length === 0 && subjectBatch.length === 0) {
            navigation.navigate("Home");
        }
    }, [subjects, subjectBatch]);

    // TODO: Replace with better loading screen
    if (subjectBatch.length === 0 || !currentSubject) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View>
                    <Text>Loading...</Text>
                </View>
            </SafeAreaView>
        );
    }

    const lesson_tabs = {
        radical: [
            { key: "meaning", label: "Name" },
            { key: "kanji", label: "Examples" },
        ],
        kanji: [
            { key: "radicals", label: "Radicals" },
            { key: "meaning", label: "Meaning" },
            { key: "reading", label: "Reading" },
            { key: "vocabulary", label: "Examples" },
        ],
        vocabulary: [
            { key: "kanji", label: "Kanji Composition" },
            { key: "meaning", label: "Meaning" },
            { key: "reading", label: "Reading" },
            { key: "context", label: "Context" },
        ],
        kana_vocabulary: [
            { key: "kanji", label: "Kanji Composition" },
            { key: "meaning", label: "Meaning" },
            { key: "reading", label: "Reading" },
            { key: "context", label: "Context" },
        ],
    };

    // Render tab component (subject meaning, reading, etc)
    const renderTab = () => {
        if (!currentSubject) return null;

        const subject_main_meaning =
            currentSubject?.meanings?.find((r) => r.primary)?.meaning || "";
        const subject_alt_meanings =
            currentSubject?.meanings
                ?.filter((m) => !m.primary)
                ?.map((m) => m.meaning)
                .join(", ") || "";
        const m_explanation = currentSubject?.m_explanation || "";
        const m_hint = currentSubject?.m_hint || "";

        const subject_readings = currentSubject?.readings || "";
        const r_explanation = currentSubject?.r_explanation || "";
        const r_hint = currentSubject?.r_hint || "";

        const pronunciations = currentSubject?.pronunciation_audios || [];
        const c_sentences = currentSubject?.context_sentences || [];

        switch (currentSubject.type) {
            case "radical":
                if (activeTab === "meaning")
                    return (
                        <SubjectMeaning
                            type={currentSubject.type}
                            main_meaning={subject_main_meaning}
                            alt_meanings={subject_alt_meanings}
                            meaning_explanation={m_explanation}
                            meaning_hint={m_hint}
                        />
                    );
                if (activeTab === "kanji")
                    return (
                        <RelatedSubjects
                            header="Found in Kanji"
                            subjects={
                                currentSubject.related_subjects?.kanji || []
                            }
                        />
                    );
                break;

            case "kanji":
                if (activeTab === "radicals")
                    return (
                        <RelatedSubjects
                            header="Radical Composition"
                            subjects={
                                currentSubject.related_subjects?.radicals || []
                            }
                        />
                    );
                if (activeTab === "meaning")
                    return (
                        <SubjectMeaning
                            type={currentSubject.type}
                            main_meaning={subject_main_meaning}
                            alt_meanings={subject_alt_meanings}
                            meaning_explanation={m_explanation}
                            meaning_hint={m_hint}
                        />
                    );
                if (activeTab === "reading")
                    return (
                        <SubjectReading
                            type={currentSubject.type}
                            readings_raw={subject_readings}
                            pronunciations={pronunciations}
                            reading_explanation={r_explanation}
                            reading_hint={r_hint}
                        />
                    );
                if (activeTab === "vocabulary")
                    return (
                        <RelatedSubjects
                            header="Found in Vocabulary"
                            subjects={
                                currentSubject.related_subjects?.vocabulary ||
                                []
                            }
                        />
                    );
                break;

            case "vocabulary":
                if (activeTab === "kanji")
                    return (
                        <RelatedSubjects
                            header="Kanji Composition"
                            subjects={
                                currentSubject.related_subjects?.kanji || []
                            }
                        />
                    );
                if (activeTab === "meaning")
                    return (
                        <SubjectMeaning
                            type={currentSubject.type}
                            main_meaning={subject_main_meaning}
                            alt_meanings={subject_alt_meanings}
                            meaning_explanation={m_explanation}
                            meaning_hint={m_hint}
                        />
                    );
                if (activeTab === "reading")
                    return (
                        <SubjectReading
                            type={currentSubject.type}
                            readings_raw={subject_readings}
                            pronunciations={pronunciations}
                            reading_explanation={r_explanation}
                            reading_hint={r_hint}
                        />
                    );
                if (activeTab === "context")
                    return <SubjectContext context_sentences={c_sentences} />;
                break;
        }
    };

    // Changes the current subject on screen
    const handleSelectSubject = (subject: SubjectProps) => {
        setCurrentSubject(subject);
        setActiveTab("meaning");
    };

    const handleSelectQuiz = () => {
        navigation.navigate("Review", { subjects: subjectBatch });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* Subject Character */}
            <View
                style={[
                    LessonStyles.subject_bar,
                    {
                        backgroundColor: currentSubject.fill,
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
                    {currentSubject.type === "radical"
                        ? currentSubject?.characters?.[0]
                        : currentSubject.slug}
                </Text>
            </View>

            {/* Tabs */}
            <View
                style={[
                    LessonStyles.tab_bar,
                    {
                        backgroundColor: Colors.READING_HIGHLIGHT_FILL,
                        height: height * 0.05,
                        width: width,
                    },
                ]}
            >
                {lesson_tabs[currentSubject.type].map((tab, idx) => {
                    const is_active = activeTab === tab.key;

                    return (
                        <Pressable
                            key={idx}
                            onPress={() => setActiveTab(tab.key)}
                        >
                            <Text
                                style={{
                                    ...LessonStyles.tab_text,
                                    fontFamily: is_active
                                        ? "NotoSans-Bold"
                                        : "NotoSans-Regular",
                                }}
                            >
                                {tab.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>

            {/* Tab Content */}
            <ScrollView style={{ flex: 1, padding: 20 }}>
                {renderTab()}
            </ScrollView>

            <LessonNavigator
                subjects={subjectBatch}
                onSelectSubject={handleSelectSubject}
                onSelectQuiz={handleSelectQuiz}
            />
        </SafeAreaView>
    );
};

export default LessonScreen;
