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
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import ImagePreview from './ImagePreview';


export default function ProductForm({open, close}) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
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
                상품명
              </DialogContentText>
              <TextField id="name" fullWidth variant="standard" />
            </Grid>
            <Grid xs={4}>
              <DialogContentText>
                가격
              </DialogContentText>
              <FormControl variant="standard">
                <Input
                  id="standard-adornment-amount"
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
          </Grid>
       
          
          <DialogContentText>
            카테고리
          </DialogContentText>
          <TextField id="name" margin="dense" variant="standard" />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={close}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}