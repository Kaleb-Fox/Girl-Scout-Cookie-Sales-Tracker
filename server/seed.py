from config import app, db
from models import *
if __name__ == "__main__":
  with app.app_context():
    Inventory.query.delete()
    Flavor.query.delete()

    # kaleb = Scout(scouts="Kaleb", boxes=4 )
    # sale = Sale(flavor="Thin mints", box=2, priceperbox=5, location_id=1, scout_id=1)
    # location = Location(date="04/24/2024", time="08:00")
    # inventory = Inventory(flavor="Thin Mints", stock=5, pricePerBox=5)

    db.session.commit()