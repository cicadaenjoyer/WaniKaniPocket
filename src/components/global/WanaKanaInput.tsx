import React, { useState, forwardRef, useImperativeHandle } from "react";
import { TextInput, TextInputProps } from "react-native";
import { isHiragana, toHiragana, isKatakana, toKatakana } from "wanakana";

export interface WanaKanaInputRef {
    clear: () => void;
    isCorrect: () => boolean;
    isValid: () => boolean;
    getText: () => string;
}

interface WKI_Props extends TextInputProps {
    q_type: "reading" | "meaning";
    answers: {
        reading?: string;
        meaning?: string;
        type?: string;
        primary: boolean;
    }[];
    is_kana: boolean;
}

const WanaKanaInput = forwardRef<WanaKanaInputRef, WKI_Props>(
    ({ style, ...props }, ref) => {
        const [text, setText] = useState("");

        const handleChangeText = (input: string) => {
            if (props.q_type === "reading") {
                const textConverter = props.is_kana ? toKatakana : toHiragana;
                const converted_text = textConverter(input);
                setText(converted_text);
            } else {
                setText(input);
            }
        };

        useImperativeHandle(ref, () => ({
            clear: () => {
                setText("");
            },
            isCorrect: () => {
                const A_TYPE = props.q_type;

                const answer = props.answers.find(
                    (a) =>
                        a[A_TYPE]?.toLowerCase() === text.toLowerCase().trim()
                );
                return !!answer;
            },
            isValid: () => {
                if (props.q_type === "reading") {
                    const syntaxChecker = props.is_kana
                        ? isKatakana
                        : isHiragana;

                    return syntaxChecker(text);
                } else {
                    return text.length > 0;
                }
            },
            getText: () => {
                return text;
            },
        }));

        return (
            <TextInput
                style={style}
                {...props}
                value={text}
                onChangeText={handleChangeText}
            />
        );
    }
);

export default WanaKanaInput;
