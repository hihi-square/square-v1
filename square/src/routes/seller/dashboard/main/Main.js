import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import "../../Seller.css";

export default function Main(props) {
  return (
    <>
      <Grid className="half-size" xs={8} sx={{ paddingBottom: "10px" }}>
        <Paper elevation={1} className="full-compo" sx={{ margin: "10px" }}>
          ㅎㅇ
        </Paper>
      </Grid>
      <Grid className="half-size" xs={4} sx={{ paddingBottom: "10px" }}>
        <Paper elevation={1} className="full-compo" sx={{ margin: "10px" }}>
          ㅎㅇ
        </Paper>
      </Grid>
      <Grid className="half-size" xs={12} sx={{ paddingBottom: "10px" }}>
        <Paper elevation={1} className="full-compo" sx={{ margin: "10px" }}>
          ㅎㅇ
        </Paper>
      </Grid>
    </>
  );
}
