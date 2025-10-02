import React from 'react';
import { Text, TextProps } from 'react-native';
import { HomeButtonStyles } from '../styles/homebutton.styles';

const ButtonText: React.FC<TextProps> = ({ style, children, ...props }) => {
  return (
    <Text style={[HomeButtonStyles.button_text, style]} {...props}>
      {children}
    </Text>
  );
};

export default ButtonText;
