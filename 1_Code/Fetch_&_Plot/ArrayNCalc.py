# Array Manip / Calculations

# /******************************************************************/
# Made By Vince, Jon
# Tested By Vince, Jon
# Debugged By Vince, Jon
# Ingegrated By Greg/Skyler
# /******************************************************************/
import time # Time
import pandas_datareader.data as web #Database reader
import numpy as np #Numpy
import pandas as pd #Pandas Data Reader
import time #Time
import holidays #Holidays
import string #String
from datetime import date
from math import floor #Math floor
from math import pow #Math pow
from datetime import datetime #Date
from datetime import timedelta #Adding to date

# /******************************************************************/
# Made By Jon
# Tested By Jon
# Debugged By Jon
# Ingegrated By Greg/Skyler
# /******************************************************************/
# CalculateConfidenceRating(predictedValues, historicalValues):
# 	Input: two lists of floats containing price data
# 	Output: a float
# 	Explanation: compares data points from the two lists and computes 
# 	the percent error between the actual and predicted values.
def CalculateConfidenceRating(predictedValues, historicalValues):
	# there will be more data points from historicalValues than predictedValues so
	# cut off part of historicalIndex, to make the two "list-indexes" the same length
	numDataPoints = len(predictedValues)
	historicalIndex = len(historicalValues) - numDataPoints
	
	percentError = [numDataPoints] # declare an array of size numDataPoints

	for i in range(0, numDataPoints - 1): # initialize array with all zeros
  		percentError.append(0)
		
	# perform percent error formula with each array elements from predictedValues and historicalValues
	for i in range(0, numDataPoints - 1):
		percentError[i] = 100 * abs(predictedValues[i] - historicalValues[historicalIndex + i]) / historicalValues[historicalIndex + i]
	
	avgPercentError = 0
	for i in range(0, numDataPoints - 1):  # sum elements from percentError
		avgPercentError += percentError[i]
	avgPercentError /= numDataPoints # find the average

	return avgPercentError # return avg percent error

# /******************************************************************/
# Made By Vince
# Tested By Vince
# Debugged By Vince
# Ingegrated By Greg/Skyler
# /******************************************************************/
# CalculateRelativeACC(predictionValues,actualValues)	
#	Input: CalculateRelativeACC(predictionValues,actualValues)	
#	Output: float (Exe)
#	Explanation:
#	Calcualtes relative error so we can see the average error per point
def CalculateRelativeACC(predictionValues,actualValues):

	limit=len(predictionValues)

	A=differenceBetweenDataPoints(predictionValues)
	B=differenceBetweenDataPointsLimit(actualValues,limit)

	Exe=0
	
	for x in range(0,limit-2):
		Exe+=abs(A[x]-B[x+1])/((abs(A[x])+abs(B[x+1]))/2) #Error between 0% and 200%
		pass
	Exe=floor(Exe/200*100) #Scales the percent to be between 1 and 100
	return (Exe)

# /******************************************************************/
# Made By Vince
# Tested By Vince
# Debugged By Vince
# Ingegrated By Greg/Skyler
# /******************************************************************/
# differenceBetweenDataPoints(Pulled_Data,Generated_Data,Current_Data)
#	Input: DataFrame(Pulled_Data)
#	Output: Array(difference points)
#	Explanation:
#	This takes all the values in the predicted array and calculates the differences and returns that array
def differenceBetweenDataPoints(Pulled_Data): # get the differences and normalize the data

	diff1=Pulled_Data[len(Pulled_Data)-1] - Pulled_Data[len(Pulled_Data)-2]
	diff2=Pulled_Data[len(Pulled_Data)-2] - Pulled_Data[len(Pulled_Data)-3]

	Difference_Array=np.array(diff1)
	Difference_Array=np.append(Difference_Array,diff2)

	for x in range(len(Pulled_Data)-3,0,-1):
		diff=Pulled_Data[x]-Pulled_Data[x-1]
		Difference_Array=np.append(Difference_Array,diff)
		pass

	Difference_Array=np.flip(Difference_Array,0)

	return Difference_Array

