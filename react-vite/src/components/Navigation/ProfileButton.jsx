import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import "./ProfileButton.css"; 

function ProfileButton() {
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user); // Fetch the user from Redux
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleCreateProduct = () => {
    navigate("/products/new");
    setShowMenu(false); 
  };

  return (
    <div className="profile-button-container">
      <button onClick={toggleMenu} className="profile-icon">
        <FaUserCircle />
      </button>
      {showMenu && (
        <ul className="profile-dropdown" ref={ulRef}>
          {user && (
            <>
              {/* Display user's name and email */}
              <li className="profile-info">
                <p className="user-name">{`${user.firstname} ${user.lastname}`}</p>
                <p className="user-email">{user.email}</p>
              </li>
              <li>
                <button onClick={handleCreateProduct} className="dropdown-button">
                  Create Product
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
