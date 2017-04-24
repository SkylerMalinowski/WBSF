# Api Backend
import plotly.plotly as py #Plotly Api
import plotly.figure_factory as go
import ArrayNCalc
import Main
import RSI
import plotly.graph_objs as obj
import time #To get time and date
import pandas_datareader.data as web #Database Reader
import json # JavaScript Object Notation
import LinearAlgebra # Linear Algebra File
import numpy as np #Numpy for Matrix Handling
import Fetching #Fetching File
import Graphing #Graphing File
from flask import Flask, render_template, request, jsonify, make_response, send_file
import feedparser
from yahoo_finance import Share #Yahoo Finance Api
from datetime import datetime # Date
from datetime import timedelta # Adding to date
from plotly.graph_objs import * #Plotly Objects

app = Flask(__name__)

# main function, initialize web app with IP and port
if __name__ == '__main__':
	app.run(host = "127.0.0.1", port = 4000, debug = False)

# stock ticker and news stuff
def getCurrentPrice(Sym):
	ticker = Share(Sym)
	return ticker.get_price()

def getPercentChange(Sym):
	ticker = Share(Sym)
	return ticker.get_percent_change()

def getNewsTitle(feed):
	return feed['feed']['title']

def getNews(feed, n):
	return feed['entries'][n]['title']

@app.route('/ticker/')
def ticker():
	tick = request.args.get('s')
	feed = feedparser.parse('http://finance.yahoo.com/rss/headline?s=%s' %tick)
	ret = "The current price of " + tick + " is $" + getCurrentPrice(tick) + ". This is a " + getPercentChange(tick) + " change."
	return ret

@app.route('/news/')
def news():
	tick = request.args.get('s')
	feed = feedparser.parse('http://finance.yahoo.com/rss/headline?s=%s' %tick)
	ret = "The top headline for " + tick + " from " + getNewsTitle(feed) + " is: <br>" + getNews(feed, 0)
	return ret

# Api To Get Graph
@app.route('/graph/')
def getGraph():
	stockName = request.args.get('s')
	var=stockName
	if var != 'null':					# ONLY PRECEDE IF WE HAVE A COMPANY
			timeBegin=2010
			
			totalDataCurrent=Fetching.fetchDataToday(var,timeBegin) # This gets all the data from the start year to 3 days ago (give or take a work day)

			googData=Fetching.fetchGoogData(var) # Fetch Todays data from google finance
			
			Prediction_Data=Fetching.fetchDataSpec(var,(datetime.now()+timedelta(days=-45))) # Get the data from just the past month for the prediciton part
			
			Prediction_Data_Length=len(Prediction_Data.Close) # Lenght of the predictin Data to save the recalc of it

			Coeffcients=LinearAlgebra.coeffcients_Generator(LinearAlgebra.makeXVals_Matrix(10,timeBegin,Prediction_Data_Length),LinearAlgebra.makeY_Matrix(Prediction_Data.Low)) #coeffcients for prediction fucntion a0-a10
			
			Prediction_Model=LinearAlgebra.makeOutY(Coeffcients,Prediction_Data_Length,timeBegin,totalDataCurrent.Low,googData) # Gets Prediciton Model or scatter of predicted points these points are also normalized
			
			
			pointY=LinearAlgebra.getPointY(Coeffcients,timeBegin,googData[0]['LastTradePrice'],totalDataCurrent.High[len(totalDataCurrent)-1]) #gets Predictiion Point for the next day independently so I can calculate individual days
			
			R=RSI.PredictRSI(totalDataCurrent.Close)

			pointY=LinearAlgebra.getPointY(Coeffcients,timeBegin,googData[0]['LastTradePrice'],totalDataCurrent.Low[len(totalDataCurrent)-1]) #gets Predictiion Point for the next day independently so I can calculate individual days
			
			url=Graphing.totalTogether(var,totalDataCurrent,googData,Prediction_Model,pointY,R) #Print Final Graph with everything together
			
			url = url + ".embed?width=640&height=480"
			ret = "<iframe width='640' height='480' frameborder='0' scrolling='no' src='" + url + "'> </iframe>"
			return ret
	else:
		return "false"

@app.route('/acc/')
def getAcc():
	stockName = request.args.get('s')
	var=stockName
	if var != 'null':					# ONLY PRECED IF WE HAVE A COMPANY
		timeBegin=2010
			
		totalDataCurrent=Fetching.fetchDataToday(var,timeBegin) # This gets all the data from the start year to 3 days ago (give or take a work day)

		googData=Fetching.fetchGoogData(var) # Fetch Todays data from google finance
			
		Prediction_Data=Fetching.fetchDataSpec(var,(datetime.now()+timedelta(days=-45))) # Get the data from just the past month for the prediciton part
			
		Prediction_Data_Length=len(Prediction_Data.High) # Lenght of the predictin Data to save the recalc of it

		Coeffcients=LinearAlgebra.coeffcients_Generator(LinearAlgebra.makeXVals_Matrix(10,timeBegin,Prediction_Data_Length),LinearAlgebra.makeY_Matrix(Prediction_Data.High)) #coeffcients for prediction fucntion a0-a10
			
		Prediction_Model=LinearAlgebra.makeOutY(Coeffcients,Prediction_Data_Length,timeBegin,totalDataCurrent.High,googData) # Gets Prediciton Model or scatter of predicted points these points are also normalized
			
		ret = str(ArrayNCalc.CalculateConfidenceRating(Prediction_Model,totalDataCurrent.High))
		return "The total price accuracy is: " + ret
	else:
		return ""

@app.route('/relAcc/')
def getRelativeAcc():
	stockName = request.args.get('s')
	var=stockName
	if var != 'null':					# ONLY PRECED IF WE HAVE A COMPANY
		timeBegin=2010
			
		totalDataCurrent=Fetching.fetchDataToday(var,timeBegin) # This gets all the data from the start year to 3 days ago (give or take a work day)

		googData=Fetching.fetchGoogData(var) # Fetch Todays data from google finance
			
		Prediction_Data=Fetching.fetchDataSpec(var,(datetime.now()+timedelta(days=-45))) # Get the data from just the past month for the prediciton part
			
		Prediction_Data_Length=len(Prediction_Data.High) # Lenght of the predictin Data to save the recalc of it

		Coeffcients=LinearAlgebra.coeffcients_Generator(LinearAlgebra.makeXVals_Matrix(10,timeBegin,Prediction_Data_Length),LinearAlgebra.makeY_Matrix(Prediction_Data.High)) #coeffcients for prediction fucntion a0-a10
			
		Prediction_Model=LinearAlgebra.makeOutY(Coeffcients,Prediction_Data_Length,timeBegin,totalDataCurrent.High,googData) # Gets Prediciton Model or scatter of predicted points these points are also normalized
			
		ret = str(ArrayNCalc.CalculateRelativeACC(Prediction_Model,Prediction_Data.High))
		return "The relative accuracy is: " + ret
	else:
		return ""
