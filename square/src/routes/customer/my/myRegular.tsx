import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography, Box } from '@mui/material';


function MyRegular() { // 컴포넌트 이름이 대문자로 시작해야 합니다.
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
     <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <ArrowBackIcon onClick={goBack} />
      <Typography variant="h6" sx={{margin: 'auto'}}>내 단골가게</Typography>
    </Box>
    </>
  );
}
export default MyRegular;
