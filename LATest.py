# LinearAlg Test
import time
import pandas_datareader.data as web
import json
import numpy as np
import pandas as pd
import time
from math import floor
from math import pow
from datetime import datetime
from openpyxl import load_workbook # openpyxl is used for xlsx files, a.k.a excel files from 2010+, old excel files used xls


def coeffcients_Generator(XMatrix,YMatrix): # One's Matrix, Value of Generated_Data Matrix Returns the coeffcients for the equation
	Tran = XMatrix.transpose()
	Fp = np.matmul(Tran,XMatrix)
	Inv = np.linalg.inv(Fp)
	Sec = np.matmul(Inv,Tran)
	Final = np.matmul(Sec,YMatrix)
	return Final

def differenceBetweenDataPoints(Pulled_Data,Generated_Data,Current_Data):
	diff1=Pulled_Data[len(Pulled_Data)-1] - Pulled_Data[len(Pulled_Data)-2]
	diff2=Pulled_Data[len(Pulled_Data)-2] - Pulled_Data[len(Pulled_Data)-3]
	y=len(Generated_Data)-1;
	Difference_Array=np.array(Generated_Data[y]+diff1)
	Difference_Array=np.append(Difference_Array,Generated_Data[y]+diff2)
	for x in range(len(Pulled_Data)-3,1,-1):
		diff=Pulled_Data[x]-Pulled_Data[x-1]
		Difference_Array=np.append(Difference_Array,Generated_Data[y]+diff)
		y=y-1
		pass
	Difference_Array=np.flip(Difference_Array,0)
	return Difference_Array

def makeOutY(FinalM,xVals,startYear,yVals,currentData):#,percison)
	i=setAxis(startYear)
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
	for x in range(i-xVals,i):
		Generated_Data = np.append(Generated_Data,(float(x10*pow(x,10)+x9*pow(x,9)+x8*pow(x,8)+x7*pow(x,7)+x6*pow(x,6)+x5*pow(x,5)+x4*pow(x,4)+x3*pow(x,3)+x2*pow(x,2)+x1*pow(x,1)+xo*pow(x,0))))
		pass
	for u in range(1,14):
		Generated_Data=np.append(Generated_Data,float(x10*pow(i+u,10)+x9*pow(i+u,9)+x8*pow(i+u,8)+x7*pow(i+u,7)+x6*pow(i+u,6)+x5*pow(i+u,5)+x4*pow(i+u,4)+x3*pow(i+u,3)+x2*pow(i+u,2)+x1*pow(i+u,1)+xo*pow(i+u,0)))
		pass
	input()
	return differenceBetweenDataPoints(Generated_Data,yVals,Current_Data)

def setAxis(startYear):
	i=(int(time.strftime("%Y")) - int(startYear))*365 + currentDayCount() + int(time.strftime("%d"))+1
	return i;
def getPointY(FinalM,date,prev):
	i=setAxis(date)+3
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
	return (float(((x10*pow(i,10)+x9*pow(i,9)+x8*pow(i,8)+x7*pow(i,7)+x6*pow(i,6)+x5*pow(i,5)+x4*pow(i,4)+x3*pow(i,3)+x2*pow(i,2)+x1*pow(i,1)+xo*pow(i,0))-(x10*pow(i+1,10)+x9*pow(i+1,9)+x8*pow(i+1,8)+x7*pow(i+1,7)+x6*pow(i+1,6)+x5*pow(i+1,5)+x4*pow(i+1,4)+x3*pow(i+1,3)+x2*pow(i+1,2)+x1*pow(i+1,1)+xo*pow(i+1,0)))+prev))
def currentDayCount():
	i=int(time.strftime("%m"))
	sum=0;
	for x in range(1,12):
		day_inMonth=28 +(x+floor(x/8))%2 + 2 % x + 2*floor(1/x)
		sum+=day_inMonth
		if x==i-1:
			break
		pass
	return sum

def makeY_Matrix(xVals): #Number of elements, X values in array form, percison what power of X do we want to go to. Returns One's Matrix
	Y_matrix=np.array(xVals[0])
	for x in range(1,len(xVals)):
		Y_matrix=np.append(Y_matrix,[x])
		pass
	return np.reshape(Y_matrix,(len(xVals),1))

def makeXVals_Matrix(percision,startYear,DataSet): #Number of elements,percison what power of X do we want to go to. Returns One's Matrix
	i=setAxis(startYear)
	matrixx=np.array(i-DataSet)
	matrixx=np.append(matrixx,0)
	for q in range(2,percision+1):
			matrixx=np.append(matrixx,pow(0,q))
			pass
	for x in range(i-DataSet+1,i):
		matrixx=np.append(matrixx,[1])
		for y in range(1,percision+1):
			matrixx=np.append(matrixx,pow(x,y))
			pass
		pass
	return(np.reshape(matrixx,(DataSet,percision+1)))
