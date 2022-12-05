# Master Mind

This project is a mind game. The application randomly selects 4 colors, and the user gets 8 chances to guess the 4 colors, in the right order.

## What technologies have I used

-   React
-   Material UI

## How to install and start the application

-   Download project
-   Open the project folder
-   Run npm install command to install packages
-   Run npm start command to start the application

## Features and how to test them

-   Select 1 out of 8 colors from the dropdowns
-   If we selected 4 colors we can press the Submit button
-   Get information in a box about the 4 colors we choose
-   Get white circles for each correct color in the correct place
-   Get black circles for each correct color in the wrong place
-   If we didn't leave out at least 1 color, the submit button will do nothing
-   There is a counter at the top of the page that shows how many times we tried so far
-   If we guess the color correctly within 8 guesses we get a **Victory** message
-   If we failed to guess the colors we get a **Defeat** message
-   After the game ended hide the color-selecting options, and reveal a button to restart the game
-   The application is compatible with mobile phone screens, down to 320px width
