from googlefinance import getQuotes
import urllib.request
import json
import os
def fetchData(s):
	print(json.dumps(getQuotes(s),indent=2))# Print out information for debugging
	stock=getQuotes(s)
	Sym=stock[0]['StockSymbol']
	LTP=stock[0]['LastTradePrice']
	LTT=stock[0]['LastTradeTime']
	LTDT=stock[0]['LastTradeDateTime']
	LTDTL=stock[0]['LastTradeDateTimeLong']#next line returns important stock info in dictionary form
	return {'StockSymbol':Sym,'LastTradePrice':LTP,'LastTradeTime':LTT,'LastTradeDateTime':LTDT,'LastTradeDateTimeLong':LTDTL}	
def file_Exist(fileName): #Just to see if file exists
	try:
		f=open(fileName,'a')
		f.close()
	except IOError as e:
			return False
	return True
def writeData(info,fileName):# Write Data to file 
	if(file_Exist(fileName)):
		output=open(fileName,"a")#Append file
		if not os.stat(fileName).st_size==0:
			output.write(info['StockSymbol']+"\t\t")
			output.write(info['LastTradePrice']+"\t\t")
			output.write(info['LastTradeDateTime']+"\t")
			output.write(info['LastTradeTime']+"\n")
		else: # Make table for output file
			output.write("Stock Symbol\t")
			output.write("LastTradePrice\t")
			output.write("LastTradeDate\t\t")
			output.write("LastTradeTime\t\n")
		output.close()
	else: # Creates File
		file=open(fileName,'a+')
		file.seek(0)
		file.write("Stock Symbol\t")
		file.write("LastTradePrice\t")
		file.write("LastTradeDate\t\t")
		file.write("LastTradeTime\t\n")
		file.close()
		writeData(info,fileName)

def main(): #Asks user for stock name any string will do
	var=input("Enter stock name ")
	stockData=fetchData(var)
	writeData(stockData,'stocks.txt')
main()
