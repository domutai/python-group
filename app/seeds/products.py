from app.models import db, Product, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():
    mjolnir = Product(
        owner_id=1,
        name="Mjölnir - Thor's Hammer",
        description="The enchanted hammer wielded by Thor, forged in the heart of a dying star.",
        price=1000,
        previewImage="https://example.com/mjolnir.jpg"
    )
    shield = Product(
        owner_id=2,
        name="Captain America's Shield",
        description="Vibranium shield, nearly indestructible and symbol of freedom.",
        price=750,
        previewImage="https://example.com/captain-shield.jpg"
    )
    arc_reactor = Product(
        owner_id=3,
        name="Iron Man's Arc Reactor",
        description="The power source that keeps Tony Stark alive and powers the Iron Man suit.",
        price=1500,
        previewImage="https://example.com/arc-reactor.jpg"
    )
    agamotto = Product(
        owner_id=1,
        name="Eye of Agamotto",
        description="A mystical relic that contains the Time Stone, wielded by Doctor Strange.",
        price=2000,
        previewImage="https://example.com/eye-of-agamotto.jpg"
    )
    gauntlet = Product(
        owner_id=2,
        name="Infinity Gauntlet",
        description="The gauntlet forged to wield all six Infinity Stones, granting ultimate power.",
        price=5000,
        previewImage="https://example.com/infinity-gauntlet.jpg"
    )
    vibranium_suit = Product(
        owner_id=3,
        name="Black Panther's Vibranium Suit",
        description="A vibranium-infused suit, offering protection and enhanced abilities.",
        price=3500,
        previewImage="https://example.com/black-panther-suit.jpg"
    )

    db.session.add(mjolnir)
    db.session.add(shield)
    db.session.add(arc_reactor)
    db.session.add(agamotto)
    db.session.add(gauntlet)
    db.session.add(vibranium_suit)

    db.session.commit()

    images_data = [
        ProductImage(product_id=1, imageURL="https://example.com/mjolnir_front.jpg", isPreview=True),
        ProductImage(product_id=1, imageURL="https://example.com/mjolnir_side.jpg", isPreview=False),
        ProductImage(product_id=2, imageURL="https://example.com/shield_front.jpg", isPreview=True),
        ProductImage(product_id=3, imageURL="https://example.com/arc-reactor_front.jpg", isPreview=True),
        ProductImage(product_id=4, imageURL="https://example.com/eye-front.jpg", isPreview=True),
        ProductImage(product_id=5, imageURL="https://example.com/gauntlet_front.jpg", isPreview=True),
        ProductImage(product_id=5, imageURL="https://example.com/gauntlet_side.jpg", isPreview=False),
        ProductImage(product_id=6, imageURL="https://example.com/panther-suit_front.jpg", isPreview=True),
        ProductImage(product_id=6, imageURL="https://example.com/panther-suit_side.jpg", isPreview=False),
    ]

    
    db.session.bulk_save_objects(images_data)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
