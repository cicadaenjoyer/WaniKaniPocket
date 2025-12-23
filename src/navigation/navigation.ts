import { SubjectProps } from "../interfaces/Subject";

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Review: { subjects: Array<SubjectProps> };
    Lesson: { subjects: Array<SubjectProps> };
    Subject: { subject: SubjectProps };
};
