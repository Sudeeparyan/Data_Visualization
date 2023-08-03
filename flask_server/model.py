from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Users(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_name = db.Column(db.String(50))
    email = db.Column(db.String(50))
    password = db.Column(db.String(50))
    child_project = db.relationship('Projects', back_populates='parent_users', lazy=True)

class Projects(db.Model):
    __tablename__ = 'projects'
    project_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_name = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    parent_users = db.relationship('Users', back_populates='child_project')
    child_training_models = db.relationship('TrainedModels', back_populates='parent_projects', lazy=True)
    child_csv_table = db.relationship('CsvTable', back_populates='parent_projects', lazy=True)
    child_results_table = db.relationship("ResultsTable", back_populates='parent_projects', lazy=True)
    
class TrainedModels(db.Model):
    __tablename__ = 'trained_models'
    trained_model_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    trained_model_path = db.Column(db.String(50))
    project_id = db.Column(db.Integer, db.ForeignKey('projects.project_id'))
    parent_projects = db.relationship('Projects', back_populates='child_training_models')
    training_csv_path = db.Column(db.String(50))
    child_results_table = db.relationship("ResultsTable", back_populates='parent_trained_model', lazy=True)
    
class CsvTable(db.Model):
    __tablename__ = 'csv_table'
    csv_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.project_id'))
    parent_projects = db.relationship('Projects', back_populates='child_csv_table')
    file_path = db.Column(db.String(50))
    child_results_table = db.relationship("ResultsTable", back_populates='parent_csv_table', lazy=True)


class ResultsTable(db.Model):
    __tablename__ = 'results_table'
    result_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.project_id'))
    parent_projects = db.relationship('Projects', back_populates='child_results_table')
    
    trained_model_id = db.Column(db.Integer, db.ForeignKey('trained_models.trained_model_id'))
    parent_trained_model = db.relationship('TrainedModels', back_populates='child_results_table')
    csv_id = db.Column(db.Integer, db.ForeignKey('csv_table.csv_id'))
    parent_csv_table = db.relationship('CsvTable', back_populates='child_results_table')

    x_coordinate = db.Column(db.String(50))
    y_coordinate = db.Column(db.String(50))
    x_coordinate_alias = db.Column(db.String(50))
    y_coordinate_alias = db.Column(db.String(50))
    result_json_path = db.Column(db.String(50))
   
    