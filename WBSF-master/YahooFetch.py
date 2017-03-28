from yahoo_finance import Share

def getHistoricalData(Sym,Begin,End):
	yahoo=Share(Sym)
	return yahoo.get_historical(Begin,End)
def DataToArray(History):
	inputrange=input("Enter How Many Work Days are covered ")
	Range=int(inputrange)-1
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
	timeBegin=input('Enter Start Date ')
	timeEnd=input('Enter the end Date ')
	History=getHistoricalData(var,timeBegin,timeEnd)
	Array=DataToArray(History)
main()
#C:\\cygwin\bin\YahooFetch.py