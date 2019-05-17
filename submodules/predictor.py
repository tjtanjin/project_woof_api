#import the necessary libraries/modules
import requests
from PIL import Image, ImageOps
import numpy as np
import pandas as pd
import sys, json
from keras.preprocessing.image import img_to_array
from keras.models import load_model

def predict_breed(image_url):

	img = image_processor(image_url)

	#load model
	model = load_model("./models/model_1.hdf5")

	class_number = model.predict_classes(img)
	breed = map_to_class(class_number)

	print(breed)

	return breed

def image_processor(image_url):
    # download image
    #response = request.urlopen(url=image_url)
    r = requests.get(image_url, stream=True)
    img = Image.open(r.raw)
    print(img)

    img = ImageOps.fit(img, (400, 400), Image.ANTIALIAS)
    # convert to numpy array
    img = img_to_array(img)
    img = img/255. 
    img = np.expand_dims(img, axis=0)
    print(img.shape)
    return img

def map_to_class(class_number):

	with open("./data/mapping.json", "r") as file:
		file = json.load(file)

	for key, value in file.items():
		if value == str(class_number.flat[0]):
			breed = key
			break

	return breed
