/**
 * Reviews component displays the user's current review count and provides
 * a button to start reviews. It fetches assignment data from the API on mount,
 * handles loading and authorization states.
 *
 * @param {ReviewsProps} props - The props for the Reviews component.
 * @param {string} props.label - The label to display for the reviews section.
 *
 * @returns {JSX.Element} The rendered Reviews component.
 */

import React, { useState, useEffect } from 'react';
import { View, Image, Pressable, LayoutChangeEvent } from 'react-native';

// Styling
import { HomeStyles } from '../../../styles/globals';
import { DashboardStyles } from '../../../styles/home/dashboard.styles';
import { Colors } from '../../../constants/colors';

// API
import { ReviewsAPI } from '../../../api/reviews';

// Components
import ButtonText from './ButtonText';

interface ReviewsProps {
  label: string
}

const Reviews: React.FC<ReviewsProps> = ({ label }) => {
  const [reviewCount, setReviewCount] = useState(0);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch reviews on mount
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

  // Handle layout changes to update container size
  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerSize({ width, height });
  };
  // Calculate image max dimensions based on container size
  const maxWidth = containerSize.width * 0.5; // 50% of container width
  const maxHeight = containerSize.height * 0.75; // 75% of container height

  // Default loading state view
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
      {/* Review count and description */}
      <View style={DashboardStyles.count}>
        <ButtonText>Reviews {reviewCount}</ButtonText>
        <ButtonText>Review these items to level them up!</ButtonText>
      </View>

      {/* Themed image */}
      <View style={DashboardStyles.icon}>
        {containerSize.width > 0 && (
          <Image
            source={require('../../../../assets/images/buttons/review_kappa.png')}
            style={{
              width: maxWidth,
              height: maxHeight,
              resizeMode: 'contain',
            }}
          />
        )}
      </View>

      {/* Start Reviews button */}
      <View style={DashboardStyles.button_container}>
        <Pressable style={DashboardStyles.button}>
          <ButtonText style={{ color: 'black' }}>Start Reviews</ButtonText>
        </Pressable>
      </View>

    </Pressable>
  );
}

export default Reviews;