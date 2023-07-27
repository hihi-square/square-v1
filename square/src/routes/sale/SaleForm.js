import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import ImagePreview from './ImagePreview';


export default function ProductForm({open, close}) {
  const [age, setAge] = React.useState('');
  const [product, setProduct] = React.useState({
    id: "",
    image: "",
    thumbnail: "",
    category: "",
    name: "",
    createDate: "",
    modifiedDate: "",
    timesale: 0,
    linksale: 0,
    price: 0,
    status: 1,
    description: ""
  });
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleProductChange = (event) => {
    const { name, value } = event.target;
    
    setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
  };

  return (
    <>
      <Dialog open={open} onClose={close}>
        <DialogTitle>상품 등록</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <DialogContentText>
                상품 이미지
              </DialogContentText>
              <ImagePreview />
            </Grid>
            <Grid xs={8}>
              <DialogContentText>
                상품명입니다.
              </DialogContentText>
              <TextField id="name"
                name="name"
                fullWidth
                variant="standard"
                onChange={handleProductChange}/>
            </Grid>
            <Grid xs={4}>
              <DialogContentText>
                가격
              </DialogContentText>
              <FormControl variant="standard">
                <Input
                  id="standard-adornment-amount" name="price"
                startAdornment={<InputAdornment position="start">￦</InputAdornment>}
                />
              </FormControl>
            </Grid>
            <Grid xs={6}>
              <DialogContentText>
                판매 상태
              </DialogContentText>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={6}>
              <DialogContentText>
                카테고리
              </DialogContentText>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={4}>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="대표" />
              </FormGroup>
            </Grid>
            <Grid xs={4}>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="인기" />
              </FormGroup>
            </Grid>
            <Grid xs={4}>
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked/>} label="노출" />
              </FormGroup>
            </Grid>
            <Grid xs={12}>
              <DialogContentText>
                세부 설명
              </DialogContentText>
              <TextField
                id="outlined-multiline-static"
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>닫기</Button>
          <Button onClick={()=>{
            // eslint-disable-next-line no-console
            console.log(product);
            close();
          }}>등록</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}