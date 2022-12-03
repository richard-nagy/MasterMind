import { useRef, useState } from "react";
import "./App.css";

const colors = ["...", "red", "blue", "yellow", "white", "green", "brown", "purple", "black"];

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
            [...selected, `black: ${points.black}, white: ${points.white}`],
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
        <>
            <h2>Number of Guesses: {guesses}</h2>
            <ul>
                {randomColors.current.map((e, i) => {
                    return <li key={i}>{e}</li>;
                })}
            </ul>
            <form>
                {Array.from(Array(4)).map((_, i) => {
                    return (
                        <select
                            value={selected[i]}
                            onChange={(e) => chooseColor(i, e.target.value)}
                        >
                            {colors.map((value) => (
                                <option value={value} key={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    );
                })}

                <button type="button" onClick={(e) => submit(e)}>
                    Submit
                </button>
            </form>
            <br />
            <ul>
                {oldGuesses.map((guesses) => {
                    return (
                        <li>
                            {guesses.map((guess) => {
                                return `${guess}, `;
                            })}
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default App;
