import { NavLink } from "react-router-dom";
import "./AccountSidebar.css";
import { useUser } from "./UserContext";

const AccountSidebar = () => {
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
  };

  const getUsername = (email) => {
    if (email) {
      return email.split("@")[0];
    }
    return "";
  };

  return (
    <div className="account-sidebar">
      <h1>Account</h1>
      <div className="username">
        <a href="/account">{getUsername(user?.email)}</a>
      </div>
      <hr />
      <h3>Workspace</h3>
      <ul>
        <li>
          <NavLink
            to="/account/projects"
            className={({ isActive }) => (isActive ? "active-link" : "")}>
            My Projects
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/account/uploads"
            className={({ isActive }) => (isActive ? "active-link" : "")}>
            My Uploads
          </NavLink>
        </li>
      </ul>
      <hr />
      <h3>Orders & Reviews</h3>
      <ul>
        <li>
          <NavLink
            to="/account/order-history"
            className={({ isActive }) => (isActive ? "active-link" : "")}>
            Order History
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/account/reviews"
            className={({ isActive }) => (isActive ? "active-link" : "")}>
            My Reviews
          </NavLink>
        </li>
      </ul>
      <hr />
      <h3>Settings</h3>
      <ul>
        <li>
          <NavLink
            to="/account/settings"
            className={({ isActive }) => (isActive ? "active-link" : "")}>
            Account Settings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/account/payment-delivery"
            className={({ isActive }) => (isActive ? "active-link" : "")}>
            Payment & Delivery
          </NavLink>
        </li>
      </ul>
      <button onClick={handleLogout} className="logout-button">
        Sign Out
      </button>
    </div>
  );
};

export default AccountSidebar;
