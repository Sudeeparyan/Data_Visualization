"""Creates flask app instance"""

# flask modules
from flask import Flask
# application modules
from .excel_page.excel_page_api import excel_page


def create_app():
    """
    This function creates the flask app for the server

    Returns:
        Flask object
    """
    # initializing the flask app
    app = Flask(__name__)
    app.register_blueprint(excel_page)
    

    return app
