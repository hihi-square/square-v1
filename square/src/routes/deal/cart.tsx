import { useNavigate, useLocation, Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from 'react-redux'; 
import { Item, Store, CartState } from '../../store';


function Cart(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 상품과 상점 정보를 예시로 설정합니다.
  // 실제로는 서버로부터 받아온 데이터나 상태 관리를 통해 받아올 수 있습니다.
  // eslint-disable-next-line no-unused-vars
  const cart = useSelector((state: { cart: CartState }) => state.cart);

  
  const itemCount = cart.reduce((acc: number, store: Store) => acc + store.items.length, 0);
  const totalPrice = cart.reduce((acc: number, store: Store) => acc + store.items.reduce((total: number, item: Item) => total + item.price * item.quantity, 0), 0);
  
  const goBack = () => {
    const previousState = location.state?.from;

    if (previousState) {
      navigate(previousState);
    } else {
      navigate('/');
    }
  };

  const paymentButtonStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    padding: '10px',
    backgroundColor: 'green',
    color: 'white',
    fontSize: '18px',
    borderRadius: '10px',
    margin: '0 auto'
  };

  return (
    <>
      <header>
        <ArrowBackIcon onClick={goBack} />
        장바구니
      </header>
  
      <div className="cart">
        {cart.map((store, index) => (
          <div key={index} className="store" style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
            <img src={store.shopThumbnail} alt={`${store.shopName} 썸네일`} />
            <h2>{store.shopName}</h2>
            <p>예상 도착시간: {store.estimatedTime}</p>
            <div className="products">
              {store.items.map((item, itemIndex) => (
                <div key={itemIndex} className="product">
                  <img src={item.productThumbnail} alt={`${item.productName} 썸네일`} />
                  <p>{item.productName}</p>
                  <p>가격: {item.price}원</p>
                  <p>수량: {item.quantity}</p>
                </div>
              ))}
            </div>
            <p>가게 총 가격: {store.items.reduce((total, item) => total + item.price * item.quantity, 0)}원</p>
          </div>
        ))}
      </div>
  
      <Link to="/deal/cart/pay">
        <button style={paymentButtonStyle}>
          <div>{itemCount} 항목</div>
          <div>결제</div>
          <div>{totalPrice}원</div>
        </button>
      </Link>
    </>
  );
}

export default Cart;
