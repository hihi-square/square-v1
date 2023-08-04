import {
  Box,
  Chip,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { DraggableProvided } from "react-beautiful-dnd";
import { Iproduct } from "modules/types";

import "../../../Seller.css";

interface ReadyItemsProps {
  product: Iproduct;
  dragProvided: DraggableProvided;
}

export default function ReadyItems({ product, dragProvided }: ReadyItemsProps) {
  return (
    <>
      <ListItem
        key={product.id}
        sx={{
          "&:last-child td, &:last-child th": {
            border: 0,
          },
        }}
        ref={dragProvided.innerRef}
        {...dragProvided.draggableProps}
        {...dragProvided.dragHandleProps}
        alignItems="flex-start"
      >
        <ListItemAvatar>
          <Avatar alt="음식사진" src={product.thumbnail} />
        </ListItemAvatar>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography component="h4" variant="h4" color="text.primary">
              {product.name}
              {product.id}
            </Typography>
            <Typography component="h5" variant="h5" color="red">
              {product.price}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Typography component="div" variant="body2" color="text.secondary">
              {product.description}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Chip label="대표" />
            <Chip label="인기" />
          </Box>
        </Box>
      </ListItem>
    </>
  );
}
