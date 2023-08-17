import { Unstable_Grid2 as Grid } from "@mui/material";

export default function Logo() {
  return (
    <Grid
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <img
        src="/img/Square.png"
        style={{ width: "200px", height: "200px" }}
        alt="App Logo"
      />
    </Grid>
  );
}
