"""
import part
"""
from app import db
import models

# pylint: disable=too-few-public-methods
# pylint: disable=no-member
# pylint: disable=no-self-argument
# pylint: disable=invalid-name


class DB:
    """
    class db
    """

    def updateProfile(user_id, height, weight, age):
        """
        function update
        """
        user = models.User.query.filter_by(user_id=user_id).first()
        if not user:
            return False
        user.height = height
        user.weight = weight
        user.age = age
        db.session.commit()
        return True
