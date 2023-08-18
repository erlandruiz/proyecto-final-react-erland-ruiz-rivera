import { useEffect, useState } from "react";
import { useCartContext } from "../state/Cart.context";
import { AiOutlineDelete } from "react-icons/ai";
import { addOrder, getOrder } from "../lib/orders.requests";
import { updateManyEpps } from "../lib/epps.requests";
import { useForm } from "../lib/useForm";

// Agregando libreria 'sweetalert2'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Loader } from "../components/Loader/Loader";

// Crea consta de 'sweetalert2'
const MySwal = withReactContent(Swal)
const MySwal2 = withReactContent(Swal)

//Constantes Iniciales para el formulario
const initialForm = {
  nameValidate: "",
  emailValidate: "",
  emailValidate2: "",
  telefonoValidate: "",
};

//  validacion de formulario

const validationsForm = (form) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexPhone = /^\d{7,14}$/; // 7 a 14 numeros.

  // Validacion de nombre
  if (!form.nameValidate.trim()) {
    errors.nameValidate = "El campo 'Nombre' es requerido";
  } else if (!regexName.test(form.nameValidate.trim())) {
    errors.nameValidate =
      "El campo 'Nombre' solo acepta letras y espacios en blanco";
  }

  // Validacion de email
  if (!form.emailValidate.trim()) {
    errors.emailValidate = "El campo 'Correo' es requerido";
  } else if (!regexEmail.test(form.emailValidate.trim())) {
    errors.emailValidate = "El campo 'Email' es incorrecto";
  }

  // Validacion de email2
  if (!form.emailValidate2.trim()) {
    errors.emailValidate2 = "El campo 'Repetir Correo' es requerido";
  } else if (!regexEmail.test(form.emailValidate2.trim())) {
    errors.emailValidate2 = "El campo 'Repetir correo' es incorrecto";
  }

  if (form.emailValidate.trim() !== form.emailValidate2.trim()) {
    errors.emailValidate2 = "El campo 'Repetir correo' no es igual a Correo";
  }

  //Validacion de telefono
  if (!form.telefonoValidate.trim()) {
    errors.telefonoValidate = "El campo 'telefono' es requerido";
  } else if (!regexPhone.test(form.telefonoValidate.trim())) {
    errors.telefonoValidate = "Solo números de 7 hasta 14 dígitos";
  }

  return errors;
};


//Estilos de color rojo para las validaciones 
let styles = {
  fontWeight: "bold",
  color: "#dc3545",
};

export const Cart = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");

  const { cart, removeProduct, cleanCart, getTotalPrice } = useCartContext();

  //Uso del Hook useForm para validar el formulario
  const {
    form,
    errors,
    loading,
    response,

    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialForm, validationsForm);

  const items = cart.map(({ id, title, qty, price }) => ({
    id,
    title,
    qty,
    price,
  }));


  //Crea la orden y la envia al Firebase
  const crearOrder = async () => {
    if ((name.length && email.length && phone.length && email2.length) === 0) {
      return;
    } else {
      const order = {
        buyer: { name, phone, email },
        items,
        total: getTotalPrice,
      };
      
      const id = await addOrder(order);
      await updateManyEpps(items);

      
      
     const orderRetorno = await getOrder(id);
    

    MySwal2.fire({
      icon: 'success',
      title: `Gracias por tu compra  ${orderRetorno.buyer.name}`,
      text: `Id de la compra  ${id}`,
     
      footer: `<a href="">Total de la compra: ${orderRetorno.total} </a>`
    })
      


      cleanCart();
    }
  };

  return (
    <div className="cart">
      <div className="container cart__container">
        {cart.length ? (
          <>
            <div className="cart__item" style={{ border: "none" }}>
              <button className="cart__item-button" onClick={cleanCart}>
                Vaciar carrito
              </button>
            </div>
            <div className="cart__products">
              <div
                className="cart__item"
                style={{ border: "none", padding: "0 16px" }}
              >
                <span>Producto</span>
                <span>Cantidad</span>
                <span>Precio</span>
                <span>Subtotal</span>
              </div>
              {cart.map((item) => (
                <div className="cart__item" key={item.id}>
                  <span>{item.title}</span>

                  <span>{item.qty}</span>
                  <span>
                    $
                    {item.price.toLocaleString("es-CO", {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}
                  </span>
                  <span>
                    $
                    {(item.qty * item.price).toLocaleString("es-CO", {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}
                  </span>
                  <button
                    className="cart__item-delete"
                    onClick={() => removeProduct(item.id)}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              ))}
            </div>
            <div className="cart__item" style={{ border: "none" }}>
              <div className="cart__total">
                <span>Total</span>{" "}
                <span>
                  $
                  {getTotalPrice.toLocaleString("es-CO", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>{" "}
            </div>

            {/* Formulario */}

            <form action="" onSubmit={handleSubmit} >
              <div className="form">
                <div>
                  <span>Nombre</span>
                  <input
                    type="text"
                    name="nameValidate"
                    onBlur={handleBlur}
                    className="form__input"
                    placeholder="Nombre"
                    onChange={(e) => {
                      handleChange(e);
                      setName(e.target.value);
                    }}
                    value={form.nameValidate}
                    required
                  />
                  {errors.nameValidate && (
                    <p style={styles}>{errors.nameValidate}</p>
                  )}
                </div>
                <div>
                  <span>Correo</span>
                  <input
                    type="email"
                    name="emailValidate"
                    className="form__input"
                    placeholder="Correo"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      setEmail(e.target.value);
                    }}
                    value={form.emailValidate}
                    required
                  />
                  {errors.emailValidate && (
                    <p style={styles}>{errors.emailValidate}</p>
                  )}
                </div>
                <div>
                  <span>Repetir correo</span>
                  <input
                    type="email"
                    name="emailValidate2"
                    className="form__input"
                    placeholder="Repetir correo"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      setEmail2(e.target.value);
                    }}
                    value={form.emailValidate2}
                    required
                  />
                  {errors.emailValidate2 && (
                    <p style={styles}>{errors.emailValidate2}</p>
                  )}
                </div>

                <div>
                  <span>Teléfono</span>
                  <input
                    type="tel"
                    name="telefonoValidate"
                    className="form__input"
                    placeholder="Teléfono"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      setPhone(e.target.value);
                    }}
                    value={form.telefonoValidate}
                    required
                  />
                  {errors.telefonoValidate && (
                    <p style={styles}>{errors.telefonoValidate}</p>
                  )}
                </div>
              </div>
              <input type="submit" value='enviar' className="cart__item-button form__button" 
              onClick={ (e)=>{
                handleSubmit(e)
                ? crearOrder()
                : MySwal.fire({
                  icon: 'error',
                  title: 'Datos Incorrecto',
                  text: 'Ingrese los Datos correctos',
                  footer: '<a href="">Si no encuentra el epp, puede llamar al +51 995 599 999</a>'
                })
              
              }}
              />
            </form>
            {loading && <Loader/>}

   
          </>
        ) : (
          <h1>EL carrito esta vacio</h1>
        )}
      </div>
    </div>
  );
};
