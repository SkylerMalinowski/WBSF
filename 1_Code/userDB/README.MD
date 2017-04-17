## To run on Linux:

1) Install required libraries via command line:

```
$ sudo apt-get install python
$ sudo apt-get install sqlite3
$ sudo apt-get install python-pip
$ sudo -H pip install --upgrade pip
$ sudo -H pip install flask
$ pip install simplejson
$ pip install yahoo-finance
$ pip install feedparser
```

2) Open terminal in (or change directory to) "~/Downloads/WBSF/1_Code/userDB/"
3) Run the following commands lines in terminal:

```
$ sudo su
```
*Note: Gain root access

```
$ export FLASK_APP=userDB.py
```
*Note: silent acceptance, no terminal acknowledgement via output after

```
$ flask run --port 5000 --host=0.0.0.0
```
*Note: Website is now hosted and accessible via given IP.
*Note: Must to connected to the internet to broadcast to other compmuters.
*Note: Clients must have connection to the internet and the given IP.

4) The services are now hosted and can be accessed via XMLHTTPRequest calls.

## To run on Windows:

1) Install Python from https://www.python.org/downloads/
2) Install required libraries in command prompt

```
> pip install sqlite3
> pip install flask
> pip install simplejson
> pip install yahoo-finance
> pip install feedparser
```

3) Open a command prompt and navigate to "~/Downloads/WBSF/1_Code/userDB/"
4) Run the following commands in the command prompt:

```
> set FLASK_APP=userDB.py
> flask run --port 5000 --host=0.0.0.0
```
5) The services are now hosted and can be accessed via XMLHTTPRequest calls.
