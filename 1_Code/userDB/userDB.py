# admin password for database management
ADMIN = "GSVRJJJ"

# used to verify user is logged in
sessionID = 0

from yahoo_finance import Share
import feedparser
import sqlite3
from flask import Flask, render_template, request, jsonify, make_response, send_file

app = Flask(__name__)

# main function, initialize web app with IP and port
if __name__ == '__main__':
	app.run(host = "127.0.0.1", port = 80, debug = False)

# stock ticker and news stuff
def getCurrentPrice(Sym):    
	ticker = Share(Sym)
	return ticker.get_price()

def getPercentChange(Sym):
	ticker = Share(Sym)
	return ticker.get_percent_change()

def getNewsTitle(feed):
	return feed['feed']['title']

def getNews(feed, n):
	return feed['entries'][n]['title']

@app.route('/helpers.js')
def jsLoad():
	return send_file("helpers.js")

@app.route('/ticker/')
def ticker():
	tick = request.args.get('s')
	feed = feedparser.parse('http://finance.yahoo.com/rss/headline?s=%s' %tick)
	ret = "The current price of " + tick + " is $" + getCurrentPrice(tick) + ". This is a " + getPercentChange(tick) + " change."
	return ret

@app.route('/news/')
def news():
	tick = request.args.get('s')
	feed = feedparser.parse('http://finance.yahoo.com/rss/headline?s=%s' %tick)
	ret = "The top headline for " + tick + " from " + getNewsTitle(feed) + " is: <br><br>" + getNews(feed, 0)
	return ret

# original home page
@app.route('/test/')
def homePage():
	return render_template('index.html')

@app.route('/print.html')
def testprint():
	return render_template('print.html')

@app.route('/reg.html')
def testreg():
	return render_template('reg.html')

@app.route('/logout.html')
def testout():
	return render_template('out.html')

@app.route('/dereg.html')
def testdereg():
	return render_template('dereg.html')

# creates user database if it does not exist already
# otherwise, does nothing
@app.route("/openTable/")
def openTable():
	password = request.args.get('p')
	
	if password == ADMIN:
		conn = sqlite3.connect("userDB.db")
		cursor = conn.cursor()
		cursor.execute("""CREATE TABLE IF NOT EXISTS 
							user(
								username TEXT, 
								password TEXT, 
								session INTEGER,
								lessonStates TEXT, 
								quizStates TEXT,
								placementTaken INTEGER,
								modeSwitch INTEGER);""")
		conn.commit()
		conn.close()
		return 'true'
	
	else:
		return 'false'

# adds user to database
# takes username and password as input
# returns False if user already exists with this username
# otherwise returns True and creates new user
@app.route("/addUser/")
def addUser():
	username = request.args.get('u')
	password = request.args.get('p')
	trash = "0,0,0,0,0,0,0,0,0,0"
	inputs = [str(username), str(password), (-1), (trash), (trash), (0), (0)]
	
	conn = sqlite3.connect("userDB.db")
	cursor = conn.cursor()
	
	cursor.execute("SELECT username FROM user WHERE username=?", [(username)] )
	temp = cursor.fetchone()
	conn.commit()
	
	if temp is None:
		cursor.execute("INSERT INTO user VALUES ( ?, ?, ?, ?, ?, ?, ?)", inputs)
		conn.commit()
		conn.close()
		return "true"
	elif temp[0] != username:
		cursor.execute("INSERT INTO user VALUES ( ?, ?, ?, ?, ?, ?, ?)", inputs)
		conn.commit()
		conn.close()
		return "true"
	else:
		conn.close()
		return "false"

# deletes user from database
# takes username and password as input
@app.route("/remUser/")
def remUser():
	username = request.args.get('u')
	password = request.args.get('p')
	
	conn = sqlite3.connect("userDB.db")
	cursor = conn.cursor()
	
	cursor.execute("SELECT username FROM user WHERE username=?", [(username)])
	temp = cursor.fetchone()
	conn.commit()
	
	if temp is None:
		conn.close()
		return "User does not exist!"
	
	elif temp[0] == username:
		
		cursor.execute("SELECT password FROM user WHERE username=?", [(username)])
		temp = cursor.fetchone()
		conn.commit()
		
		if temp[0] == password:
			cursor.execute("DELETE FROM user WHERE username=?", [(username)])
			conn.commit()
			conn.close()
			return "User Deleted"
		
		else:
			return "Invalid Password!"
	
	else:
		conn.close()
		return "User does not exist!"

# compares credentials to user DB for login attempt
# takes username and password as input
@app.route("/login/")
def login():
	global sessionID
	username = request.args.get('u')
	password = request.args.get('p')
	
	conn = sqlite3.connect("userDB.db")
	cursor = conn.cursor()
	
	cursor.execute("SELECT password FROM user WHERE username=?", [(username)])
	temp = cursor.fetchone()
	conn.commit()

	if temp is None:
		conn.close()
		return "User does not exist!"
	elif temp[0] == password:
		sessionID += 1
		cursor.execute("UPDATE user SET session=? WHERE username=?", [(sessionID), (username)])
		conn.commit()
		conn.close()
		return str(sessionID)
	else:
		conn.close()
		return "Invalid password!"

@app.route("/logout/")
def logout():
	session = request.args.get('s')
	
	conn = sqlite3.connect("userDB.db")
	cursor = conn.cursor()
	
	cursor.execute("SELECT username FROM user WHERE session=?", [(session)])
	temp = cursor.fetchone()
	conn.commit()
	
	if temp is None:
		conn.close()
		return "false"
	
	else:
		cursor.execute("UPDATE user SET session=? WHERE session=?", [(-1), (session)])
		conn.commit()
		conn.close()
		return "true"

