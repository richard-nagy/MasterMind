import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import ClearIcon from "@mui/icons-material/Clear";
const { Grid, Typography } = require("@mui/material");

const Results = ({ oldGuesses }) => {
    return (
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
                            <Typography variant="h6" sx={{ paddingLeft: "4px" }} textAlign="center">
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
                                {Array.from(Array(guesses.results.white)).map((_, i) => {
                                    return (
                                        <CircleTwoToneIcon
                                            key={i}
                                            fontSize="large"
                                            sx={{ color: "lightGray" }}
                                        />
                                    );
                                })}
                                {Array.from(Array(guesses.results.black)).map((_, i) => {
                                    return (
                                        <CircleTwoToneIcon
                                            key={i}
                                            fontSize="large"
                                            sx={{ color: "black" }}
                                        />
                                    );
                                })}
                                {Array.from(
                                    Array(4 - (guesses.results.white + guesses.results.black))
                                ).map((_, i) => {
                                    return (
                                        <ClearIcon
                                            key={i}
                                            fontSize="large"
                                            sx={{ color: "black" }}
                                        />
                                    );
                                })}
                            </div>
                        </Grid>
                    );
                })
                .reverse()}
        </Grid>
    );
};

export default Results;
