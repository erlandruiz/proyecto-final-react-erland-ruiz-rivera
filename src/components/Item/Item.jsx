

import { useNavigate } from 'react-router-dom'
import './Item.css'

export const Item = ({img,category,title,id,price,oferta}) => {
    const navigate = useNavigate();
  return (
    <div className='item' onClick={()=> navigate(`/item/${id}`)}>


        <div>

        

            <img src={img} alt="" />

       
        </div>
        

        <div className='item__content'>
            <div className='item__content-info'>
                <span className='item__content-category'>{category}</span>
                <span className='item__content-title'>{title}</span>

            </div>
            <span className='item__content-price'> $
            {price.toLocaleString('es-PE',{
                minimumFractionDigits:2,
                maximumFractionsDigits:2,
            })}


            </span>

        </div>
    </div>
  );
};
