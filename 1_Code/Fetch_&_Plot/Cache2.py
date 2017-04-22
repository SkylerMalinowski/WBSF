import sqlite3
import numpy as np
import LinearAlgebra
from datetime import datetime

from datetime import timedelta

import time

def MakeTable():
	conn = sqlite3.connect("base.db")									# Make a table whenever they call for stock information
	cursor = conn.cursor()
	cursor.execute("DROP TABLE IF EXISTS Prediction")				
	conn.commit()																	
	cursor.execute("CREATE TABLE IF NOT EXISTS Prediction(Symbol TEXT, Priority INTEGER);")		
	conn.commit()
	AddColumns()
	return
	
def AddColumns():
	conn =sqlite3.connect("base.db")
	cursor = conn.cursor()
	command = "ALTER TABLE Prediction ADD Value"						# Initialization of the table to have 11 entries in it
	for	x in range(0,12):
		cursor.execute(command+str(x)+" FLOAT")						# Column1 = Company symbol and Columns 2 to 12 are for the 11 Predicted Values 
		conn.commit()
		
	cursor.execute("ALTER TABLE Prediction ADD Date TEXT")
	conn.close()
	return 
		
		
def PrintTable():
	conn=sqlite3.connect("base.db")
	cursor=conn.cursor()
	cursor.execute("SELECT * FROM Prediction ORDER BY Priority")
	print(cursor.fetchall())
	conn.commit()
	conn.close()
	return

def check_cache_size():
	conn=sqlite3.connect("base.db")
	cursor=conn.cursor()
	cursor.execute("SELECT COUNT(*) FROM Prediction")
	size = cursor.fetchone()
	conn.close()
	if size[0] == 4:
		return 1
	else:
		return 0
	
def modify_cache(Symbol,List):

	conn = sqlite3.connect("base.db")
	max_size = 4
	cursor = conn.cursor()
	cursor.execute("DELETE FROM Prediction WHERE Priority =?",[(max_size)])	# 
	conn.commit()
	cursor.execute("UPDATE Prediction SET Priority = Priority+1")
	conn.commit()
	command = "INSERT INTO Prediction VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
	date = datetime.now()
	date = date.strftime("%d-%m-%y-%H-%M")
	cursor.execute(command,( (Symbol),("1"),(List[0]),(List[1]),(List[2]),(List[3]),(List[4]),(List[5]),(List[6]),(List[7]),(List[8]),(List[9]),(List[10]),(List[11]),(date) ))
	conn.commit()
	conn.close()

def check_unique(Symbol):
	conn=sqlite3.connect("base.db")
	cursor=conn.cursor()
	cursor.execute("SELECT COUNT(*) FROM Prediction WHERE Symbol=?", [(Symbol)])
	result=cursor.fetchone()
	if result[0] == 1:
		return 0
	else:
		return 1

		
def update_priority(Symbol):											# This function just sets the entry of the symbol passed as the 1st priority
	conn=sqlite3.connect("base.db")										
	cursor=conn.cursor()												# so for a cache of 4 entries  A = 1st, B=2nd, C=3rd, D=4th and someone just accessed entry "C"
																		# the new priority would be C=1st, A=2nd and B=3rd , D = 4th 
	cursor.execute("SELECT Priority FROM Prediction WHERE Symbol=?", [(Symbol)] )   #### [ (arg1), (arg2), ... ]		
	num = cursor.fetchone()												# get the priority of the thing that is to be shifted to the top
	limit = num[0]
	cursor.execute("UPDATE Prediction SET Priority = Priority + 1 WHERE Priority < ?", [ (limit)])
	conn.commit()
	cursor.execute("UPDATE Prediction SET Priority = 1 WHERE Symbol =?", [(Symbol)])	
	conn.commit()
	conn.close()

def Parse(Matrix):
	List = np.array(Matrix[0,0])
	for x in range(0,11):
		List=np.append(List,Matrix[x,0])
	return List

def search(Symbol):
	conn=sqlite3.connect("base.db")
	cursor=conn.cursor()
	cursor.execute("SELECT COUNT(*) FROM Prediction WHERE Symbol=?", [(Symbol)])
	num = cursor.fetchone()
	if num[0] == 1:
		return check_date(Symbol)
	else:	
		return 0
	
def Fetch_Cache(Symbol):

	conn=sqlite3.connect("base.db")
	cursor=conn.cursor()
	command = "SELECT "
	command2 = "Value"
	for x in range(0,11):
		command =command +command2 +str(x)+ ", "
	command = command +command2 +str(x+1)+" "
	command = command+"FROM Prediction"									#
	quote ="'"
	command = command+" WHERE Symbol ="+quote+Symbol+quote				

	cursor.execute(command)
	values = cursor.fetchall()
	print(values)
	cursor.execute("SELECT Symbol FROM Prediction")
	return values

def check_date(Symbol):
	conn=sqlite3.connect("base.db")
	cursor=conn.cursor()
	cursor.execute("SELECT Date FROM Prediction WHERE Symbol=?", [(Symbol)])
	string = cursor.fetchone()
	#print(string)
	date1 = string[0]													# has the current date that is stored in the database for the selected entry
	date1 = datetime.strptime(date1,"%d-%m-%y-%H-%M-")
	current_time =datetime.now()
	temp = current_time.strftime("%d-%m-%y-%H-%M")
	current_time=datetime.strptime(temp,"%d-%m-%y-%H-%M")
	#print(current_time)
	difference = current_time-date1 
	#print(difference)
	max_difference = timedelta(3)
	print(difference)
	if max_difference > difference:
	
		return 0
	else:
		return 1

def return_cache_symbols()												# LITERALLY returns the symbols of tickers in the cache
	conn=sqlite3.connect("base.db")
	cursor=conn.cursor()
	cursor.execute("SELECT Symbol FROM Prediction")
	list = cursor.fetchall()
	return list		
		
		
		
def Cache_Predictions(Symbol,Matrix):									# var1 = Company Symbol, and List is the matrix that you pass in co-efficients

	
	List = Parse(Matrix)	
	
	if check_unique(Symbol) ==1 :										# check if it's unique
		if check_cache_size() ==1 :										# Check the cache size on whether it is filled up or not 
			modify_cache(Symbol,List)									# if it's filled up call another function that replaces/re-arranges
		else:
			conn=sqlite3.connect("base.db")
			cursor=conn.cursor()
			date = datetime.now()
			date = date.strftime("%d-%m-%y-%H-%M")
			command = "INSERT INTO Prediction VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"		
			cursor.execute(command,( (Symbol),("0"),(List[0]),(List[1]),(List[2]),(List[3]),(List[4]),(List[5]),(List[6]),(List[7]),(List[8]),(List[9]),(List[10]),(List[11]),(date) ))
			conn.commit()												# gonna need an extra value for each entry that determines its priority on when it should get replaced
			cursor.execute("UPDATE Prediction SET Priority = Priority +1")
			conn.commit()
			conn.close()
														
	else:																# stack principle
		update_priority(Symbol)
	return

	

