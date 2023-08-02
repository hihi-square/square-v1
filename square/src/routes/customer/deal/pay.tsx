import { useNavigate, useLocation} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Pay() {
  const navigate = useNavigate();
  const location = useLocation();
  const goBack = () => {
    const previousState = location.state?.from;

    if (previousState) {
      navigate(previousState);
    } else {
      navigate("/cart");
    }
  };

  return (
    <>
      <ArrowBackIcon onClick={goBack} />

    </>
  );
}

export default Pay;
