export interface UserProps {
    current_vacation_started_at: Date | null;
    level: number;
    preferences: {
        default_voice_actor_id: number;
        extra_study_autoplay_audio: boolean;
        lessons_autoplay_audio: boolean;
        lessons_batch_size: number;
        lessons_presentation_order: string;
        reviews_autoplay_audio: boolean;
        reviews_display_srs_indicator: boolean;
        reviews_presentation_order: string;
    };
    profile_url: string;
    started_at: Date;
    subscription: {
        active: boolean;
        type: string;
        max_level_granted: number;
        period_ends_at: Date;
    };
    username: string;
}
