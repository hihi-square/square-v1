import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Unstable_Grid2 as Grid,
  IconButton,
} from "@mui/material";
import { BiArrowBack, BiCartAlt, BiHomeAlt } from "react-icons/bi";
import { GrFormNext } from "react-icons/gr";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { REST_API } from "redux/redux";
import Footer from "routes/customer/Footer";

type Image = {
  url: string;
  thumb: string;
};

type Review = {
  reviewId: number;
  orderId: number;
  storeId: number;
  storeName: string;
  rating: number;
  content: string;
  createdAt: [number, number, number, number, number, number]; // [year, month, day, hour, minute, second]
  images: Image[];
};

function MyReview() {
  const token = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>();

  const getReviews = () => {
    axios({
      url: `${REST_API}review`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data }) => {
      setReviews(data.reviews);
    });
  };

  const handleDeleteReview = (id: number) => {
    axios({
      url: `${REST_API}review/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      getReviews();
    });
  };

  useEffect(() => {
    getReviews();
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const navigateToStorePage = (storeId: number) => {
    navigate(`/store/${storeId}`);
  };
  const handleCartClick = () => {
    navigate("/deal/cart");
  };
  const handleHome = () => {
    navigate("/main");
  };

  return (
    <Grid sx={{ padding: 3, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* 뒤로가기 */}
        <IconButton
          onClick={goBack}
          sx={{ width: "20%", display: "flex", justifyContent: "left" }}
        >
          <BiArrowBack size="24" color="#3d3d3d" />
        </IconButton>
        {/* 내 단골가게 */}
        <Typography
          variant="h6"
          sx={{ margin: "auto", width: "60%", textAlign: "center" }}
        >
          내 리뷰
        </Typography>
        {/* 홈버튼, 장바구니 버튼  */}
        <Box sx={{ display: "flex", width: "20%" }}>
          <IconButton onClick={handleHome}>
            <BiHomeAlt size="24" color="#3d3d3d" />
          </IconButton>
          <IconButton onClick={handleCartClick}>
            <BiCartAlt size="24" color="#3d3d3d" />
          </IconButton>
        </Box>
      </Box>

      <Grid
        xs={11}
        sx={{
          paddingBottom: "100px",
        }}
      >
        {reviews &&
          reviews.map((review: Review, index: number) => (
            <Grid
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
                boxSizing: "border-box",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => navigateToStorePage(review.storeId)}
              >
                <Typography sx={{ marginRight: "5px" }}>
                  {review.storeName}
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <GrFormNext />
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "10px",
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Box
                        key={value}
                        sx={{
                          fontSize: "13px",
                          color: "#ffcc33",
                        }}
                      >
                        {review.rating && review.rating >= value ? (
                          <AiFillStar />
                        ) : (
                          <AiOutlineStar />
                        )}
                      </Box>
                    ))}
                  </Box>
                  <Typography>
                    {review.createdAt[0]}.
                    {review.createdAt[1] < 10
                      ? `0${review.createdAt[1]}`
                      : review.createdAt[1]}
                    .
                    {review.createdAt[2] < 10
                      ? `0${review.createdAt[2]}`
                      : review.createdAt[2]}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    color: "#c2291b",
                    fontSize: "0.8em",
                  }}
                  onClick={() => handleDeleteReview(review.reviewId)}
                >
                  삭제
                </Box>
              </Box>
              <Typography
                sx={{
                  whiteSpace: "wrap",
                  wordWrap: "break-word",
                }}
              >
                {review.content}
              </Typography>
            </Grid>
          ))}
      </Grid>
      <Footer now={5} />
    </Grid>
  );
}
export default MyReview;
