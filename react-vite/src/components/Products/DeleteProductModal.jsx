import { useDispatch } from "react-redux";
import { deleteProductThunk } from "../../redux/product";
import { useModal } from "../../context/Modal";
import './DeleteProductModal.css';


function DeleteProductModal({ product }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (id) => {
    await dispatch(deleteProductThunk(id)).then(closeModal)
  }

  return (
    <div>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this product?</p>
      <button onClick={() => handleSubmit(product.id)}>Yes (Delete Product)</button>
      <button onClick={closeModal}>No (Keep Product)</button>
      
    </div>
  )
}

export default DeleteProductModal;