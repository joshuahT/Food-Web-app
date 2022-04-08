import os
import flask
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import json
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, user_logged_in
from flask_wtf import FlaskForm
from dotenv import find_dotenv, load_dotenv
from wtforms import StringField, PasswordField, SubmitField, BooleanField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError
from flask_login import login_user, current_user, logout_user, login_required
from flask import render_template, url_for, flash, redirect, request
from models import db, User, recipes, recipes_reviews, save

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
    # NB: DO NOT add an "index.html" file in your normal templates folder
    # Flask will stop serving this React page correctly
    if not current_user.is_authenticated:
        return flask.redirect(flask.url_for("home"))
    user_id = str(current_user.user_id)
    name = current_user.name
    img = current_user.img
    height = current_user.height
    weight = current_user.weight
    age = current_user.age

    DATA = {
        "user_id": user_id,
        "name": name,
        "img": img,
        "height": height,
        "weight": weight,
        "age": age,
    }
    data = json.dumps(DATA)
    return flask.render_template(
        "index.html",
        data=data,
    )


app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
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
    return User.query.get(int(user_id))


class RegistrationForm(FlaskForm):
    username = StringField(
        "Username", validators=[DataRequired(), Length(min=2, max=20)]
    )
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired()])
    confirm_password = PasswordField(
        "Confirm Password", validators=[DataRequired(), EqualTo("password")]
    )
    submit = SubmitField("Sign Up")

    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError(
                "That username is taken. Please choose a different one."
            )

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user:
            raise ValidationError("That email is taken. Please choose a different one.")


class LoginForm(FlaskForm):
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired()])
    remember = BooleanField("Remember Me")
    submit = SubmitField("Login")


@app.route("/")
def redirectreact():
    if current_user.is_authenticated:
        return render_template("index.html")
    return render_template("home.html")


@app.route("/home")
def home():
    return render_template(
        "home.html",
    )


@app.route("/main")
def main():
    return render_template(
        "main.html",
    )


@app.route("/about")
def about():
    return render_template("about.html", title="About")


@app.route("/register", methods=["GET", "POST"])
def register():
    if current_user.is_authenticated:
        return redirect(url_for("bp.index"))
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode(
            "utf-8"
        )
        user = User(
            username=form.username.data, email=form.email.data, password=hashed_password
        )
        db.session.add(user)
        db.session.commit()
        flash("Your account has been created! You are now able to log in", "success")
        return redirect(url_for("login"))
    return render_template("register.html", title="Register", form=form)


@app.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("home"))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            next_page = request.args.get("next")
            return flask.render_template("index.html")
            # return flask.render_template("search.html")
        else:
            flash("Login Unsuccessful. Please check email and password", "danger")
    return render_template("login.html", title="Login", form=form)


@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for("home"))


@app.route("/user")
def user():
    user_id = str(current_user.user_id)
    name = current_user.name
    img = current_user.img
    height = current_user.height
    weight = current_user.weight
    age = current_user.age
    DATA = {
        "user_id": user_id,
        "name": name,
        "img": img,
        "height": height,
        "weight": weight,
        "age": age,
    }
    data = json.dumps(DATA)
    return data


@app.errorhandler(404)
def not_found(e):
    if current_user.is_authenticated:
        return flask.render_template("index.html")
    print(e)
    return flask.render_template("index.html")


app.register_blueprint(bp)

# app.run(host=os.getenv("IP", "0.0.0.0"), port=int(os.getenv("PORT", 8080)), debug=True)

# if __name__ == "__main__":
#     app.run(
#         host=os.getenv("IP", "0.0.0.0"),
#         port=int(os.getenv("PORT", 8080)),
#         debug=True,
#     )

app.run()

# does this change work
