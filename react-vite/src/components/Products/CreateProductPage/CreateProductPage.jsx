import { useDispatch } from "react-redux";
import { useState } from "react";
import { createProduct } from "../../../redux/product";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newProduct = {
      name,
      description,
      price,
      previewImage,
    };

    try {
      const createdProduct = await dispatch(createProduct(newProduct));
      navigate(`products/${createdProduct.id}`);
    } catch (error) {
      const data = await error.json();
      if (data?.errors) {
        setErrors(data.errors);
      }
    }
  };

  return (
    <main>
      <h1 className="header1">Post a new Product</h1>
      <form onSubmit={onSubmit}>
        <div className="productTitleContainer container">
          <h2 className="header2">What are you selling?</h2>
          <p className="p-descriptions">
            Catch customers&apos; attention with a product title that highlights
            what makes your product special.
          </p>
          <div className="form title">
            <input
              placeholder="Name of your product"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors?.name && <p className="error">{errors.name}</p>}
          </div>
        </div>
        <div className="descriptionContainer container">
          <h2 className="header2">Describe your product to customers</h2>
          <p className="p-descriptions">
            Mention the best features of your product, any special features and
            what you love about the product.
          </p>
          <div className="form descriptionForm">
            <textarea
              id="description"
              placeholder="Please write at least 30 characters"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors?.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>
        </div>

        <div className="priceContainer container">
          <h2 className="header2">Set a price for your product</h2>
          <p className="p-descriptions">
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <div className="form price">
            <div className="input-container">
              <span className="currency-symbol">$</span>
              <input
                type="numeric"
                placeholder="Price (USD)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors?.price && <p className="error">{errors.price}</p>}
            </div>
          </div>
        </div>
        <div className="photosContainer container">
          <h2 className="header2">Liven up your product with photos</h2>
          <p className="p-descriptions">
            Submit a link to at least one photo to publish your product.
          </p>
          <div className="form photosUrl">
            <input
              placeholder="Preview Image URL"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
            />
            {errors?.previewImage && (
              <p className="error">{errors.previewImage}</p>
            )}
            {/* {imageUrls.map((url, index) => (
              <div key={index}>
                <input
                  placeholder={`Image URL ${index + 1}`}
                  value={imageUrls[index]}
                  onChange={(e) => {
                    const updatedUrls = [...imageUrls];
                    updatedUrls[index] = e.target.value;
                    setImageUrls(updatedUrls);
                  }}
                />
                {errors[`imageUrl${index}`] && (
                  <p className="error">{errors[`imageUrl${index}`]}</p>
                )}
              </div>"2"222222""222"""""##"!"$%$#""""2222222222
            ))} */}
          </div>
        </div>
        <button className="createSpotBtn" type="submit">
          Create Spot
        </button>
      </form>
    </main>
  );
};

export default CreateProduct;
