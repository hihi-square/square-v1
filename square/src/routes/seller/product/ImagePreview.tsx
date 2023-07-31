import React, { ChangeEvent, useState } from "react";
import { Box, TextField } from "@mui/material";

interface ImagePreviewProps {
  error: boolean;
  helperText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function ImagePreview({ error, helperText, onChange }: ImagePreviewProps) {
  const [image, setImage] = useState<string | null>("");
  const [fileName, setFileName] = useState<string | null>(
    "상품 이미지를 업로드 해주세요."
  ); // state for file name

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];

    if (file) {
      setFileName(file.name); // update file name state

      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null); // reset image preview if no file selected
      setFileName(""); // reset file name state
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {image && (
        <img
          src={image}
          alt="preview"
          style={{ height: "300px", width: "300px" }}
        />
      )}
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="contained-button-file"
        type="file"
        onChange={handleImageUpload}
      />
      <label htmlFor="contained-button-file" style={{ width: "100%" }}>
        <Box
          onClick={() =>
            document.getElementById("contained-button-file")?.click()
          }
        >
          <TextField
            variant="outlined"
            id="image"
            name="image"
            fullWidth
            label="Upload"
            value={fileName}
            disabled
            onChange={onChange}
            error={Boolean(error)}
            helperText={helperText}
          />
        </Box>
      </label>
      <br />
    </div>
  );
}

export default ImagePreview;
