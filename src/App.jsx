
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { NavbarBar } from './components/NavbarBar/NavbarBar';
import { Home } from './pages/Home';
import { Details } from './pages/Details';
import { Category } from './pages/Category';
import { Ofertas } from './pages/Ofertas';
import { Nosotros } from './pages/Nosotros';
import { Conocenos } from './pages/Conocenos';

import './App.scss';
import { CartProvider } from './state/Cart.context';
import { Cart } from './pages/Cart';
import { Footer } from './pages/Footer';



const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route element = {<NavbarBar />}>
      <Route path='/' element={<Home />}/>
      <Route path='/item/:id'element={<Details/>}/>
      <Route path='/category/:id' element={<Category/>}/>
      <Route path='/ofertas/:id' element={<Ofertas/>}/>
      <Route path='/nosotros' element={<Nosotros/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/conocenos' element={<Conocenos/>}/>
      

    </Route>

   
  )
)

function App() {
 

  return (
  
    <div className='app'>

      <CartProvider>
      <RouterProvider router={routes}/>

      </CartProvider>
      <Footer/>


      
    </div>
  
    
  )
}

export default App
