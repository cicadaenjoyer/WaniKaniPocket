-   Screens

    -   **Home**
        -   Options
            -   Reset API token (logout), change app colors, change app icon
        -   Subject Lookup
            -   Lookup subjects based on name
    -   **Review**

        -   Part 2:
            -   Add text shake animation for invalid responses
            -   Create a string similarity check for responses (should also play shake animation for responses > 80% similarity)
            -   If user answers with reading when expecting meaning (and vice versa), send a warning

-   Additional Features
    -   Replace `expo-av` library with `expo-audio`
    -   Gray out dashboard items when on 'Vacation Mode'
    -   Adjust styles to look more appealing
    -   Create a local db for Subjects using SQLite
-   Notes
    -   The WK API currently does not provide info on `Patterns of Use` for vocab subjects
