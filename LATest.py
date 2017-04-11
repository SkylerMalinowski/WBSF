# LinearAlg Test
import time
import pandas_datareader.data as web
import json
import numpy as np
import pandas as pd
from math import floor
from math import pow
from datetime import datetime
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
def Testing(XMatrix,YMatrix): # One's Matrix, Value of Y Matrix Returns the coeffcients for the equation
	Tran = XMatrix.transpose()
	Fp = np.matmul(Tran,XMatrix)
	Inv = np.linalg.inv(Fp)
	Sec = np.matmul(Inv,Tran)
	Final = np.matmul(Sec,YMatrix)
	#print(Final)
	return Final

def difference(Ans,Y,cY):
	diff1=Ans[len(Ans)-1] - Ans[len(Ans)-2]
	diff2=Ans[len(Ans)-2] - Ans[len(Ans)-3]
	y=len(Y)-1;
	F=np.array(Y[y]+diff1)
	F=np.append(F,Y[y]+diff2)
	for x in range(len(Ans)-3,1,-1):
		diff=Ans[x]-Ans[x-1]
		F=np.append(F,Y[y]+diff)
		y=y-1
		pass
	F=np.flip(F,0)
	print(F)
	return F
def makeOutY(FinalM,xVals,startYear,yVals,currentData):#,percison)
	i=setAxis(startYear)
	cY=float(currentData[0]['LastTradePrice'])
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
	#print(xo)
	Y=np.array(yVals[y-xVals])
	for x in range(i-xVals,i):
		Y = np.append(Y,(float(x10*pow(x,10)+x9*pow(x,9)+x8*pow(x,8)+x7*pow(x,7)+x6*pow(x,6)+x5*pow(x,5)+x4*pow(x,4)+x3*pow(x,3)+x2*pow(x,2)+x1*pow(x,1)+xo*pow(x,0))))
		pass
	Y=np.append(Y,float(x10*pow(i+1,10)+x9*pow(i+1,9)+x8*pow(i+1,8)+x7*pow(i+1,7)+x6*pow(i+1,6)+x5*pow(i+1,5)+x4*pow(i+1,4)+x3*pow(i+1,3)+x2*pow(i+1,2)+x1*pow(i+1,1)+xo*pow(i+1,0)))
	Y=np.append(Y,float(x10*pow(i+2,10)+x9*pow(i+2,9)+x8*pow(i+2,8)+x7*pow(i+2,7)+x6*pow(i+2,6)+x5*pow(i+2,5)+x4*pow(i+2,4)+x3*pow(i+2,3)+x2*pow(i+2,2)+x1*pow(i+2,1)+xo*pow(i+2,0)))
	u=difference(Y,yVals,cY)
	input()
	return u
def setAxis(startYear):
	i=(int(time.strftime("%Y")) - int(startYear))*365 + currentDayCount() + int(time.strftime("%d"))+1
	return i;
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
	matrixx=np.array(xVals[0])
	for x in range(1,len(xVals)):
		matrixx=np.append(matrixx,[x])
		pass
	return np.reshape(matrixx,(len(xVals),1))
def makeOne_Matrix(percision,startYear,DataSet): #Number of elements,percison what power of X do we want to go to. Returns One's Matrix
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
