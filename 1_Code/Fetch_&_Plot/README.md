## To run on Linux:

1) Install required libraries via command line:

```
$ sudo apt-get install python
$ sudo apt-get install sqlite3
$ sudo apt-get install python-pip
$ sudo -H pip install --upgrade pip
$ pip install pandas
$ pip install plotly
$ pip install googlefinance
$ sudo -H pip install openpyxl
$ pip install numpy
$ pip install pandas_datareader
$ sudo -H pip install flask
$ pip install simplejson
$ pip install yahoo-finance
$ pip install feedparser
```
2) Make a Plotly Account at "www.plot.ly"
  https://plot.ly/python/getting-started/

3) Open terminal in (or change directory to) "~/Downloads/WBSF/1_Code/Fetch_&_Plot/"
4) Run the following commands lines in terminal:

```
$ sudo su
```
*Note: Gain root access

```
$ export FLASK_APP=wrapper.py
```
*Note: silent acceptance, no terminal acknowledgement via output after

```
$ flask run --port 6000 --host=0.0.0.0
```
*Note: Website is now hosted and accessible via given IP.
*Note: Must to connected to the internet to broadcast to other compmuters.
*Note: Clients must have connection to the internet and the given IP.

5) The services are now hosted and can be accessed via XMLHTTPRequest calls.

## To run on Windows:

1) Install Python from https://www.python.org/downloads/
2) Install required libraries in command prompt

```
> pip install sqlite3
> pip install pandas
> pip install plotly
> pip install googlefinance
> pip install openpyxl
> pip install numpy
> pip install pandas_datareader
> pip install flask
> pip install simplejson
> pip install yahoo-finance
> pip install feedparser
```
3) Make a Plotly Account at "www.plot.ly"
  https://plot.ly/python/getting-started/

4) Open a command prompt and navigate to "~/Downloads/WBSF/1_Code/Fetch_&_Plot/"
5) Run the following commands in the command prompt:

```
> set FLASK_APP=wrapper.py
> flask run --port 6000 --host=0.0.0.0
```
6) The services are now hosted and can be accessed via XMLHTTPRequest calls.
