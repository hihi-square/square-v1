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
  faMap,
  faMessage,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // 이 부분을 수정

interface FooterProps {
  now: number;
}

export default function Footer({ now }: FooterProps) {
  // const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <Grid container xs={12}>
        <Grid xs>
          <Button
            sx={{
              width: "100%",
              height: "60px",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() => {
              if (now !== 1) navigate("/main");
            }}
          >
            <Box component="div">
              <FontAwesomeIcon icon={faLayerGroup} />
            </Box>
            <Box component="div">
              <Typography
                variant="body2"
                component="div"
                sx={{ fontWeight: 500, textAlign: "center" }}
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
              height: "60px",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() => {
              if (now !== 2) navigate("/map");
            }}
          >
            <Box component="div">
              <FontAwesomeIcon icon={faMap} />
            </Box>
            <Box component="div">
              <Typography
                variant="body2"
                component="div"
                sx={{ fontWeight: 500, textAlign: "center" }}
              >
                지도
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
            }}
            onClick={() => {
              if (now !== 3) navigate("/board");
            }}
          >
            <Box component="div">
              <FontAwesomeIcon icon={faComment} />
            </Box>
            <Box component="div">
              <Typography
                variant="body2"
                component="div"
                sx={{ fontWeight: 500, textAlign: "center" }}
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
              height: "60px",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() => {
              if (now !== 4) navigate("/orderlist");
            }}
          >
            <Box component="div">
              <FontAwesomeIcon icon={faMessage} />
            </Box>
            <Box component="div">
              <Typography
                variant="body2"
                component="div"
                sx={{ fontWeight: 500, textAlign: "center" }}
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
            }}
            onClick={() => {
              if (now !== 10) navigate("/mypage");
            }}
          >
            <Box component="div">
              <FontAwesomeIcon icon={faUser} />
            </Box>
            <Box component="div">
              <Typography
                variant="body2"
                component="div"
                sx={{ fontWeight: 500, textAlign: "center" }}
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
