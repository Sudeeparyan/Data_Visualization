"""Reuseable functions for this project"""
from functools import wraps
from flask import jsonify

def error_handling_decorator(func):
    """ Args:
        func (function): The function to be decorated.

    Returns:
        function: The decorated function with exception handling."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            error_message = str(e)
            return jsonify({"error": error_message})

    return wrapper