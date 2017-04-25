# RSI FILE
import time # Time
import numpy as np #Numpy

# NOTES: code adapted from previous year's group. 
# This function is a stock indicator that the stock is over bought/sold.

# Function by Jon
# RSI = Relative Strength Index
def PredictRSI(prices):
	
	period = 14 # RSI is calculated using a period of 14 days
	data_range = len(prices) - period # Range is one period less than the amount of prices input

	# If there are less than 14 prices, the RSI cannot be calculated, and the system exits
	if data_range < 0:
		raise SystemExit

	price_change = [] # declare array
	for i in range(1, len(prices) - 1):
		price_change.append(prices[i] - prices[i-1]) # Calculates the daily price change

	rsi = np.zeros(data_range) # An array of zeros, size = data_range
	
	gains = np.array(price_change) # create an empty array
	negative_gains = gains < 0 # Only the positive values will be kept in the gains array
	gains[negative_gains] = 0

	losses = np.array(price_change) # create an empty array
	positive_gains = gains > 0 # Only the negative values are kept
	losses[positive_gains] = 0
	losses *= -1 # find the absolute values of elements in losses array
	
	avg_up = np.mean(gains[:period]) # Calculate the mean of the up days
	avg_down = np.mean(losses[:period]) # Calculate the mean of the down days

	# Only for first element:
	
	if avg_down == 0:
		rsi[0] = 100 
	else:
		RS = avg_up/avg_down
		rsi[0] = 100 - (100/(1+RS)) # this is RSI formula

	# for other elements:
	
	for i in range(1, data_range - 1): # rsi formula, discussed in report 3
		avg_up = (avg_up * (period-1) + gains[i + (period - 1)]) / period
		avg_down = (avg_down * (period-1) + losses[i + (period - 1)]) / period

		if avg_down == 0: 
			rsi[i] = 100
		else:
			RS = avg_up/avg_down
			rsi[i] = 100 - (100/(1+RS)) # rsi formula

	rsi = rsi[:len(rsi)-1] # cut off the last element (which equals 0)
	
	return rsi # rsi is a list
