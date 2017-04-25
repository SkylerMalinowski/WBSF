# Graphing

# /******************************************************************/
# Made By Vince
# Tested By Vince
# Debugged By Vince
# Ingegrated By Greg/Skyler
# /******************************************************************/
import plotly.plotly as py #Plotly Api
from plotly.tools import FigureFactory as FF
import plotly.graph_objs as obj
from plotly import tools
import time #To get time and date
import pandas_datareader.data as web #Database Reader
import json # JavaScript Object Notation
from plotly.graph_objs import * #Plotly Objects
import numpy as np #Numpy for Matrix Handling
import ArrayNCalc
from datetime import datetime
from datetime import timedelta
import pytz
import sys
import os

# /******************************************************************/
# Made By Vince
# Tested By Vince
# Debugged By Vince
# Ingegrated By Greg/Skyler
#totalTogether(stockSymbol,Webster,currentInfo,Predict,Pointy,RSI)
# /******************************************************************/
	#	Input: String(stockSymbol),DataFrame(Webster),List(currentInfo),Array(Predict),integer(Pointy),Array(RSI)
	#	Output: String (URL)
	#	Explanation:
	#	This prints two line plots one that mimics makeLineGraph and another that plots the prediciton array points and pointy
	#   (our prediciton point) note it calls get index to get the xvalues for the prediciton. Also note that this combines five line charts to onto one graph

def totalTogether(stockSymbol,Webster,currentInfo,Predict,Pointy,Rsi): #plots all the graphs together
	old_stdout = sys.stdout
	sys.stdout = open(os.devnull, "w")
	# Does not work in linux!!!
	temp = Webster.index
	temp = temp.tz_localize("UTC")
	
	figure=obj.Scatter(y=Webster.High,x=temp,line=dict(color=('rgb(0,50,100)')),name="Past Data for "+stockSymbol) #Past Data Line
	currentFigure=obj.Trace(y=currentInfo[0]['LastTradePrice'],x=currentInfo[0]['LastTradeDateTime'],line=dict(color=('rgb(0,0,0)')),name='Current Data for '+stockSymbol) #Current Point
	Predicts=obj.Scatter(y=Predict,x=ArrayNCalc.getWorkDates(len(Predict)),line=dict(color=('rgb(255,165,0)')),name="Prediction "+stockSymbol) #Prediction Line
	point=obj.Trace(y=Pointy,x=datetime.now(pytz.utc) + timedelta(days=1),line=dict(color=pointColorMaker(Pointy,currentInfo)),name="Prediction "+stockSymbol) #point of prediciton
	RSI=obj.Scatter(y=Rsi,x=ArrayNCalc.getWorkDates(len(Rsi)),line=dict(color=('rgb(0,0,0)')),name="RSI for "+stockSymbol) #Prediction Line


	fig=tools.make_subplots(rows=2,cols=1) # Make a sub plot

	#data=Data([figure,currentFigure,Predicts, point]) #Data Array of Figures
	data=Data([Predicts, point,currentFigure,figure])
	fig.append_trace(data[0],1,1)
	fig.append_trace(data[1],1,1)
	fig.append_trace(data[2],1,1)
	fig.append_trace(data[3],1,1)

	fig.append_trace(RSI,2,1)


	fig['layout']['yaxis1'].update(title='Dollars ($)',domain=[0,0.7]) #Y-Axis one 
	fig['layout']['yaxis2'].update(title='RSI percentage (%)', range=[0, 100],domain=[0.8,1]) # Y-Axis of graph 2

	sys.stdout.close()
	sys.stdout = old_stdout

	return py.plot(fig, filename=stockSymbol+'_Line', auto_open=False) #Plot The Function

# /******************************************************************/
# Made By Vince
# Tested By Vince
# Debugged By Vince
# Ingegrated By Greg/Skyler
# /******************************************************************/
# pointColorMaker(point,currentInfo)
#	Input: float(point),float(currentInfo)
#	Output: String
#	Explanation:
#	Returns green if a stock is increasing compared to its predecessor or red if it is less other wise if it is the same it stays black.
def pointColorMaker(point,currentInfo):
	old_stdout = sys.stdout
	sys.stdout = open(os.devnull, "w")

	currentInfo=float(currentInfo[0]["LastTradePrice"]) # Current Info

	sys.stdout.close()
	sys.stdout = old_stdout

	if(currentInfo>point): # Green if the new price is higher than the old price red if not
		return "rgb(255,0,0)" # Green
	if(currentInfo<point): 
		return "rgb(0,255,0)" # Red

	return "rgb(0,0,0)" # If its the same stay black
	
