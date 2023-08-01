
from flask import Flask
from flask_cors import CORS, cross_origin
from .excel_page.excel_page_api import excel_page

def Create_app() -> Flask:
    
    """This function creates the flask app for the server
    Returns:
        Flask object
    """
    app = Flask(__name__, static_folder='../dist/assets') #initializing the flask app
    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'   
    
    
    app.register_blueprint(excel_page)
    
    
    
    return app






    




