from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from config import db

class Scout(db.Model, SerializerMixin):
    __tablename__ = 'scouts'
    id = db.Column(db.Integer, primary_key=True)
    scouts = db.Column(db.String)
    boxes = db.Column(db.Integer)

    scout_sale = db.relationship("Sale", back_populates="sale_for_scout")

    serialize_rules = ('-scout_sale.sale_for_scout',)

class Location(db.Model, SerializerMixin):
    __tablename__ = 'locations'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String)
    time = db.Column(db.String)

    location_sale = db.relationship("Sale", back_populates="sale_for_location")

    serialize_rules = ('-location_sale.sale_for_location',)
    
class Sale(db.Model, SerializerMixin):
    __tablename__ = 'sales'
    id = db.Column(db.Integer, primary_key=True)
    flavor = db.Column(db.String)
    box = db.Column(db.String)
    priceperbox = db.Column(db.Integer)
    location_id = db.Column(db.String, db.ForeignKey('locations.id'))
    scout_id = db.Column(db.String, db.ForeignKey('scouts.id'))
    

    sale_for_location = db.relationship("Location", back_populates="location_sale")
    sale_for_scout = db.relationship("Scout", back_populates="scout_sale")
    serialize_rules = ('-sale_for_location.location_sales', "-sale_for_scout.scout_sale")

    @validates('box')
    def validate_box(self, key, box):
        if box >= 1:
            return box
        else:
            raise ValueError

class Inventory(db.Model, SerializerMixin):
    __tablename__ = 'inventorys'
    id = db.Column(db.Integer, primary_key=True)
    flavor = db.Column(db.String)
    stock = db.Column(db.Integer)
    pricePerBox = db.Column(db.Integer)


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.String, nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False, default=False)

class Flavor(db.Model, SerializerMixin):
    __tablename__ = 'flavors'
    id = db.Column(db.Integer, primary_key=True)
    flavor = db.Column(db.String)

