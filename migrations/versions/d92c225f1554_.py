"""empty message

Revision ID: d92c225f1554
Revises: 
Create Date: 2024-12-30 10:22:05.474694

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd92c225f1554'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=50), nullable=False),
    sa.Column('last_name', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('createdAt', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('products',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('previewImage', sa.Text(), nullable=True),
    sa.Column('createdAt', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('carts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('productId', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['productId'], ['products.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('favorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('productId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['productId'], ['products.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('product_images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('imageURL', sa.Text(), nullable=False),
    sa.Column('isPreview', sa.Boolean(), nullable=True),
    sa.Column('createdAt', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userID', sa.Integer(), nullable=False),
    sa.Column('productid', sa.Integer(), nullable=False),
    sa.Column('reviewText', sa.Text(), nullable=False),
    sa.Column('stars', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=False),
    sa.Column('updatedAt', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['productid'], ['products.id'], ),
    sa.ForeignKeyConstraint(['userID'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    op.drop_table('product_images')
    op.drop_table('favorites')
    op.drop_table('carts')
    op.drop_table('products')
    op.drop_table('users')
    # ### end Alembic commands ###
