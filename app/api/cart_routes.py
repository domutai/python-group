from flask import Blueprint, render_template, redirect, url_for, request, jsonify
from flask_login import login_required, current_user
from ..models import db, Cart



cart_routes = Blueprint('cart',__name__)

@cart_routes.route('/')
@login_required
def get_cart():
    print("current user:", current_user)
    cart = Cart.query.filter(Cart.userId == current_user.id).all()
    if not cart:
        return jsonify({'message': 'Shopping cart is empty.'}), 400
    return jsonify({'cart': [product.to_dict() for product in cart]}), 200

@cart_routes.route('/', methods=["POST"])
@login_required
def add_to_cart():

    data = request.get_json()

    product_id = data.get('productId')
    quantity = data.get('quantity')

    if not product_id or not isinstance(quantity, int) or quantity <= 0:
        return jsonify({"message": "Invalid input data"}), 400
    
    existing_cart_item = Cart.query.filter_by(
        userId = current_user.id,
        productId = product_id
    ).first()

    if existing_cart_item:
        existing_cart_item.quantity += quantity
    else: 
        new_item_cart= Cart(
            userId = current_user.id,
            productId = product_id,
            quantity= quantity
        )
        db.session.add(new_item_cart)

    db.session.commit()

    return jsonify({"message": "Item added to cart successfully"}), 201

@cart_routes.route('/<int:cart_id>', methods=['PUT'])
@login_required
def update_cart(cart_id):
    cart_item = Cart.query.get(cart_id)

    if not cart_item:
        return jsonify({"message": "Item not found"}),404

    data = request.get_json()
    new_quantity =data.get("quantity")

    if new_quantity <= 0:
        return jsonify({"message": "Quantity must be greater than 0"}), 400
    
    cart_item.quantity = new_quantity

    db.session.commit()

    return jsonify({"item": cart_item.to_dict()}), 200
    


@cart_routes.route('/<int:cart_id>', methods=["DELETE"])
@login_required
def delete_cart(cart_id):
    cart_item = Cart.query.get(cart_id)

    if not cart_item:
        return jsonify({"message": "Item not found"}), 404

    db.session.delete(cart_item)
    db.session.commit()

    return jsonify({"message": "Item removed from cart"}), 200


@cart_routes.route('/checkout', methods=["POST"])
@login_required
def checkout():
    cart = Cart.query.filter(Cart.userId == current_user.id).all()
    if not cart:
        return jsonify({'message': 'Shopping cart is empty.'}), 400
    
    for item in cart:
        db.session.delete(item)

    db.session.commit()

    return jsonify({"message": "Transaction completed successfully"})


