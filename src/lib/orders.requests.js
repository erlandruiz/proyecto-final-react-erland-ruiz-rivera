import { addDoc,doc, getDoc, collection } from "firebase/firestore";
import { db } from "./config";

const ordersRef = collection(db, 'orders');


export const addOrder = async(order)=>{
    const orderDoc = await addDoc(ordersRef, order);
    return orderDoc.id
}



//conseguir la orden por id

export const getOrder = async(idOrder)=>{
    const orderRef = doc(db, 'orders', idOrder);
    const docSnap = await getDoc(orderRef);

    if (docSnap.exists()) {
        
        return(docSnap.data())
      } else {
     
        return null
      }
    

}