# /***************************************************/
# Made By Raj
# Tested by Raj
# Debugged by Raj
# Integrated by Vince/Raj/Gregx
# /***************************************************/



import sqlite3
import numpy as np
import LinearAlgebra
from datetime import datetime
import numpy
from datetime import timedelta

import time

# Input:	None ( Makes the table, called at the start of the Main Function)
# Output:	None  
# Connects Python to an SQL Database through Sqlite3. cursor.execute is used to execute SQL queries by passing a string to the function 
def MakeTable():
	conn = sqlite3.connect("base.db")									# Make a table whenever they call for stock information 
									
	cursor = conn.cursor()
	cursor.execute("DROP TABLE IF EXISTS Prediction")					# if there's already a table initialized from the last session, drop it
	conn.commit()																	
	cursor.execute("CREATE TABLE IF NOT EXISTS Prediction(Symbol TEXT, Priority INTEGER);")		# The table stores the symbol and the priority/ most recently accessed entry as an integer
	conn.commit()
	AddColumns()
	return
	
# Input:	None ( Adds columns to the table)
# Output:	None 	
# This function is called in MakeTable, and is here for simplicity and clean up of code. Builds a string that is then executed as a query 
def AddColumns():											
	conn =sqlite3.connect("base.db")
	cursor = conn.cursor()
	command = "ALTER TABLE Prediction ADD Value"						# Initialization of the table to have 11 Prediction values that are calculated using the Algorithm
	for	x in range(0,11):
		cursor.execute(command+str(x)+" FLOAT")						# Column1 = Company symbol and Columns 3 to 13 are for the 11 Predicted Values 
		conn.commit()	
	cursor.execute("ALTER TABLE Prediction ADD Date TEXT")			# Columns 14 is for the holding the Date
	conn.close()
	return 
		
# Input:	None (Can be called at any time)
# Output:	None (Prints table on screen)		
# Prints the SQL table that has the prediction value 
def PrintTable():
	conn=sqlite3.connect("base.db")
	cursor=conn.cursor()
	cursor.execute("SELECT * FROM Prediction ORDER BY Priority")	# This retrieves every entry in the Table for checking purposes
	print(cursor.fetchall())
	conn.commit()
	conn.close()
	return

	
# Input:	None (Can be called at any time
# Output:	Boolean (Checks whether Cache overflows)	
def check_cache_size():
	conn=sqlite3.connect("base.db")									# Check the amount of entries in the Cache that are stored currently that match the 
	cursor=conn.cursor()											# This is important to ensure that we don't keep adding entries 
	cursor.execute("SELECT COUNT(*) FROM Prediction")	
	size = cursor.fetchone()
	conn.close()
	if size[0] == 100:												# Limit the size to 100 entries by default		
		return 1
	else:
		return 0
		
# Input:	String (Symbol of the Company)
# Output:	None	(Updates Database)
def modify_cache(Symbol,List):										# This updates the most recently accessed entries in the cache, and "moves up" the entry that was stored previously
																	
	conn = sqlite3.connect("base.db")
	max_size = 4
	cursor = conn.cursor()
	cursor.execute("DELETE FROM Prediction WHERE Priority =?",[(max_size)])	
	conn.commit()
	cursor.execute("UPDATE Prediction SET Priority = Priority+1")
	conn.commit()
	command = "INSERT INTO Prediction VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
	date = datetime.now()
	date = date.strftime("%d-%m-%y-%H-%M")
	cursor.execute(command,( (Symbol),("1"),(List[0]),(List[1]),(List[2]),(List[3]),(List[4]),(List[5]),(List[6]),(List[7]),(List[8]),(List[9]),(List[10]),(date) ))
	conn.commit()
	conn.close()						

# Input:	String (Symbol of the Company)
# Output:	Boolean ( check duplicate entries that match symbol of the company )
def check_unique(Symbol):
	conn=sqlite3.connect("base.db")											# This function ensures that if you add companies with the same name twice, there aren't any duplicates
	cursor=conn.cursor()
	cursor.execute("SELECT COUNT(*) FROM Prediction WHERE Symbol=?", [(Symbol)])
	result=cursor.fetchone()
	if result[0] == 1:
		return 0
	else:
		return 1

# Input:	String (Symbol of the Company )
# Output:	None ( performs operation on SQL database)		
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

