import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import NewOffers from './pages/NewOffers'
import Navbar from './componet/Navbar'
import Footer from './componet/Footer'
import Collection from './pages/Collection'
import ScrollToTop from './componet/ScollToTop'
import ContactUs from './pages/ContactUs'
import Custom from './pages/Custom'
import ProductDetails from './pages/ProductDetails'
import Profile from './pages/Profile'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import CheckOut from './pages/CheckOut'
import NotFound from './pages/NotFound'
import CoustomProductTshirt from './pages/CoustomProductTshirt'

// Context Providers
import { WishlistProvider } from './context/WishlistContext'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext' 
import { OrdersProvider } from './context/OrdersContext' 
import { CanvasProvider } from './context/CanvasContext' 

// Redux Imports
import { Provider } from 'react-redux'
import { store } from './store' 

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <OrdersProvider> 
                <CanvasProvider>
                  
                  <Navbar />
                  <ScrollToTop />
                  
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/new-offers" element={<NewOffers />} />
                    <Route path="/collection" element={<Collection />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/custom" element={<Custom />} />
                    <Route path="/product-details/:id" element={<ProductDetails />} />
                    <Route path="/my-profile" element={<Profile />} /> 
                    <Route path="/my-wishlist" element={<Wishlist />} />
                    <Route path="/my-cart" element={<Cart />} />
                    <Route path="/checkout" element={<CheckOut />} />
                    
                    {/* 🟢 CORRECTED: Path updated with :apparelId dynamic URL parameter */}
                    <Route path="/coustom-product-tshirt/:apparelId" element={<CoustomProductTshirt/>}/>
                    
                    <Route path="/*" element={<NotFound />} />
                  </Routes>
                  
                  <Footer />

                </CanvasProvider>
              </OrdersProvider> 
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </Provider>
    </>
  )
}

export default App;