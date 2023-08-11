"""This file creates api call for excelpage"""

# python modules
import datetime
import os

# third party modules
import dask.dataframe as dd
from flask import Blueprint, request, jsonify

# application modules
from models import db, InputFiles, Users, Projects
from utilities import handle_errors, save_csv_files

# creating the blueprint for excel_page
project_page = Blueprint("project", __name__)


@project_page.route("/upload-csv", methods=["POST"])
@handle_errors
def upload_csv():
    """
    This function handles the API call
       for uploading csv to the storage

    Returns:
       It returns a JSON response with the status of file uploaded
    """

    current_user = Users.query.order_by(Users.user_id.desc()).first()

    # Create a new project associated with the newly created user
    new_project = Projects(project_name="device-vision",
                           user_id=current_user.user_id)
    db.session.add(new_project)
    db.session.commit()

    csv_file = request.files["file"]
    file_name = (
        str(new_project.project_id)
        + "_"
        + str(datetime.datetime.now().strftime("%Y%m%d_%H%M%S"))
        + ".csv"
    )

    os.makedirs(f"storage\\media_files\\project_csv\\{new_project.project_id}", exist_ok=True)
    current_csv_path = os.path.join(
        os.getcwd(), f"storage\\media_files\\project_csv\\{new_project.project_id}", file_name
    )

    try:
        save_csv_files(csv_file, current_csv_path)
        df_dask = dd.read_csv(current_csv_path)
        df_pandas = df_dask.compute()
        df_pandas.fillna("", inplace=True)

        df_dask = dd.from_pandas(df_pandas, npartitions=1)
        df_dask.to_csv(current_csv_path, index=False, single_file=True)

        input_file = InputFiles(
            file_path=current_csv_path, project_id=new_project.project_id
        )

        db.session.add(input_file)
        db.session.commit()

        return jsonify({"error": None, "projectId": new_project.project_id})

    except Exception as err:
       
        return jsonify({"error": "file can't be read", "exact_message": str(err)})


@project_page.route("/get-csv/<project_id>", methods=["GET"])
@handle_errors
def send_csv(project_id):
    """This api is for sending the csv file content

    Args:
        project_id (int): The project id for the uploaded csv file

    Returns:
        _Json response with csv file content or error message
    """

    project = Projects.query.filter_by(project_id=project_id).first()

    if project:
        input_file = InputFiles.query.filter_by(
            project_id=project.project_id).first()

        try:
           
            chunk_size = 1000  # Define the chunk size as per your requirement
            actual_csv = dd.read_csv(input_file.file_path, blocksize=None)  # Read the whole file

            page = int(request.args.get('page', 1))  # Get the requested page number
            start_idx = (page - 1) * chunk_size

            # Read the requested chunk using Dask
            chunk = actual_csv.compute().iloc[start_idx : start_idx + chunk_size]
            chunk.fillna("", inplace=True)
            column_list = [column for column in chunk.columns]
            chunk_records = chunk.to_dict(orient="records")
            existing_index = actual_csv.index.compute()
            
            if (page)*chunk_size not in existing_index:
                next_page = None  # No more data to send
            else:
                next_page = page + 1  # Include the next page number

            return jsonify({
                "error": None,
                "tableContent": chunk_records,
                "columns": column_list,
                "nextPage": next_page
            })

        except Exception as err:
            return jsonify({"error": "File can't be read", "exact_message": str(err)})

            
    else:
        return jsonify({"error": "Invalid projectID"})


@project_page.route("/delete-project", methods=["DELETE"])
@handle_errors
def delete_project():
    """
    This API is for deleting projects and their associated CSV files
    The project_id to be deleted should be provided in the request body as a array.

    Returns:
        _Json response with success message or error message
    """
    data = request.get_json()
    project_id = data.get("project_id")

    if not project_id:
        return jsonify({"error": "No project_id provided in the request body."})

    project = Projects.query.filter_by(project_id=project_id).first()
    if project:
        input_file = InputFiles.query.filter_by(
            project_id=project.project_id
        ).first()

        if input_file:
            input_file.status = False

        # Delete the project
        project.status = False

    db.session.commit()
    return jsonify({"error": None})

    
    