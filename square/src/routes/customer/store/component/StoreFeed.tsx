import React, { useEffect, useState } from "react";

import { Unstable_Grid2 as Grid, Box } from "@mui/material";
import axios from "axios";
import { REST_API } from "redux/redux";
import FeedImage from "./FeedImage";

type Image = {
  imgId: number;
  url: string;
  order: number;
  type: string;
  connectedId: number;
  thumbnail: string;
};

type Notice = {
  snoId: number;
  storeName: string;
  storeId: number;
  storeLogo: string;
  content: string;
  state: string;
  createdAt: number[];
  modifiedAt: number[];
  images: Image[];
};

function StoreFeed({ storeId }: { storeId?: string }) {
  const [notices, setNotices] = useState<Notice[]>();

  useEffect(() => {
    axios
      .get(`${REST_API}store/daily/list/${storeId}`)
      .then(({ data }) => {
        setNotices(data.notices);
      })
      .catch((error) => {
        console.error("공지 정보를 불러오는데 실패했습니다.", error);
      });
  }, [storeId]);

  return (
    <Grid
      xs={12}
      sx={{
        marginBottom: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "30px",
      }}
    >
      {notices &&
        notices.map((notice, idx) => (
          <Grid
            key={idx}
            sx={{
              marginBottom: "20px",
              width: "80%",
              padding: "10px",
              paddingBottom: "30px",
              border: "1px solid rgba(0, 0, 0, 0.3)",
              borderRadius: "5px",
            }}
          >
            <Box>
              {notice.createdAt[0]}.{notice.createdAt[1]}.{notice.createdAt[2]}
            </Box>
            <Box>{notice.images && <FeedImage images={notice.images} />}</Box>
            <Box>{notice.content}</Box>
          </Grid>
        ))}
    </Grid>
  );
}

export default StoreFeed;
