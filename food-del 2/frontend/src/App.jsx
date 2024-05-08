import React, { useState } from 'react'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import LoginPopup from './components/LoginPopup/LoginPopup'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify';
import HyderabadiChickenBiryani from "./pages/DetailedProcess/HyderabadiChickenBiryani"
import ChickenSaladRecipe from "./pages/DetailedProcess/ChickenSaladRecipe"
import PannerBiryani from "./pages/DetailedProcess/PannerBiryani.jsx"
import ChickenSandwichRecipe from './pages/DetailedProcess/ChickenSandwichRecipe'
import VegetableSaladRecipe from './pages/DetailedProcess/VegetableSaladRecipe'
import GarlicMushroomRecipe from './pages/DetailedProcess/GarlicMushroomRecipe'
import TomatoPastaRecipe from './pages/DetailedProcess/TomatoPastaRecipe'
import MixVegPulav from './pages/DetailedProcess/MixVegPulav'


const App = () => {

  const [showLogin,setShowLogin] = useState(false);

  return (
    <>
    <ToastContainer/>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/order' element={<PlaceOrder />}/>
          <Route path='/myorders' element={<MyOrders />}/>
          <Route path='/verify' element={<Verify />}/>
          <Route path = "/HyderabadiChickenBiryani" element = {<HyderabadiChickenBiryani/>}/>
          <Route path = "/ChickenSaladRecipe" element = {<ChickenSaladRecipe/>}/>
          <Route path = "/PannerBiryani" element = {<PannerBiryani/>}/>
          <Route path = "/ChickenSandwichRecipe" element = {<ChickenSandwichRecipe/>}/>
          <Route path = "/VegetableSaladRecipe" element = {<VegetableSaladRecipe/>}/>
          <Route path = "/GarlicMushroomRecipe" element = {<GarlicMushroomRecipe/>}/>
          <Route path = "/TomatoPastaRecipe" element = {<TomatoPastaRecipe/>}/>
          <Route path = "/MixVegPulav" element = {<MixVegPulav/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
