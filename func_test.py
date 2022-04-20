"""
import
"""
import unittest
import json
from flask_login import current_user
from app import user


class UserTest(unittest.TestCase):
    """
    class to unnittest
    """

    def test_user(self):
        """
        function unittest
        """
        user_id = current_user.id
        username = current_user.username
        img_url = current_user.img_url
        height = current_user.height
        weight = current_user.weight
        age = current_user.age
        gender = current_user.gender
        user_data = {
            "id": user_id,
            "username": username,
            "img_url": img_url,
            "height": height,
            "weight": weight,
            "age": age,
            "gender": gender,
        }
        data = json.dumps(user_data)
        test_answer = data
        expected_output = user()
        self.assertEqual(test_answer, expected_output)


if __name__ == "__main__":
    unittest.main()
