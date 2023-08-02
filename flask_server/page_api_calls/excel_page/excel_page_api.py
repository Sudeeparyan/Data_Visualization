"""This file creates api call for excelpage"""
 
from flask import Blueprint, request, json, jsonify, Response
import dask.dataframe as dd
import pandas as pd
import datetime
import os


excel_page = Blueprint("excel_page_api", __name__)


def isvalid_csv(csv_path: str) -> bool:
    """This function validates the given csv file
       and return boolean results
    Args:
        csv_path (str): _description_

    Returns:
        bool: _description_
    """
    user_file = dd.read_csv(csv_path).compute()
    file_columns = user_file.columns

    for column in file_columns:
        if  user_file[column].isnull().all() or user_file[column].eq('').all():
            return False  
    
    
    return True

@excel_page.route("/api/v1/upload-csv", methods = ['POST'])
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
    
    
    if (isvalid_csv(csv_path)):
        
        actual_csv = pd.DataFrame(pd.read_csv(csv_path))
        csv_columns = [column for column in actual_csv.columns]
        df = actual_csv.to_dict(orient='records')
        return jsonify({"error":None, "columns": csv_columns,"table_data": df})
    
    else:
        
        os.remove(csv_path)
        return jsonify({"error": "The file uploaded is a invalid csv"})
        
        
        
        
        
        
    
        
    
    
    
