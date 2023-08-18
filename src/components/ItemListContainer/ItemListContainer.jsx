
import { Item } from '../Item/Item';
import './ItemListContainer.css';


//ItemListContainer con la props enviadas desde la APP.
export const ItemListContainer = ({products,  loading=false}) => {
  return (
    <div className='itemlistcontainer'>

      {loading ? (
        <>
         <div className="skeleton">
            <div className="skeleton__img"></div>
          </div>
          <div className="skeleton">
            <div className="skeleton__img"></div>
          </div>
          <div className="skeleton">
            <div className="skeleton__img"></div>
          </div>
        
        
        
        
        </>
      ) :(
        products.map((product)=>(
          <Item
          key={product.id}
          id={product.id}
          img={product.img}
          category={product.category}
          title={product.title}
          price={product.price}
          oferta={product.oferta}
          />
        ))


      )}
    
    </div>
  )
}
