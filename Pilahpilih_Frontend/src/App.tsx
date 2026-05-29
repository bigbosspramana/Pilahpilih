import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './views/pages/Auth/Login/login_screen';
import RegisterPage from './views/pages/Auth/Register/regist_screen';

import CatalogUser from './views/pages/Buyer/CatalogBuyer/cataloguser_screen';
import DashboardUser from './views/pages/Buyer/DashboardBuyer/dashboarduser_screen';
import ProductDetailUser from './views/pages/Buyer/ProductDetailBuyer/detailproductuser_screen';
import CheckoutUser from './views/pages/Buyer/CheckoutBuyer/checkoutuser_screen';
import CartUser from './views/pages/Buyer/CartBuyer/cartuser_screen';
import OrderHistoryUser from './views/pages/Buyer/OrderHistory/orderhistoryuser_screen';
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

        {/* <Route element={<NavbarLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/list-chat" element={<ListChatPage />} />
          <Route path="/friends-page" element={<HistoriPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route
          path="/edit-profile-companion"
          element={<EditProfileCompanionPage />}
        />

        <Route
          path="/detailpend-companion"
          element={<DetailPendCompanionPage />}
        />

        <Route
          path="/money-pages"
          element={<MoneyPage />}
        />

        <Route
          path="/pencairan-done"
          element={<PencairanDonePage />}
        />

        <Route
          path="/pencairan-pend"
          element={<PencairanPendPage />}
        />

        <Route
          path="/form-pencairan"
          element={<FormPencairanPage />}
        />

        <Route
          path="/notification"
          element={<NotifciationPage />}
        /> */}

        {/* ======================================= */}
        {/* RUTE DENGAN NAVBAR KHUSUS COMPANION     */}
        {/* ======================================= */}
        {/* <Route element={<NavbarLayout />}>
          <Route path="/companion-dashboard" element={<DashboardCompanion />} />
          <Route
            path="/temanjalan-companion"
            element={<TemanJalanCompanionPage />}
          />
          <Route path="/profile-companion" element={<ProfileCompanionPage />} />
        </Route> */}
      </Routes>
    </>
  );
}
