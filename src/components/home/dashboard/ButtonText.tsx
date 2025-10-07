/**
 * Simple button text component used by Dashboard buttons.
 */
import React from 'react';
import { Text, TextProps } from 'react-native';

// Styling
import { DashboardStyles } from '../../../styles/home/dashboard.styles';

const ButtonText: React.FC<TextProps> = ({ style, children, ...props }) => {
  return (
    <Text style={[DashboardStyles.button_text, style]} {...props}>
      {children}
    </Text>
  );
};

export default ButtonText;
