export interface RawAssignmentProps {
    id: number;
    object: string;
    url: string;
    data: {
        subject_id: number;
        subject_type: string;
        srs_stage: number;
        passed_at?: Date;
    };
}
