import React, { useState } from "react";

function ImagePreview() {
  const [image, setImage] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      {image && (
        <img src={image} alt="preview" style={{ height: "400px", width: "400px" }} />
      )}
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <br />   
    </div>
  );
}

export default ImagePreview;