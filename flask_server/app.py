"""Device vision backend server"""

from page_api_calls import Create_app
from flask_cors import cross_origin

app = Create_app() #initializing the flask app


@app.route("/")
@cross_origin()
def index_page():
    """Rendering the first page of the web page"""
    # with open("../dist/index.html", "r", encoding='utf-8') as file_pointer:
    return 'hello'
    

if __name__ == '__main__':
    
    """Running the server in the port 3000"""
    
    app.run(port=3000,host= '172.16.1.222', debug=True)
    
    