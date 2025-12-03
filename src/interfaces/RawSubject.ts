export interface RawSubjectProps {
    object: "radical" | "kanji" | "vocabulary";
    data: {
        slug: string;
        characters: string;
        readings: any;
        meanings: any;
        meaning_mnemonic: string;
        reading_mnemonic: string;
    };
    srs_stage: number;
}
