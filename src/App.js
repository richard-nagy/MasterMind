import {
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import "./App.css";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import HideSourceIcon from "@mui/icons-material/HideSource";

const colors = ["...", "red", "blue", "orange", "lightGray", "green", "brown", "purple", "black"];

const getRandomColors = () => {
    const number = () => {
        return Math.floor(Math.random() * 8 + 1);
    };

    return [colors[number()], colors[number()], colors[number()], colors[number()]];
};

function App() {
    const [guesses, setGuesses] = useState(0);
    const [oldGuesses, setOldGuesses] = useState([]);
    const [selected, setSelected] = useState(Array.from(Array(4)).fill(colors[1]));
    const randomColors = useRef(getRandomColors());

    const chooseColor = (index, color) => {
        const array = selected;
        array[index] = color;
        setSelected(() => [...array]);
    };

    const submit = (event) => {
        event.preventDefault();

        if (selected.includes("...")) {
            alert("You must choose all four colors first!");
            return;
        }

        const secret = [];
        const myGuess = [];
        const points = { black: 0, white: 0 };

        selected.forEach((color, i) => {
            if (color !== randomColors.current[i]) {
                secret.push(randomColors.current[i]);
                myGuess.push(color);
                return;
            }
            points.white += 1;
        });

        myGuess.forEach((color, i) => {
            if (secret.includes(color)) {
                myGuess.splice(i);

                const index = secret.findIndex((color_) => color_ === color);
                secret.splice(index);

                points.black += 1;
            }
        });

        setSelected(() => [...Array.from(Array(4)).fill("...")]);
        setGuesses((oldState) => oldState + 1);
        setOldGuesses((oldState) => [
            ...oldState,
            { colors: selected, results: { black: points.black, white: points.white } },
        ]);

        if (JSON.stringify(randomColors.current) === JSON.stringify(selected)) {
            alert("you wonn");
            return;
        }

        if (guesses >= 7) {
            alert("game over, you lost");
            return;
        }
    };

    return (
        <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={4}>
            <Typography variant="h2">Mind Game</Typography>
            <Typography variant="h5">Number of Guesses: {guesses}</Typography>
            {/* <ul>
                {randomColors.current.map((e, i) => {
                    return <li key={i}>{e}</li>;
                })}
            </ul> */}
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                {Array.from(Array(4)).map((_, i) => {
                    return (
                        <FormControl key={`select${i}`} size="small">
                            <InputLabel id={`select${i}`}>{`Color ${i + 1}`}</InputLabel>
                            <Select
                                sx={{ width: "85px", minHeight: "58px" }}
                                labelId={`select${i}`}
                                id={`select${i}`}
                                value={selected[i]}
                                label={`Color ${i + 1}`}
                                onChange={(e) => chooseColor(i, e.target.value)}
                            >
                                {colors.map((color) => (
                                    <MenuItem value={color} key={color}>
                                        {color !== colors[0] ? (
                                            <CircleTwoToneIcon
                                                fontSize="large"
                                                sx={{ color: color }}
                                            />
                                        ) : (
                                            color
                                        )}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    );
                })}
            </Stack>
            <Button variant="contained" onClick={(e) => submit(e)}>
                Submit
            </Button>
            {oldGuesses.map((guesses, index) => {
                return (
                    <div
                        key={index}
                        style={{ padding: "10px", border: "2px solid black", borderRadius: "5px" }}
                    >
                        <Typography variant="h6" sx={{ paddingLeft: "4px" }}>
                            Guess {index + 1}
                        </Typography>
                        <div>
                            {guesses.colors.map((guess, i) => {
                                return (
                                    <CircleTwoToneIcon
                                        fontSize="large"
                                        key={i}
                                        sx={{ color: guess }}
                                    />
                                );
                            })}
                        </div>
                        <div>
                            {Array.from(Array(guesses.results.white)).map(() => {
                                return (
                                    <CircleTwoToneIcon
                                        fontSize="large"
                                        sx={{ color: "lightGray" }}
                                    />
                                );
                            })}
                            {Array.from(Array(guesses.results.black)).map(() => {
                                return (
                                    <CircleTwoToneIcon fontSize="large" sx={{ color: "black" }} />
                                );
                            })}
                            {Array.from(
                                Array(4 - (guesses.results.white + guesses.results.black))
                            ).map(() => {
                                return <HideSourceIcon fontSize="large" sx={{ color: "black" }} />;
                            })}
                        </div>
                    </div>
                );
            })}
        </Stack>
    );
}

export default App;
