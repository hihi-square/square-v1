import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Unstable_Grid2 as Grid, Button } from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
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

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100vw",
          position: "fixed",
          zIndex: 5,
          height: "70px",
          backgroundColor: "white",
        }}
      >
        <Grid xs={2} sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            sx={{
              fontSize: "20px",
            }}
            onClick={() => {
              goBack();
            }}
          >
            <BiArrowBack />
          </Button>
        </Grid>
        <Typography variant="h6">내 리뷰</Typography>
      </Grid>
      <Grid
        xs={11}
        sx={{
          marginTop: "80px",
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
    </>
  );
}
export default MyReview;
