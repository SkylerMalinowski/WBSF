import plotly.plotly as py #Plotly Api
import plotly.figure_factory as go
import plotly.graph_objs as obj
import time #To get time and date
import pandas_datareader.data as web #Database Reader
import json # JavaScript Object Notation
import LATest # Linear Algebra File
import os  #Os Path to get file to search from
import os.path
from yahoo_finance import Share #Yahoo Finance Api
from openpyxl import load_workbook # openpyxl is used for xlsx files, a.k.a excel files from 2010+, old excel files used xls
from datetime import datetime # Date
from datetime import timedelta # Adding to date
from googlefinance import getQuotes # Google Finance Api
from plotly.graph_objs import * #Plotly Objects
import numpy as np #Numpy for Matrix Handling



def makeLineGraph(stockSymbol,Webster,currentInfo): # Makes Line graph for both historic data (webster), current Stock Info (currentInfo)
	figure=obj.Scatter(y=Webster.High,x=Webster.index) # Line 
	currentFigure=obj.Trace(y=currentInfo[0]['LastTradePrice'],x=currentInfo[0]['LastTradeDateTime'],line=dict(color=('rgb(0,0,0)'))) # Current Point Data
	data=[figure,currentFigure]
	py.plot(data, filename=stockSymbol+'_Line')

def makeCandleStickGraph(stockSymbol,Webster): # Makes a Candle Stick Graph
	fig=go.create_candlestick(Webster.Open,Webster.High,Webster.Low,Webster.Close,dates=Webster.index) # Past Data
	py.plot(fig,filename=stockSymbol+'_Candle',validate=False)

def fetchData(stockSymbol,startYear,endYear): # Fecthes the data between any two year points
	info=web.DataReader(stockSymbol,'yahoo',datetime(int(startYear),1,1),datetime(int(endYear),1,1)) 
	return info

def fetchDataToday(stockSymbol,startYear): # Fethes  past data to today
	info=web.DataReader(stockSymbol,'yahoo',datetime(startYear,1,1),time.strftime("%d-%m-%Y"))
	return info

def fetchDataSpec(stockSymbol,month):
	info=web.DataReader(stockSymbol,'yahoo',datetime(int(time.strftime("%Y")),int(month),1),time.strftime("%d-%m-%Y"))
	return info

def fetchGoogData(stockSymbol): #Fetches current google data
	currentInfo=getQuotes(stockSymbol)
	return currentInfo

def totalTogether(stockSymbol,Webster,currentInfo,Predict,Pointy,sy): #plots all the graphs together
	#fig=go.create_candlestick(Webster.Open,Webster.High,Webster.Low,Webster.Close,dates=Webster.index) #Candlestick
	figure=obj.Trace(y=Webster.High,x=Webster.index,line=dict(color=('rgb(0,50,100)')),name="Past Data for "+stockSymbol) #Past Data Line
	currentFigure=obj.Trace(y=currentInfo[0]['LastTradePrice'],x=currentInfo[0]['LastTradeDateTime'],line=dict(color=('rgb(0,0,0)')),name='Current Data for '+stockSymbol) #Current Point
	Predicts=obj.Trace(y=Predict,x=getIndex(len(Predict)),line=dict(color=('rgb(255,165,0)')),name="Prediction "+stockSymbol) #Prediction Line
	point=obj.Trace(y=Pointy,x=datetime.now() + timedelta(days=1),line=dict(color=('rgb(255,165,0)')),name="Prediction "+stockSymbol) #point of prediciton
	data=Data([figure,currentFigure,Predicts,point]) #Data Array of Figures

	py.plot(data, filename=stockSymbol+'_Line') #Plot The Function

def getIndex(num): #Get an index of days between num and today (order is by date)
	num+=2 #Constant to shift
	a=np.array((datetime.now()+timedelta(days=-num)).strftime('%y-%m-%d'))
	for x in range(num-1,0,-1):
		a=np.append(a,(datetime.now()+timedelta(days=-x)).strftime('%y-%m-%d'))
		pass
	return a

def get_companysymbol(var): # Looks up the current company 
	name = var
	wb = load_workbook('companylist.xlsx')		
	sheet_ranges = wb['Worksheet']      									# you need the name of the sheet which is in the bottom of the excel file once you open it
	end_range = 3196														# the total number of companies in the list are 3195
	true = 0
	num=0
	for num in range(1,3196):			
		company_name = sheet_ranges['B'+str(num)].value					
		if name.lower() in company_name.lower(): 							# convert user input and the cell entry to upper to avoid hassles when checking
			true = 1														# if you found the company, then it exists, hence true = 1
			break															# break the loop if you find the company you're looking for
	if true==0:
		print("Could not find the company symbol")							
		return "null"
	else:
		return sheet_ranges['A'+str(num)].value	

def main():
	var='' #just want update to repeat not entire thing 
	while var!='null':
		Time=datetime.now().strftime('%M')
		company_name=input("Enter the name of the company you're searching for ") 
		var = get_companysymbol(company_name)	
		if var != 'null':								
			timeBegin=int(input('Enter Start year ')) - 2 #Gets the start date and pushes it back 2 years to show enough data to fit the screen nicely
			
			totalDataCurrent=fetchDataToday(var,timeBegin) # Total Data up until 3 days ago
			googData=fetchGoogData(var) # Fetch Todays data
			
			Prediction_Data=fetchDataSpec('AAPL',(datetime.now()+timedelta(days=-30)).strftime('%m')) # Get the data from just the past month
			
			Prediction_Data_Length=len(Prediction_Data.High) # Lenght of the predictin Data to save the recalc of it
			
			Coeffcients=LATest.coeffcients_Generator(LATest.makeXVals_Matrix(10,timeBegin,Prediction_Data_Length),LATest.makeY_Matrix(Prediction_Data.High)) #coeffcients for function
			
			Prediction_Model=LATest.makeOutY(Coeffcients,Prediction_Data_Length+3,timeBegin,totalDataCurrent.High,googData) #Gets Prediciton Model
			
			pointY=LATest.getPointY(Coeffcients,timeBegin,totalDataCurrent.High[len(totalDataCurrent.High)-1]) #gets Predictiion Point
			# Note: make sure pointY is not too far ahead into the future. predict like 5 minutes ahead.
			# 1. Store pointY and its timestamp into a new stock predictions database, pricePoints. 
			# 2. wait until it is time for pointY, then check percent difference between actual and calculated
			# 3. store percent difference into a new percentDifference stock table.
			# 4. when you have enough data points in the percentDifference dB, find the trend, or check if 
			# there is just randomness, no correlation or smooth transition of accuracy within a bound
			# 5. a new dB called stock accuracy, store stock index name with accuracy as calculated above.
			# 6. create a function to retrieve this accuracy for frontend use.
			totalTogether(var,totalDataCurrent,googData,Prediction_Model,pointY,timeBegin) #Print Final Graph
	pass
main() 
#C:\\cygwin\bin\stuff.py
