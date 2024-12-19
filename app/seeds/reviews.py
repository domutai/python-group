from app.models import db, Review
from datetime import datetime

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

    for review in reviews:
        db.session.add(review)

    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()