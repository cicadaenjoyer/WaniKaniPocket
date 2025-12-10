export interface RawSubjectProps {
    id: number;
    object: "radical" | "kanji" | "vocabulary" | "kana_vocabulary";
    data: {
        slug: string;
        characters: string;
        character_images: Array<{ url: string }>;
        readings: any;
        meanings: any;
        meaning_mnemonic: string;
        reading_mnemonic: string;
        meaning_hint: string;
        reading_hint: string;
        pronunciation_audios: Array<{
            url: string;
            metadata: {
                gender: "string";
                voice_actor_id: number;
                voice_actor_name: "string";
                voice_description: "string";
            };
        }> | null;
        amalgamation_subject_ids: Array<number>;
        component_subject_ids: Array<number>;
        visually_similar_subject_ids: Array<number>;
        context_sentences: Array<{ en: string; ja: string }>;
    };
    srs_stage: number;
}
