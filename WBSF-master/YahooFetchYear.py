from yahoo_finance import Share

def getHistoricalData(Sym,Begin,End):
	yahoo=Share(Sym)
	B=Begin+"-1-1"
	E=End+"-1-1"
	return yahoo.get_historical(B,E)
def DataToArray(History,Begin,End):
	Range=252*(int(End)-int(Begin))
	Data=[[0 for row in range(0,4)] for col in range(0,int(Range))]
	for i in range(0,int(Range)):
		print(i)
		Data[i][0]=History[i]['Symbol']
		Data[i][1]=History[i]['High']
		Data[i][2]=History[i]['Low']
		Data[i][3]=History[i]['Date']
		print(Data[i][0])
		print(Data[i][1])
		print(Data[i][2])
		print(Data[i][3])
	return Data
def main():
	var = input('Enter A Stock Symbol ')
	timeBegin=input('Enter Start year ')
	timeEnd=input('Enter the end year ')
	History=getHistoricalData(var,timeBegin,timeEnd)
	Array=DataToArray(History,timeBegin,timeEnd)
main()
#C:\\cygwin\bin\YahooFetch.py