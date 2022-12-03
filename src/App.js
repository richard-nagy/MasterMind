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
    const randomColors = useRef(getRandomColors());

    const [selected, setSelected] = useState(Array.from(Array(4)).fill("..."));

    const chooseColor = (index, color) => {
        const array = selected;
        array[index] = color;
        setSelected(() => [...array]);
    };

    const submit = (event) => {
        event.preventDefault();

        // if (selected.includes("...")) {
        //     alert("You must choose all four colors first!");
        //     return;
        // }

        if (JSON.stringify(randomColors.current) === JSON.stringify(selected)) {
            alert("you wonn");
            return;
        }

        setSelected(() => [...Array.from(Array(4)).fill("...")]);
        setGuesses((oldState) => oldState + 1);
        setOldGuesses((oldState) => [...oldState, selected]);

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
