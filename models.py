"""
import
"""
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

# pylint: disable=no-member
# pylint: disable=invalid-name
# pylint: disable=too-few-public-methods

db = SQLAlchemy()

# drop this table, made an error
class User(UserMixin, db.Model):
    """
    Table for user
    """

    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(999), unique=True)
    email = db.Column(db.String(999), unique=True)
    password = db.Column(db.String(999), nullable=False)
    img_url = db.Column(db.String(999), nullable=False)
    height = db.Column(db.Integer)
    weight = db.Column(db.Integer)
    age = db.Column(db.Integer)
    gender = db.Column(db.String(999))


# class recipes(db.Model):
#     """
#     class for table recipes
#     """

#     id = db.Column(db.Integer, primary_key=True)
#     recipes_name = db.Column(db.String(999))
#     ingredients = db.Column(db.ARRAY(db.String(999)))


class save(db.Model):
    """
    class for saved-recipes table
    """

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(999), unique=False)
    recipes_name = db.Column(db.String(999))
    ingredients = db.Column(db.ARRAY(db.String(999)))
    image = db.Column(db.String(10000))
    url = db.Column(db.String(10000))
