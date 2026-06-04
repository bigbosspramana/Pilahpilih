import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './views/pages/Auth/Login/login_screen';
import RegisterPage from './views/pages/Auth/Register/regist_screen';

import CatalogUser from './views/pages/Buyer/CatalogBuyer/cataloguser_screen';
import DashboardUser from './views/pages/Buyer/DashboardBuyer/dashboarduser_screen';
import ProductDetailUser from './views/pages/Buyer/ProductDetailBuyer/detailproductuser_screen';
import CheckoutUser from './views/pages/Buyer/CheckoutBuyer/checkoutuser_screen';
import CartUser from './views/pages/Buyer/CartBuyer/cartuser_screen';
import OrderHistoryUser from './views/pages/Buyer/OrderHistoryBuyer/orderhistoryuser_screen';
import OrderDetailUser from './views/pages/Buyer/OrderDetailBuyer/orderdetailuser_screen';
import OrderTrackingUser from './views/pages/Buyer/OrderTrackingBuyer/ordertrackinguser_screen';
import ChatUser from './views/pages/Buyer/ChatBuyer/chatuser_screen';
import MeetingPointMapUser from './views/pages/Buyer/MeetingPointMapBuyer/meetpointuser_screen';
import ChatListUser from './views/pages/Buyer/ListChatBuyer/listchatuser_screen';
import ProfileUser from './views/pages/Buyer/ProfileBuyer/profileuser_screen';
import EditProfileUser from './views/pages/Buyer/EditProfileBuyer/editprofileuser_screen';
import DashboardSeller from './views/pages/Seller/DashboardSeller/dashboardseller_screen';
import MyProductsSeller from './views/pages/Seller/MyProductsSeller/myproductsseller_screen';
import OrderManagementSeller from './views/pages/Seller/OrderManagementSeller/ordermanagementseller_screen';
import OrderDetailSeller from './views/pages/Seller/OrderDetailSeller/orderdetailseller_screen';
import AddProductSeller from './views/pages/Seller/AddProductSeller/addproductseller_screen';
import EditProductSeller from './views/pages/Seller/EditProductSeller/editproductseller_screen';
import ProfileSeller from './views/pages/Seller/ProfileSeller/profileseller_screen';
import EditProfileSeller from './views/pages/Seller/EditProfileSeller/editprofileseller_screen';
import ChatListSeller from './views/pages/Seller/ListChatSeller/listchatseller_screen';
import ChatSeller from './views/pages/Seller/ChatSeller/chatseller_screen';
// import ProductDetailUser from './views/pages/Buyer/ProductDetailBuyer/detailproductuser_screen';

export default function App() {
  const isLoading = false;

  if (isLoading) {
    // return <LoadingScreen />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ============ */}
        {/*  RUTE BUYER  */}
        {/* ============ */}

        <Route path="/dashboard-user" element={<DashboardUser />} />
        <Route path="/catalog-user" element={<CatalogUser />} />
        <Route path="/detail-product-user" element={<ProductDetailUser />} />
        <Route path="/checkout-user" element={<CheckoutUser />} />
        <Route path="/cart-user" element={<CartUser />} />
        <Route path="/order-history-user" element={<OrderHistoryUser />} />
        <Route path="/order-detail-user" element={<OrderDetailUser />} />
        <Route path="/order-tracking-user" element={<OrderTrackingUser />} />
        <Route path="/chat-user" element={<ChatUser />} />
        <Route path="/meetpoint-map-user" element={<MeetingPointMapUser />} />
        <Route path="/chat-list-user" element={<ChatListUser />} />
        <Route path="/profile-user" element={<ProfileUser />} />
        <Route path="/edit-profile-user" element={<EditProfileUser />} />

        {/* ============= */}
        {/*  RUTE SELLER  */}
        {/* ============= */}
        <Route path="/dashboard-seller" element={<DashboardSeller />} />
        <Route path="/myproducts-seller" element={<MyProductsSeller />} />
        <Route path="/order-management-seller" element={<OrderManagementSeller />} />
        <Route path="/order-detail-seller" element={<OrderDetailSeller />} />
        <Route path="/add-product-seller" element={<AddProductSeller />} />
        <Route path="/edit-product-seller" element={<EditProductSeller />} />
        <Route path="/profile-seller" element={<ProfileSeller />} />
        <Route path="/edit-profile-seller" element={<EditProfileSeller />} />
        <Route path="/list-chat-seller" element={<ChatListSeller />} />
        <Route path="/chat-seller" element={<ChatSeller />} />
      </Routes>
    </>
  );
}
