from yahoo_finance import Share
import feedparser
import hashlib
import sqlite3
from flask import Flask, render_template, request, jsonify, make_response, send_file

app = Flask(__name__)

# default admin password for database management, stored hashed
ADMIN = "GSVRJJJ"
ADMIN = (hashlib.sha256(ADMIN.encode())).hexdigest()

# used to create session IDs for users
sessionID = 0

# main function, initialize web app with IP and port
if __name__ == '__main__':
	app.run(host = "127.0.0.1", port = 80, debug = False)

# takes in an XMLHTTPRequest with no arguments
# returns the asset in response
@app.route('/logo.jpg')
def logo():
	return send_file('logo.jpg', mimetype='image/jpg')

# original home page
# takes in an XMLHTTPRequest with no arguments
# returns the asset in response
@app.route('/index.html')
def homePage():
	return render_template('index.html')

# takes in an XMLHTTPRequest with no arguments
# returns the asset in response
@app.route('/print.html')
def testprint():
	return render_template('print.html')

# takes in an XMLHTTPRequest with no arguments
# returns the asset in response
@app.route('/reg.html')
def testreg():
	return render_template('reg.html')

# takes in an XMLHTTPRequest with no arguments
# returns the asset in response
@app.route('/logout.html')
def testout():
	return render_template('out.html')

# takes in an XMLHTTPRequest with no arguments
# returns the asset in response
@app.route('/dereg.html')
def testdereg():
	return render_template('dereg.html')

# takes in a password as a URL parameter via an XMLHTTPRequest
# returns "true" if the password is equivalent to the admin password
# returns "false" otherwise
@app.route('/isAdmin/')
def isAdmin():
	password = request.args.get('p')
	password = (hashlib.sha256(password.encode())).hexdigest()
	if password == ADMIN:
		return "true"
	else:
		return "false"

# takes in a the old password and new password as URL parameters via an XMLHTTPRequest
# returns "true" if the password is equivalent to the admin password, and changes the password to the new one
# returns "false" otherwise and password is unchanged
@app.route('/setAdmin/')
def setAdmin():
	global ADMIN
	old = request.args.get('o')
	old = (hashlib.sha256(old.encode())).hexdigest()
	new = request.args.get('n')
	new = (hashlib.sha256(new.encode())).hexdigest()
	
	if old == ADMIN:
		ADMIN = new
		return "true"
	else:
		return "false"

