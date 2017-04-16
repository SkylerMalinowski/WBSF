# Array Manip / Calculations
import time # Time
import pandas_datareader.data as web #Database reader
import numpy as np #Numpy
import pandas as pd #Pandas Data Reader
import time #Time
from math import floor #math floor
from math import pow #math pow
from datetime import datetime #Date time


# Function by Jon
# assume that we are not storing confidence data in a dB, so we cannot calculate prediction over time
def CalculateConfidenceRating(predictedValues, historicalValues):
	# there will be less data points from predictedValues than historicalValues, so only do top 20 data points

	historicalIndex = len(historicalValues) - 20

	Difference = [20]
	percentError = [20]

	for i in range(0, 19):
		Difference.append(0) # dollar difference
		percentError.append(0)
	
	# only compare last(most recent) 20 data points for accuracy.
	for i in range(0, 19):
		Difference[i] = predictedValues[i] - historicalValues[historicalIndex + i]
		percentError[i] = 100 * abs(predictedValues[i] - historicalValues[historicalIndex + i]) / historicalValues[historicalIndex + i]
		# percentError calculated from % error formula = abs((calculated - real)/real) * 100
		
	avgPercentError = 0
	avgDifference = 0 # compute averages

	for i in range(0, 19):
		avgPercentError += percentError[i]
		avgDifference += Difference[i]

	avgPercentError /= 20
	avgDifference /= 20

	print("Avg Percent Error: %.2f Percent "% avgPercentError)
	print("Avg Dollar Difference: $ %.2f "% avgDifference)

	# return avg percent error
	return avgPercentError


def CalculatePercentError(predictionValues,actualValues):

	limit=len(predictionValues)

	A=differenceBetweenDataPoints(predictionValues)

	B=differenceBetweenDataPointsLimit(actualValues,limit)

	Exe=0
	
	for x in range(0,limit-2):
		Exe+=abs(A[x]-B[x+1])/((abs(A[x])+abs(B[x+1]))/2)
		pass
	
	return (Exe)

def CalculateRelativeACC(predictionValues,actualValues):

	limit=len(predictionValues)
	
	A=differenceBetweenDataPoints(predictionValues)
	
	B=differenceBetweenDataPointsLimit(actualValues,limit)
	
	Exe=0
	
	for x in range(0,limit-2):
		Exe+=abs((A[x]-B[x+1])/B[x+1])
		pass
	return (Exe)

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

def Normalize(differData,baseData):

	y=len(baseData)-1;

	l=len(differData)-1;

	differData[l]=baseData[y]+differData[l]

	y-=1
	for x in range(l-1,0,-1):
		differData[x]=baseData[y]+differData[x]
		y-=1
		pass
		
	differData[0]=baseData[y]
	
	return differData

	#(Prediction DO NOT TOUCH WIHTOUT NOTIFYING ME)

def setAxis(startYear): #find the number of days between two dates

	i=(int(time.strftime("%Y")) - int(startYear))*365 + currentDayCount() + int(time.strftime("%d"))+1

	return i;

	#(Gets the amount of days between 2 points)

def currentDayCount(): #Find the month days

	i=int(time.strftime("%m"))

	sum=0;

	for x in range(1,12):

		day_inMonth=28 +(x+floor(x/8))%2 + 2 % x + 2*floor(1/x)

		sum+=day_inMonth

		if x==i-1:

			break
		pass

	return sum

	#(Prediction DO NOT TOUCH WIHTOUT NOTIFYING ME)
