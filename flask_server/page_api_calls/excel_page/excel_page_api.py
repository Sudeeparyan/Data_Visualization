"""This file creates api call for excelpage"""

from flask import Blueprint, request, jsonify
import dask.dataframe as dd
import pandas as pd
import datetime
import os
from model import Projects, InputFiles, db, Users, Projects
from utilities import error_handling_decorator

excel_page = Blueprint("excel_page_api", __name__)


@excel_page.route("/api/v1/upload-csv", methods=["POST"])
@error_handling_decorator
def upload_csv():
    
    """ 
    This function creates an API call
       for uploading csv to the storage

    Returns:
       It returns a JSON response for status of file uploaded
    """

    last_user = Users.query.order_by(Users.user_id.desc()).first()

    # Create a new project associated with the newly created user
    new_project = Projects(project_name="device-vision", user_id=last_user.user_id)
    db.session.add(new_project)
    db.session.commit()

    csv_file = request.files["file"]
    file_name = (
        str(new_project.project_id)+'_'
        + str(datetime.datetime.now().strftime("%Y%m%d_%H%M%S"))
        + ".csv"
    )
    current_csv_path = os.path.join(
        os.getcwd(), "storage\\media_files\\actual_csv_files", file_name
    )
    csv_file.save(current_csv_path)

    actual_csv = pd.DataFrame(pd.read_csv(current_csv_path))
    actual_csv.to_csv(current_csv_path, index=False)

    new_csv_file = InputFiles(
        file_path=current_csv_path, project_id=new_project.project_id
    )
    db.session.add(new_csv_file)
    db.session.commit()

    return jsonify(
        {"error": None, "fileStatus": "success", "projectId": new_project.project_id}
    )


@excel_page.route("/api/v1/get-csv/<id>", methods=["GET"])
@error_handling_decorator
def sending_csv(id):
    """This api is for sending the csv file content 

    Args:
        id (_type_): The project id for the uploaded csv file

    Returns:
        _Json response with csv file content or error message
    """
    exists_or_not = Projects.query.filter_by(project_id=id).first()

    if exists_or_not:
        csv_table_entry = InputFiles.query.filter_by(project_id=id).first()
        actual_csv = pd.DataFrame(pd.read_csv(csv_table_entry.file_path))
        df = actual_csv.to_dict(orient="records")
        return jsonify(
            {
                "error": None,
                "tableContent": df,
                "columns": [column for column in actual_csv.columns],
            }
        )

    else:
        return jsonify({"error": "Invalid projectID"})
