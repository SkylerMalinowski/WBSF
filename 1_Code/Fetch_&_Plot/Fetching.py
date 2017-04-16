# Fetching
import time #To get time and date
import pandas_datareader.data as web #Database Reader
from yahoo_finance import Share #Yahoo Finance Api
from datetime import datetime # Date
from datetime import timedelta # Adding to date
from googlefinance import getQuotes # Google Finance Api

def fetchData(stockSymbol,startYear,endYear): # Fecthes the data between any two year points

	info=web.DataReader(stockSymbol,'yahoo',datetime(int(startYear),1,1),datetime(int(endYear),1,1)) 

	return info

def fetchDataToday(stockSymbol,startYear): # Fethes  past data to today

	info=web.DataReader(stockSymbol,'yahoo',datetime(startYear,1,1),time.strftime("%d-%m-%Y"))

	return info

def fetchDataSpec(stockSymbol,date):

	info=web.DataReader(stockSymbol,'yahoo',date,time.strftime("%d-%m-%Y"))

	return info

def fetchGoogData(stockSymbol): #Fetches current google data

	currentInfo=getQuotes(stockSymbol)

	return currentInfo