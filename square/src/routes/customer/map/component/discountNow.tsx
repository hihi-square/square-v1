import React from "react";
import {
  Unstable_Grid2 as Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  // Box,
  // Button,
  Divider,
} from "@mui/material";
import "App.css";

function DiscountNow() {
  const discounts = [
    {
      thumbnail: "/img/sample/cookie1.png",
      name: "시원한 여름을 날려줄 ",
      storeName: "store1",
      period: 0,
      discountPrice: 10000,
      originalPrice: 12000,
    },
    {
      thumbnail: "/img/sample/cookie2.png",
      name: "sale2",
      storeName: "store2",
      period: 11,
      discountPrice: 20000,
      originalPrice: 42000,
    },
    {
      thumbnail: "/img/sample/cookie3.png",
      name: "sale3",
      storeName: "store3",
      period: 3,
      discountPrice: 30000,
      originalPrice: 45000,
    },
    {
      thumbnail: "/img/sample/cookie4.png",
      name: "sale4",
      storeName: "store4",
      period: 0,
      discountPrice: 10000,
      originalPrice: 12000,
    },
    {
      thumbnail: "/img/sample/cookie5.png",
      name: "sale5",
      storeName: "store5",
      period: 11,
      discountPrice: 20000,
      originalPrice: 42000,
    },
    {
      thumbnail: "/img/sample/cookie6.png",
      name: "sale6",
      storeName: "store6",
      period: 3,
      discountPrice: 30000,
      originalPrice: 45000,
    },
  ];

  return (
    <Grid xs={11} mt={1}>
      <h4>진행중인 할인</h4>
      {discounts.map((discount, index) => (
        <Card
          key={index}
          variant="outlined"
          sx={{ display: "flex", marginBottom: "10px", width: "100%" }}
        >
          <Grid xs={12} container>
            <Grid xs={12}>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ marginLeft: "20px", fontWeight: 400 }}
              >
                {discount.storeName}
              </Typography>
              <Divider variant="middle"></Divider>
            </Grid>
            <Grid xs={12} sx={{ display: "flex" }}>
              <CardMedia
                component="img"
                sx={{ marginLeft: "10px", width: "100px" }}
                image={discount.thumbnail}
                alt="menu"
              />
              <Grid container>
                <CardContent
                  sx={{
                    padding: "2px 2px 0px 20px",
                    paddingBottom: "0px",
                    flex: "1 0 auto",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h4"
                    sx={{ fontWeight: 600 }}
                  >
                    {discount.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ fontWeight: 400 }}
                  >
                    {discount.storeName}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ fontWeight: 400 }}
                  >
                    {discount.discountPrice}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      ))}
    </Grid>
  );
}

export default DiscountNow;
