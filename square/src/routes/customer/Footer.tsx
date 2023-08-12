
import React, { useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';  // 이 부분을 수정
import { styled } from '@mui/system';

export default function Footer() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showFooter, setShowFooter] = useState(true);
  const navigate = useNavigate();  // 이 부분을 수정
  
  const AnimatedFooter = styled(Paper)({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    transform: 'translateY(0)',
    transition: 'transform 0.7s cubic-bezier(0.25, 0.8, 0.25, 1)', 
    '&.hide': {
      transform: 'translateY(100%)',
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        setShowFooter(false);
      } else {
        setShowFooter(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);
  
  if (!showFooter) return null; // 푸터를 숨기는 경우

  return (
    <AnimatedFooter className={!showFooter ? 'hide' : ''} elevation={3}>
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
      navigate('/main'); 
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
              // setValue(0);
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
              navigate('/board');  // 이 부분을 수정
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
              // setValue(0);
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
                메시지
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
              navigate('/mypage');  // 이 부분을 수정
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
        </AnimatedFooter>
  );
}
