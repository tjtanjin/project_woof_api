#import the necessary libraries/modules
import requests
from PIL import Image, ImageOps
import numpy as np
import pandas as pd
import sys, json
from keras.preprocessing.image import img_to_array
from keras.models import load_model

def predict_breed(image_url):
	"""
	Function that makes predictions for all categories.
	Args:
		model: model to be used for prediction
		df: dataframe to be used in this prediction
		shift: number to shift by to rectify category numbers
	"""
	image = image_processor(image_url)

	#load model
	model = load_model("./models/model.hdf5")

	breed = model.predict_classes(image)

	print(breed)

	return(breed)

	#arrange data and itemid
	#data = {'id':test_df['id'].tolist(), 'breed':np.argmax(predictions, axis=1)}

def image_processor(image_url):
    # download image
    #response = request.urlopen(url=image_url)
    r = requests.get(image_url, stream=True)
    img = Image.open(r.raw)
    print(img)
    #img.thumbnail((400,400))
    img = ImageOps.fit(img, (400, 400), Image.ANTIALIAS)
    # convert to numpy array
    img = img_to_array(img)
    img = img/255. 
    img = np.expand_dims(img, axis=0)
    print(img.shape)
    return img