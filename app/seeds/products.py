from app.models import db, Product, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():
    mjolnir = Product(
        owner_id=1,
        name="Mjölnir - Thor's Hammer",
        description="The enchanted hammer wielded by Thor, forged in the heart of a dying star.",
        price=1000,
        previewImage="https://fbi.cults3d.com/uploaders/17086322/illustration-file/5ff8be13-edb6-4fcf-9fc5-f5a12c8c44d2/10.png"
    )
    shield = Product(
        owner_id=2,
        name="Captain America's Shield",
        description="Vibranium shield, nearly indestructible and symbol of freedom.",
        price=750,
        previewImage="https://herohaven.co.uk/cdn/shop/files/Captain_America_Shield_High_Quality_Plastic_Front_View.jpg?v=1719040815&width=1946"
    )
    arc_reactor = Product(
        owner_id=3,
        name="Iron Man's Arc Reactor",
        description="The power source that keeps Tony Stark alive and powers the Iron Man suit.",
        price=1500,
        previewImage="https://dsuj2mkiosyd2.cloudfront.net/unified-gallery/190509/5902/0002841c/arc-reactor---front-view.jpg?t=1557442036"
    )
    agamotto = Product(
        owner_id=1,
        name="Eye of Agamotto",
        description="A mystical relic that contains the Time Stone, wielded by Doctor Strange.",
        price=2000,
        previewImage="https://cdn.ecommercedns.uk/files/1/240241/7/16938287/drsteyelupin02-800x800.jpg"
    )
    gauntlet = Product(
        owner_id=2,
        name="Infinity Gauntlet",
        description="The gauntlet forged to wield all six Infinity Stones, granting ultimate power.",
        price=5000,
        previewImage="https://m.media-amazon.com/images/I/719tvCTibDL.jpg"
    )
    vibranium_suit = Product(
        owner_id=3,
        name="Black Panther's Vibranium Suit",
        description="A vibranium-infused suit, offering protection and enhanced abilities.",
        price=3500,
        previewImage="https://i.pinimg.com/564x/8e/73/c1/8e73c1bc168450b2b8b3a122438b420c.jpg"
    )

    db.session.add(mjolnir)
    db.session.add(shield)
    db.session.add(arc_reactor)
    db.session.add(agamotto)
    db.session.add(gauntlet)
    db.session.add(vibranium_suit)

    db.session.commit()

    images_data = [
        ProductImage(product_id=1, imageURL="https://fbi.cults3d.com/uploaders/17086322/illustration-file/5ff8be13-edb6-4fcf-9fc5-f5a12c8c44d2/10.png", isPreview=True),
        ProductImage(product_id=1, imageURL="https://cdnb.artstation.com/p/assets/images/images/010/368/401/large/mohit-meena-thor-hammer-1.jpg?1524056759", isPreview=False),
        ProductImage(product_id=2, imageURL="https://herohaven.co.uk/cdn/shop/files/Captain_America_Shield_High_Quality_Plastic_Front_View.jpg?v=1719040815&width=1946", isPreview=True),
        ProductImage(product_id=3, imageURL="https://dsuj2mkiosyd2.cloudfront.net/unified-gallery/190509/5902/0002841c/arc-reactor---front-view.jpg?t=1557442036", isPreview=True),
        ProductImage(product_id=4, imageURL="https://cdn.ecommercedns.uk/files/1/240241/7/16938287/drsteyelupin02-800x800.jpg", isPreview=True),
        ProductImage(product_id=5, imageURL="https://m.media-amazon.com/images/I/719tvCTibDL.jpg", isPreview=True),
        ProductImage(product_id=5, imageURL="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH3Le2zctqLoKDrkRFyX5xVGi7Z-gcg_ipIg&s", isPreview=False),
        ProductImage(product_id=6, imageURL="https://i.pinimg.com/564x/8e/73/c1/8e73c1bc168450b2b8b3a122438b420c.jpg", isPreview=True),
        ProductImage(product_id=6, imageURL="https://a0.anyrgb.com/pngimg/1968/768/vibranium-wakanda-marvel-studios-captain-america-civil-war-black-panther-iron-man-marvel-cinematic-universe-marvel-comics-concept-art-fictional-characters.png", isPreview=False),
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