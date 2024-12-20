from app.models import db, Review, SCHEMA, environment
from sqlalchemy.sql import text

def seed_reviews():
    reviews = [
        Review(
            userID=1,
            productid=1,
            reviewText="Thor's hammer is surprisingly light! Great for home defense.",
            stars=5
        ),
        Review(
            userID=2,
            productid=1,
            reviewText="Not the real Mjolnir, but still a cool collectible.",
            stars=4
        ),
        Review(
            userID=3,
            productid=2,
            reviewText="Iron Man's repulsor glove works great, perfect for cosplay!",
            stars=5
        )
    ]

    db.session.bulk_save_objects(reviews)

    db.session.commit()
    print("Reviews seeded!") 

def undo_reviews():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else: 
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()