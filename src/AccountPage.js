import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import AccountSidebar from "./AccountSidebar";
import "./AccountPage.css";

const AccountPage = () => {
  return (
    <div className="account-page-container">
      <Navbar />
      <div className="account-page">
        <AccountSidebar />
        <div className="account-main-content">
          <Outlet />
          <h1>Welcome! Here's an overview of your account activities:</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountPage;
