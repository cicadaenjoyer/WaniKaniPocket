import React, { useState, useEffect } from 'react';
import { View, Pressable } from 'react-native';

import { ReviewsAPI } from '../api/reviews';
import { HomeStyles } from '../styles/globals';
import { Colors } from '../constants/colors';

interface LessonsButtonProps {
    label: string
}

const AssignmentsButton: React.FC<LessonsButtonProps> = ({ label }) => {
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await ReviewsAPI.getAllReviews();
                if (result) setAuthorized(true);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return (
            <View style={[HomeStyles.review_box, { justifyContent: 'center', alignItems: 'center' }]}>
            </View>
        );
    }

  return (
    <Pressable
      style={[
        HomeStyles.review_box,
        authorized ? { backgroundColor: Colors.RADICAL_BLUE } : { backgroundColor: 'gray' },
      ]}
    >
    </Pressable>
  );
}

export default AssignmentsButton;