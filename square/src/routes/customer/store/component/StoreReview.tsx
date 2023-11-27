import React, { useEffect, useState } from "react";
import axios from "axios";
import { REST_API } from "redux/redux";
import { Unstable_Grid2 as Grid, Typography, Box } from "@mui/material";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

type Image = {
  url: string;
  thumb: string;
};

type Review = {
  reviewId: number;
  orderId: number;
  userId: number;
  userNickname: string;
  rating: number;
  content: string;
  createdAt: [number, number, number, number, number, number]; // [year, month, day, hour, minute, second]
  images: Image[];
};

type ProgressBarProps = {
  percentage: number; // 백분율 (0 ~ 100)
};

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  const fillStyle = {
    width: `${percentage * 100}%`,
    backgroundColor: "#ffcc33", // 색상 변경 가능
    height: "100%",
  };

  return (
    <div
      style={{
        width: "100%",
        height: "10px", // 높이 변경 가능
        border: "1px solid #ccc", // 테두리 스타일
        borderRadius: "5px", // 테두리 곡률
      }}
    >
      <div style={fillStyle}></div>
    </div>
  );
};

export default function StoreMenu({ storeId }: { storeId?: string }) {
  const [reviews, setReviews] = useState<Review[]>();
  const [averageRating, setAverageRating] = useState<number>();
  const [reviewRateCount, setReviewRateCount] = useState<[]>();
  const [reviewCount, setReviewCount] = useState<number>();

  useEffect(() => {
    axios({
      url: `${REST_API}review/${storeId}`,
      method: "GET",
    }).then(({ data }) => {
      setReviews(data.reviews);
      setAverageRating(data.averageRating);
      setReviewRateCount(data.reviewRateCount);
      setReviewCount(data.reviews.length);
    });
  }, []);

  return (
    <Grid
      xs={12}
      sx={{
        marginBottom: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid
        xs={11}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "120px",
          marginTop: "20px",
        }}
      >
        <Grid
          sx={{
            width: "25%",
            borderRadius: "10px",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4">{averageRating}</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
                {averageRating && averageRating >= value ? (
                  <AiFillStar />
                ) : (
                  <AiOutlineStar />
                )}
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid
          sx={{
            width: "70%",
            borderRadius: "10px",
            border: "1px solid #eee",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {reviewRateCount &&
            reviewCount &&
            [5, 4, 3, 2, 1].map((value) => (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.7rem",
                    marginRight: "10px",
                    width: "20px",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  {value}
                </Typography>
                <ProgressBar
                  percentage={reviewRateCount[value] / reviewCount}
                />
                <Typography
                  sx={{
                    fontSize: "0.7rem",
                    marginRight: "10px",
                    width: "20px",
                    justifyContent: "end",
                    display: "flex",
                  }}
                >
                  {reviewRateCount[value]}
                </Typography>
              </Box>
            ))}
        </Grid>
      </Grid>
      <Grid xs={11}>
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
                width: "100%",
              }}
            >
              {review.userNickname}
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
    </Grid>
  );
}
