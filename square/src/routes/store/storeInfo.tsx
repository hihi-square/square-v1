import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link} from 'react-router-dom';

function StoreInfo() {
    return(
        <>
        
        <div className="StoreInfo-background">
         <ArrowBackIcon />
         
            <Link to="./deal/cart">
         <ShoppingCartIcon/>
         </Link>





        </div>
    
        
        </>
    )

}

export default StoreInfo;