#import the necessary libraries/modules
from PIL import Image, ImageOps
from io import BytesIO
import numpy as np
import pandas as pd
import sys, json, base64, requests

def convert_to_64(img_src):
	"""
	Function to encode image from image source to base64.
	Args:
		img_src: source of the image
	"""
    r = requests.get(img_src, stream=True)
    image = Image.open(r.raw)
    buff = BytesIO()
    image.save(buff, format="JPEG")
    img_str = base64.b64encode(buff.getvalue())
    img_str = img_str.decode('utf-8') 
    print(img_str)
    return img_str
