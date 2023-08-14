import * as React from "react";
import { Grid, Button, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "routes/customer/Footer";

function Board() {
  const [selectedBoard, setSelectedBoard] = React.useState<string | null>(
    "Today"
  );

  const [userLocation, setUserLocation] = React.useState<string>("");

  const navigate = useNavigate();

  type Post = {
    id: string;
    title: string;
    author: string;
    date: string;
    views: number;
    comments: number;
    thumbnail: string;
  };

  const dummyData: { [key: string]: string[] } = {
    Today: ["공지1", "공지2", "공지3"],
    "사장님 게시판": ["사장님 글1", "사장님 글2"],
    "자유 게시판": ["자유1", "자유2", "자유3", "자유4"],
    "익명 게시판": ["익명1", "익명2"],
  };

  const dummyPosts: { [key: string]: Post[] } = {
    Today: [
      {
        id: "1",
        title: "오늘의 메뉴",
        author: "동네빵집",
        date: "2023-08-09",
        views: 100,
        comments: 5,
        thumbnail: "URL1",
      },
      {
        id: "2",
        title: "오늘의 초밥",
        author: "코우지",
        date: "2023-08-09",
        views: 1000,
        comments: 30,
        thumbnail: "URL1",
      },
      {
        id: "3",
        title: "장사 안합니다",
        author: "펭소연",
        date: "2023-08-09",
        views: 1,
        comments: 5,
        thumbnail: "URL1",
      },
    ],
    "사장님 게시판": [
      {
        id: "1",
        title: "처음보는 진상유형",
        author: "카페사장",
        date: "2023-08-08",
        views: 200,
        comments: 10,
        thumbnail: "URL2",
      },
      {
        id: "2",
        title: "펭소 저격합니다",
        author: "오다가다 오다희",
        date: "2023-08-08",
        views: 1,
        comments: 1,
        thumbnail: "URL2",
      },
    ],
  };

  React.useEffect(() => {
    const dummyLocation = "대전광역시 유성구 구암동";

    setUserLocation(dummyLocation);
  }, []);

  const handlePostClick = (postId: string) => {
    if (selectedBoard) {
      navigate(`/board/${selectedBoard}/${postId}`, {
        state: {
          postDetails: dummyPosts[selectedBoard].find((p) => p.id === postId),
        },
      });
    }
  };

  return (
    <div>
      <Typography
        variant="h6"
        align="center"
        style={{ marginTop: "15px", marginBottom: "5px" }}
      >
        {userLocation}
      </Typography>

      <Grid container justifyContent="center" spacing={1}>
        <Grid item xs={12} mt="20px">
          <Divider variant="middle" sx={{ borderColor: "green" }} />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            padding: "15px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {Object.keys(dummyData).map((boardName) => (
            <Button
              key={boardName}
              onClick={() => setSelectedBoard(boardName)}
              sx={{
                boxShadow:
                  selectedBoard === boardName
                    ? "3px 3px 5px rgba(0,0,0,0.3)"
                    : "none", // 선택된 보드에만 그림자 추가
                backgroundColor:
                  selectedBoard === boardName ? "#f0f0f0" : "transparent", // 선택된 보드에만 배경색 변경
                "&:hover": {
                  backgroundColor:
                    selectedBoard === boardName ? "#e0e0e0" : "transparent", // 호버 시 배경색 변경
                },
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                sx={{
                  fontWeight: 500,
                  textAlign: "center",
                  fontSize: "10px",
                  color: "black",
                  padding: "0px 5px",
                }}
              >
                {boardName}
              </Typography>
            </Button>
          ))}
        </Grid>
      </Grid>
      {selectedBoard && (
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          {dummyPosts[selectedBoard]?.map((post: Post, index: number) => (
            <React.Fragment key={post.id}>
              {index !== 0 && (
                <Divider
                  variant="middle"
                  sx={{ width: "100%", margin: "10px 0" }}
                />
              )}
              <Grid item xs={12}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handlePostClick(post.id)}
                >
                  <div style={{ marginRight: "10px" }}>
                    <img src={post.thumbnail} width={50} />
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <Typography variant="h6">{post.title}</Typography>
                    <Typography variant="body2">
                      {post.author} | {post.date} | 조회수: {post.views}
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      variant="body1"
                      style={{
                        backgroundColor: "#eee",
                        borderRadius: "50%",
                        padding: "5px 10px",
                      }}
                    >
                      {post.comments}
                    </Typography>
                  </div>
                </div>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      )}

      <Footer now={5} />
    </div>
  );
}

export default Board;
