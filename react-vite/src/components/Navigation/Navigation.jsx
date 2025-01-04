import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkLogout } from "../../redux/session";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import { FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import "./Navigation.css";

function Navigation() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const { setModalContent } = useModal();

  const handleLogout = () => {
    dispatch(thunkLogout());
  };

  const openLoginModal = () => {
    setModalContent(<LoginFormModal />); 
  };

  return (
    <>
      <nav className="navigation">
        {/* Left Section: Logo */}
        <NavLink to="/" className="navigation-left">
          <img src="/favicon.ico" alt="Website Logo" className="nav-logo" />
        </NavLink>

        {/* Center Section: Search Bar */}
        <div className="navigation-center">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search Bar" />
          </div>
        </div>

        {/* Right Section: Sign In / Log Out / Favorites / Cart */}
        <div className="navigation-right">
          {user ? (
            <>
              <button className="nav-item logout-button" onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <button
              className="nav-sign-in-button"
              onClick={openLoginModal} 
            >
              Sign In
            </button>
          )}
          <NavLink to="/favorites" className="nav-item">
            <FaHeart />
          </NavLink>
          <NavLink to="/cart" className="nav-item">
            <FaShoppingCart />
          </NavLink>
          {user && (
            <div className="profile-button-container">
              <ProfileButton />
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navigation;
