import { useNavigate, Link } from "react-router-dom"; // Link와 useNavigate를 같은 줄에서 임포트합니다.
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

type StoreInfoProps = {
  storeId?: string;
};

function StoreInfo({ storeId }: StoreInfoProps) {
  const navigate = useNavigate();

  return (
    <>
      <div className="StoreInfo-background">
        <ArrowBackIcon onClick={() => navigate(-1)} />
        {storeId && <span>{storeId}</span>} 
        <Link to="/cart">
          <ShoppingCartIcon />
        </Link>
      </div>
    </>
  );
}

export default StoreInfo;
