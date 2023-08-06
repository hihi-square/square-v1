import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import "App.css";

function Category() {
  const { category } = useParams();
  const navigate = useNavigate();

  type CategoryType = { // 이름 변경
    scbId: string;
    name: string;
    createdAt: {
      year: number;
      month: number;
      day: number;
      hour: number;
      minute: number;
      second: number;
    };
  };

  // 카테고리 정보를 저장할 상태 변수
  const [categories, setCategories] = useState<Array<CategoryType>>([]); // 변경된 이름 사용

  useEffect(() => {
    axios({
      url: `http://43.201.255.188:8811/scb`,
      method: "GET",
    })
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleCategoryClick = (scbId: string, name: string) => {
    navigate(`/storelist/${scbId}`, { state: { categoryName: name } });
  };
  
  return (
    <div>
      <h4>카테고리별</h4>
      <div className="category-container">
        {categories.map((categoryValue, index) => (
          <button
  className={`category-button ${category === categoryValue.scbId ? "active" : ""}`}
  key={index}
  onClick={() => handleCategoryClick(categoryValue.scbId, categoryValue.name)}
>
            {categoryValue.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Category;