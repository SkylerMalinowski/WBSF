"""
Created/Debugged by Jonatan Yanovsky - 4/21/2017
Code adapted from previous year's group. 
See wikipedia for more information about this algorithm: 
https://en.wikipedia.org/wiki/Relative_strength_index
"""

import time # Time
import pandas
import numpy as np #Numpy

# input: a list of floats containing price data. Specifically, an object of type pandas.core.series.Series containing array elements of type numpy.float64
# output: a list of floats ranging from 0-100 (in units of percent). Specifically, an object of type numpy.ndarray containing array elements of numpy.float64
# explanation: This function is a stock indicator that the stock is over bought/sold. 
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

	# Only for first day:
	
	if avg_down == 0:
		rsi[0] = 100 
	else:
		RS = avg_up/avg_down
		rsi[0] = 100 - (100/(1+RS)) # this is the RSI formula

	# for all other days:
	
	for i in range(1, data_range - 1): # for each day in range
		# Calculate Smoothed Moving Average:
		avg_up = (avg_up * (period-1) + gains[i + (period - 1)]) / period
		avg_down = (avg_down * (period-1) + losses[i + (period - 1)]) / period

		if avg_down == 0: 
			rsi[i] = 100
		else:
			RS = avg_up/avg_down # compute Relative Strength
			rsi[i] = 100 - (100/(1+RS)) # Compute RSI for that day

	rsi = rsi[:len(rsi)-1] # cut off the last element (which equals 0)
	
	return rsi # rsi is a list
