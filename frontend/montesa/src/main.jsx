import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import About_us from './pages/About_us.jsx'

import Cart from './common/Cart.jsx'
import Contact_us from './pages/Contact_us.jsx'
import Login from './Login.jsx'
import Frequently_question from './pages/Frequently_question.jsx'
import Categories from './common/Categories.jsx'
import ProductDetails from './components/ProductDetails.jsx'
import Privacy_policy from './pages/Privacy_policy.jsx'
import MywishList from './common/MywishList.jsx'
import MyDashBoard from './pages/MyDashBoard/MyDashBorad.jsx'
import { AuthProvider } from './Context/AuthContext';
import Checkout from './common/Checkout'




let allRoutes = createBrowserRouter([
  { 
    path:'/',
    element: <App/>

  },
  {
    path:'/Aboutus',
    element: <About_us/>
  },
  {
    path:'/Cart',
    element: <Cart/>
  },
  {
    path:'/Contactus',
    element: <Contact_us/>
  },
  {
    path:'/Login',
    element: <Login/>
  },
  {
    path:'/Frequently_questions',
    element:<Frequently_question/>
  },
   {
    path:'/Categoires',
    element:<Categories/>
  },
  {
    path:'/ProductDetails/:id',
    element:<ProductDetails/>
  },
    {
    path:'/Privacy_policy',
    element:<Privacy_policy/>
  }
  ,
  {
    path:'/MyDashBoard',
    element:<MyDashBoard/>
  },
  {
    path:'/MywishList',
    element:<MywishList/>
  },{
    path:'/Checkout',
    element:<Checkout/>
  }

])
createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <AuthProvider>
  <RouterProvider router={allRoutes}/>
    <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  
  </StrictMode>,
)