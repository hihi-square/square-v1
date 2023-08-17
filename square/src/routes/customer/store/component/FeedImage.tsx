// import React, { useEffect } from "react";
import React, { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { GrNext, GrPrevious } from "react-icons/gr";

type Image = {
  imgId: number;
  url: string;
  order: number;
  type: string;
  connectedId: number;
  thumbnail: string;
};

function FeedImage({ images }: { images?: Image[] }) {
  const [index, setIndex] = useState<number>(0);
  const size = images ? images.length : 0;
  const handlePrevImage = () => {
    if (index - 1 < 0) setIndex(size - 1);
    else setIndex(index - 1);
  };

  const handleNextImage = () => {
    if (index + 1 >= size) setIndex(0);
    else setIndex(index + 1);
  };

  return (
    <Grid
      sx={{
        borderRadius: "5px",
        marginY: "10px",
        borderBottom: "1px solid #eee",
        paddingTop: "10px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {images &&
        images.map((img, idx) => (
          <Box>
            {idx === index && (
              <Box>
                <img src={img.url} width="100%" />
              </Box>
            )}
          </Box>
        ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button onClick={() => handlePrevImage()}>
          <GrPrevious />
        </Button>
        <Box>
          {index + 1}/{size}
        </Box>
        <Button onClick={() => handleNextImage()}>
          <GrNext />
        </Button>
      </Box>
    </Grid>
  );
}

export default FeedImage;
