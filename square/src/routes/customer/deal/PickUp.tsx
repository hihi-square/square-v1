import React from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Footer from "../Footer";

function PickUp() {
  const storeName = "가게명"; // 예시 이름
  const orderDetails = ["아메리카노", "카페라떼", "카푸치노"]; // 예시 주문 내역

  return (
    <>
      {/* 상단 박스 (가게명 및 메뉴 리스트) */}
      <Box m={3} p={2} border={1} borderRadius={2} borderColor="divider" width="90%" bgcolor="background.paper">
        
        {/* 가게 프로필 및 이름 */}
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src="/dummyProfile.jpg" alt="가게 프로필 사진" sx={{ width: 60, height: 60 }} />
          <Typography variant="h5" component="div" sx={{ ml: 2 }}>
            {storeName}
          </Typography>
        </Box>

        <Divider />

        {/* 주문 내역 */}
        <List>
          {orderDetails.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* 더미 지도 */}
      <Box mt={2} width="80%">
        <Box width="100%" pt="100%" bgcolor="grey.300" position="relative" borderRadius={2}>
          <Box position="absolute" top={0} left={0} right={0} bottom={0} style={{ backgroundImage: 'url(/dummyMap.jpg)', backgroundSize: 'cover' }} />
        </Box>
      </Box>

      <Footer now={7} />
    </>
  );
}

export default PickUp;
