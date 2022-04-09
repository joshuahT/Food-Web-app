from app import db
import models
class DB:

  def updateProfile(user_id, height, weight, age):
    user = models.User.query.filter_by(user_id=user_id).first()
    if not user:
        return False
    user.height = height
    user.weight = weight
    user.age = age
    db.session.commit()
    return True