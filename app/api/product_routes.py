from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Product

product_routes = Blueprint("products", __name__, url_prefix="/api/products")

# 1.1 GET /api/products – View All Products
@product_routes.route("", methods=["GET"])
def get_all_products():
    products = Product.query.all()
    return jsonify([
        {
            "id": product.id,
            "owner_id": product.owner_id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "previewImage": product.previewImage
        } for product in products
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

    db.session.delete(product)
    db.session.commit()

    return jsonify({"message": "Product deleted successfully."}), 200
