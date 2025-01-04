from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Product, ProductImage, Favorite
from sqlalchemy.orm import joinedload

product_routes = Blueprint("products", __name__, url_prefix="/api/products")

# 1.1 GET /api/products – View All Products
# @product_routes.route("", methods=["GET"])
# def get_all_products():
#     products = Product.query.options(joinedload(Product.owner)).all()
#     return jsonify([
#         {
#             "id": product.id,
#             "owner_id": product.owner_id,
#             "name": product.name,
#             "description": product.description,
#             "price": product.price,
#             "previewImage": product.previewImage,
#             "owner": {
#                 "id": product.owner.id,
#                 "first_name": product.owner.first_name,
#                 "email": product.owner.email
#             } if product.owner else None
#         } for product in products
#     ]), 200

# def get_all_products():
#     products = Product.query.all()
#     return jsonify([
#         {
#             "id": product.id,
#             "owner_id": product.owner_id,
#             "name": product.name,
#             "description": product.description,
#             "price": product.price,
#             "previewImage": product.previewImage
#         } for product in products
#     ]), 200

# 1.1 GET /api/products – View All Products with Ratings and Names
@product_routes.route("", methods=["GET"])
def get_all_products():
    products = db.session.query(
        Product,
        User.first_name.label("seller_first_name"),
        User.last_name.label("seller_last_name"),
        func.coalesce(func.avg(Review.stars), 0).label("average_rating"),
    ).outerjoin(User, User.id == Product.owner_id
    ).outerjoin(Review, Review.productid == Product.id
    ).group_by(Product.id, User.id).all()

    return jsonify([
        {
            "id": product.Product.id,
            "owner_id": product.Product.owner_id,
            "name": product.Product.name,
            "description": product.Product.description,
            "price": product.Product.price,
            "previewImage": product.Product.previewImage,
            "rating": product.average_rating,  # Average rating from reviews
            "seller_name": f"{product.seller_first_name} {product.seller_last_name}".strip(),
        }
        for product in products
    ]), 200

# 1.2 POST /api/products – Create a New Product
@product_routes.route("", methods=["POST"])
@login_required
def create_product():
    data = request.get_json()
    new_product = Product(
        owner_id=current_user.id,
        name=data.get("name"),
        description=data.get("description"),
        price=data.get("price"),
        previewImage=data.get("previewImage")
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify({
        "id": new_product.id,
        "owner_id": new_product.owner_id,
        "name": new_product.name,
        "description": new_product.description,
        "price": new_product.price,
        "previewImage": new_product.previewImage
    }), 201

# 1.3 PUT /api/products/:id – Update a Product
@product_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    if product.owner_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    product.name = data.get("name", product.name)
    product.description = data.get("description", product.description)
    product.price = data.get("price", product.price)
    product.previewImage = data.get("previewImage", product.previewImage)

    db.session.commit()

    return jsonify({
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "price": product.price,
        "previewImage": product.previewImage
    }), 200

# 1.4 DELETE /api/products/:id – Delete a Product
@product_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    if product.owner_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    Favorite.query.filter_by(productId=id).delete()

    db.session.delete(product)
    db.session.commit()

    return jsonify({"message": "Product deleted successfully."}), 200

# 2.1 GET /api/products/:id/images – View All Images for a Product
@product_routes.route("/<int:id>/images", methods=["GET"])
def get_product_images(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    images = ProductImage.query.filter_by(product_id=id).all()
    return jsonify([
        {
            "id": image.id,
            "product_id": image.product_id,
            "imageURL": image.imageURL,
            "isPreview": image.isPreview
        } for image in images
    ]), 200

# 2.2 POST /api/products/:id/images – Add an Image to a Product
@product_routes.route("/<int:id>/images", methods=["POST"])
@login_required
def add_product_image(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    if product.owner_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    new_image = ProductImage(
        product_id=id,
        imageURL=data.get("imageURL"),
        isPreview=data.get("isPreview", False)
    )

    db.session.add(new_image)
    db.session.commit()

    return jsonify({
        "id": new_image.id,
        "product_id": new_image.product_id,
        "imageURL": new_image.imageURL,
        "isPreview": new_image.isPreview
    }), 201

# 2.3 PUT /api/products/images/:image_id – Update an Image
@product_routes.route("/images/<int:image_id>", methods=["PUT"])
@login_required
def update_product_image(image_id):
    image = ProductImage.query.get(image_id)
    if not image:
        return jsonify({"error": "Image not found"}), 404

    product = Product.query.get(image.product_id)
    if product.owner_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    image.imageURL = data.get("imageURL", image.imageURL)
    image.isPreview = data.get("isPreview", image.isPreview)

    db.session.commit()

    return jsonify({
        "id": image.id,
        "product_id": image.product_id,
        "imageURL": image.imageURL,
        "isPreview": image.isPreview
    }), 200

# 2.4 DELETE /api/products/images/:image_id – Delete an Image
@product_routes.route("/images/<int:image_id>", methods=["DELETE"])
@login_required
def delete_product_image(image_id):
    image = ProductImage.query.get(image_id)
    if not image:
        return jsonify({"error": "Image not found"}), 404

    product = Product.query.get(image.product_id)
    if product.owner_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(image)
    db.session.commit()

    return jsonify({"message": "Image deleted successfully."}), 200
