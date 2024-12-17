from .db import db


class Cart(db.Model):
    __tablename__ = 'carts'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, nullable=False,)
    productId = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'productId': self.productId,
            'quantity': self.quantity
}
