import SPxml
import os
from bs4 import BeautifulSoup
import lxml
from flask import Flask,request
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
from biosppy import storage
from biosppy.signals import ecg
app = Flask(__name__)
api = Api(app)
CORS(app)

@app.route("/")
def getEcg():
	os.chdir("/home/lu/ricky/angular-canvasjs-chart-samples/src/assets")
	ecg1 = SPxml.getLeads("21110623,2018-7-13_1-3-36.xml")
	data ={"lead_data": {}}
	for i,j in enumerate(ecg1):
	    data["lead_data"][str(i+1)] = j["data"]
	LEAD_SAMPLING_RATE = 500
	for i in range(len(data["lead_data"])):
		corrected_signal, _, _ = ecg.st.filter_signal(data["lead_data"][str(i+1)][0:5000], 'butter', 'highpass', 2, 1, LEAD_SAMPLING_RATE)
		preprocessed_signal, _, _ = ecg.st.filter_signal(corrected_signal, 'butter', 'lowpass', 12, 35, LEAD_SAMPLING_RATE)
		data["lead_data"][str(i+1)] = preprocessed_signal.tolist()
	return data

if __name__ == '__main__':
     app.run(host='0.0.0.0',port=8080)

#os.chdir("/home/lu/ricky/ecg/ecgform/src/assets")
#ecg = SPxml.getLeads("21110623,2018-7-13_1-3-36.xml")