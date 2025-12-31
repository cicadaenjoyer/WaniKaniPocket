import { SubjectProps } from "../interfaces/Subject";

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Review: {
        subjects: Array<SubjectProps>;
        assignment_type: "review" | "lesson";
        num_lessons?: number;
        onComplete?: () => void;
    };
    Lesson: { subjects: Array<SubjectProps> };
    Subject: { subject: SubjectProps };
};
