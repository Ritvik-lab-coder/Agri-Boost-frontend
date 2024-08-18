import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import About from './pages/About'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Shop from './pages/Shop'
import Login from './pages/Login'
import Policy from './pages/Policy'
import Profile from './pages/Profile'
import AdminDashboard from './admin/AdminDashboard'
import AdminRegister from './admin/AdminRegister'
import AdminUsers from './admin/AdminUsers'
import AdminUserManage from './admin/AdminUserManage'
import AdminMessages from './admin/AdminMessages'
import FarmerDashboard from './farmer/FarmerDashboard'
import FarmerReviews from './farmer/FarmerReviews'
import FarmerProducts from './farmer/FarmerProducts'
import FarmerAddProduct from './farmer/FarmerAddProduct'
import FarmerManageProducts from './farmer/FarmerManageProducts'
import AdminProducts from './admin/AdminProducts'
import AdminManageProducts from './admin/AdminManageProducts'
import EditProfile from './pages/EditProfile'
import FarmerEditProduct from './farmer/FarmerEditProduct'
import ForgotPassword from './pages/ForgotPassword'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Search from './pages/Search'
import PageNotFound from './pages/PageNotFound'

const FarmerRoute = ({ children }) => {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  return role === "1" && token ? children : <Navigate to={'/notfound/notauthorized'} />
};

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  return role === "2" && token ? children : <Navigate to={'/notfound/notauthorized'} />
};

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to={'/notfound/notauthenticated'} />
};

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='*' element={<PageNotFound />} />
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Register />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/login' element={<Login />} />
        <Route path='/notfound/:name' element={<PageNotFound />} />
        <Route path='/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path='/search/:name' element={<Search />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/profile/:id' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='/edit-profile/:id' element={<PrivateRoute><EditProfile /></PrivateRoute>} />
        <Route path='/admin/dashboard' element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path='/admin/register' element={<AdminRoute><AdminRegister /></AdminRoute>} />
        <Route path='/admin/users' element={<AdminRoute><AdminUsers /></AdminRoute>} />
        <Route path='/admin/products' element={<AdminRoute><AdminProducts /></AdminRoute>} />
        <Route path='/admin/manage-products' element={<AdminRoute><AdminManageProducts /></AdminRoute>} />
        <Route path='/admin/users/manage' element={<AdminRoute><AdminUserManage /></AdminRoute>} />
        <Route path='/admin/messages' element={<AdminRoute><AdminMessages /></AdminRoute>} />
        <Route path='/farmer/dashboard' element={<FarmerRoute><FarmerDashboard /></FarmerRoute>} />
        <Route path='/farmer/products' element={<FarmerRoute><FarmerProducts /></FarmerRoute>} />
        <Route path='/farmer/add-product' element={<FarmerRoute><FarmerAddProduct /></FarmerRoute>} />
        <Route path='/farmer/edit-product/:id' element={<FarmerRoute><FarmerEditProduct /></FarmerRoute>} />
        <Route path='/farmer/manage-product' element={<FarmerRoute><FarmerManageProducts /></FarmerRoute>} />
        <Route path='/farmer/review/:id' element={<FarmerRoute><FarmerReviews /></FarmerRoute>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
