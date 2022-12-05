import { Stack, Typography } from "@mui/material";
import { useRef, useState } from "react";
import "./App.css";
import GameOver from "./components/GameOver";
import ColorSelect from "./components/ColorSelect";
import Results from "./components/Results";
import { colors } from "./colors";

// Get 4 random colors
const getRandomColors = () => {
    const number = () => {
        return Math.floor(Math.random() * 8 + 1);
    };

    return [colors[number()], colors[number()], colors[number()], colors[number()]];
};

function App() {
    const randomColors = useRef(getRandomColors());
    const [guesses, setGuesses] = useState(0);
    const [oldGuesses, setOldGuesses] = useState([]);
    const [selected, setSelected] = useState(Array.from(Array(4)).fill(colors[0]));
    const [gameOver, setGameOver] = useState({ over: false, winn: false });

    // Set the value of 1 color out of the 4
    const chooseColor = (index, color) => {
        const array = selected;
        array[index] = color;
        setSelected(() => [...array]);
    };

    // Check if selected colors are good
    const submit = (event) => {
        event.preventDefault();

        // If we didnt selected a color stop
        if (selected.includes("...")) {
            return;
        }

        const secretColors = [];
        const myColors = [];
        const points = { black: 0, white: 0 };

        // Check for good colors on good places
        selected.forEach((color, i) => {
            if (color !== randomColors.current[i]) {
                secretColors.push(randomColors.current[i]);
                myColors.push(color);
                return;
            }
            points.white += 1;
        });

        // Check for good colors on bad places
        myColors.forEach((color, i) => {
            if (secretColors.includes(color)) {
                myColors[i] = null;

                const index = secretColors.findIndex((color_) => color_ === color);
                secretColors[index] = null;

                points.black += 1;
            }
        });

        setSelected(() => [...Array.from(Array(4)).fill(colors[0])]);
        setGuesses((oldState) => oldState + 1);
        setOldGuesses((oldState) => [
            ...oldState,
            { colors: selected, results: { black: points.black, white: points.white } },
        ]);

        // If all colors are good on the good places we winn
        if (points.white === 4) {
            setGameOver({ over: true, winn: true });
            return;
        }

        // If this was the 8th try we lose
        if (guesses >= 7) {
            setGameOver({ over: true, winn: false });
            return;
        }
    };

    // Restart the game, set the values to starting state
    // Get new secret colors
    const restart = () => {
        setGuesses(0);
        setOldGuesses([]);
        setSelected(Array.from(Array(4)).fill(colors[0]));
        setGameOver({ over: false, winn: false });
        randomColors.current = getRandomColors();
    };

    return (
        <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={4}>
            <Typography variant="h3">Mind Game</Typography>
            <Typography variant="h5">Number of Guesses: {guesses}</Typography>
            {/* <ul>
                {randomColors.current.map((e, i) => {
                    return <li key={i}>{e}</li>;
                })}
            </ul> */}
            <GameOver gameOver={gameOver} restart={restart} secretColors={randomColors.current} />
            <ColorSelect
                gameOver={gameOver}
                selected={selected}
                chooseColor={chooseColor}
                submit={submit}
            />
            <Results oldGuesses={oldGuesses} />
        </Stack>
    );
}

export default App;
