# RSI FILE
import time # Time
import pandas_datareader.data as web #Database reader
import numpy as np #Numpy
import pandas as pd #Pandas Data Reader
from math import floor #math floor
from math import pow #math pow
from datetime import datetime #Date time

# Function by Jon
# RSI = Relative Strength Index
def PredictRSI(prices):
    # RSI is calculated using a period of 14 days
    period = 14
    # Range is one period less than the amount of prices input
    data_range = len(prices) - period
    # If there are less than 14 prices, the RSI cannot be calculated, and the system exits
    if data_range < 0:
        raise SystemExit

    # Calculates the daily price change
    price_change = prices[1:] - prices[:-1]
    # An array of zeros the length of data_range is created
    rsi = np.zeros(data_range)

    # Creates an array with the price changes
    gains = np.array(price_change)
    # Only the positive values will be kept in the gains array
    negative_gains = gains < 0
    gains[negative_gains] = 0

    # Creates an array of losses where only the negative values are kept, and then multiplied by -1 for the next step
    losses = np.array(price_change)
    positive_gains = gains > 0
    losses[positive_gains] = 0
    losses *=-1

    # Calculate the mean of the up days and the down days
    avg_up = np.mean(gains[:period])
    avg_down = np.mean(losses[:period])

    if avg_down == 0:
        rsi[0] = 100
    else:
        RS = avg_up/avg_down
        rsi[0] = 100 - (100/(1+RS))

    for i in range(1,data_range):
        avg_up = (avg_up * (period-1) + gains[i + (period - 1)])/ \
                period
        avg_down = (avg_down * (period-1) + losses[i + (period - 1)])/ \
                period

        if avg_down == 0:
            rsi[i] = 100
        else:
            RS = avg_up/avg_down
            rsi[i] = 100 - (100/(1+RS))

    return rsi

#main:

# Grab the closing prices for the specified range
prices = table[start:end].Close

# Convert prices to an array for input into the RSI function
price_array = np.array(prices)
