# LinearAlg Test
import time # Time
import pandas_datareader.data as web #Database reader
import numpy as np #Numpy
import pandas as pd #Pandas Data Reader
import ArrayNCalc
from math import floor #math floor
from math import pow #math pow
from datetime import datetime #Date time

#Function by Vince
def coeffcients_Generator(XMatrix,YMatrix): # One's Matrix, Value of Generated_Data Matrix Returns the coeffcients for the equation
	Tran = XMatrix.transpose()

	Fp = np.matmul(Tran,XMatrix)

	Inv = np.linalg.inv(Fp)

	Sec = np.matmul(Inv,Tran)

	Final = np.matmul(Sec,YMatrix)

	return Final
	#(Prediction DO NOT TOUCH WIHTOUT NOTIFYING ME)

#Function by Vince
def makeOutY(FinalM,xVals,startYear,yVals,currentData): #Make a Y array with the fucntion x
	i=ArrayNCalc.setAxis(startYear)

	Current_Data=float(currentData[0]['LastTradePrice'])
	y=len(yVals)
	x10=float(FinalM.item(10,0))
	x9=float(FinalM.item(9,0))
	x8=float(FinalM.item(8,0))
	x7=float(FinalM.item(7,0))
	x6=float(FinalM.item(6,0))
	x5=float(FinalM.item(5,0))
	x4=float(FinalM.item(4,0))
	x3=float(FinalM.item(3,0))
	x2=float(FinalM.item(2,0))
	x1=float(FinalM.item(1,0))
	xo=float(FinalM.item(0,0))

	Generated_Data=np.array(yVals[y-xVals])

	for x in range(0,30):
		Generated_Data = np.append(Generated_Data,(float(x10*pow(x,10)+x9*pow(x,9)+x8*pow(x,8)+x7*pow(x,7)+x6*pow(x,6)+x5*pow(x,5)+x4*pow(x,4)+x3*pow(x,3)+x2*pow(x,2)+x1*pow(x,1)+xo*pow(x,0))))
		pass

	
	return ArrayNCalc.Normalize(ArrayNCalc.differenceBetweenDataPoints(Generated_Data),yVals)
	#(Prediction DO NOT TOUCH WIHTOUT NOTIFYING ME)
#Function by Vince
def getPointY(FinalM,date,prev):

	i=ArrayNCalc.getWorkDates(45)
	i=len(i)

	x10=float(FinalM.item(10,0))
	x9=float(FinalM.item(9,0))
	x8=float(FinalM.item(8,0))
	x7=float(FinalM.item(7,0))
	x6=float(FinalM.item(6,0))
	x5=float(FinalM.item(5,0))
	x4=float(FinalM.item(4,0))
	x3=float(FinalM.item(3,0))
	x2=float(FinalM.item(2,0))
	x1=float(FinalM.item(1,0))
	xo=float(FinalM.item(0,0))

	change=float(((x10*pow(i+1,10)+x9*pow(i+1,9)+x8*pow(i+1,8)+x7*pow(i+1,7)+x6*pow(i+1,6)+x5*pow(i+1,5)+x4*pow(i+1,4)+x3*pow(i+1,3)+x2*pow(i+1,2)+x1*pow(i+1,1)+xo*pow(i+1,0))-(x10*pow(i+0,10)+x9*pow(i+0,9)+x8*pow(i+0,8)+x7*pow(i+0,7)+x6*pow(i+0,6)+x5*pow(i+0,5)+x4*pow(i+0,4)+x3*pow(i+0,3)+x2*pow(i+0,2)+x1*pow(i+0,1)+xo*pow(i+0,0))))
	if(change>1):
		change-=1
		pass
	return change+float(prev)

	#(Prediction DO NOT TOUCH WIHTOUT NOTIFYING ME)

#Function by Vince
def makeY_Matrix(yVals): 

	Y_matrix=np.array(yVals[0])

	for x in range(1,len(yVals)):

		Y_matrix=np.append(Y_matrix,[x])

		pass

	return np.reshape(Y_matrix,(len(yVals),1))

	#(Prediction DO NOT TOUCH WIHTOUT NOTIFYING ME)
#Function by Vince
def makeXVals_Matrix(percision,startYear,DataSet): #Number of elements,percison what power of X do we want to go to. Returns One's Matrix

	i=ArrayNCalc.getWorkDates(45)
	i=len(i)
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

	return(np.reshape(matrixx,(DataSet,percision+1)))

	#(Prediction DO NOT TOUCH WIHTOUT NOTIFYING ME)
