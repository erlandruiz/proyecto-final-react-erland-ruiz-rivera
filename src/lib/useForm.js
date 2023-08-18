//Creando el hook para las validaciones

import { useState } from "react"


export const useForm = (initialForm, validateForm) => {

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});

    //variable de carga

    const [loading, setLoading] = useState(false)

    //Variable de respuesta
    const [response, setResponse] = useState(null);






    //funcion handle cambio de valores

    const handleChange = (e)=>{
    
        // setForm({...form, [e.target.name]:e.target.value});
        const{name, value} = e.target;
        setForm({...form, [name]:value});
    };

      // funcion handleBlur cuando se lancen las validaciones, cuando pierde el foco el elemento del formulario, alli es cuando se desencadenan las variables
  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form))
   };

   const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(form))
  
    if(Object.keys(errors).length === 0){
      setLoading(true);
      
        setTimeout(() => {
          setLoading(false);
       
        }, 3000);
        return true;


    } else{
        return false
    }
  };



  return {
    form,
    errors,
    loading,
    response,
   
    handleChange,
    handleBlur,
    handleSubmit
    
    
    
    
  };
   
  
}
