from config import app, api
from models import *
from flask_restful import Api, Resource
from flask import request, Flask
#  create a flavor needs to make it in inventory as well or else bug with id get_by_id

class ScoutsResource(Resource):
  def get(self):
    theScouts = [s.to_dict() for s in Scout.query.all()]
    return theScouts, 200
  def post(self):
    data = request.get_json()
    breakpoint()
class SalesResource(Resource):
  def get(self):
    sales = [s.to_dict() for s in Sale.query.all()]
    return sales, 200

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
    new_flavor = data.get("flavor")
    find_if_used = Inventory.query.filter(Inventory.flavor  == new_flavor).first()
    find_if_flavor = Flavor.query.filter(Flavor.flavor  == new_flavor).first()

    create_flavor = Flavor(flavor=new_flavor)
    create_inventory = Inventory(flavor=new_flavor, pricePerBox=0, stock=0)
    
    if not find_if_used:
      create_inventory = Inventory(flavor=new_flavor, pricePerBox=0, stock=0)
      db.session.add(create_inventory)
    if not find_if_flavor:
        create_flavor = Flavor(flavor=new_flavor)
        db.session.add(create_flavor)
    db.session.commit()
    return {}, 200
class InventoryResource(Resource):
  def get(self):
    inventory = [i.to_dict() for i in Inventory.query.all()]
    return inventory, 200
  def patch(self):
    data = request.get_json()
    find_flavor = data.get("flavor")
    if not find_flavor == '':
      item = Inventory.query.filter(Inventory.flavor == find_flavor)
      item_0 = item[0]
      for key, value in data.items():
        setattr(item_0, key, value)
      db.session.add(item_0)
      db.session.commit()
      return item_0.to_dict(), 200
    else:
      return {}, 400
    

api.add_resource(FlavorsResource, "/flavors")
api.add_resource(LocationsResource, "/locations")
api.add_resource(InventoryResource, "/inventory")
api.add_resource(SalesResource, "/sales")
api.add_resource(ScoutsResource, "/scouts")
if __name__ == "__main__":
  app.run(port=5555, debug=True)
