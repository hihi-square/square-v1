import { useNavigate } from 'react-router-dom';
import { Typography, Box, Slider, Button, CardMedia } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useState } from 'react';

function MyArea() {
  const navigate = useNavigate();
  const [value, setValue] = useState<number>(1);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleConfirmChange = () => {
    // confirm the range change
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ margin: '0 auto', maxWidth: '90%' }}>  {/* 여기에 마진 속성을 추가했습니다 */}
     <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <ArrowBackIcon onClick={goBack} />
      <Typography variant="h6" sx={{margin: 'auto'}}>내 활동반경 설정</Typography>
     </Box>
     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
      <CardMedia
        component="img"
        image="https://dummyimage.com/600x400" // Replace with your image url
        alt="map"
      />
      <Slider
        value={value}
        onChange={handleSliderChange}
        aria-labelledby="continuous-slider"
        min={1}
        max={5}
        marks={[
          {value: 1, label: '우리 동'},
          {value: 5, label: '최대'}
        ]}
      />
     </Box>
     <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Button variant="contained" onClick={handleConfirmChange} sx={{ padding: 2, fontSize: 15 }}>
          변경
        </Button>
     </Box>
    </Box>
  );
}

export default MyArea;
