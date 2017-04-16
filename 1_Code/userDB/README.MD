*** To run on linux:

Install required libraries.

$ sudo apt-get install python
$ sudo pip install flask
$ pip -H install sqlite3
$ pip install yahoo-finance
$ pip install feedparser

Open terminal in (or change directory to) "<dir>/WBSF/1_Code/userDB/"

$ sudo su
$ export FLASK_APP=userDB.py
$ flask run --port <number> --host=0.0.0.0
ex: $ flask run --port 80 --host=0.0.0.0

Website is now accessible via your IP by any internet connected machine.
Open a web browser to the given IP to access the site.


*** To run on windows:


