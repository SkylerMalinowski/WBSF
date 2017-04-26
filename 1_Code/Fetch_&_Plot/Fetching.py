# Fetching

# /******************************************************************/
# Made By Vince
# Tested By Vince
# Debugged By Vince
# Ingegrated By Greg/Skyler
# /******************************************************************/
import time #To get time and date
import pandas_datareader.data as web #Database Reader
from yahoo_finance import Share #Yahoo Finance Api
from datetime import datetime # Date
from datetime import timedelta # Adding to date
from googlefinance import getQuotes # Google Finance Api

# /******************************************************************/
# Made By Vince
# Tested By Vince
# Debugged By Vince
# Ingegrated By Greg/Skyler
# /******************************************************************/
	#fetchData(stockSymbol,startYear,endYear)
	#	Input: String(stockSymbol),string(startYear),string(endYear)
	#	Output: DataFrame(info)
	#	Explanation:
	#	This calls yahoo finance api and reterive data from 1-1-startyear to 1-1-endyear
def fetchData(stockSymbol,startYear,endYear): # Fecthes the data between any two year points

	info=web.DataReader(stockSymbol,'yahoo',datetime(int(startYear),1,1),datetime(int(endYear),1,1)) 

	return info

# /******************************************************************/
# Made By Vince
# Tested By Vince
# Debugged By Vince
# Ingegrated By Greg/Skyler
# /******************************************************************/
	#fetchDataToday(stockSymbol,startYear)
	#	Input: String(stockSymbol),string(startYear),
	#	Output: DataFrame(info)
	#	Explanation:
	#	This calls yahoo finance api and reterive data from 1-1-startyear to current Date
def fetchDataToday(stockSymbol,startYear): # Fethes  past data to today

	info=web.DataReader(stockSymbol,'yahoo',datetime(startYear,1,1),time.strftime("%d-%m-%Y"))

	return info

# /******************************************************************/
# Made By Vince
# Tested By Vince
# Debugged By Vince
# Ingegrated By Greg/Skyler
# /******************************************************************/
	#fetchDatatchDataSpec(stockSymbol,date)
	#	Input: String(stockSymbol),Datetime(month)
	#	Output: DataFrame(info) 
	#	Explanation:
	#	This calls yahoo finance api and reterive data from date to current Date
def fetchDataSpec(stockSymbol,date):

	info=web.DataReader(stockSymbol,'yahoo',date,time.strftime("%d-%m-%Y"))

	return info
	
# /******************************************************************/
# Made By Vince
# Tested By Vince
# Debugged By Vince
# Ingegrated By Greg/Skyler
# /******************************************************************/
	#fetchGoogData(stockSymbol)
	#	Input: String(stockSymbol)
	#	Output: List(currentInfo)
	#	Explanation:
	#	Calls google finance api and retrives a list of today's data
def fetchGoogData(stockSymbol): #Fetches current google data

	currentInfo=getQuotes(stockSymbol)

	return currentInfo