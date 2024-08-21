from config import app, api
from models import *
from flask_restful import Api, Resource
from flask import request, Flask

class ScoutsResource(Resource):
  def get(self):
    theScouts = [s.to_dict() for s in Scout.query.all()]
    return theScouts, 200
  def post(self):
    data = request.get_json()
    new_scout = data.get("scout")
    find_if_scout = Scout.query.filter(Scout.scouts  == new_scout).first()
    if not find_if_scout:
      create_scout = Scout(scouts=new_scout)
      db.session.add(create_scout)
      db.session.commit()
      return create_scout.to_dict(), 200
    else:
      return {}, 400
    
class ScoutsIDResource(Resource):
  def delete(self,id):
    scout = Scout.query.get(id)
    db.session.delete(scout)
    db.session.commit()
    return {}, 200
class SalesResource(Resource):
  def get(self):
    sales = [s.to_dict() for s in Sale.query.all()]
    return sales, 200
  def post(self):
    data = request.get_json()
    scout_id = data.get("scout_id")
    location_id = data.get("location_id")
    box = data.get("box")
    priceperbox = data.get("priceperbox")
    find_scout = Scout.query.filter(Scout.id == scout_id).first()
    find_location = Location.query.filter(Location.id == location_id).first()
    if find_scout and find_location:
      create_sale = Sale(scout_id=scout_id, location_id=location_id, box=box, priceperbox=priceperbox)
      db.session.add(create_sale)
      db.session.commit()
      return create_sale.to_dict(), 200
    else:
      return {}, 400
class SalesIDResource(Resource):
  def delete(self,id):
    sale = Sale.query.get(id)
    db.session.delete(sale)
    db.session.commit()
    return {}, 200
  def patch(self, id):
    data = request.get_json()
    find_sale = Sale.query.get(id)
    sale_fields = {key: value for key, value in data.items() if not isinstance(value, dict)}
    for key, value in sale_fields.items():
      setattr(find_sale, key, value)
    db.session.add(find_sale)
    db.session.commit()
    
    return find_sale.to_dict(), 200

class LocationsResource(Resource):
  def get(self):
    locations = [l.to_dict() for l in Location.query.all()]
    return locations, 200



class FlavorsResource(Resource):
  def get(self):
    flavors = [f.to_dict() for f in Flavor.query.all()]
    return flavors, 200
  def post(self):
    data = request.get_json()
    new_flavor = data.get("create_flavor")
    find_if_flavor = Flavor.query.filter(Flavor.flavor  == new_flavor).first()
    
    if find_if_flavor:
      return {}, 409
    
    if not find_if_flavor:
      flavor = Flavor(flavor=new_flavor)
      db.session.add(flavor)
      db.session.commit()
      return {}, 200
    
class FlavorsIDResource(Resource):
  def delete(self,id):
    flavor = Flavor.query.get(id)
    db.session.delete(flavor)
    db.session.commit()
    return {}, 200
  def patch(self, id):
    find_flavor = Flavor.query.get(id)
    data = request.get_json()
    for name, value in data.items():
      setattr(find_flavor, name, value)
    db.session.add(find_flavor)
    db.session.commit()
    return find_flavor.to_dict(), 200

class UserResource(Resource):
  def post(self):
    data = request.get_json()
    email = data.get("email")
    gmailId = data.get("id")
    picture = data.get("picture")
    breakpoint()
    find_if_email = User.query.filter(User.email  == email).first()
    if not find_if_email:
      create_user = User(email=email, gmailId=gmailId, picture=picture)
      db.session.add(create_user)
      db.session.commit()
      return create_user.to_dict(), 200
    else:
      return {}, 400
    
api.add_resource(FlavorsResource, "/flavors")
api.add_resource(LocationsResource, "/locations")
api.add_resource(SalesResource, "/sales")
api.add_resource(ScoutsResource, "/scouts")
api.add_resource(UserResource, "/user/signup")
api.add_resource(FlavorsIDResource, "/flavors/<int:id>")
api.add_resource(ScoutsIDResource, "/scouts/<int:id>")
api.add_resource(SalesIDResource, "/sales/<int:id>")


if __name__ == "__main__":
  app.run(port=5555, debug=True)




