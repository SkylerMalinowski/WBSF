# LinearAlg Test

# /******************************************************************/
# Made By Vince
# Tested By Vince
# Debugged By Vince
# Ingegrated By Greg/Skyler
# /******************************************************************/
import time # Time
import pandas_datareader.data as web #Database reader
import numpy as np #Numpy
import pandas as pd #Pandas Data Reader
import ArrayNCalc
from math import floor #math floor
from math import pow #math pow
from datetime import datetime #Date time

# Made By Vince
# Tested By Vince
# Debugged By Vince
# Ingegrated By Greg/Skyler
# coeffcients_Generator(XMatrix,YMatrix)
#	Input: Matrix(XMatrix),Matrix(YMatrix)
#	Output: Matrix(Final)
#	Explanation:
#	This take two matricies and applies the LSA alogrithim to generate a 10 by 1 matrix of coeffcients for functions
def coeffcients_Generator(XMatrix,YMatrix): # One's Matrix, Value of Generated_Data Matrix Returns the coeffcients for the equation
	Tran = XMatrix.transpose() # Transpose
	Fp = np.matmul(Tran,XMatrix) # Matrix Multiplication
	Inv = np.linalg.inv(Fp) # inverse
	Sec = np.matmul(Inv,Tran)
	Final = np.matmul(Sec,YMatrix)

	return Final
	#(Prediction DO NOT TOUCH WIHTOUT NOTIFYING ME)

# Made By Vince
# Tested By Vince
# Debugged By Vince
# Ingegrated By Greg/Skyler
# makeOutY(FinalM,xVals,startYear,yVals,currentData)
#	Input: Matrix(FinalM),String(startYear),Array(yVals),List(Current_Data)
#	Output: Array(Generated_Data)
#	Explanation:
#	This plugs in x values corresponding to the days that are taken from the pulled data as to gather the predicted data. We calcualte these x values by using setAxis to find out how many days #there are between are iniatal date and now. This then uses the coeffcients to generate an array of y value which are then
#	sent to differenceBetweenDataPoints() to get normalized data that is ready for plotting

def makeOutY(FinalM,xVals,startYear,yVals,currentData): # Make a Y array with the fucntion x
	
	Current_Data=float(currentData[0]['LastTradePrice']) # Gets current data
	y=len(yVals) # length of yVals array

	x10=float(FinalM.item(10,0)) #Coeffcient 10
	x9=float(FinalM.item(9,0)) #Coeffcient 9
	x8=float(FinalM.item(8,0)) #Coeffcient 8
	x7=float(FinalM.item(7,0)) #Coeffcient 7
	x6=float(FinalM.item(6,0)) #Coeffcient 6
	x5=float(FinalM.item(5,0)) #Coeffcient 5
	x4=float(FinalM.item(4,0)) #Coeffcient 4
	x3=float(FinalM.item(3,0)) #Coeffcient 3
	x2=float(FinalM.item(2,0)) #Coeffcient 2
	x1=float(FinalM.item(1,0)) #Coeffcient 1
	xo=float(FinalM.item(0,0)) #Coeffcient 0

	Generated_Data=np.array(yVals[y-xVals])

	for x in range(0,30):
		Generated_Data = np.append(Generated_Data,(float(x10*pow(x,10)+x9*pow(x,9)+x8*pow(x,8)+x7*pow(x,7)+x6*pow(x,6)+x5*pow(x,5)+x4*pow(x,4)+x3*pow(x,3)+x2*pow(x,2)+x1*pow(x,1)+xo*pow(x,0))))
		pass

	
	return ArrayNCalc.Normalize(ArrayNCalc.differenceBetweenDataPoints(Generated_Data),yVals)
	#(Prediction DO NOT TOUCH WIHTOUT NOTIFYING ME)

