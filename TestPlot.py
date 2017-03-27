from yahoo_finance import Share
import plotly.plotly as py
import plotly.figure_factory as go
import plotly.graph_objs as obj
from datetime import datetime
import time
import pandas_datareader.data as web

from openpyxl import load_workbook				# openpyxl is used for xlsx files, a.k.a excel files from 2010+, old excel files used xls
wb = load_workbook('companylist.xlsx')			# TickersList.xlsx = 
sheet_ranges = wb['Worksheet']					# you need the name of the sheet which is in the bottom of the excel file once you open it


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
	
def get_companysymbol(var):
	end_range = 3197														# the total number of companies in the list are 3195
	true = 0
	for num in range(1,3197):			
		company_name = sheet_ranges['B'+str(num)].value					
		if var.lower() in company_name.lower(): 									# convert user input and the cell entry to upper to avoid hassles when checking
			true = 1														# if you found the company, then it exists, hence true = 1
			break															# break the loop if you find the company you're looking for
	if true==0:
		print("Could not find the company symbol")							# if you can't find the stock, tell them
		return "null"
	else:
		return sheet_ranges['A'+str(num)].value

def main():				
	company_name=input("Enter the name of the company you're searching for")													# get the name of the company from the user	
	var = get_companysymbol(company_name)								#	var = input('Enter A Stock Symbol ')
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