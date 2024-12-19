from flask import Blueprint, render_template, redirect, url_for, request, jsonify
from flask_login import login_required, current_user
from ..models import db, Favorite, Product



favorite_routes = Blueprint('favorites',__name__)

@favorite_routes.route('/')
@login_required
def index():
    favorites = Favorite.query.filter(Favorite.userId == current_user.id).all()
    if not favorites:
        return jsonify({'message': 'There are not favorites yet.'}), 400
    return jsonify({'favorites': [product.to_dict() for product in favorites]}), 200

@favorite_routes.route('/', methods=["POST"])
@login_required
def add_to_favorites():

    data = request.get_json()

    product_id = data.get('productId')

    product = db.session.query(Product).filter(Product.id == product_id).first()

    if not product:
        return jsonify({"message": "Product not found"}), 404
    
    existing_favorite_item = Favorite.query.filter_by(
        userId = current_user.id,
        productId = product_id
    ).first()

    if existing_favorite_item:
        return jsonify({"message":"Product is already on Favorites"})
    else: 
        new_item= Favorite(
            userId = current_user.id,
            productId = product_id,
        )
        db.session.add(new_item)

    db.session.commit()

    return jsonify({"message": "Item added to Favorites successfully"}), 201


@favorite_routes.route('/<int:favorite_id>', methods=["DELETE"])
@login_required
def delete_favorite(favorite_id):
    favorite_item = Favorite.query.get(favorite_id)

    if not favorite_item:
        return jsonify({"message": "Item not found"}), 404

    db.session.delete(favorite_item)
    db.session.commit()

    return jsonify({"message": "Item removed from favorites"}), 200

