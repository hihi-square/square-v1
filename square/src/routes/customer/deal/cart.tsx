import { useNavigate, useLocation, Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect } from 'react';
// import axios from 'axios';
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";



function Cart() {

  type Item = {
    productThumbnail: string;
    productName: string;
    price: number;
    quantity: number;
    isSelected?: boolean;
};

type Store = {
    shopThumbnail: string;
    shopName: string;
    estimatedTime: string;
    items: Item[];
};

  const navigate = useNavigate();
  const location = useLocation();

  // 상품과 상점 정보를 예시로 설정합니다.
  // 실제로는 서버로부터 받아온 데이터나 상태 관리를 통해 받아올 수 있습니다.
  // eslint-disable-next-line no-unused-vars

  const [cartData, setCartData] = useState<any[]>([]);


  const itemCount = cartData.reduce(
    (acc: number, store: Store) => acc + store.items.length,
    0
  );


function getCartFromLocalStorage() {

    const localCart = localStorage.getItem('cart'); // 이름 변경

    return localCart ? JSON.parse(localCart) : [];

}

  async function fetchDataFromBackend(cartItems: any)  {
    try {
        // const response = await axios.post('/api/fetchCartData', cartItems); 

        const dummyData = [
          {
              shopThumbnail: "https://example.com/shopThumbnail1.jpg",
              shopName: "프레쉬맨",
              estimatedTime: "25",
              items: [
                  {
                      productThumbnail: "https://example.com/productThumbnail1.jpg",
                      productName: "키조개 리조또",
                      price: 18000,
                      quantity: 1,
                  },
                  {
                      productThumbnail: "https://example.com/productThumbnail2.jpg",
                      productName: "시메사바",
                      price: 4000,
                      quantity: 2,
                  }
              ]
          },          {
            shopThumbnail: "https://example.com/shopThumbnail1.jpg",
            shopName: "둥지톳밥",
            estimatedTime: "5",
            items: [
                {
                    productThumbnail: "https://example.com/productThumbnail1.jpg",
                    productName: "오징어볶음",
                    price: 10000,
                    quantity: 4,
                },
                {
                    productThumbnail: "https://example.com/productThumbnail2.jpg",
                    productName: "양념게장",
                    price: 12000,
                    quantity: 5,
                }
            ]
        },          {
          shopThumbnail: "https://example.com/shopThumbnail1.jpg",
          shopName: "정가왕갈비탕",
          estimatedTime: "50",
          items: [
              {
                  productThumbnail: "https://example.com/productThumbnail1.jpg",
                  productName: "왕갈비탕",
                  price: 13000,
                  quantity: 2,
              },
              {
                  productThumbnail: "https://example.com/productThumbnail2.jpg",
                  productName: "간장게장",
                  price: 3000,
                  quantity: 2,
              }
          ]
      },
          // 필요한 만큼 다른 가게와 상품 데이터를 추가
      ];

        // return response.data;
        return dummyData;

    } catch (error) {
        console.error('Failed to fetch data', error);
        return [];
    }
}

useEffect(() => {
    async function fetchData() {
      
        const cartItems = getCartFromLocalStorage();

        const data = await fetchDataFromBackend(cartItems);
        
        data.forEach((store: Store) => store.items.forEach((item: Item) => (item.isSelected = true)));
        

        setCartData(data);
        console.log("카트 데이터는 ", cartData)
    }
  
    fetchData();
}, []);

  const goBack = () => {
    const previousState = location.state?.from;

    if (previousState) {
      navigate(previousState);
    } else {
      navigate(-1);
    }
  };
  const handleCheckboxChange = (storeIndex: number, itemIndex: number, isChecked: boolean) => {
    const newCartData = [...cartData];
    const item = newCartData[storeIndex].items[itemIndex];

    item.isSelected = isChecked;

    setCartData(newCartData);
  };
  
  const handleQuantityChange = (storeIndex: number, itemIndex: number, action: "add" | "subtract") => {
    const newCartData = [...cartData];

    const item = newCartData[storeIndex].items[itemIndex];

    if (action === "add") {
      item.quantity += 1;
    } else if (action === "subtract" && item.quantity > 0) {
      item.quantity -= 1;
    }
    setCartData(newCartData);
  };

  const totalSelectedPrice = cartData.reduce(
    (acc: number, store: Store) =>
      acc +
      store.items.reduce(
        (total: number, item: Item) => 
          item.isSelected ? total + item.price * item.quantity : total,
        0
      ),
    0
  );

  const selectedItems = cartData.flatMap((store: Store) => 
  store.items.filter((item: Item) => item.isSelected)
);


  const paymentButtonStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    padding: "10px",
    backgroundColor: "green",
    color: "white",
    fontSize: "18px",
    borderRadius: "10px",
    margin: "0 auto",
  };






  return (
    <>
      <header>
        <ArrowBackIcon onClick={goBack} />
        장바구니
      </header>

      <div className="cart">
      {cartData.map((store, storeIndex) => (
          <div
          key={storeIndex}
            className="store"
            style={{
              border: "1px solid black",
              padding: "10px",
              margin: "10px",
            }}
          >
            <img src={store.shopThumbnail} alt={`${store.shopName} 썸네일`} />
            <h2>{store.shopName}</h2>
            <p>예상 도착시간: {store.estimatedTime} 분</p>
            <div className="products">
            {store.items.map((item: Item, itemIndex: number) => (
    <div key={itemIndex} className="product">
      <Checkbox 
    color="primary"
    checked={item.isSelected}
    onChange={(e) => handleCheckboxChange(storeIndex, itemIndex, e.target.checked)}
/>
      <img
        src={item.productThumbnail}
        alt={`${item.productName} 썸네일`}
      />
      <p>{item.productName}</p>
      <p>가격: {item.price}원</p>
      <p>수량: {item.quantity}</p>
      <IconButton onClick={() => handleQuantityChange(storeIndex, itemIndex, "add")} size="small" color="primary">
        <AddIcon />
      </IconButton>
      <IconButton onClick={() => handleQuantityChange(storeIndex, itemIndex, "subtract")}size="small" color="secondary">
        <RemoveIcon />
      </IconButton>
    </div>
  ))}
</div>
            <p>
              가게 총 가격:{" "}
              {store.items.reduce(
              (total: number, item: any)=> total + item.price * item.quantity,
                0
              )}
              원
            </p>
          </div>
        ))}
      </div>

      <Link to={{ pathname: "/pay", state: { selectedItems } }}>
  <button style={paymentButtonStyle}>
    <div>{itemCount} 항목</div>
    <div>주문하기</div>
    <div>{totalSelectedPrice}원</div>
  </button>
</Link>
    </>
  );
}

export default Cart;
