import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext([]);

export const useCartContext = ()=> useContext(CartContext);



export const CartProvider = ({children})=>{

    const [cart, setCart] = useState([]);
    const itemInCart = (id)=>cart.find((product)=> product.id === id);

    const addProduct = (item,qty)=>{
        const element = itemInCart(item.id)
        if(!element) return setCart([...cart,{...item,qty}]);
        const newCart = cart.map((product)=> product.id===item.id ? {...product, qty: product.qty +qty} :product);
        setCart(newCart)
    }

    //Eliminar un producto

    const removeProduct = (id)=>{
        const newCart = cart.filter((product)=> product.id !==id);
        setCart(newCart)
    }

    //Limpiar un producto

    const cleanCart = ()=> setCart([]);

    //Suma de items

    const getCartQty = useMemo(()=> cart.reduce((acc, item)=>acc+ item.qty, 0),[cart]);
    


    //Precio total
    const getTotalPrice = useMemo(()=> cart.reduce((acc,item)=> acc + item.price*item.qty, 0),[cart])

    const value = {
        cart,
        addProduct,
        getCartQty,
        cleanCart,
        removeProduct,
        getTotalPrice,
        itemInCart
    };

    return( <CartContext.Provider value={value} displayName = 'CartContext'>{children}</CartContext.Provider>)
}