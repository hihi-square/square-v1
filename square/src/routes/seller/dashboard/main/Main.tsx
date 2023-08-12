import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import "../../Seller.css";

export default function Main() {
  return (
    <>
      <Grid xs={5} sx={{ paddingBottom: "10px" }}>
        <Paper elevation={1}></Paper>
      </Grid>
      <Grid className="half-size" xs={4} sx={{ paddingBottom: "10px" }}>
        <Paper elevation={1} className="full-compo">
          ㅎㅇ
        </Paper>
      </Grid>
    </>
  );
}
