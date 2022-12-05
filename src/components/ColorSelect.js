import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { grey } from "@mui/material/colors";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import { colors } from "../colors";

const ColorSelect = ({ gameOver, selected, chooseColor, submit }) => {
    if (gameOver.over) {
        return null;
    }

    return (
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
                        <Grid item xs={6} sm={3} key={i}>
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
    );
};

export default ColorSelect;
