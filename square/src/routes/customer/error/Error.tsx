import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Unstable_Grid2 as Grid, Button } from "@mui/material";

export default function Error() {
  const navigate = useNavigate();
  const location = useLocation();
  const error = location.state;

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(error);
  }, []);

  return (
    <Grid xs={12} direction="column">
      <Grid container xs={12} justifyContent="center">
        오류가 발생했습니다. 콘솔을 확인해보세요.
      </Grid>
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        메인으로
      </Button>
    </Grid>
  );
}
