from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import db, Favorite, Product, User, Review
from sqlalchemy.sql import func

favorite_routes = Blueprint('favorites',__name__)
@favorite_routes.route('/')
@login_required
def index():
    favorites = Favorite.query.filter(
        Favorite.userId == current_user.id
    ).join(Product).all()

    if not favorites:
        return jsonify({'message': 'There are not favorites yet.'}), 400

    product_ratings = db.session.query(
        Product.id,
        func.coalesce(func.avg(Review.stars), 0).label("average_rating")
    ).outerjoin(
        Review, Review.productid == Product.id
    ).group_by(Product.id).all()

    ratings_dict = {pr[0]: float(pr[1]) for pr in product_ratings}

    return jsonify({
        'favorites': [{
            'id': favorite.id,
            'userId': favorite.userId,
            'productId': favorite.productId,
            'product': {
                'id': favorite.product.id,
                'name': favorite.product.name,
                'description': favorite.product.description,
                'price': favorite.product.price,
                'previewImage': favorite.product.previewImage,
                'rating': ratings_dict.get(favorite.product.id, 0),
                'seller_name': f"{favorite.product.owner.first_name} {favorite.product.owner.last_name}".strip() if favorite.product.owner else "Unknown"
            }
        } for favorite in favorites]
    }), 200

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

