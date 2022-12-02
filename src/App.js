import { useState } from "react";
import "./App.css";

const colors = ["red", "blue", "yellow", "white", "green", "brown", "purple", "black"];

const getRandomColors = () => {
    const number = () => {
        return Math.floor(Math.random() * 8);
    };

    return [colors[number()], colors[number()], colors[number()], colors[number()]];
};

function App() {
    const [choosenColors, setChoosenColors] = useState([null, null, null, null]);
    const [numberOfGuesses, setNumberOfGuesses] = useState(0);

    const chooseColor = (index, color) => {
        const array = choosenColors;
        array[index] = color;
        setChoosenColors(array);
    };

    const testColors = () => {
        if (choosenColors.includes(null)) {
            console.log("You must choose all four colors first!");
            return;
        }
        setNumberOfGuesses((oldState) => oldState + 1);
        console.log(choosenColors);
    };

    return (
        <>
            <h2>Number of Guesses: {numberOfGuesses}</h2>
            <ul>
                {getRandomColors().map((e, i) => {
                    return <li key={i}>{e}</li>;
                })}
            </ul>
            {Array.from(Array(4)).map((_, i) => {
                return (
                    <select
                        key={i}
                        name={`colors${i}`}
                        id={`colors${i}`}
                        value={undefined}
                        onChange={(event) => {
                            chooseColor(i, event.target.value);
                        }}
                    >
                        <option hidden defaultValue>
                            Select Color
                        </option>
                        {colors.map((color) => {
                            return (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            );
                        })}
                    </select>
                );
            })}
            <button onClick={() => testColors()}>test my guesses</button>
        </>
    );
}

export default App;
