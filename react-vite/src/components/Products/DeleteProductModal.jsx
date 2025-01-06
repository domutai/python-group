import { useDispatch } from "react-redux";
import { deleteProductThunk } from "../../redux/product";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import './DeleteProductModal.css';


function DeleteProductModal({ product }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleSubmit = async (id) => {
    await dispatch(deleteProductThunk(id))
    closeModal();
    navigate('/', {replace: true})
  }

  return (
    <div className="delete-modal-container">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this product?</p>
      <button className="Modal-delete-button Delete-yes-button" onClick={() => handleSubmit(product.id)}>Yes (Delete Product)</button>
      <button className="Modal-delete-button Delete-no-button" onClick={closeModal}>No (Keep Product)</button>
    </div>
  )
}

export default DeleteProductModal;