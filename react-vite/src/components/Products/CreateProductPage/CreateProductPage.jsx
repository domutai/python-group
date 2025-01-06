import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { createProduct, postImagesThunk } from "../../../redux/product";
import "./CreateProductPage.css";

const CreateProduct = () => {
  const userSession = useSelector((state) => state.session?.user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState({});
  const [imageUrls, setImageUrls] = useState(["", "", "", ""]);

  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const urlRegex = /\.(png|jpg|jpeg)$/;
    const newErrors = {};

    if (!description.trim() || description.length < 30)
      newErrors.description = "Description needs a minimum of 30 characters.";
    if (!name.trim()) newErrors.name = "Name is required.";
    if (price == null) newErrors.price = "Price is required.";
    if (!previewImage.match(urlRegex)) {
      newErrors.previewImage =
        "Preview Image is required and must end in png, jpg, or jpeg.";
    }

    imageUrls.forEach((url, index) => {
      if (url && !url.match(urlRegex)) {
        newErrors[`imageUrl${index}`] =
          "Image URL needs to end in png, jpg, or jpeg.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newProduct = {
      name,
      description,
      price,
      previewImage,
    };

    try {
      const createdProduct = await dispatch(createProduct(newProduct));

      if (createdProduct) {
        const allImages = [
          ...imageUrls
            .filter((url) => url.trim() !== "")
            .map((url) => ({ url })),
        ];

        for (const image of allImages) {
          await dispatch(postImagesThunk(createdProduct.id, image.url));
        }
      }
      navigate(`/products/${createdProduct.id}`);
    } catch (error) {
      const data = await error.json();
      if (data?.errors) {
        setErrors(data.errors);
      }
    }
  };

  if (!userSession) {
    return <Navigate to="/" />;
  }

  if (!userSession) {
    return <Navigate to="/" />;
  }

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
          <div className="form price-box">
            <div className="input-container">
              <span className="currency-symbol">$</span>
              <input
                type="numeric"
                placeholder="Price (USD)"
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
            {imageUrls.map((url, index) => (
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
              </div>
            ))}
          </div>
        </div>
        <button className="postProductBtn" type="submit">
          Post Product
        </button>
      </form>
    </main>
  );
};

export default CreateProduct;
