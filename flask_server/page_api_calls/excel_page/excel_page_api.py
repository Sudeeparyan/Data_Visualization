"""This file creates api call for excelpage"""

from flask import Blueprint, request, json, jsonify, Response
import dask.dataframe as dd
from functools import wraps
import pandas as pd
import datetime
import os
from model import Projects, CsvTable, db, Users, Projects


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


@excel_page.route("/api/v1/upload-csv", methods=['POST'])
def upload_csv():
    """This function creates an API call 
       for uploading and returning the valid csv file

    Returns:
       It returns a JSON response to the frontend
    """
    csv_file = request.files['file']
    file_name = str(datetime.datetime.now().strftime("%Y%m%d-%H%M%S")) + ".csv"
    current_csv_path = os.path.join(
        os.getcwd(), "storage\\media_files\\actual_csv_files", file_name)
    csv_file.save(current_csv_path)

    actual_csv = pd.DataFrame(pd.read_csv(current_csv_path))
    actual_csv.to_csv(current_csv_path, index=False)
    
    
    # # Create a new project associated with the newly created user
    
    last_user = Users.query.order_by(Users.user_id.desc()).first()
   
    new_project = Projects(project_name='device-vision',user_id = last_user.user_id)
    db.session.add(new_project)
    db.session.commit()
    
    new_csv_file = CsvTable(file_path=current_csv_path,project_id = new_project.project_id)
    db.session.add(new_csv_file)
    db.session.commit()
    
 
    return jsonify({"error": None, "fileStatus": "success", "projectId": new_project.project_id})


@excel_page.route("/api/v1/get-csv/<param>", methods=['GET'])
@error_handling_decorator
def sending_csv(param):
     
    exists_or_not = Projects.query.filter_by(project_id=param).first()
    csv_table_entry = CsvTable.query.filter_by(project_id=param).first()
    
    if (exists_or_not):
       
        actual_csv = pd.DataFrame(pd.read_csv(csv_table_entry.file_path))

        df = actual_csv.to_dict(orient='records')

        return jsonify({"error": None, "tableContent": df, "columns": [column for column in actual_csv.columns]})

    else:

        return jsonify({"error": "Invalid projectID"})


