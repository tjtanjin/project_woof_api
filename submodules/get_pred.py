import requests

def send_img(img_64):
	"""
	Function to call the API for predicting the breed of the dog in the image.
	Args:
		img_64: image encoded in base64
	"""
	print(type(img_64))
	res = requests.post(url="https://tjtanjin.pythonanywhere.com/api/v1/predict/", headers={'Content-Type': 'application/json', 'Accept': 'application/json'}, json={"img_64":img_64})
	try:
		breed = res.json()["breed"]
		print(res.json()["breed"])
		return breed
	except:
		return None
