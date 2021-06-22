import { Button, Grid } from "@material-ui/core";

const MultipleChoiceButtons = ({ correct, incorrect, cb }) => {
  const options = [correct, ...incorrect].sort(() => 0.5 - Math.random());
  return (
    <Grid container spacing={1}>
      {options.map((el, i) => (
        <Grid item xs={12} key={i}>
          <Button
            onClick={() => cb(el, el === correct)}
            fullWidth
            variant="outlined"
            color="primary"
          >
            {el}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};
export default MultipleChoiceButtons;
