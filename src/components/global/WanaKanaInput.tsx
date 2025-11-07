import React, { useState, forwardRef, useImperativeHandle } from "react";
import { TextInput, TextProps } from "react-native";
import { isHiragana, toHiragana } from "wanakana";

import { ReviewStyles } from "../../styles/globals";

export interface WanaKanaInputRef {
    clear: () => void;
    isValid: () => boolean;
    getText: () => string;
}

const WanaKanaInput = forwardRef<WanaKanaInputRef, TextProps>(
    ({ style, ...props }, ref) => {
        const [text, setText] = useState("");

        const handleChangeText = (input: string) => {
            const hiragana = toHiragana(input);
            setText(hiragana);
        };

        useImperativeHandle(ref, () => ({
            clear: () => {
                setText("");
            },
            isValid: () => {
                return isHiragana(text);
            },
            getText: () => {
                return text;
            },
        }));

        return (
            <TextInput
                style={[ReviewStyles.input, style]}
                {...props}
                value={text}
                onChangeText={handleChangeText}
            />
        );
    }
);

export default WanaKanaInput;
