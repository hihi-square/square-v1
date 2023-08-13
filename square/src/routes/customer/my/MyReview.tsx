import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography, Box, Card, CardContent, CardMedia, Grid  } from "@mui/material";

function MyReview() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const navigateToStorePage = (storeId: string) => {
        navigate(`/store/${storeId}`);
    };

    const dummyReviews = [
        {
            storeId: "1",
            storeThumbnail: "가게이미지URL1",
            storeName: "가게1",
            daysAgo: "5일 전",
            menu: "메뉴A",
            reviewImage: "리뷰이미지URL1",
            reviewContent: "리뷰 내용1"
        },
        {
            storeId: "2",
            storeThumbnail: "가게이미지URL2",
            storeName: "가게2",
            daysAgo: "2일 전",
            menu: "메뉴B",
            reviewImage: "리뷰이미지URL2",
            reviewContent: "리뷰 내용2"
        },
        {
            storeId: "3",
            storeThumbnail: "가게이미지URL3",
            storeName: "가게3",
            daysAgo: "1일 전",
            menu: "메뉴C",
            reviewImage: "리뷰이미지URL3",
            reviewContent: "리뷰 내용3"
        },
    ];

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <ArrowBackIcon onClick={goBack} />
                <Typography variant="h6" sx={{ margin: "auto" }}>
                    내 리뷰
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {dummyReviews.map((review, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
                                    <CardMedia component="img" image={review.storeThumbnail} sx={{ width: 50, height: 50, marginRight: 2 }} />
                                    <Typography variant="h6" onClick={() => navigateToStorePage(review.storeId)} style={{ cursor: "pointer" }}>
    {review.storeName}
</Typography>
                                    <Typography variant="subtitle1" color="textSecondary" sx={{ marginLeft: "auto" }}>{review.daysAgo}</Typography>
                                </Box>
                                <Typography variant="subtitle2" color="textSecondary">{review.menu}</Typography>
                                <CardMedia component="img" image={review.reviewImage} sx={{ width: "100%", height: "auto", marginY: 2 }} />
                                <Typography>{review.reviewContent}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
export default MyReview;
