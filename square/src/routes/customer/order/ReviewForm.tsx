import React, { useEffect, useState } from "react";
import axios from "axios";
import { REST_API } from "redux/redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Unstable_Grid2 as Grid,
  Button,
  TextareaAutosize,
  Typography,
  Box,
} from "@mui/material";
import Footer from "routes/customer/Footer";
import { BiArrowBack } from "react-icons/bi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function ReviewForm() {
  const urlParams = useParams<{ orderId: string }>();
  const [orderId, setOrderId] = useState<number>(); // 기본값을 undefined로 설정

  const [rating, setRating] = useState<number>(3);
  const [content, setcontent] = useState("");
  const token = sessionStorage.getItem("accessToken");

  const navigate = useNavigate();

  useEffect(() => {
    const parsedId = Number(urlParams.orderId);

    setOrderId(parsedId); // 파싱에 실패하면 undefined로 설정
  }, [urlParams]);

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (rating === null || content.trim() === "") {
      return; // 별점 또는 리뷰 내용이 비어있으면 제출하지 않음
    }

    const body = {
      orderId,
      rating,
      content,
      images: [],
    };

    axios({
      url: `${REST_API}review`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: body,
    }).then(() => {
      // 리뷰 작성 완료 후 수행할 작업 (예: 페이지 이동 등)
      navigate("/order");
    });
  };

  return (
    <Grid
      xs={12}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid
        style={{
          display: "flex",
          alignItems: "center",
          width: "100vw",
          height: "70px",
        }}
      >
        <Button
          sx={{
            fontSize: "20px",
          }}
          onClick={() => {
            navigate(-1);
          }}
        >
          <BiArrowBack />
        </Button>
        <Typography variant="h6">리뷰 작성</Typography>
      </Grid>
      <Grid
        sx={{
          marginTop: "100px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "80%",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <Box
              key={value}
              onClick={() => handleRatingClick(value)}
              sx={{
                fontSize: "50px",
                color: "#ffcc33",
              }}
            >
              {rating && rating >= value && <AiFillStar />}
              {rating && rating < value && <AiOutlineStar />}
            </Box>
          ))}
        </Box>

        <Grid
          sx={{
            backgroundColor: "gray",
            display: "flex",
            justifyContent: "center",
            width: "80%",
            marginBottom: "30px",
          }}
        >
          <TextareaAutosize
            value={content}
            onChange={(e) => setcontent(e.target.value)}
            placeholder="리뷰 작성"
            minRows={6}
            style={{
              width: "100%",
              resize: "none",
              padding: "10px",
            }}
          />
        </Grid>
        <Button
          type="submit"
          onClick={handleSubmit}
          sx={{
            marginTop: "30px",
            backgroundColor: "#2b7050",
            color: "white",
            width: "80%",
            height: "50px",
          }}
        >
          리뷰 등록
        </Button>
      </Grid>
      <Footer now={4} />
    </Grid>
  );
}

export default ReviewForm;
