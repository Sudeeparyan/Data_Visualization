"""Reuseable functions for this project"""
# python modules
from functools import wraps

# flask modules
from flask import jsonify


def handle_errors(error_message):
    """
    A decorator to handle errors in Flask routes by providing a custom error message.

    This decorator can be applied to Flask route functions to catch exceptions that occur during their execution. It returns a JSON response containing the specified error message and details about the caught exception.

    Args:
        error_message (str): The custom error message to be included in the response.

    Returns:
        function: The decorated route function."""

    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                result = func(*args, **kwargs)
                return result
            except Exception as err:
                return jsonify({"error": error_message, "details": str(err)})
        return wrapper
    return decorator


@handle_errors("File cannot be saved in the server")
def save_project_files(file, path):
    """saving files in their corresponding directory"""
    file.save(path)
