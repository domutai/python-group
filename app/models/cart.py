from .db import db, SCHEMA, environment


class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer,db.ForeignKey('users.id'), nullable=False,)
    productId = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    user = db.relationship('User', back_populates='carts')
    product = db.relationship('Product', back_populates='carts')



    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'productId': self.productId,
            'quantity': self.quantity
        }
