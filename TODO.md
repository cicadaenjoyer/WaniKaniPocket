-   Screens

    -   **Login**
        -   Update UI
    -   **Home**
        -   Options
            -   Reset API token (logout), change app colors, change app icon, change style sheet
        -   Subject Lookup
            -   Lookup subjects based on name
    -   **Review**

        -   Check for correctness
            -   Add text shake animation for invalid responses
            -   Make string similarity logic to warn users on potential typos before submission
            -   For reading questions
                -   Check if we need to write the answer in hiragana/katakana
            -   Create a `Review` record and send to API
                -   Submit records on:
                    -   Back page
                    -   Closing app
                    -   App crash
                    -   Finish reviews

    -   **Assignment**
    -   **Subject**
        -   **BUGS**
            -   Sometimes Radicals don't get the 'Kanji Composition' section... (hard to replicate)
            -   Character images not showing up for Radicals (auth issue)

-   Additional Features

    -   Replace `expo-av` library with `expo-audio`
    -   Gray out dashboard items when on 'Vacation Mode'
    -   Adjust styles to look more appealing

-   Notes
    -   The WK API currently does not provide info on `Patterns of Use` for vocab subjects
