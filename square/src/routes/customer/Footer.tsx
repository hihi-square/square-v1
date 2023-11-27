import * as React from "react";
import {
  Paper,
  Unstable_Grid2 as Grid,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLayerGroup,
  faSearch,
  faComments,
  faMap,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface FooterProps {
  now: number;
}

export default function Footer({ now }: FooterProps) {
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        backgroundColor: "white",
        position: "fixed",
        bottom: 0,
        height: "80px",
        width: "100%",
        maxWidth: "600px",
        zIndex: 15,
      }}
      elevation={0}
    >
      <Grid container xs={12} alignItems="center">
        <Grid xs>
          <Button
            sx={{
              width: "100%",
              height: "80px",
              display: "flex",
              flexDirection: "column",
              color: now === 1 ? "primary" : "lightgrey",
            }}
            onClick={() => {
              if (now !== 1) navigate("/");
            }}
          >
            <Box component="div">
              <FontAwesomeIcon icon={faMap} size="2x" />
            </Box>
            <Box component="div">
              <Typography
                variant="body2"
                component="div"
                sx={{ marginTop: "5px", fontWeight: 700, textAlign: "center" }}
              >
                메인
              </Typography>
            </Box>
          </Button>
        </Grid>
        <Grid xs>
          <Button
            sx={{
              width: "100%",
              height: "80px",
              display: "flex",
              flexDirection: "column",
              color: now === 2 ? "primary" : "lightgrey",
            }}
            onClick={() => {
              if (now !== 2) navigate("/main");
            }}
          >
            <Box component="div">
              <FontAwesomeIcon icon={faSearch} size="2x" />
            </Box>
            <Box component="div">
              <Typography
                variant="body2"
                component="div"
                sx={{ marginTop: "5px", fontWeight: 700, textAlign: "center" }}
              >
                검색
              </Typography>
            </Box>
          </Button>
        </Grid>
        <Grid xs>
          <Button
            sx={{
              width: "100%",
              height: "80px",
              display: "flex",
              flexDirection: "column",
              color: now === 3 ? "primary" : "lightgrey",
            }}
            onClick={() => {
              if (now !== 3) navigate("/board");
            }}
          >
            <Box component="div">
              <FontAwesomeIcon icon={faComments} size="2x" />
            </Box>
            <Box component="div">
              <Typography
                variant="body2"
                component="div"
                sx={{ marginTop: "5px", fontWeight: 700, textAlign: "center" }}
              >
                커뮤니티
              </Typography>
            </Box>
          </Button>
        </Grid>
        <Grid xs>
          <Button
            sx={{
              width: "100%",
              height: "80px",
              display: "flex",
              flexDirection: "column",
              color: now === 4 ? "primary" : "lightgrey",
            }}
            onClick={() => {
              if (now !== 4) navigate("/order");
            }}
          >
            <Box component="div">
              <FontAwesomeIcon icon={faLayerGroup} size="2x" />
            </Box>
            <Box component="div">
              <Typography
                variant="body2"
                component="div"
                sx={{ marginTop: "5px", fontWeight: 700, textAlign: "center" }}
              >
                주문
              </Typography>
            </Box>
          </Button>
        </Grid>
        <Grid xs>
          <Button
            sx={{
              width: "100%",
              height: "60px",
              display: "flex",
              flexDirection: "column",
              color: now === 5 ? "primary" : "lightgrey",
            }}
            onClick={() => {
              if (now !== 10) navigate("/mypage");
            }}
          >
            <Box component="div">
              <FontAwesomeIcon icon={faUser} size="2x" />
            </Box>
            <Box component="div">
              <Typography
                variant="body2"
                component="div"
                sx={{ marginTop: "5px", fontWeight: 700, textAlign: "center" }}
              >
                마이
              </Typography>
            </Box>
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
