"""create reviews table

Revision ID: 989212aa08d0
Revises: e51653fc8db0
Create Date: 2024-12-18 17:45:41.176084

"""
from alembic import op
import sqlalchemy as sa
from datetime import datetime



# revision identifiers, used by Alembic.
revision = '989212aa08d0'
down_revision = 'e51653fc8db0'
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        'reviews',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('userID', sa.Integer(), nullable=False),
        sa.Column('productid', sa.Integer(), nullable=False),
        sa.Column('reviewText', sa.Text(), nullable=False),
        sa.Column('stars', sa.Integer(), nullable=False),
        sa.Column('createdAt', sa.DateTime(), nullable=False, default=datetime.utcnow),
        sa.Column('updatedAt', sa.DateTime(), nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow),
        sa.ForeignKeyConstraint(['userID'], ['users.id'], ),
        sa.ForeignKeyConstraint(['productid'], ['products.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade():
    op.drop_table('reviews')