# /******************************************************************/
# Made By Vince
# Tested By Vince
# Debugged By Vince
# Ingegrated By Greg/Skyler
# /******************************************************************/
# differenceBetweenDataPointsLimit(Pulled_Data, limit)
#	Input: DataFrame(Pulled_Data),int(limit)
#	Output: Array(difference points)
#	Explanation:
#	This takes all the values in the predicted array and calculates the differences and returns that array this time it only allow it to calcuate the diffrence up to a certain value(this takes it #   from the back i.e. if limit was 20 the last 20 numbers will be put into this function)

def differenceBetweenDataPointsLimit(Pulled_Data,limit): # get the differences and normalize the data
	
	length=len(Pulled_Data)-1

	diff1=Pulled_Data[length] - Pulled_Data[length-2]
	diff2=Pulled_Data[length-2] - Pulled_Data[length-3]
	Difference_Array=np.array(diff1)
	Difference_Array=np.append(Difference_Array,diff2)

	for x in range(length-3,length-limit,-1):
		diff=Pulled_Data[x]-Pulled_Data[x-1]
		Difference_Array=np.append(Difference_Array,diff)
		pass

	Difference_Array=np.flip(Difference_Array,0)

	return Difference_Array

# /******************************************************************/
# Made By Vince
# Tested By Vince
# Debugged By Vince
# Ingegrated By Greg/Skyler
# /******************************************************************/
# Normalize(differData,baseData)
#	Input: Array(differData),Array/DataFrame(baseData)
#	Output: Array(Normalized)
#	Explanation:
#	This normalizes all the data by adding difference data to the base data provided 
def Normalize(differData,baseData):

	y=len(baseData)-1;
	l=len(differData)-1;

	differData[l]=baseData[y]+differData[l]

	y-=1
	for x in range(l,0,-1):
		Min=baseData[y]-.25*baseData[y] # Makes the Min of each Value
		Max=.25*baseData[y]+baseData[y] # Makes the Max of each Value
		differData[x]=baseData[y]+(differData[x]/(Max-Min)) #Normalized Data point
		y-=1
		pass
		
	differData[0]=differData[1] # First Spot Error Fix
	differData[len(differData)-1]=differData[len(differData)-2] # Last Spot Error Fix
	return differData

# /******************************************************************/
# Made By Vince
# Tested By Vince
# Debugged By Vince
# Ingegrated By Greg/Skyler
# /******************************************************************/
# setAxis(startYear)
#	Input: String(startYear)
#	Output: int(DaysSoFar)
#	Explanation:
#	Calualtes and returns how many days there are between the begging of startYear to now

def setAxis(startYear): #find the number of days between two dates

	i=(int(time.strftime("%Y")) - int(startYear))*365 + currentDayCount() + int(time.strftime("%d"))+1

	return i;

	#(Gets the amount of days between 2 points)
	
# /******************************************************************/
# Made By Vince
# Tested By Vince
# Debugged By Vince
# Ingegrated By Greg/Skyler
# /******************************************************************/
# currentDayCount()
#	Input: Void
#	Output: Int
#	Explanation:
#	Finds how many days are in all the months leading up to the current one
def currentDayCount(): #Find the month days

	i=int(time.strftime("%m"))
	sum=0;

	for x in range(1,12):
		day_inMonth=28 +(x+floor(x/8))%2 + 2 % x + 2*floor(1/x) #Days in each passed month
		sum+=day_inMonth
		if x==i-1:
			break
		pass

	return sum

# /******************************************************************/
# Made By Vince
# Tested By Vince
# Debugged By Vince
# Ingegrated By Greg/Skyler
# /******************************************************************/
# getWorkDates(length)
#	Input: int(length)
#	Output: Array of datetimes(a)
#	Explanation:
#	Finds how many workdays are in the days are form today to a specified length
def getWorkDates(length):

	us_holidays = holidays.UnitedStates() # All the US Holidays

	a=np.array(datetime.now()) # Init Array with today's Date

	for x in range(1,length):
		a=np.append(a,datetime.now())
		pass
	x=0

	for y in range(45,0,-1):
		Date=datetime.now()+timedelta(days=-y)
		if Date.weekday()<=4 and not (Date in us_holidays) :
			a[x]=Date
			x+=1
			pass
		if(x==length):
			break
		pass

	return a
