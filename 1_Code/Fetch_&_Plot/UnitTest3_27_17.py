# Unit Test for TestPlot.py as of march 25th 2017
# Preformed by Vincent Taylor
from yahoo_finance import Share
from openpyxl import load_workbook # openpyxl is used for xlsx files, a.k.a excel files from 2010+, old excel files used xls
from datetime import datetime
from googlefinance import getQuotes
import plotly.plotly as py
import plotly.figure_factory as go
import plotly.graph_objs as obj
import time
import pandas_datareader.data as web
import json
import os
import os.path


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
	info=web.DataReader(stockSymbol,'yahoo',datetime(int(startYear),1,1),time.strftime("%d-%m-%Y"))
	return info
def fetchGoogData(stockSymbol):# Fetches current google data
	currentInfo=getQuotes(stockSymbol)
	return currentInfo
def totalTogether(stockSymbol,Webster,currentInfo): #plots all the graphs together
	fig=go.create_candlestick(Webster.Open,Webster.High,Webster.Low,Webster.Close,dates=Webster.index)
	figure=obj.Trace(y=Webster.High,x=Webster.index,line=dict(color=('rgb(0,50,100)')))
	currentFigure=obj.Trace(y=currentInfo[0]['LastTradePrice'],x=currentInfo[0]['LastTradeDateTime'],line=dict(color=('rgb(0,0,0)')))
	fig['data'].extend([figure])
	fig['data'].extend([currentFigure])
	py.plot(fig, filename=stockSymbol+'_Line',validate=False)
def get_companysymbol(var): # Looks up the current company 
	name = var
	wb = load_workbook('companylist.xlsx')		
	sheet_ranges = wb['Worksheet']      									# you need the name of the sheet which is in the bottom of the excel file once you open it
	end_range = 3197														# the total number of companies in the list are 3195
	true = 0
	num=0
	for num in range(1,3196):			
		company_name = sheet_ranges['B'+str(num)].value					
		if name.lower() in company_name.lower(): 							# convert user input and the cell entry to upper to avoid hassles when checking
			true = 1														# if you found the company, then it exists, hence true = 1
			break															# break the loop if you find the company you're looking for
	if true==0:
		print("Could not find the company symbol")							
		return 'null'
	else:
		return sheet_ranges['A'+str(num)].value	
def main():
	# Name Checker
	company_name=input("Enter the name of the company you're searching for ")
	print(get_companysymbol(company_name))
	print(get_companysymbol("wrong things"))
	print(get_companysymbol('yahoo'))
	var=get_companysymbol(company_name)
	# FecthGoogData
	googData=fetchGoogData(var)
	print(googData)
	# FetchDataToday
	timeBegin=input('Enter Start year ')
	totalDataCurrent=fetchDataToday(var,timeBegin)
	print(totalDataCurrent)
	# Fetch between two dates
	timeEnd=input('Enter End year ')
	totalData=fetchData(var,timeBegin,timeEnd)
	#Testing each graphing 
	totalTogether(var,totalDataCurrent,googData)
	totalTogether(var,totalData,googData)
	makeCandleStickGraph(var,totalDataCurrent)
	makeCandleStickGraph(var,totalData)
	makeLineGraph(var,totalDataCurrent,googData)
	makeLineGraph(var,totalData,googData)

	
main() 
#C:\\cygwin\bin\UnitTest3_27_17.py
