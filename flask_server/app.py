"""Device vision backend server"""

from page_api_calls import Create_app
from flask_cors import cross_origin, CORS
from flask_migrate import Migrate
from model import db,Users
import os


app = Create_app() #initializing the flask app
cors = CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqllite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)


with app.app_context():
    db.create_all()
    new_user = Users(user_name='Giri', email='hello@123', password='pass')
    db.session.add(new_user)
    db.session.commit()

@app.route("/")
@cross_origin()
def index_page():
    """Rendering the first page of the web page"""
    with open("../dist/index.html", "r", encoding='utf-8') as file_pointer:
         return file_pointer.read() 
    

    

if __name__ == '__main__':
    
    """Running the server in the port 3000"""
    
    app.run(port=3000,host= '172.16.1.222', debug=True)
    
    