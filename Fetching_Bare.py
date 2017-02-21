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
	return {'StockSymbol':Sym,'LastTradePrice':LTP,'LastTradeTime':LTT}	# next line returns important stock info in dictionary form
def main(): 
	var=input("Enter stock name ") #Asks user for stock name any string will do
	stockData=fetchData(var)
	#stockData['name of object'] (look at the return statement for names od dictionary entry)
main()