# prints the contents of the user database
@app.route("/printTable/")
def printTable():
	password = request.args.get('p')
	
	if password != ADMIN:
		return "false"
	else:
		conn = sqlite3.connect("userDB.db")
		cursor = conn.cursor()
		cursor.execute("SELECT * FROM user")
		contents = cursor.fetchall()
		conn.commit()
		conn.close()
		return str(contents)

# deletes the user database
@app.route("/delTable/")
def delTable():
	password = request.args.get('p')
	
	if password != ADMIN:
		return "false"
	else:
		conn = sqlite3.connect("userDB.db")
		cursor = conn.cursor()
		cursor.execute("DROP TABLE user")
		conn.commit()
		conn.close
		return "true"

@app.route("/setQuiz/")
def setQuizTaken():
	session = request.args.get('s')
	index = int(request.args.get('i'))
	val = request.args.get('v')
	
	conn = sqlite3.connect("userDB.db")
	cursor = conn.cursor()
	cursor.execute("SELECT username FROM user WHERE session=?", [(session)])
	temp = cursor.fetchone()
	conn.commit()
	
	if temp is None:
		conn.close()
		return "false"
	else:
		cursor.execute("SELECT quizStates FROM user WHERE session=?", [(session)])
		conn.commit()
		temp = cursor.fetchone()[0]
		temp = temp.split(',')
		temp[index-1] = val

		trash = ","
		trash = trash.join(temp)

		cursor.execute("UPDATE user SET quizStates=? WHERE session=?", [(trash), (session)])
		conn.commit()
		conn.close()
		return "true"

@app.route("/getQuiz/")
def getQuizTaken():
	session = request.args.get('s')
	index = int(request.args.get('i'))
	
	conn = sqlite3.connect("userDB.db")
	cursor = conn.cursor()
	cursor.execute("SELECT username FROM user WHERE session=?", [(session)])
	temp = cursor.fetchone()
	conn.commit()
	
	if temp is None:
		conn.close()
		return "false"
	
	else:
		cursor.execute("SELECT quizStates FROM user WHERE session=?", [(session)])
		temp = cursor.fetchone()[0]
		conn.commit()
		conn.close()
		return str(temp.split(',')[index-1])

@app.route("/setLesson/")
def setLesson():
	session = request.args.get('s')
	index = int(request.args.get('i'))
	val = request.args.get('v')
	
	conn = sqlite3.connect("userDB.db")
	cursor = conn.cursor()

	cursor.execute("SELECT username FROM user WHERE session=?", [(session)])
	temp = cursor.fetchone()
	conn.commit()
	
	if temp is None:
		conn.close()
		return "false"
	else:
		cursor.execute("SELECT lessonStates FROM user WHERE session=?", [(session)])
		conn.commit()
		
		temp = cursor.fetchone()[0]
		temp = temp.split(',')
		temp[index-1] = val
		
		trash = ","
		trash = trash.join(temp)
		cursor.execute("UPDATE user SET lessonStates=? WHERE session=?", [(trash), (session)])
		conn.commit()
		conn.close()
		return "true"

@app.route("/getLesson/")
def getLesson():
	session = request.args.get('s')
	index = int(request.args.get('i'))
	
	conn = sqlite3.connect("userDB.db")
	cursor = conn.cursor()
	cursor.execute("SELECT username FROM user WHERE session=?", [(session)])
	temp = cursor.fetchone()
	conn.commit()
	
	if temp is None:
		conn.close()
		return "false"
	
	else:
		cursor.execute("SELECT lessonStates FROM user WHERE session=?", [(session)])
		temp = cursor.fetchone()[0]
		conn.commit()
		conn.close()
		return str((temp.split(',')[index-1]))

@app.route("/getPlacement/")
def getPlacement():
	session = request.args.get('s')
	
	conn = sqlite3.connect("userDB.db")
	cursor = conn.cursor()
	cursor.execute("SELECT placementTaken FROM user WHERE session=?", [(session)])
	temp = cursor.fetchone()
	conn.commit()
	conn.close()
	
	if temp is None:
		return "false"
	else:
		return str(temp[0])

@app.route("/setPlacement/")
def setPlacement():
	session = request.args.get('s')
	val = request.args.get('v')
	
	conn = sqlite3.connect("userDB.db")
	cursor = conn.cursor()
	cursor.execute("SELECT username FROM user WHERE session=?", [(session)])
	temp = cursor.fetchone()
	conn.commit()
	
	if temp is None:
		conn.close()
		return "false"
	else:
		cursor.execute("UPDATE user SET placementTaken=? WHERE session=?", [(val), (session)])
		conn.commit()
		conn.close()
		return "true"

@app.route("/getMode/")
def getMode():
	session = request.args.get('s')
	
	conn = sqlite3.connect("userDB.db")
	cursor = conn.cursor()
	cursor.execute("SELECT username FROM user WHERE session=?", [(session)])
	temp = cursor.fetchone()
	conn.commit()
	
	if temp is None:
		conn.close()
		return "false"
	else:
		cursor.execute("SELECT modeSwitch FROM user WHERE session=?", [(session)])
		temp = cursor.fetchall()[0]
		conn.commit()
		conn.close()
		return str(temp[0])

@app.route("/setMode/")
def setMode():
	session = request.args.get('s')
	val = request.args.get('v')
	
	conn = sqlite3.connect("userDB.db")
	cursor = conn.cursor()
	cursor.execute("SELECT username FROM user WHERE session=?", [(session)])
	temp = cursor.fetchone()
	conn.commit()
	
	if temp is None:
		conn.close()
		return "false"
	else:
		cursor.execute("UPDATE user SET modeSwitch=? WHERE session=?", [(val), (session)])
		conn.commit()
		conn.close()
		return "true"