# Input:	A Matrix of 11x1
# Output:	A List of 11 variables 	
def Parse(Matrix):

	List = []
	for x in range (0,11):
		List.append(Matrix[x,0])
return List
		
# Input:	String (Symbol of the Company) 
# Output:	Boolean (Checks whether the specified Company is in the Cache ( returns 1 if true, 0 if false) )
def Search(Symbol):
	conn=sqlite3.connect("base.db")
	cursor=conn.cursor()
	cursor.execute("SELECT COUNT(*) FROM Prediction WHERE Symbol=?", [(Symbol)])
	num = cursor.fetchone()
	if num[0] == 1:
		return check_date(Symbol)
	else:	
		return 0
# Input:	String (Symbol of the Company )
# Output:  	Matrix of 11x1 (Returns the Prediction values from the cache)
def Fetch_Cache(Symbol):

	cache__info = numpy.zeros((11,1))
	
	conn=sqlite3.connect("base.db")					# Access the Database
	cursor=conn.cursor()						
	command = "SELECT "
	command2 = "Value"
	for x in range(0,10):
		command =command +command2 +str(x)+ ", "
	command = command +command2 +str(x+1)+" "
	command = command+"FROM Prediction"						
	quote ="'"
	command = command+" WHERE Symbol ="+quote+Symbol+quote			# Fetch Stored Algorithm Prediction values from the database 	
	cursor.execute(command)
	values = cursor.fetchall()
	for x in range(0,10):											# Convert the retrieved Matrix into a list 
		cache__info[x][0]=values[0][x]
	return cache__info												# and return it to the main function 

# Input: Symbol of the Company 
# Output: Checks whether the info of the company in the cache is less than 3 days since it was added
def check_date(Symbol):
	conn=sqlite3.connect("base.db")
	cursor=conn.cursor()
	cursor.execute("SELECT Date FROM Prediction WHERE Symbol=?", [(Symbol)])
	string = cursor.fetchone()
	date1 = string[0]													# has the current date that is stored in the database for the selected entry
	date1 = datetime.strptime(date1,"%d-%m-%y-%H-%M")
	current_time =datetime.now()
	temp = current_time.strftime("%d-%m-%y-%H-%M")
	current_time=datetime.strptime(temp,"%d-%m-%y-%H-%M")
	difference = current_time-date1 
	max_difference = timedelta(3)
	if difference > max_difference:
		return 0
	else:
		return 1
# Input:	String (Symbol of the Company )
# Output:	List of String ( Retrieves every Stock Symbol in the cache)
def return_cache_symbols():												#  returns all the symbols of tickers in the cache
	conn=sqlite3.connect("base.db")
	cursor=conn.cursor()
	cursor.execute("SELECT Symbol FROM Prediction")
	list = cursor.fetchall()
	return list		
		
# Input:	String (Symbol of the Company) , Matrix of 11x1 ( Prediction Values from Algorithm)
# Output:	None ( Inserts/ Updates Database)		
# Main function that is called to store prediction values in the cache, doesn't return anything as it's a call to update values in the database. it updates the priority of the entries
# depending on whether a duplicate is called through check_unique(), and if the size is full, it replaces entries via modify_cache()		
def Cache_Predictions(Symbol,Matrix):									# Receive the Coefficient data that was calculated by the Algorithm

	
	List = Parse(Matrix)	
	
	if check_unique(Symbol) ==1 :										# check if it's unique
		if check_cache_size() ==1 :										# Check the cache size on whether it is filled up or not 
			modify_cache(Symbol,List)									# if it's filled up call another function that replaces/re-arranges
		else:
			conn=sqlite3.connect("base.db")
			cursor=conn.cursor()
			date = datetime.now()
			date = date.strftime("%d-%m-%y-%H-%M")
			command = "INSERT INTO Prediction VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)"		
			cursor.execute(command,( (Symbol),("0"),(List[0]),(List[1]),(List[2]),(List[3]),(List[4]),(List[5]),(List[6]),(List[7]),(List[8]),(List[9]),(List[10]),(date) ))
			conn.commit()												# gonna need an extra value for each entry that determines its priority on when it should get replaced
			cursor.execute("UPDATE Prediction SET Priority = Priority +1")
			conn.commit()
			conn.close()
														
	else:																# stack principle
		update_priority(Symbol)
	return



