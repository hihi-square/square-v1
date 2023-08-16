import * as React from "react";
import { REST_API } from "redux/redux";
import axios from "axios";
import { Grid, Button, Typography, Divider, Box } from "@mui/material";
// import { Grid, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "routes/customer/Footer";

type Post = {
  postId: number;
  title: string;
  content: string;
  createdAt: number[];
  commentCount: number;
  isLike: boolean;
  latitude: number;
  longitude: number;
  thumbnail: {
    url: string;
    thumb: string;
  };
  userId: number;
  userNickname: string;
  userProfile: string | null;
};

const getZeroNum = (num: number) => (num < 10 ? `0${num}` : num);

const formatTime = (createdAt: number[]) => {
  const [year, month, day, hour, minute, second] = createdAt;

  const formattedDate = `${year}-${getZeroNum(month)}-${getZeroNum(day)}`;
  const formattedTime = `${getZeroNum(hour)}:${getZeroNum(minute)}:${
    second ? getZeroNum(second) : "00"
  }`;

  return `${formattedDate} ${formattedTime}`;
};

function Board() {
  const token = sessionStorage.getItem("accessToken");
  const [userLocation, setUserLocation] = React.useState<string>("");
  const [posts, setPosts] = React.useState<Post[]>();

  const navigate = useNavigate();

  React.useEffect(() => {
    const dummyLocation = "대전광역시 유성구 구암동";
    const bCode = 3020011300;
    const depth = 1;

    getPosts(bCode, depth);
    setUserLocation(dummyLocation);
  }, []);

  const getPosts = (bCode: number, depth: number) => {
    axios({
      url: `${REST_API}community/1/${bCode}/${depth}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data }) => {
      setPosts(data.posts);
    });
  };

  const handlePostClick = (postId: number) => {
    navigate(`/board/${postId}`);
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
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {posts &&
          posts.map((post: Post, index: number) => (
            <React.Fragment key={post.postId}>
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
                  onClick={() => handlePostClick(post.postId)}
                >
                  {post.thumbnail && post.thumbnail.url && (
                    <div style={{ marginRight: "10px" }}>
                      <img src={post.thumbnail.url} width={50} />
                    </div>
                  )}
                  <div style={{ flexGrow: 1 }}>
                    <Typography variant="h6">{post.title}</Typography>
                    <Typography variant="body2">
                      {post.userNickname} | {formatTime(post.createdAt)} |
                      조회수: 1
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
                      {post.commentCount}
                    </Typography>
                  </div>
                </div>
              </Grid>
            </React.Fragment>
          ))}
          <Box sx={{
            position: "absolute"
          }}>
        <Button
          sx={{
            width: "100%",
            height: "60px",
            display: "flex",
            flexDirection: "column",
          }}
          onClick={() => {
            navigate("/board/write");
          }}
        >
          작성
        </Button>
        </Box>
      </Grid>
      <Footer now={5} />
    </div>
  );
}

export default Board;
