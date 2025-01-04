import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import SignupFormModal from "../SignupFormModal/SignupFormModal"; 
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal, setModalContent } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  // Function to switch to the Signup modal
  const openSignupModal = () => {
    closeModal(); 
    setTimeout(() => {
      setModalContent(<SignupFormModal />);
    }, 0); 
  };

  return (
    <div className="login-modal">
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email address</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>
        <div className="form-buttons">
          <button type="submit" className="sign-in-button">
            Sign in
          </button>
          <button
            type="button" 
            className="register-button"
            onClick={openSignupModal}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;

