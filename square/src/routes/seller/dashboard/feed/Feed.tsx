/* eslint-disable react-hooks/exhaustive-deps */
import { Unstable_Grid2 as Grid, Paper } from "@mui/material";

export default function Feed() {
  // const token = localStorage.getItem("accessToken");

  return (
    <Grid container xs={12} justifyContent="center">
      <Paper
        sx={{
          margin: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "85vh",
        }}
      >
        검색 결과가 없습니다.
      </Paper>
    </Grid>
  );
}