# takes in the admin password as a URL parameter via an XMLHTTPRequest
# creates user database if it does not exist already and returns "true"
# otherwise, does nothing and returns "false"
@app.route("/openTable/")
def openTable():
	password = request.args.get('p')
	password = (hashlib.sha256(password.encode())).hexdigest()
	
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
								portfolio TEXT,
								placementTaken INTEGER,
								modeSwitch INTEGER);""")
		conn.commit()
		conn.close()
		return 'true'
	
	else:
		return 'false'

# adds user to database
# takes username and password as input URL arguments in XMLHTTPRequest
# returns False if user already exists with this username
# otherwise returns True and creates new user
@app.route("/addUser/")
def addUser():
	username = request.args.get('u')
	password = request.args.get('p')
	password = (hashlib.sha256((username+password).encode())).hexdigest()
	trash = "0,0,0,0,0,0,0,0,0,0"
	trash2 = "NULL,NULL,NULL,NULL,NULL"
	inputs = [str(username), str(password), (-1), (trash), (trash), (trash2), (0), (0)]
	
	conn = sqlite3.connect("userDB.db")
	cursor = conn.cursor()
	
	cursor.execute("SELECT username FROM user WHERE username=?", [(username)] )
	temp = cursor.fetchone()
	conn.commit()
	
	if temp is None:
		cursor.execute("INSERT INTO user VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)", inputs)
		conn.commit()
		conn.close()
		return "true"
	elif temp[0] != username:
		cursor.execute("INSERT INTO user VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)", inputs)
		conn.commit()
		conn.close()
		return "true"
	else:
		conn.close()
		return "false"

# removes user from database
# takes username and password as input URL arguments in XMLHTTPRequest
# returns "User Deleted" if username exists and password is correct
# returns "Invalid Password!" if username exists and password is not correct
# returns "User does not exist!" If username does not exist
@app.route("/remUser/")
def remUser():
	username = request.args.get('u')
	password = request.args.get('p')
	password = (hashlib.sha256((username+password).encode())).hexdigest()
	
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
# takes username and password as input URL arguments in XMLHTTPRequest
# returns a session ID if user exists and password is correct
# returns "User does not exist!" if user does not exist
# returns "Invalid Password!" if password is incorrect
@app.route("/login/")
def login():
	global sessionID
	username = request.args.get('u')
	password = request.args.get('p')
	password = (hashlib.sha256((username+password).encode())).hexdigest()
	
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

# attempts to log out user
# takes session ID as input URL argument in XMLHTTPRequest
# returns "true" if user exists with that sessionID and marks the user logged out in the database
# returns "false" no user with that sessionID exists
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
# takes admin password as input URL argument in XMLHTTPRequest
# returns "false" if password incorrect
# otherwise returns the user database
@app.route("/printTable/")
def printTable():
	password = request.args.get('p')
	password = (hashlib.sha256(password.encode())).hexdigest()
	
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
# takes admin password as input URL argument in XMLHTTPRequest
# deletes the SQL table if the admin password is correct and returns "true"
# returns "false" otherwise
@app.route("/delTable/")
def delTable():
	password = request.args.get('p')
	password = (hashlib.sha256(password.encode())).hexdigest()
	
	if password != ADMIN:
		return "false"
	else:
		conn = sqlite3.connect("userDB.db")
		cursor = conn.cursor()
		cursor.execute("DROP TABLE user")
		conn.commit()
		conn.close
		return "true"

# sets the user's quiz flag
# takes in the sessionID, quiz index, and flag value as arguments via an XMLHTTPRequest
# if user with sessionID exists, updates flag at the index with the new value and returns "true"
# returns "false" otherwise
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

# gets the user's quiz flag
# takes in the sessionID and quiz index as arguments via an XMLHTTPRequest
# if user with sessionID exists, returns flag at the index
# returns "false" otherwise
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

# sets the user's lesson flag
# takes in the sessionID, lesson index, and flag value as arguments via an XMLHTTPRequest
# if user with sessionID exists, updates flag at the index with the new value and returns "true"
# returns "false" otherwise
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

# gets the user's lesson flag
# takes in the sessionID and quiz index as arguments via an XMLHTTPRequest
# if user with sessionID exists, returns flag at the index
# returns "false" otherwise
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

# gets the user's placement flag
# takes in the sessionID as argument via an XMLHTTPRequest
# returns "false" if no user with that sessionID exists
# otherwise returns the user's placement flag
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

# sets the user's placement flag
# takes in the sessionID and flag value as arguments via an XMLHTTPRequest
# returns "false" if no user with that sessionID exists
# otherwise updates the user's placement flag and returns "true"
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

# gets the user's mode flag
# takes in the sessionID as argument via an XMLHTTPRequest
# returns "false" if no user with that sessionID exists
# otherwise returns the user's mode flag
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

# sets the user's mode flag
# takes in the sessionID and flag value as arguments via an XMLHTTPRequest
# returns "false" if no user with that sessionID exists
# otherwise updates the user's mode flag and returns "true"
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

# gets the user's portfolio ticker
# takes in the sessionID and portfolio index as arguments via an XMLHTTPRequest
# if user with sessionID exists, returns ticker at the index
# returns "false" otherwise
@app.route("/getPortfolio/")
def getPortfolio():
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
		cursor.execute("SELECT portfolio FROM user WHERE session=?", [(session)])
		temp = cursor.fetchone()[0]
		conn.commit()
		conn.close()
		return str((temp.split(',')[index-1]))

@app.route("/setPortfolio/")
def setPortfolio():
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
		cursor.execute("SELECT portfolio FROM user WHERE session=?", [(session)])
		conn.commit()
		
		temp = cursor.fetchone()[0]
		temp = temp.split(',')
		temp[index-1] = val
		
		trash = ","
		trash = trash.join(temp)
		cursor.execute("UPDATE user SET portfolio=? WHERE session=?", [(trash), (session)])
		conn.commit()
		conn.close()
		return "true"

# adds the ticker to the user's portfolio
# takes in the sessionID and ticker as arguments via an XMLHTTPRequest
# returns "false" if no user with that sessionID exists or portfolio is full
# otherwise adds the ticker to the portfolio and returns "true"
@app.route("/addPortfolio/")
def addPortfolio():
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
		cursor.execute("SELECT portfolio FROM user WHERE session=?", [(session)])
		conn.commit()
		
		temp = cursor.fetchone()[0]
		temp = temp.split(',')
		
		flag = "false"
		
		for i in range(1, 6):
			if temp[i-1] == "NULL":
				flag = "true"
				temp[i-1] = val
				break
		
		trash = ","
		trash = trash.join(temp)
		cursor.execute("UPDATE user SET portfolio=? WHERE session=?", [(trash), (session)])
		conn.commit()
		conn.close()
		return flag
	
# removes the ticker from the user's portfolio
# takes in the sessionID and ticker as arguments via an XMLHTTPRequest
# returns "false" if no user with that sessionID exists or ticker is not in portfolio
# otherwise removes the ticker from the portfolio and returns "true"
@app.route("/remPortfolio/")
def remPortfolio():
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
		cursor.execute("SELECT portfolio FROM user WHERE session=?", [(session)])
		conn.commit()
		
		temp = cursor.fetchone()[0]
		temp = temp.split(',')
		
		flag = "false"
		
		for i in range(1, 6):
			if temp[i-1] == val:
				flag = "true"
				temp[i-1] = "NULL"
				break
		
		trash = ","
		trash = trash.join(temp)
		cursor.execute("UPDATE user SET portfolio=? WHERE session=?", [(trash), (session)])
		conn.commit()
		conn.close()
		return flag
