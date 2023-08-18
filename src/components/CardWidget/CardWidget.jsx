
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../state/Cart.context';
import './CardWidget.css';
import { FaShoppingCart } from "react-icons/fa";

export const CardWidget = () => {

  const {getCartQty} = useCartContext();
  const navigate = useNavigate();
  return (
    
    <div className="cardwidget" onClick={()=>navigate('/cart')}>
      { getCartQty ?
        <span className="cardwiget-number">{getCartQty}</span>
        : null
      }

      <FaShoppingCart className="faShooppinCart"/>

    </div>
  );
};
