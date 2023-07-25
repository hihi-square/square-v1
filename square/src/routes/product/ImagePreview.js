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
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <br />
      {image && (
        <img src={image} alt="preview" style={{ height: "200px", width: "200px" }} />
      )}
    </div>
  );
}

export default ImagePreview;