from flask import Flask, request, render_template
from flask_restful import Api, Resource
from flask_jsonpify import jsonify
from flask_cors import CORS
import submodules.converter as c
import submodules.get_pred as g
import uuid

app = Flask(__name__)
api = Api(app)
CORS(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

class Conversion(Resource):
    def post(self):
        """
        Function that handles request for prediction results.
        Args:
            None
        Data:
            img_src: image source url provided in json format
        """
        #retrieve image source url
        data = request.get_json()
        #convert image to base64
        img_64 = c.convert_to_64(data["img_src"])
        #send base64 to API server for predicing breed
        job_id = str(uuid.uuid1())
        threading.Thread(target=g.send_img, args=(img_64, job_id)).start()
        print(job_id)
        #return predicted breed
        return {"success": "True", "job_id": job_id}

class haha(Resource):
    def get(self):
        """
        Test function.
        Args:
            None
        """
        return {"hehe":"hoho"}

api.add_resource(Conversion, '/api/v1/convert/')
api.add_resource(haha, '/laugh/')

if __name__ == '__main__':
    app.run(host="0.0.0.0")