# Made By Vince
# Tested By Vince
# Debugged By Vince
# Ingegrated By Greg/Skyler
# getPointY(FinalM,date,prev,yahoorecent)
#	Input: Matrix(FinalM),String(startYear),int(PreviousDaysData),float(yahoorecent)
#	Output: float(predicted point)
#	Explanation:
#	This is a smaller version of makeOutY(). It finds one data point given the date of the predction and the previous data point value (for normalization).

def getPointY(FinalM,date,prev,yahoorecent):

	i=ArrayNCalc.getWorkDates(45)
	i=len(i)

	prev=float(prev)
	Max=.25*prev-prev # Maximum 
	Min=.25*prev+prev # Minimum 

	x10=float(FinalM.item(10,0)) #Coeffcient 10
	x9=float(FinalM.item(9,0)) #Coeffcient 9
	x8=float(FinalM.item(8,0)) #Coeffcient 8
	x7=float(FinalM.item(7,0)) #Coeffcient 7
	x6=float(FinalM.item(6,0)) #Coeffcient 6
	x5=float(FinalM.item(5,0)) #Coeffcient 5
	x4=float(FinalM.item(4,0)) #Coeffcient 4
	x3=float(FinalM.item(3,0)) #Coeffcient 3
	x2=float(FinalM.item(2,0)) #Coeffcient 2
	x1=float(FinalM.item(1,0)) #Coeffcient 1
	xo=float(FinalM.item(0,0)) #Coeffcient 0

	change=float((x10*pow(i,10)+x9*pow(i,9)+x8*pow(i,8)+x7*pow(i,7)+x6*pow(i,6)+x5*pow(i,5)+x4*pow(i,4)+x3*pow(i,3)+x2*pow(i,2)+x1*pow(i,1)+xo*pow(i,0)))
	if(yahoorecent<prev):
		change+=yahoorecent + (Max-Min) # Predicited Increase
	else:
		change=yahoorecent-change	# Predicted decrease 
	return prev+(change/(Max-Min))

	#(Prediction DO NOT TOUCH WIHTOUT NOTIFYING ME)

# Made By Vince
# Tested By Vince
# Debugged By Vince
# Ingegrated By Greg/Skyler
# makeY_Matrix(yVals)
#	Input: Array/DataFrame(yVals)
#	Output: Matrix(YMatrix) which is length of yVals x 1
#	Explanation:
#	This is needed for the LSA Method it makes an array into a length(yVals) x 1 matrix for computation purposes
def makeY_Matrix(yVals): 

	Y_matrix=np.array(yVals[0])

	for x in range(1,len(yVals)): 
		Y_matrix=np.append(Y_matrix,[x])
		pass
	return np.reshape(Y_matrix,(len(yVals),1)) # One by len(yVals) matrix

	#(Prediction DO NOT TOUCH WIHTOUT NOTIFYING ME)

# Made By Vince
# Tested By Vince
# Debugged By Vince
# Ingegrated By Greg/Skyler
# makeXVals_Matrix(percision,startYear,DataSet)
#	Input:int(percision),string(startYear),Array/DataFrame(DataSeta)
#	Output: Matrix(Xmatrix) that is length of xVals by percision+1
#	Explanation:
#	This cacluate the Xmatrix need to preform the LSA Method note that this creates a matrix as desribed in the documentation in report
def makeXVals_Matrix(percision,startYear,DataSet): #Number of elements,percison what power of X do we want to go to. Returns One's Matrix

	i=len(ArrayNCalc.getWorkDates(45))
	
	matrixx=np.array(i-DataSet)
	matrixx=np.append(matrixx,0)

	for q in range(2,percision+1):
			matrixx=np.append(matrixx,pow(0,q))
			pass

	for x in range(int(i-DataSet+1),int(i)):
		matrixx=np.append(matrixx,[1])
		for y in range(1,percision+1):
			matrixx=np.append(matrixx,pow(x,y))
			pass
		pass

	return(np.reshape(matrixx,(DataSet,percision+1))) # (Makes a matrix of (Dataset by Percsion+1))
	#(Prediction DO NOT TOUCH WIHTOUT NOTIFYING ME)
