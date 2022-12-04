import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import "./App.css";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import ClearIcon from "@mui/icons-material/Clear";
import { grey } from "@mui/material/colors";
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
    const [selected, setSelected] = useState(Array.from(Array(4)).fill(colors[0]));
    const [gameOver, setGameOver] = useState({ over: false, winn: false });
    const randomColors = useRef(getRandomColors());

    const chooseColor = (index, color) => {
        const array = selected;
        array[index] = color;
        setSelected(() => [...array]);
    };

    const submit = (event) => {
        event.preventDefault();

        if (selected.includes("...")) {
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

        setSelected(() => [...Array.from(Array(4)).fill(colors[0])]);
        setGuesses((oldState) => oldState + 1);
        setOldGuesses((oldState) => [
            ...oldState,
            { colors: selected, results: { black: points.black, white: points.white } },
        ]);

        if (JSON.stringify(randomColors.current) === JSON.stringify(selected)) {
            setGameOver({ over: true, winn: true });
            return;
        }

        if (guesses >= 7) {
            setGameOver({ over: true, winn: false });
            return;
        }
    };

    const restart = () => {
        console.log("res");
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
            {gameOver.over && (
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={3}
                >
                    <Typography variant="h4" sx={{ textAlign: "center" }}>
                        Game over
                    </Typography>
                    <Typography variant="h5" className="lose">
                        {gameOver.winn ? "You winn" : "You lost"}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={restart}
                        size="large"
                        sx={{
                            backgroundColor: grey[900],
                            "&:hover": { backgroundColor: grey[700] },
                        }}
                    >
                        Restart game
                    </Button>
                </Stack>
            )}
            {!gameOver.over && (
                <>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        sx={{ width: { xs: "220px", sm: "450px" } }}
                    >
                        {Array.from(Array(4)).map((_, i) => {
                            return (
                                <Grid item xs={6} sm={3}>
                                    <FormControl key={`select${i}`} size="small">
                                        <InputLabel id={`select${i}`}>{`Color ${
                                            i + 1
                                        }`}</InputLabel>
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
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Button
                        variant="contained"
                        onClick={(e) => submit(e)}
                        size="large"
                        sx={{
                            backgroundColor: grey[900],
                            "&:hover": { backgroundColor: grey[700] },
                        }}
                    >
                        Submit
                    </Button>
                </>
            )}
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ maxWidth: "720px" }}
            >
                {oldGuesses
                    .map((guesses, index) => {
                        return (
                            <Grid
                                item
                                key={index}
                                sx={{
                                    border: "2px solid black",
                                    borderRadius: "5px",
                                    margin: "5px 10px 5px 10px",
                                    padding: "5px",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{ paddingLeft: "4px" }}
                                    textAlign="center"
                                >
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
                                            <CircleTwoToneIcon
                                                fontSize="large"
                                                sx={{ color: "black" }}
                                            />
                                        );
                                    })}
                                    {Array.from(
                                        Array(4 - (guesses.results.white + guesses.results.black))
                                    ).map(() => {
                                        return (
                                            <ClearIcon fontSize="large" sx={{ color: "black" }} />
                                        );
                                    })}
                                </div>
                            </Grid>
                        );
                    })
                    .reverse()}
            </Grid>
        </Stack>
    );
}

export default App;
