"""Device vision

   This is a web application built with Flask and
   serves a React frontend from the 'dist' directory"""


# Flask application code starts here
# python modules
import os

# flask modules
from flask_cors import CORS
from flask import send_from_directory, jsonify

# application modules
from page_api_calls import create_app
from models import db, Users
from utilities import handle_errors

# initializing the flask app
app = create_app()
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

# configuring the static folder path for flask app
static_folder_path = os.path.abspath(os.path.join(os.getcwd(), '..', 'dist', 'assets'))
app.static_folder = static_folder_path


def initialize_db():
    """Setting up sqllite3 connectivity"""
    os.makedirs('storage\\database\\', exist_ok=True)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
        os.path.join(os.getcwd(), 'storage\\database\\db.sqllite3')

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    with app.app_context():
        db.create_all()
        new_user = Users()
        db.session.add(new_user)
        db.session.commit()


# opening the dist file
with open("../dist/index.html", "r", encoding="utf-8") as file_pointer:
    file_pointer = file_pointer.read()


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
@handle_errors
def index(path):
    """rendering the index page of the application"""

    return file_pointer


@app.route("/assets/<path:name>")
@handle_errors
def render_static_file(name):
    """Rendering  static files for the webpage"""

    return send_from_directory(
        app.static_folder, name, as_attachment=True
    )


@app.errorhandler(404)
def handle_unknown_routes(error):
    """Function for handling unknown routes"""

    response = jsonify({'error': 'The requested URL was not found on this server.'})
    return response


if __name__ == '__main__':
    # setting up for db connectivity
    initialize_db()

    # Running the server at port 8000
    app.run(port=8000, debug=True)
 