'''
Created by Jonatan Yanovsky on 2/21/2017
Database implementation using python and sqlite
using code from: https://docs.python.org/3/library/sqlite3.html

Note to other team members: calling fetchone() or fetchall() will only work
once. You cannot use this statement twice on the same object as the object
will be None-type after the first call.
'''


import sqlite3

# function parameters: string, float (2 decimals), string, string
def storeStockInformation(stockSymbol, price, theDate, theTime):

    conn = sqlite3.connect('database.db')
    c = conn.cursor() # open the database file

    stockSymbol1 = stockSymbol.lower() 
    stockSymbol = (stockSymbol1,) # format: ('goog',)

    # try to find the stock symbol's table if it is already in the database
    val1 = c.execute("SELECT name FROM sqlite_master WHERE type='table' AND name = ? ", stockSymbol)

    try: # table already exists
        val1.fetchone()[0] # if this works, then it doesn't jump to except

    except: # table doesn't exist - create a new table
        c.execute("CREATE TABLE " + stockSymbol1 + " (lastTradePrice FLOAT, date STRING, time STRING)")

    # insert data into the table
    inputs = [(price),(theDate),(theTime)]
    c.execute("INSERT INTO " + stockSymbol1 + " VALUES ( ?, ?, ?)", inputs) 

    conn.commit() # save changes to the database

    # for debugging:

    # read table data from database
    #val = c.execute("SELECT * FROM " + stockSymbol1 + "")

    # print out all rows/columns for that table
    #print("printing from " + stockSymbol1 + ": ")
    #print(val.fetchall())
    #print(" ")

    conn.close() # close the database.db file
    return