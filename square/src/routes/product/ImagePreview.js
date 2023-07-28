import React, { useState } from "react";
import { MuiFileInput } from "mui-file-input";

function ImagePreview() {
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null); // file 상태 추가

  const handleImageUpload = (uploadedFile) => {
    // eslint-disable-next-line no-console
    console.log(uploadedFile);
    setFile(uploadedFile); // file 상태 업데이트

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(uploadedFile);
  };

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      {image && (
        <img src={image} alt="preview" style={{ height: "300px", width: "300px" }} />
      )}
      <MuiFileInput fullWidth label="상품 이미지" required variant="outlined" value={file} onChange={handleImageUpload}/>
      <br />
    </div>
  );
}

export default ImagePreview;