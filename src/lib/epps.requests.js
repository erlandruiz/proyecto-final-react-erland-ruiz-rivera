


  import { collection, getDocs, getDoc,addDoc, doc, where, query, updateDoc, writeBatch, increment } from "firebase/firestore";
  import { db } from "./config";

  const eppsRef = collection(db, 'items');

  export const getEpps = async(category) => {

    const q = category
    ? query(eppsRef, where('category','==', category))
    : eppsRef
    let epps =[];
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc)=>{
      epps= [...epps,{...doc.data(), id: doc.id}]
    });

    return epps
 
   
  };




  //Conseguir los EPP
  export const getEpp = async (id) => {
    const document = doc(db, 'items', id);
    const docSnap = await getDoc(document)

    if(docSnap.exists()) return{id:docSnap.id, ...docSnap.data()};
    return null
  };

  
//Conseguir la oferta
  export const getEppsOferta = async (oferta) => {
   const q2=oferta
   ?query(eppsRef,where('oferta','==',oferta))
   :eppsRef

   let epps_oferta = [];
   const querySnapshotOferta = await getDocs(q2);
   querySnapshotOferta.forEach((doc)=>{
    epps_oferta=[...epps_oferta,{...doc.data(), id: doc.id}]
   });

   return epps_oferta
  };




  //Actualizar- modificar item

  export const updateEpp = async(id,item)=>{
    const newEpp = await updateDoc(doc(db, 'items', id), item);
    return
  }


  //Eliminar item

  export const deleteEpp = async(id)=>{
    return await deleteEpp(doc(db, 'items',id))
  }


  // Actualizar operaciones en lote 


  export const updateManyEpps = async (items)=>{
    const batch = writeBatch(db);
    items.forEach(({id,qty})=>{
      batch.update(doc(db, 'items', id),{
        stock:increment(-qty)
      })
    });
    batch.commit()
  }