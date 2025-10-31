import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

// Styling
import { ProgressStyles } from "../../../styles/home/progress.styles";

// API
import { SubjectsAPI } from "../../../api/subjects";
import { AssignmentsAPI } from "../../../api/assignments";

// Components
import Subject from "./Subject";

interface SubjectsProps {
    level: number;
    type: string;
}

const Subjects: React.FC<SubjectsProps> = ({ level, type }) => {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        //  Getting the appropriate functions and storing them as pointers
        const getSubjectAssignments =
            type === "radicals"
                ? AssignmentsAPI.getRadicalAssignmentsAtLevel
                : AssignmentsAPI.getKanjiAssignmentsAtLevel;
        const getSubjects =
            type === "radicals"
                ? SubjectsAPI.getRadicalsAtLevel
                : SubjectsAPI.getKanjiAtLevel;

        const fetchKanji = async () => {
            try {
                // Get all user-seen subject assignments at current level
                const allLearnedRaw = await getSubjectAssignments(level);
                // Get all assignments from site at current level
                const allSubjectsRaw = await getSubjects(level);

                if (allLearnedRaw && allSubjectsRaw) {
                    // Merging all subjects into one collection and sorting based on SRS value
                    const allLearned = new Map(
                        allLearnedRaw.data.map(
                            (learned: {
                                data: { subject_id: number; srs_stage: number };
                            }) => [
                                learned.data.subject_id,
                                learned.data.srs_stage,
                            ]
                        )
                    );
                    const allSubjects = allSubjectsRaw.data
                        .map((subject: { id: number }) => ({
                            ...subject,
                            srs_stage: allLearned.get(subject.id) ?? 0,
                        }))
                        .sort((a, b) => b.srs_stage - a.srs_stage);

                    setSubjects(allSubjects);
                }
            } catch (e) {
                console.error(e);
            } finally {
                // No cleanup needed
            }
        };
        fetchKanji();
    }, []);

    return (
        <View style={ProgressStyles.subject_container}>
            <Text style={ProgressStyles.label}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
            <View style={ProgressStyles.subject_table}>
                {subjects.map(
                    (
                        subject: {
                            id: number;
                            data: { characters: string };
                            srs_stage: number;
                        },
                        index
                    ) => (
                        <Subject
                            key={subject.id || index}
                            type={type}
                            data={subject}
                        />
                    )
                )}
            </View>
        </View>
    );
};

export default Subjects;
