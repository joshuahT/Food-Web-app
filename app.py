"""
run python3 app.py to run the app
"""
# pylint: disable=ungrouped-imports
# pylint: disable=maybe-no-member
# pylint: disable=redefined-outer-name
# pylint: disable=no-self-use
import os
import json
import flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_wtf import FlaskForm
from dotenv import find_dotenv, load_dotenv
from wtforms import (
    StringField,
    PasswordField,
    SubmitField,
    BooleanField,
    SelectField,
    IntegerField,
)
from wtforms.validators import (
    DataRequired,
    Length,
    Email,
    EqualTo,
    ValidationError,
    NumberRange,
)
from flask_login import login_user, current_user, logout_user
from flask import render_template, url_for, flash, redirect
from models import db, User, save

load_dotenv(find_dotenv())

app = flask.Flask(__name__, static_folder="./build/static")

# set up a separate route to serve the index.html file generated
# by create-react-app/npm run build.
# By doing this, we make it so you can paste in all your old app routes
# from Milestone 2 without interfering with the functionality here.
bp = flask.Blueprint(
    "bp",
    __name__,
    template_folder="./build",
)

# route for serving React page
@bp.route("/index", methods=["GET", "POST"])
def index():
    """
    NB: DO NOT add an "index.html" file in your normal templates folder
    Flask will stop serving this React page correctly
    """
    if not current_user.is_authenticated:
        return flask.redirect(flask.url_for("home"))
    return flask.render_template(
        "index.html",
    )


app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
if app.config["SQLALCHEMY_DATABASE_URI"].startswith("postgres://"):
    app.config["SQLALCHEMY_DATABASE_URI"] = app.config[
        "SQLALCHEMY_DATABASE_URI"
    ].replace("postgres://", "postgresql://")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
APP_ID = os.getenv("APP_ID")
APP_KEY = os.getenv("APP_KEY")

db.init_app(app)
with app.app_context():
    db.create_all()

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = "login"
login_manager.login_message_category = "info"


@login_manager.user_loader
def load_user(user_id):
    """
    user load
    """
    return User.query.get(int(user_id))


class RegistrationForm(FlaskForm):
    """
    registration form
    """

    username = StringField(
        "Username", validators=[DataRequired(), Length(min=2, max=20)]
    )
    img_url = StringField(
        "Profile Pic URL", validators=[DataRequired(), Length(min=2, max=100)]
    )
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired()])
    confirm_password = PasswordField(
        "Confirm Password", validators=[DataRequired(), EqualTo("password")]
    )
    age = IntegerField(
        "Age", validators=[DataRequired(), NumberRange(min=0, max=110, message=None)]
    )
    weight = IntegerField(
        "Weight (in pounds)",
        validators=[DataRequired(), NumberRange(min=0, max=300, message=None)],
    )
    height = IntegerField(
        "Height (in centimeters)",
        validators=[DataRequired(), NumberRange(min=0, max=300, message=None)],
    )
    gender = SelectField(
        "Gender", [DataRequired()], choices=[("Male", "Male"), ("Female", "Female")]
    )
    submit = SubmitField("Sign Up")

    def validate_username(self, username):
        """
        check if username is taken
        """
        user = User.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError(
                "That username is taken. Please choose a different one."
            )

    def validate_email(self, email):
        """
        check if email is taken
        """
        user = User.query.filter_by(email=email.data).first()
        if user:
            raise ValidationError("That email is taken. Please choose a different one.")


class LoginForm(FlaskForm):
    """
    login form
    """

    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired()])
    remember = BooleanField("Remember Me")
    submit = SubmitField("Login")


@app.route("/")
def redirectreact():
    """
    redirect function
    """
    if current_user.is_authenticated:
        return render_template("index.html")
    return render_template("home.html")


@app.route("/home")
def home():
    """
    home page
    """
    return render_template(
        "home.html",
    )


@app.route("/main")
def main():
    """
    main page
    """
    return render_template(
        "main.html",
    )


@app.route("/about")
def about():
    """
    about page
    """
    return render_template("about.html", title="About")


@app.route("/register", methods=["GET", "POST"])
def register():
    """
    register function
    """
    if current_user.is_authenticated:
        return redirect(url_for("bp.index"))
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode(
            "utf-8"
        )
        user = User(
            username=form.username.data,
            email=form.email.data,
            password=hashed_password,
            age=form.age.data,
            weight=form.weight.data,
            height=form.height.data,
            gender=form.gender.data,
            img_url=form.img_url.data,
        )
        db.session.add(user)
        db.session.commit()
        flash("Your account has been created! You are now able to log in", "success")
        return redirect(url_for("login"))
    return render_template("register.html", title="Register", form=form)


@app.route("/login", methods=["GET", "POST"])
def login():
    """
    login function
    """
    if current_user.is_authenticated:
        return redirect(url_for("home"))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            # next_page = request.args.get("next")
            return render_template("index.html")
            # return flask.render_template("search.html")
        flash("Login Unsuccessful. Please check email and password", "danger")
    return render_template("login.html", title="Login", form=form)


@app.route("/logout")
def logout():
    """
    log out function
    """
    logout_user()
    return redirect(url_for("home"))


@app.route("/user", methods=["POST", "GET"])
def user():
    """
    user information return in json
    """
    user_id = current_user.id
    username = current_user.username
    img_url = current_user.img_url
    height = current_user.height
    weight = current_user.weight
    age = current_user.age
    gender = current_user.gender
    data_json = {
        "id": user_id,
        "username": username,
        "img_url": img_url,
        "height": height,
        "weight": weight,
        "age": age,
        "gender": gender,
    }
    data = json.dumps(data_json)
    return data


@app.errorhandler(404)
def not_found(error):
    """
    error catch
    """
    if current_user.is_authenticated:
        return render_template("index.html")
    print(error)
    return render_template("index.html")


@bp.route("/update", methods=["POST"])
def updatepage():
    """
    update info function
    """
    data = flask.request.get_json()
    curr_elements = save(
        username=current_user.username,
        recipes_name=data["label"],
        ingredients=data["ingredient"],
        image=data["image"],
        url=data["url"],
    )
    print(data["label"])
    db.session.add(curr_elements)
    db.session.commit()
    return flask.render_template("index.html")


@bp.route("/info", methods=["GET", "POST"])
def info():
    """
    recipe save function
    """
    save_table = save.query.filter(save.username == current_user.username)
    save_list = []
    for i in save_table:
        save_dict = {}
        save_dict["label"] = i.recipes_name
        save_dict["ingredient"] = i.ingredients
        save_dict["image"] = i.image
        save_dict["url"] = i.url
        save_list.append(save_dict)
    return flask.jsonify(save_list)


app.register_blueprint(bp)


if __name__ == "__main__":
    app.run(
        host=os.getenv("IP", "0.0.0.0"),
        port=int(os.getenv("PORT", "8080")),
        debug=True,
    )

# app.run()

# does this change work
