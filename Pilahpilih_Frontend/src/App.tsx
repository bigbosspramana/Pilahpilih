import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './views/pages/Auth/Login/login_screen';
import RegisterPage from './views/pages/Auth/Register/regist_screen';
import DashboardUserPage from './views/pages/Buyer/DashboardBuyer/dashboarduser_screen';

export default function App() {
  const isLoading = false;

  if (isLoading) {
    // return <LoadingScreen />;
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ============ */}
        {/*  RUTE BUYER  */}
        {/* ============ */}

        <Route path="/dashboard" element={<DashboardUserPage />} />
        

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
