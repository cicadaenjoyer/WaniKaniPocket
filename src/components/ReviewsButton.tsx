import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, Pressable, LayoutChangeEvent} from 'react-native';

import { ReviewsAPI } from '../api/reviews';
import { HomeStyles } from '../styles/globals';
import { HomeButtonStyles } from '../styles/homebutton.styles';
import { Colors } from '../constants/colors';

interface LessonsButtonProps {
    label: string
}

const ReviewsButton: React.FC<LessonsButtonProps> = ({ label }) => {
    const [reviewCount, setReviewCount] = useState(0);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const result = await ReviewsAPI.getAllReviews();
                if (result) {
                    setReviewCount(result.total_count);
                    setAuthorized(true);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    const onLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setContainerSize({ width, height });
    };
    const maxWidth = containerSize.width * 0.5; // 50% of container width
    const maxHeight = containerSize.height * 0.75; // 75% of container height

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
      onLayout={onLayout}
    >
      <View style={HomeButtonStyles.count}>
        <Text>Reviews {reviewCount}</Text>
        <Text>Review these items to level them up!</Text>
      </View>

      <View style={HomeButtonStyles.icon}>
        {containerSize.width > 0 && (
          <Image
            source={require('../assets/images/buttons/review_kappa.png')}
            style={{
              width: maxWidth,
              height: maxHeight,
              resizeMode: 'contain',
            }}
          />
        )}
      </View>

      <View style={HomeButtonStyles.button}>
        <Button title='Start Reviews'/>
      </View>
    </Pressable>
  );
}

export default ReviewsButton;