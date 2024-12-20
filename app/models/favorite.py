from .db import db, add_prefix_for_prod


class Favorite(db.Model):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False,)
    productId = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)

    user = db.relationship('User', back_populates='favorites')
    product = db.relationship('Product', back_populates='favorites')



    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'productId': self.productId,
        }
