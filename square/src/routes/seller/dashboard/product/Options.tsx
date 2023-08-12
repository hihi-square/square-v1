import React, { useState } from "react";
import {
  Unstable_Grid2 as Grid,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

export default function Options() {
  const [open, setOpen] = useState<boolean>(true);
  const [clicked, setClicked] = useState<number>();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Grid>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton>
          <ListItemText primary="기본 옵션" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Drafts" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Inbox" />
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      <Button>카테고리 추가</Button>
      <Button>카테고리 삭제</Button>
      <Button>옵션 추가</Button>
      <Button>옵션 삭제</Button>
    </Grid>
  );
}
