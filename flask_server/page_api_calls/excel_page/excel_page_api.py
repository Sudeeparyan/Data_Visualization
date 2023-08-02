"""This file creates api call for excelpage"""
 
from flask import Blueprint, request, json, jsonify, Response
import dask.dataframe as dd
from functools import wraps
import pandas as pd
import datetime
import os


excel_page = Blueprint("excel_page_api", __name__)



def error_handling_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
          
            error_message = str(e)
            return jsonify({"error": error_message}) 
    return wrapper


@excel_page.route("/api/v1/upload-csv", methods = ['POST'])
@error_handling_decorator
def upload_csv():
    """This function creates an api call 
       for uploading and returning the valid csv file
       
    Returns:
       It returns a json response to the frontend
    """
    csv_file = request.files['file']
    file_name = str(datetime.datetime.now().strftime("%Y%m%d-%H%M%S"))+".csv"
    csv_path = os.path.join(os.getcwd(),"storage\\media_files\\actual_csv_files",(file_name))
    csv_file.save(csv_path)
    
    
    if (True):
        
        actual_csv = pd.DataFrame(pd.read_csv(csv_path))
        actual_csv.to_csv(csv_path,index=False)

        return jsonify({"error":None,"fileStatus":"success","projectId": 1})
    
    else:
        
        os.remove(csv_path)
        return jsonify({"error": "The file uploaded is a invalid csv"})
        

@excel_page.route("/api/v1/get-csv/<param>",methods = ['GET'])
@error_handling_decorator
def sending_csv(param):
    
    csv_path = os.path.join(os.getcwd(),"storage\\media_files\\actual_csv_files","20230802-175534.csv")
    actual_csv = pd.DataFrame(pd.read_csv(csv_path))
    
    df = actual_csv.to_dict(orient='records')
    
    return jsonify({"error": None,"tableContent": df,"columns": [column for column in actual_csv.columns]})
    
    
    

        
        
        
    
        
    
    
    
