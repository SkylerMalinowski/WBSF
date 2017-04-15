To run this (linux):

```
sudo apt-get install python
sudo pip install flask
pip install sqlite3 (if it errors, you already have it installed)
pip install yahoo-finance
pip install feedparser
```
	
navigate to directory of this readme in terminal / command prompt
close all web browsers and HTTP clients

```
set FLASK_APP=userDB.py
su
flask run --port 80 --host=0.0.0.0
```

Website is now accessible via localhost (or your IP) by any internet connected machine.

You can re-open a web browser and use the site.
