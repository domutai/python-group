from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import db, Review, Product

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/products/<int:id>/reviews')
def get_product_reviews(id):
    """
    Query for all reviews of a specific product
    """
    product = Product.query.get(id)
    
    if not product:
        return jsonify({"message": "Product not found"}), 404
        
    reviews = Review.query.filter(Review.productid == id).all()
    return jsonify([review.to_dict() for review in reviews]), 200

@review_routes.route('/products/<int:id>/reviews', methods=['POST'])
@login_required
def create_review(id):
    """
    Create a new review for a specific product
    """
    product = Product.query.get(id)
    
    if not product:
        return jsonify({"message": "Product not found"}), 404
        
    existing_review = Review.query.filter_by(
        userID=current_user.id,
        productid=id
    ).first()
    
    if existing_review:
        return jsonify({"message": "You have already reviewed this product"}), 400
        
    data = request.get_json()
    
    if not data.get('stars') or not data.get('reviewText'):
        return jsonify({"message": "Stars and review text are required"}), 400
        
    if not isinstance(data['stars'], int) or data['stars'] < 1 or data['stars'] > 5:
        return jsonify({"message": "Stars must be a number between 1 and 5"}), 400

    new_review = Review(
        userID=current_user.id,
        productid=id,
        stars=data['stars'],
        reviewText=data['reviewText']
    )
    
    db.session.add(new_review)
    db.session.commit()
    
    return jsonify(new_review.to_dict()), 201

@review_routes.route('/reviews/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
    """
    Update an existing review
    """
    review = Review.query.get(id)
    
    if not review:
        return jsonify({"message": "Review not found"}), 404
        
    if review.userID != current_user.id:
        return jsonify({"message": "Unauthorized"}), 403
        
    data = request.get_json()
    
    if not data.get('stars') or not data.get('reviewText'):
        return jsonify({"message": "Stars and review text are required"}), 400
        
    if not isinstance(data['stars'], int) or data['stars'] < 1 or data['stars'] > 5:
        return jsonify({"message": "Stars must be a number between 1 and 5"}), 400
        
    review.stars = data['stars']
    review.reviewText = data['reviewText']
    
    db.session.commit()
    
    return jsonify(review.to_dict()), 200

@review_routes.route('/reviews/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    """
    Delete a review
    """
    review = Review.query.get(id)
    
    if not review:
        return jsonify({"message": "Review not found"}), 404
        
    if review.userID != current_user.id:
        return jsonify({"message": "Unauthorized"}), 403
        
    db.session.delete(review)
    db.session.commit()
    
    return jsonify({"message": "Review successfully deleted"}), 200