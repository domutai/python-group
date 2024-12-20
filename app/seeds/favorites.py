from app.models import db, Favorite, environment, SCHEMA
from sqlalchemy.sql import text


def seed_favorites():

    seed_data = [
        Favorite(userId=1, productId=4),
        Favorite(userId=1, productId=5),
        Favorite(userId=1, productId=6),
        Favorite(userId=2, productId=1),
        Favorite(userId=2, productId=2),
        Favorite(userId=2, productId=3),
        Favorite(userId=3, productId=2),
        Favorite(userId=3, productId=4),
        Favorite(userId=3, productId=5),
    ]

    db.session.bulk_save_objects(seed_data)
    db.session.commit()
    print("favorites seeded!")  

def undo_favorites():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else: 
        db.session.execute(text("DELETE FROM favorites"))

    db.session.commit()