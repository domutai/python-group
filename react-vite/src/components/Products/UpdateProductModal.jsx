import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateProductThunk, postImagesThunk, getProductImages } from '../../redux/product';
import { useModal } from '../../context/Modal';
import './UpdateProductModal.css';

const UpdateProductModal = ({ product }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [formState, setFormState] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    previewImage: product.previewImage,
    imageUrls: product.images.map((image) => image.imageURL),
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormState({
      name: product.name,
      description: product.description,
      price: product.price,
      previewImage: product.previewImage,
      imageUrls: product.images.map((image) => image.imageURL),
    });
  }, [product]);

  const validateForm = () => {
    const newErrors = {};

    if (!formState.description.trim() || formState.description.length < 30) {
      newErrors.description = 'Description needs a minimum of 30 characters.';
    }
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required.';
    }
    if (formState.price == null) {
      newErrors.price = 'Price is required.';
    }
    if (
      !formState.previewImage.includes('.png') &&
      !formState.previewImage.includes('.jpg') &&
      !formState.previewImage.includes('.jpeg')
    ) {
      newErrors.previewImage =
        'Preview Image is required and must be a PNG, JPG, or JPEG file.';
    }

    formState.imageUrls.forEach((url, index) => {
      if (
        url &&
        !url.includes('.png') &&
        !url.includes('.jpg') &&
        !url.includes('.jpeg')
      ) {
        newErrors[`imageUrl${index}`] =
          'Image URL needs to be a PNG, JPG, or JPEG file.';
      }
    });

    return newErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
  
    const newErrors = validateForm();
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      await dispatch(updateProductThunk(product.id, formState));
      await dispatch(getProductImages(product.id));
      const newImageUrls = formState.imageUrls.filter((url) => {
        return !product.images.some((image) => image.imageURL === url);
      });
  
      const allImages = newImageUrls.map((url) => ({ url }));
  
      for (const image of allImages) {
        await dispatch(postImagesThunk(product.id, image.url));
      }
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="review-modal-container">
      <div className="review-modal-body">
        <h1>Update Product</h1>
        <form className="review-form" onSubmit={onSubmit}>
          <div className="review-inputs-top">
            <label>Name:</label>
            <input
              type="text"
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
            />
            {errors?.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="review-inputs-top">
            <label>Description:</label>
            <textarea
              className="review-text-area"
              value={formState.description}
              onChange={(e) =>
                setFormState({ ...formState, description: e.target.value })
              }
            />
            {errors?.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>
          <div className="review-inputs-top">
            <label>Price:</label>
            <input
              type="number"
              value={formState.price}
              onChange={(e) =>
                setFormState({ ...formState, price: e.target.value })
              }
            />
            {errors?.price && <p className="error">{errors.price}</p>}
          </div>
          <div className="review-inputs-top">
            <label>Preview Image:</label>
            <input
              type="text"
              value={formState.previewImage}
              onChange={(e) =>
                setFormState({ ...formState, previewImage: e.target.value })
              }
            />
            {errors?.previewImage && (
              <p className="error">{errors.previewImage}</p>
            )}
          </div>
          {formState.imageUrls.map((url, index) => (
            <div key={index} className="review-inputs-top">
              <label>Image URL {index + 1}:</label>
              <input
                              type="text"
                              value={formState.imageUrls[index]}
                              onChange={(e) => {
                                const updatedUrls = [...formState.imageUrls];
                                updatedUrls[index] = e.target.value;
                                setFormState({ ...formState, imageUrls: updatedUrls });
                              }}
                            />
                            {errors[`imageUrl${index}`] && (
                              <p className="error">{errors[`imageUrl${index}`]}</p>
                            )}
                          </div>
                        ))}
                        <button className="review-submit-button" type="submit">
                          Update Product
                        </button>
                      </form>
                    </div>
                  </div>
                );
              }
                export default UpdateProductModal;