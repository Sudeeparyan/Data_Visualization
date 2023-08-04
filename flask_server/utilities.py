"""Reuseable functions for this project"""
# python modules
from functools import wraps

#flask modules
from flask import jsonify

def handle_errors(func):
    """ Args:
        func (function): The function to be decorated.

    Returns:
        function: The decorated function with exception handling."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as error:
            error_message = str(error)
            return jsonify({"error": error_message})

    return wrapper
