import React from "react";
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
  setCurrProduct: React.Dispatch<React.SetStateAction<Iproduct>>;
  realProduct: React.MutableRefObject<{
    id: number;
    userId: number;
    image: string;
    thumbnail: string;
    categoryId: number;
    categoryName: string;
    name: string;
    signature: boolean;
    popular: boolean;
    price: number;
    status: string;
    createdAt: string;
    modifiedAt: string;
    salRecord: number;
    description: string;
    sequence: number;
  }>;
  setClick: React.Dispatch<React.SetStateAction<number>>;
  click: number;
}

export default function ReadyItems({
  product,
  dragProvided,
  setCurrProduct,
  realProduct,
  setClick,
  click,
}: ReadyItemsProps) {
  return (
    <>
      <ListItem
        key={product.id}
        sx={{
          "&:last-child td, &:last-child th": {
            border: 0,
          },
          backgroundColor: click === product.id ? "grey" : "white",
        }}
        ref={dragProvided.innerRef}
        {...dragProvided.draggableProps}
        {...dragProvided.dragHandleProps}
        alignItems="flex-start"
        onClick={() => {
          if (product.status !== "CATE") {
            click === product.id ? setClick(-1) : setClick(product.id);
            setCurrProduct({ ...product });
            realProduct.current = { ...product };
          }
        }}
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
