*** To run on linux:

1) Install required libraries via command line:

$ sudo apt-get install python
$ sudo apt-get install sqlite3
*Note: if you get an error for the sqlite3 install, then you already have it.
$ sudo apt install pip
$ sudo pip -H install flask
$ pip install yahoo-finance
$ pip install feedparser

2) Open terminal in (or change directory to) "~/Downloads/WBSF/1_Code/userDB/"
3) Run the following commands lines in terminal:

$ sudo su
$ export FLASK_APP=userDB.py
*Note: silent acceptance, no terminal acknowledgement via output after

$ flask run --port 80 --host=0.0.0.0
*Note: website is now hosted and accessible via given IP.
*Note: must to connected to the internet to broadcast.
*Note: clients must have connection to the internet and the given IP.

4) Open a web browser to the given IP (given in terminal) to access the site.


*** To run on windows:


