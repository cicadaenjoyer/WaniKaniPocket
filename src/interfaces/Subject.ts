export interface SubjectProps {
    fill: string;
    type: string;
    q_type: "meaning" | "reading";
    slug: string;
    characters: Array<string> | string;
    character_image: string;
    readings: Array<{ reading: string; primary: boolean; type: string }>;
    meanings: Array<{ meaning: string; primary: boolean }>;
    pronunciation_audios: Array<{
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
}
