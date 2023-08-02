from flask_sqlalchemy import SQLAlchemy 

db =SQLAlchemy()
   
class Users(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50))
    email =  db.Column(db.String(50))
    password = db.Column(db.String(50))
    
    
class Projects(db.Model):
    __tablename__ = 'projects'
    project_id = db.Column(db.Integer, primary_key = True)
    project_name = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    parent = db.relationship('Users', backref='Projects', foreign_keys=[user_id])
    
    
class trained_models(db.Model): 
    __tablename__ = 'trained_models'
    trained_model_id = db.Column(db.Integer, primary_key= True)
    trained_model_path = db.Column(db.String(50))
    training_csv_path = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    parent = db.relationship('Users', backref='trained_models', foreign_keys=[user_id])
    
    
class csv_table(db.Model):
    __tablename__ = 'csv_table'
    csv_id = db.Column(db.Integer, primary_key= True)
    file_path = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    parent = db.relationship('Users', backref='csv_table', foreign_keys=[user_id])
    
    
class training_table(db.Model):
    __tablename__ = 'training_table'
    training_id = db.Column(db.Integer, primary_key= True)
    coordinates = db.Column(db.String(50))
    trained_model_id = db.Column(db.Integer, db.ForeignKey('trained_models.trained_model_id'))
    parent = db.relationship('trained_models', backref='training_table', foreign_keys=[trained_model_id])
    csv_id = db.Column(db.Integer, db.ForeignKey('csv_table.csv_id'))
    parent = db.relationship('csv_table', backref='training_table', foreign_keys=[csv_id])