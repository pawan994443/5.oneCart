import React ,{useCallback,useContext} from 'react'
import { Route ,Routes ,Navigate} from 'react-router-dom'
import { useLocation } from "react-router-dom";
import Registration from './pages/registration'
import Home from './pages/Home'
import Login from './pages/Login'
import Nav from './component/Nav'
import { userDataContext } from './context/UserContext'
import About from './pages/About'
import Collections from './pages/Collections'
import Product from './pages/Product'
import Contact from './pages/Contact'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import NotFound from './pages/NotFound';
import Ai from './component/Ai';



function App() {
    let {userData} = useContext(userDataContext)
    let  location = useLocation()
  return (
   <>
    {userData && <Nav/> }
   <Routes>

    <Route path='/login' 
    element={userData ? (<Navigate to={location.state?.from || "/"}/>)
    : (<Login/>)
     }/>

    <Route path='/signup' 
    element={userData ? (<Navigate to={location.state?.from || "/"}/>)
    : (<Registration/>)}/>
    <Route path='/'
     element={userData ? <Home/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>

    <Route path='/about'
     element={userData ? <About/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>

    <Route path='/collection' 
    element={userData ? <Collections/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>

    <Route path='/product' 
    element={userData ? <Product/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>

    <Route path='/contact' 
    element={userData ? <Contact/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>
    
    <Route path='/productdetail/:productId' 
    element={userData ? <ProductDetail/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>

    <Route path='/cart' 
    element={userData ? <Cart/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>

     <Route path='/placeorder' 
    element={userData ? <PlaceOrder/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>
     <Route path='/order' 
    element={userData ? <Order/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>
    <Route path='*' element={<NotFound/>}/>
   </Routes>
   <Ai/>
   
   
   </>
  )
}

export default App
