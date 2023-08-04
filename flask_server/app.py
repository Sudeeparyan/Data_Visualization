"""Device vision backend server"""

# python modules
import os

# flask modules
from flask_cors import cross_origin, CORS
from flask import send_from_directory

# application modules
from page_api_calls import create_app
from model import db, Users
from utilities import handle_errors

# initializing the flask app
app = create_app()
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

static_folder_path = os.path.abspath(os.path.join(os.getcwd(), '..', 'dist', 'assets'))
app.static_folder = static_folder_path 

os.makedirs('storage\\database\\',exist_ok=True)
db_file = os.path.join('storage', 'database', 'db.sqllite3')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
    os.path.join(os.getcwd(), 'storage\\database\\db.sqllite3')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()
    new_user = Users()
    db.session.add(new_user)
    db.session.commit()


@app.route("/")
@cross_origin()
@handle_errors
def render_index_page():
    """Rendering the first page of the web page"""
    file_pointer = open("../dist/index.html", "r", encoding="utf-8")

    return file_pointer.read()

@app.route("/assets/<path:name>")
def render_static_file(name):
    """Rendering  static files for the webpage"""
    return send_from_directory(
        app.static_folder, name, as_attachment=True
    )

if __name__ == '__main__':
    # Running the server at port 3000
    app.run(port=3000 ,debug=True)
