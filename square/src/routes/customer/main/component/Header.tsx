import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "App.css";
import "animate.css";
import { Unstable_Grid2 as Grid, Typography, IconButton } from "@mui/material";
import { RootState } from "redux/redux";
import { BiCartAlt } from "react-icons/bi";

export default function Header() {
  const navigate = useNavigate();
  const currentName = useSelector((state: RootState) => state.emd.currentName);
  const handleCartClick = () => {
    navigate("/deal/cart");
  };

  return (
    <Grid
      container
      xs={12}
      alignItems="center"
      sx={{
        position: "fixed",
        top: 0,
        height: "60px",
        width: "100%",
        maxWidth: "600px",
        backgroundColor: "white",
        zIndex: 3,
      }}
    >
      <Grid xs={2}></Grid>
      <Grid xs>
        <Typography
          variant="h5"
          sx={{
            color: "black",
            fontWeight: 600,
            margin: "auto",
            width: "100%",
            textAlign: "center",
          }}
        >
          {currentName}
        </Typography>
      </Grid>
      <Grid
        xs={2}
        container
        justifyContent="right"
        sx={{ marginRight: "15px" }}
      >
        <Grid>
          <IconButton onClick={handleCartClick}>
            <BiCartAlt size="28" color="#3d3d3d" />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
