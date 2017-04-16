# Graphing
import plotly.plotly as py #Plotly Api
import plotly.figure_factory as go
import plotly.graph_objs as obj
import time #To get time and date
import pandas_datareader.data as web #Database Reader
import json # JavaScript Object Notation
from plotly.graph_objs import * #Plotly Objects
import numpy as np #Numpy for Matrix Handling
import ArrayNCalc
from datetime import datetime
from datetime import timedelta

def makeLineGraph(stockSymbol,Webster,currentInfo): # Makes Line graph for both historic data (webster), current Stock Info (currentInfo)

	figure=obj.Scatter(y=Webster.High,x=Webster.index) # Line 

	currentFigure=obj.Trace(y=currentInfo[0]['LastTradePrice'],x=currentInfo[0]['LastTradeDateTime'],line=dict(color=('rgb(0,0,0)'))) # Current Point Data

	data=[figure,currentFigure]

	py.plot(data, filename=stockSymbol+'_Line')

def makeCandleStickGraph(stockSymbol,Webster): # Makes a Candle Stick Graph

	fig=go.create_candlestick(Webster.Open,Webster.High,Webster.Low,Webster.Close,dates=Webster.index) # Past Data

	py.plot(fig,filename=stockSymbol+'_Candle',validate=False)

def totalTogether(stockSymbol,Webster,currentInfo,Predict,Pointy): #plots all the graphs together

	#fig=go.create_candlestick(Webster.Open,Webster.High,Webster.Low,Webster.Close,dates=Webster.index) #Candlestick

	figure=obj.Trace(y=Webster.High,x=Webster.index,line=dict(color=('rgb(0,50,100)')),name="Past Data for "+stockSymbol) #Past Data Line

	currentFigure=obj.Trace(y=currentInfo[0]['LastTradePrice'],x=currentInfo[0]['LastTradeDateTime'],line=dict(color=('rgb(0,0,0)')),name='Current Data for '+stockSymbol) #Current Point

	Predicts=obj.Scatter(y=Predict,x=ArrayNCalc.getWorkDates(len(Predict)),line=dict(color=('rgb(255,165,0)')),name="Prediction "+stockSymbol) #Prediction Line

	point=obj.Trace(y=Pointy,x=datetime.now() + timedelta(days=1),line=dict(color=('rgb(255,165,0)')),name="Prediction "+stockSymbol) #point of prediciton

	data=Data([figure,currentFigure,Predicts,point]) #Data Array of Figures

	py.plot(data, filename=stockSymbol+'_Line') #Plot The Function