import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from 'react';
import { Typography, Box, Grid, Card, CardMedia, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


function MyRegular() {
  // 컴포넌트 이름이 대문자로 시작해야 합니다.
  const navigate = useNavigate();

  type Store = {
    storeThumbnail: string;
    storeName: string;
    lastOrderDate: string;
}

  const goBack = () => {
    navigate(-1);
  };
  const [open, setOpen] = useState(false);

  
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

const handleOpen = (store: Store) => {
    setSelectedStore(store);
    setOpen(true);
};

const handleClose = () => {
  setOpen(false);
  setSelectedStore(null);
};

const handleDelete = () => {
  // DB에서 해당 단골 내역 삭제 요청을 보낼 함수를 여기에 작성

  handleClose();
};

  const dummyRegularStores = [
    {
        storeThumbnail: "가게이미지URL1",
        storeName: "가게1",
        lastOrderDate: "5일 전",
    },
    {
      storeThumbnail: "가게이미지URL2",
      storeName: "가게2",
      lastOrderDate: "2일 전",
  },    {
    storeThumbnail: "가게이미지URL3",
    storeName: "가게3",
    lastOrderDate: "3일 전",
},
{
  storeThumbnail: "가게이미지URL4",
  storeName: "가게4",
  lastOrderDate: "6일 전",
},
{
storeThumbnail: "가게이미지URL5",
storeName: "가게5",
lastOrderDate: "1일 전",
},    {
storeThumbnail: "가게이미지URL6",
storeName: "가게6",
lastOrderDate: "1일 전",
},
];

return (
  <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <ArrowBackIcon onClick={goBack} />
          <Typography variant="h6" sx={{ margin: "auto" }}>
              내 단골가게
          </Typography>
      </Box>
      <Grid container spacing={2}>
          {dummyRegularStores.map((store, index) => (
              <Grid item xs={12} md={4} key={index}>
                  <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
                      <CardMedia component="img" image={store.storeThumbnail} sx={{ width: 50, height: 50, marginRight: 2 }} />
                      <Box>
                          <Typography variant="h6">{store.storeName}</Typography>
                          <Typography variant="subtitle1" color="textSecondary">{store.lastOrderDate}</Typography>
                      </Box>
                      <Button variant="outlined" color="error" onClick={() => handleOpen(store)}>삭제하기</Button>
                  </Card>
              </Grid>
          ))}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{"단골 가게 삭제"}</DialogTitle>
          <DialogContent>
              <DialogContentText>
                  {selectedStore && `정말로 "${selectedStore.storeName}" 가게를 단골 목록에서 삭제하시겠습니까?`}
              </DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button onClick={handleClose} color="primary">
                  아니오
              </Button>
              <Button onClick={handleDelete} color="primary" autoFocus>
                  네
              </Button>
          </DialogActions>
      </Dialog>
  </>
);

}
export default MyRegular;
