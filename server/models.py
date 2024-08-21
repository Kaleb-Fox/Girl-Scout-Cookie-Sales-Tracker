from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from config import db

class Scout(db.Model, SerializerMixin):
    __tablename__ = 'scouts'
    id = db.Column(db.Integer, primary_key=True)
    scouts = db.Column(db.String)

    scout_sale = db.relationship("Sale", back_populates="sale_for_scout", cascade="all, delete-orphan")

    serialize_rules = ('-scout_sale.sale_for_scout',)

class Location(db.Model, SerializerMixin):
    __tablename__ = 'locations'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String)
    time = db.Column(db.String)
    locationPicture = db.Column(db.String)
    address = db.Column(db.String)
    summary = db.Column(db.String)

    location_sale = db.relationship("Sale", back_populates="sale_for_location", cascade="all, delete-orphan")

    serialize_rules = ('-location_sale.sale_for_location',)
    
class Sale(db.Model, SerializerMixin):
    __tablename__ = 'sales'
    id = db.Column(db.Integer, primary_key=True)
    box = db.Column(db.String)
    priceperbox = db.Column(db.Integer)
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'))
    scout_id = db.Column(db.Integer, db.ForeignKey('scouts.id'))
    

    sale_for_location = db.relationship("Location", back_populates="location_sale")
    sale_for_scout = db.relationship("Scout", back_populates="scout_sale")
    serialize_rules = ('-sale_for_location.location_sales', "-sale_for_scout.scout_sale")


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String)
    gmailId = db.Column(db.String)
    picture = db.Column(db.String)
    
    validates('email')
    def validate_email(self, key, email):
        assert '@' in email
        return email
class Flavor(db.Model, SerializerMixin):
    __tablename__ = 'flavors'
    id = db.Column(db.Integer, primary_key=True)
    flavor = db.Column(db.String)

