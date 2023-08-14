import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Box,
  CardMedia,
} from "@mui/material";

function StoreReview({ storeId }: { storeId?: string }) {
  const [reviews] = useState([
    {
      reviewId: 6,
      userNickname: "customer111",
      rating: 1,
      content: "맛잇어요",
      createdAt: [2023, 8, 8, 0, 3, 48],
      images: [
        { url: "1번 리뷰 이미지1", thumb: "1번 리뷰 썸네일1" },
        { url: "1번 리뷰 이미지2", thumb: "1번 리뷰 썸네일2" },
        { url: "1번 리뷰 이미지3", thumb: "1번 리뷰 썸네일3" },
      ],
    },
    {
      reviewId: 4,
      userNickname: "customer111",
      rating: 2,
      content: "맛잇어요",
      createdAt: [2023, 8, 7, 23, 25, 59],
      images: [],
    },
    {
      reviewId: 6,
      userNickname: "customer111",
      rating: 1,
      content: "맛잇어요",
      createdAt: [2023, 8, 8, 0, 3, 48],
      images: [
        { url: "1번 리뷰 이미지1", thumb: "1번 리뷰 썸네일1" },
        { url: "1번 리뷰 이미지2", thumb: "1번 리뷰 썸네일2" },
        { url: "1번 리뷰 이미지3", thumb: "1번 리뷰 썸네일3" },
      ],
    },
    {
      reviewId: 6,
      userNickname: "customer111",
      rating: 1,
      content: "맛잇어요",
      createdAt: [2023, 8, 8, 0, 3, 48],
      images: [
        { url: "1번 리뷰 이미지1", thumb: "1번 리뷰 썸네일1" },
        { url: "1번 리뷰 이미지2", thumb: "1번 리뷰 썸네일2" },
        { url: "1번 리뷰 이미지3", thumb: "1번 리뷰 썸네일3" },
      ],
    },
  ]);

  // useEffect(() => {
  //   axios.get(`${REST_API}review/${storeId}`)
  //     .then(response => {
  //       setReviews(response.data.reviews);
  //     })
  //     .catch(error => {
  //       console.error("리뷰 정보를 불러오는데 실패했습니다.", error);
  //     });
  // }, [storeId]);

  return (
    <Container>
      <Grid container spacing={3}>
        {reviews.map((review, idx) => (
          <Grid item xs={12} key={idx}>
            <Card>
              <CardContent>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6">{review.userNickname}</Typography>
                  <Typography color="textSecondary">
                    {review.createdAt.slice(0, 3).join("-")}{" "}
                    {review.createdAt.slice(3, 5).join(":")}
                  </Typography>
                </Grid>
                <Box mt={2}>
                  <Typography variant="body2">별점: {review.rating}</Typography>
                </Box>

                {review.images && review.images.length > 0 && (
                  <Box mt={2}>
                    {review.images.map((image, imgIdx) => (
                      <Box mt={1} key={imgIdx}>
                        <CardMedia
                          component="img"
                          image={image.url}
                          alt={`리뷰-${imgIdx}-이미지`}
                        />
                      </Box>
                    ))}
                  </Box>
                )}

                <Typography variant="body1" color="textPrimary" mt={2}>
                  {review.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default StoreReview;
