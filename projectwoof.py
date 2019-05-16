from flask import Flask, request, render_template
from flask_restful import Api, Resource
from flask_jsonpify import jsonify
from flask_cors import CORS
import submodules.predictor as p

app = Flask(__name__)
api = Api(app)
CORS(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

class Prediction(Resource):
    def post(self):
        """
        Handles post request for prediction results.
        Args:
            songname: name of the song to predict
        """
        #determine model chosen by user
        data = request.get_json()
        print(data)
        breed = p.predict_breed(data["img_src"])
        #predict popularity based on song name and model
        #popularity = predict_popularity(songname, model)
        #if popularity == "Unable to find specified song.":
        #	return {"success:": "False", "popularity": "NAN"}
        #else:
        #	return {"success": "True", "popularity": popularity}
        return {"breed": "Hihi"}

class haha(Resource):
    def get(self):
        """
        Test function.
        Args:
            None
        """
        return {"hehe":"hoho"}

api.add_resource(Prediction, '/api/v1/predict/')
api.add_resource(haha, '/laugh/')

if __name__ == '__main__':
    app.run(host="0.0.0.0")
