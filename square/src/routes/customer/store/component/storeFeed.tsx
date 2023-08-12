import React, { useState } from "react";
import { Card, CardContent, Typography, Grid, Container, Box, CardMedia } from "@mui/material";

function StoreFeed({ storeId }: { storeId?: string }) {
  const [notices] = useState<any[]>([

    {
      modifiedAt: ["2023", "08", "10"],
      createdAt: ["2023", "07", "10"],
      images: [
        { url: "이미지1_URL" },
        { url: "이미지2_URL" }
      ],
      content: "공지사항1의 내용입니다."
    },
    {
      modifiedAt: ["2023", "08", "05"],
      images: [],
      content: "공지사항2의 내용입니다. (이미지 없음)"
    },    {
      modifiedAt: ["2023", "08", "10"],
      createdAt: ["2023", "07", "10"],
      images: [
        { url: "이미지1_URL" },
        { url: "이미지2_URL" }
      ],
      content: "공지사항1의 내용입니다."
    },
    {
      modifiedAt: ["2023", "08", "05"],
      images: [],
      content: "공지사항2의 내용입니다. (이미지 없음)"
    },    {
      modifiedAt: ["2023", "08", "10"],
      createdAt: ["2023", "07", "10"],
      images: [
        { url: "이미지1_URL" },
        { url: "이미지2_URL" }
      ],
      content: "공지사항1의 내용입니다."
    },
    {
      modifiedAt: ["2023", "08", "05"],
      images: [],
      content: "공지사항2의 내용입니다. (이미지 없음)"
    }
  ]);

  // useEffect(() => {
  //   axios.get(`${REST_API}store/daily/list/${storeId}`)
  //     .then(response => {
  //       setNotices(response.data.notices);
  //     })
  //     .catch(error => {
  //       console.error("공지 정보를 불러오는데 실패했습니다.", error);
  //     });
  // }, [storeId]);

  return (
    <Container>      
      <Grid container spacing={3}>
        {notices.map((notice, idx) => (
          <Grid item xs={12} key={idx}>
            <Card>
              <CardContent>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">공지글입니다 !!</Typography>
                  <Typography color="textSecondary">
                    {notice.modifiedAt?.join('-') || notice.createdAt.join('-')}
                  </Typography>
                </Grid>
                
                {notice.images && notice.images.length > 0 && (
                  <Box mt={2}>
                    {notice.images.map((image: { url: string }, imgIdx: number) => (
                      <Box mt={1} key={imgIdx}>
                        <CardMedia
                          component="img"
                          image={image.url}
                          alt={`이미지-${imgIdx}`}
                        />
                      </Box>
                    ))}
                  </Box>
                )}
                
                <Typography variant="body1" color="textPrimary" mt={2}>
                  {notice.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default StoreFeed;