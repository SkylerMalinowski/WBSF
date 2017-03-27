from yahoo_finance import Share
import plotly.plotly as py
import plotly.figure_factory as go
import plotly.graph_objs as obj
from datetime import datetime
import time
import pandas_datareader.data as web


def makeLineGraph(stockSymbol,Webster):
	figure=obj.Scatter(y=Webster.High,x=Webster.index)
	data=[figure]
	py.plot(data, filename=stockSymbol+'_Line')
def makeCandleStickGraph(stockSymbol,Webster):
	fig=go.create_candlestick(Webster.Open,Webster.High,Webster.Low,Webster.Close,dates=Webster.index)
	py.plot(fig,filename=stockSymbol+'_Candle',validate=False)
def fetchData(stockSymbol,startYear,endYear):
	info=web.DataReader(stockSymbol,'yahoo',datetime(int(startYear),1,1),datetime(int(endYear),1,1))
	return info
def fetchDataToday(stockSymbol,startYear):
	info=web.DataReader(stockSymbol,'yahoo',datetime(int(startYear),1,1),time.strftime("%d-%m-%Y"))
	return info
def totalTogether(stockSymbol,Webster):
	fig=go.create_candlestick(Webster.Open,Webster.High,Webster.Low,Webster.Close,dates=Webster.index)
	figure=obj.Scatter(y=Webster.High,x=Webster.index,line=dict(color=('rgb(0,0,0)')))
	fig['data'].extend([figure])
	py.plot(fig, filename=stockSymbol+'_Line',validate=False)
def main():
	var = input('Enter A Stock Symbol ')
	timeBegin=input('Enter Start year ')
	timeEnd=input('Enter the end year ')
	totalDataCurrent=fetchDataToday(var,timeBegin)
	#totalData=fetchData(var,timeBegin,timeEnd) #uncomment these 3 lines to do a range of date and not to current (1)
	makeCandleStickGraph(var,totalDataCurrent)
	makeLineGraph(var,totalDataCurrent)
	totalTogether(var,totalDataCurrent)
	#makeCandleStickGraph(var,totalData) (2)
	#makeLineGraph(var,totalData) (3)
main() 

#C:\\cygwin\bin\TestPlot.py