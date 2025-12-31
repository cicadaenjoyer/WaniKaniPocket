export interface SubjectProps {
    id: number;
    assignment_id?: number;
    fill: string;
    type: "radical" | "kanji" | "vocabulary" | "kana_vocabulary";
    slug: string;
    characters: Array<string> | string;
    character_image: string;
    readings: Array<{ reading: string; primary: boolean; type: string }>;
    meanings: Array<{ meaning: string; primary: boolean }>;
    pronunciation_audios?: Array<{
        url: string;
        metadata: {
            gender: "string";
            voice_actor_name: "string";
            voice_description: "string";
        };
    }> | null;
    m_explanation: string;
    r_explanation: string;
    m_hint: string;
    r_hint: string;
    context_sentences: Array<{ en: string; ja: string }>;
    related_subject_ids: Array<number>;
    related_subjects?: {
        radicals?: Array<SubjectProps>;
        kanji?: Array<SubjectProps>;
        vocabulary?: Array<SubjectProps>;
    };
    is_kana: boolean;
}
