import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useLocation } from "react-router-dom";

type MessageContent = {
  message: string;
  date: Date;
};

export default function MessageForm() {
  const location = useLocation();

  const initialState = (location.state as { content: MessageContent[] })?.content || [];
  const [content, setContent] = useState<MessageContent[]>(initialState);

  useEffect(() => {
    const eventSource = new EventSource('https://i9b208.p.ssafy.io:8811/');

    eventSource.onmessage = (event) => {
      const newData: MessageContent = JSON.parse(event.data);

          console.log(newData)
      setContent(prevContent => [...prevContent, newData]);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <List>
      {content.map((messageDetail: MessageContent, index: number) => (
        <ListItem key={index}>
          <ListItemText
            primary={messageDetail.message}
            secondary={messageDetail.date.toLocaleString()}
          />
        </ListItem>
      ))}
    </List>
  );
}
