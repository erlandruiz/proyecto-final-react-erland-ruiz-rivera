import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEpp } from "../lib/epps.requests";
import { ItemCount } from "../components/ItemCount/ItemCount";
import { useCartContext } from "../state/Cart.context";
import { Loader } from "../components/Loader/Loader";

export const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [epp, setEpp] = useState({});
  const [inCart, setInCart] = useState({});
  const { addProduct, itemInCart } = useCartContext();

  useEffect(() => {
   
    getEpp(id).then((res) => {
      if(!res) return navigate('/')
      setEpp(res);
    });
  }, []);

  const handleAdd = useCallback(
    (qty) => {
      addProduct(epp, qty);
    },
    [addProduct, epp]
  );
  if (!Object.keys(epp).length) return <Loader />;

  return (
    <div className="container">
      <div className="detail">
        <div className="detail__img">
          <img src={epp.img} alt="" />
        </div>

        <div className="detail__info">
          <span className="detail__info-title">{epp.title}</span>
          <p className="detail__info-price">{epp.description}</p>
          <span className="detail__info-price">
            $
            {(epp.price || 0).toLocaleString("es-PE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
          <span className="detail__info-stock">¡Que solo   {epp.stock}</span>

       
          <ItemCount
            stock={epp.stock - (itemInCart?.(id)?.qty || 0)}
            onAdd={handleAdd}
          />
        </div>
      </div>
    </div>
  );
};
