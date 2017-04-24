import plotly.plotly as py #Plotly Api
import plotly.figure_factory as go
import ArrayNCalc
import plotly.graph_objs as obj
import time #To get time and date
import pandas_datareader.data as web #Database Reader
import json # JavaScript Object Notation
import LinearAlgebra # Linear Algebra File
import os  #Os Path to get file to search from
import os.path
import numpy as np #Numpy for Matrix Handling
import Fetching #Fetching File
import Graphing #Graphing File
import RSI
from yahoo_finance import Share #Yahoo Finance Api
from openpyxl import load_workbook # openpyxl is used for xlsx files, a.k.a excel files from 2010+, old excel files used xls
from datetime import datetime # Date
from datetime import timedelta # Adding to date
from googlefinance import getQuotes # Google Finance Api
from plotly.graph_objs import * #Plotly Objects

#Function by Raj
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
	#Function by Vince
def main():
	var='' #just want update to repeat not entire thing 

	while var!='null':

		company_name = raw_input("Enter the name of the company you're searching for ") #THis asks for a company name

		var = get_companysymbol(company_name)	#this searchs the company list we have and returns null if not found
		var = company_name
		
		if var != 'null':					# ONLY PRECED IF WE HAVE A COMPANY

			timeBegin=int(input('Enter Start year ')) - 2 #Gets the start date and pushes it back 2 years to show enough data to fit the screen nicely 
			
			totalDataCurrent=Fetching.fetchDataToday(var,timeBegin) # This gets all the data from the start year to 3 days ago (give or take a work day)

			googData=Fetching.fetchGoogData(var) # Fetch Todays data from google finance
			
			Prediction_Data=Fetching.fetchDataSpec(var,(datetime.now()+timedelta(days=-45))) # Get the data from just the past month for the prediciton part
			
			Prediction_Data_Length=len(Prediction_Data.High) # Lenght of the predictin Data to save the recalc of it

			
			Coeffcients=LinearAlgebra.coeffcients_Generator(LinearAlgebra.makeXVals_Matrix(10,timeBegin,Prediction_Data_Length),LinearAlgebra.makeY_Matrix(Prediction_Data.High)) #coeffcients for prediction fucntion a0-a10
			
			Prediction_Model=LinearAlgebra.makeOutY(Coeffcients,Prediction_Data_Length,timeBegin,totalDataCurrent.High,googData) # Gets Prediciton Model or scatter of predicted points these points are also normalized
			
			pointY=LinearAlgebra.getPointY(Coeffcients,timeBegin,googData[0]['LastTradePrice'],totalDataCurrent.High[len(totalDataCurrent)-1]) #gets Predictiion Point for the next day independently so I can calculate individual days
			R=RSI.PredictRSI(totalDataCurrent.Close)
			Graphing.totalTogether(var,totalDataCurrent,googData,Prediction_Model,pointY, R) #Print Final Graph with everything together

	pass


#C:\\cygwin\bin\Main.py
