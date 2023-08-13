import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { useNavigate} from "react-router-dom";
import Footer from "../Footer";
    
const messages = [
  { 
    sender: 'User1',
    content: [
      { message: '첫번째 메시지입니다!', date: new Date('2023-08-13 10:00:00') },
      { message: '두번째 메시지입니다!', date: new Date('2023-08-13 10:05:00') },
      { message: '안녕하세요!', date: new Date('2023-08-13 10:10:00') },
    ],
    
  },
  { 
    sender: 'User2',
    content: [
      { message: 'ㅎㅇㅎㅇ', date: new Date('2023-08-13 10:00:00') },
      { message: '이겨라 제발', date: new Date('2023-08-13 10:05:00') },
      { message: '리버풀 화이팅', date: new Date('2023-08-13 10:10:00') },
    ],
    
  },
  { 
    sender: 'User3',
    content: [
      { message: '으으', date: new Date('2023-08-13 10:00:00') },
      { message: '일하기 싫다', date: new Date('2023-08-13 10:05:00') },
      { message: 'ㅜㅜ', date: new Date('2023-08-13 10:10:00') },
    ],
    
  },

  // ... 기타 사용자들의 메시지
];



export default function Message() {
  const navigate = useNavigate();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          내 쪽지함
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3}>
          <List>
            {messages.map((messageData, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={messageData.sender}
                  secondary={messageData.content[messageData.content.length - 1].message} 
                />
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => navigate(`/message/${messageData.sender}`, { state: { content: messageData.content } })}
                >
                  👀
                </Button>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
      <Footer now={6} />
    </Grid>
  );
}
