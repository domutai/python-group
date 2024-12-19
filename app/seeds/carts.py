from app.models import db, Cart, environment, SCHEMA
from sqlalchemy.sql import text


def seed_carts():

    seed_data = [
        Cart(userId=1, productId=1, quantity=1),
        Cart(userId=1, productId=2, quantity=2),
        Cart(userId=1, productId=3, quantity=3),
        Cart(userId=2, productId=4, quantity=1),
        Cart(userId=2, productId=5, quantity=2),
        Cart(userId=2, productId=6, quantity=3),
        Cart(userId=3, productId=1, quantity=1),
        Cart(userId=3, productId=3, quantity=2),
        Cart(userId=3, productId=6, quantity=3),
    ]

    db.session.bulk_save_objects(seed_data)
    db.session.commit()
    print("Carts seeded!")  

def undo_carts():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else: 
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()