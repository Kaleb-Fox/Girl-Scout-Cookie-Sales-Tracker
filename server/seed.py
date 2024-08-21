from config import app, db
from models import *
if __name__ == "__main__":
  with app.app_context():
    # loc = 7
    # location = Location.query.get(loc)
    # db.session.delete(location)
    # kaleb = Scout(scouts="Kaleb", boxes=4 )
    # sale = Sale(flavor="Thin mints", box=2, priceperbox=5, location_id=1, scout_id=1)
    # location = Location(summary="The Fresh Market", time="10:00 AM", date="09/10/2024", locationPicture="https://lh3.googleusercontent.com/p/AF1QipMQ9k1V48ChuM0_0wj3JmDBS-Ng6fja2WNfzgZt=s680-w680-h510", address="https://www.google.com/search?sca_esv=6432cc7325baf171&sca_upv=1&rlz=1C1CHBF_enUS842US842&tbs=lf:1,lf_ui:10&tbm=lcl&sxsrf=ADLYWIJoEknO1103eUgU5RIdR_CexZVatw:1724213313845&q=grocery+store+mooresville+nc&rflfq=1&num=10&sa=X&ved=2ahUKEwjaxtqQm4WIAxX0vokEHSejHn8QjGp6BAgnEAE&biw=1920&bih=953&dpr=1#rlfi=hd:;si:4920710993768504111,l,Chxncm9jZXJ5IHN0b3JlIG1vb3Jlc3ZpbGxlIG5jSKWI_9rlgICACFowEAAQARgAGAEYAyIcZ3JvY2VyeSBzdG9yZSBtb29yZXN2aWxsZSBuYyoGCAMQABABkgENZ3JvY2VyeV9zdG9yZZoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VSWGRXOHpaMHhSRUFFqgFYEAEqESINZ3JvY2VyeSBzdG9yZSgAMh8QASIbJNOnYPEiRjPudDvo4eCdtbEnvLBiuq42vPNwMiAQAiIcZ3JvY2VyeSBzdG9yZSBtb29yZXN2aWxsZSBuY-ABAA,y,fKucMqL5Nuk;mv:[[35.6126064,-80.7882169],[35.4344743,-80.9075627]]&lpg=cid:CgIgAQ%3D%3D,ik:CAoSLEFGMVFpcE1ROWsxVjQ4Q2h1TTBfMHdqM0ptREJTLU5nNmZqYTJXTmZ6Z1p0")
    # inventory = Inventory(flavor="Thin Mints", stock=5, pricePerBox=5)
    # db.session.add(location)
    db.session.commit()