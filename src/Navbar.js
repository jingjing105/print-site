import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    // State to control the sidebar visibility
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isSearchOverlayOpen, setSearchOverlayOpen] = useState(false);

    // Function to toggle sidebar visibility
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const toggleSearchOverlay = () => {
        setSearchOverlayOpen(!isSearchOverlayOpen);
    };

    const handleResize = () => {
        // Close sidebar if window width is greater than 768px
        if (window.innerWidth > 768) {
            setSidebarOpen(false);
            setSearchOverlayOpen(false);
        }
    };

    useEffect(() => {
        // event listener for window resize
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
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
                        <img src="/images/search.png" alt="search icon" className="search-icon" />
                    </button>
                </div>

                {/* Search icon */}
                <button className="search-icon-btn" onClick={toggleSearchOverlay}>
                    <img src="/images/search.png" alt="Search Icon" className="search-icon" />
                </button>

                {/* Navbar actions */}
                <div className="navbar-actions">
                    <a href="/help" className="help-btn">
                        <img src="/images/messenger.png" alt="Help Icon" className="icon" />
                    </a>
                    <a href="/login" className="signin-btn">
                        <img src="/images/user.png" alt="Sign In Icon" className="icon" />
                    </a>
                    <a href="/workspace" className="folder-btn">
                        <img src="/images/folder.png" alt="Folder Icon" className="icon" />
                    </a>
                    <a href="/cart" className="cart-btn">
                        <img src="/images/trolley-cart.png" alt="Cart Icon" className="icon" />
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
            <div className={`side-navbar ${isSidebarOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={toggleSidebar}>X</button>
                <ul className="side-navbar-links">
                    <hr className="sidebar-divider" />
                    <li>
                        <a href="/signin">Sign In</a>
                    </li>
                    <li>
                        <a href="/workspace">My Projects</a>
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
                        <input type="text" placeholder="Search..." className="search-input" />
                        <button className="search-button-icon">
                            <img src="/images/search.png" alt="search icon" className="search-icon" />
                        </button>
                        <button className="close-overlay" onClick={toggleSearchOverlay}>X</button>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
