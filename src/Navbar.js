import React, { useState, useEffect } from "react";
import { useUser } from "./UserContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useUser();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  const getUsername = (email) => {
    if (email) {
      return email.split("@")[0];
    }
    return "";
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOverlayOpen, setSearchOverlayOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleSearchOverlay = () => {
    setSearchOverlayOpen(!isSearchOverlayOpen);
  };

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setSidebarOpen(false);
      setSearchOverlayOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-top">
        {/* Menu button */}
        <button className="hamburger-btn" onClick={toggleSidebar}>
          <img src="/images/burger-menu.png" alt="Menu Icon" />
        </button>

        <a href="/" className="navbar-logo">
          <img src="/images/Logo3.png" alt="logo" />
        </a>
        <a href="/" className="brand-name">
          <h1>Let's Print</h1>
        </a>

        <a href="/" className="logo-small">
          <img src="/images/Logosmall.png" alt="logo" />
        </a>

        <div className="navbar-search">
          <input type="text" placeholder="Search..." className="search-input" />
          <button className="search-button">
            <img
              src="/images/search.png"
              alt="search icon"
              className="search-icon"
            />
          </button>
        </div>

        {/* Search icon */}
        <button className="search-icon-btn" onClick={toggleSearchOverlay}>
          <img
            src="/images/search.png"
            alt="Search Icon"
            className="search-icon"
          />
        </button>

        {/* Navbar actions */}
        <div className="navbar-actions">
          <a href="/help-center" className="help-btn">
            <img src="/images/messenger.png" alt="Help Icon" className="icon" />
          </a>
          {user ? (
            <div
              className="user-icon"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
              <a href="/account">
                <img src="/images/user.png" alt="User Icon" className="icon" />
              </a>
              {isDropdownOpen && (
                <div className="dropdown-overlay">
                  <a href="/account" className="username">
                    {getUsername(user.email)}
                  </a>
                  <hr />
                  <a href="/account/account-settings">Account Settings</a>
                  <a href="/account/order-history">Order History</a>
                  <a href="/account/payment-delivery">Payment and Delivery</a>
                  <a href="/tracking">Track your Order</a>
                  <hr />
                  <button onClick={handleLogout}>Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <a href="/login" className="signin-btn">
              <img src="/images/user.png" alt="User Icon" className="icon" />
            </a>
          )}

          {user ? (
            <a href="/workspace" className="folder-btn">
              <img
                src="/images/folder.png"
                alt="Folder Icon"
                className="icon"
              />
            </a>
          ) : (
            <div
              className="workspace-icon"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
              <a href="/workspace">
                <img
                  src="/images/folder.png"
                  alt="Folder Icon"
                  className="icon"
                />
              </a>
              {isDropdownOpen && (
                <div className="dropdown-overlay">
                  <p>Sign in to access & save your project progress </p>
                  <a href="/login">
                    <button>Sign In</button>
                  </a>
                  <hr />
                  <a href="/workspace">Continue as a Guest</a>
                </div>
              )}
            </div>
          )}

          <a href="/cart" className="cart-btn">
            <img
              src="/images/trolley-cart.png"
              alt="Cart Icon"
              className="icon"
            />
          </a>
        </div>
      </div>

      {/* Navbar links */}
      <div className="navbar-bottom">
        <ul className="navbar-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/posters">Posters</a>
          </li>

          <li>
            <a href="/photographer">Local Photographer</a>
          </li>
          <li>
            <a href="/custom">Custom Designs & Templates</a>
          </li>
        </ul>
      </div>

      {/* Side navbar overlay--smaller screens */}
      <div className={`side-navbar ${isSidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>
          X
        </button>
        <ul className="side-navbar-links">
          <hr className="sidebar-divider" />
          {user ? (
            <>
              <a href="/account" className="username">
                <li>
                  <p>{getUsername(user.email)}</p>
                </li>
              </a>
              <li>
                <button onClick={handleLogout}>Sign Out</button>
              </li>
            </>
          ) : (
            <li>
              <a href="/login">Sign In</a>
            </li>
          )}
          <li></li>
          <li>
            <a href="/workspace">Workspace</a>
          </li>
          <hr className="sidebar-divider" />
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/posters">Posters</a>
          </li>

          <li>
            <a href="/photographer">Local Photographer</a>
          </li>
          <li>
            <a href="/custom">Custom Designs & Templates</a>
          </li>
        </ul>
      </div>

      {/* Overlay for search input-- smaller screens */}
      {isSearchOverlayOpen && (
        <div className="search-overlay">
          <div className="search-overlay-content">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <button className="search-button-icon">
              <img
                src="/images/search.png"
                alt="search icon"
                className="search-icon"
              />
            </button>
            <button className="close-overlay" onClick={toggleSearchOverlay}>
              X
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
