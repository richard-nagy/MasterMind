import { Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Stack } from "@mui/system";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";

const GameOver = ({ gameOver, restart, secretColors }) => {
    if (!gameOver.over) {
        return null;
    }

    return (
        <>
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
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={3}
                sx={{
                    border: "4px solid black",
                    borderRadius: "5px",
                    margin: "5px 10px 5px 10px",
                    padding: "10px",
                }}
            >
                <Typography variant="h4" sx={{ textAlign: "center" }}>
                    Game over
                </Typography>
                <Typography variant="h5">
                    {gameOver.win ? (
                        <span className="win">Victory!</span>
                    ) : (
                        <span className="lose">Defeat!</span>
                    )}
                </Typography>
                <div>
                    {secretColors.map((color, i) => {
                        return <CircleTwoToneIcon fontSize="large" key={i} sx={{ color: color }} />;
                    })}
                </div>
            </Stack>
        </>
    );
};

export default GameOver;
