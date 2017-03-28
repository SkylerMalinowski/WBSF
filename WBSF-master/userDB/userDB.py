# admin password for database management
ADMIN = "GSVRJJJ"

# used to verify user is logged in
sessionID = 0

import sqlite3
from flask import Flask, render_template, request, jsonify, make_response, send_file

app = Flask(__name__)

# main function, initialize web app with IP and port
if __name__ == '__main__':
	app.run(host = "127.0.0.1", port = 80, debug = False)

# original home page
@app.route('/')
def homePage():
	return render_template('index.html')

@app.route('/test/print.html')
def testprint():
	return render_template('print.html')

@app.route('/test/reg.html')
def testreg():
	return render_template('reg.html')

@app.route('/test/logout.html')
def testout():
	return render_template('out.html')

@app.route('/test/dereg.html')
def testdereg():
	return render_template('dereg.html')

@app.route('/logo.JPG')
def logo():
	return send_file('logo.JPG', mimetype='image/jpg')

# creates user database if it does not exist already
# otherwise, does nothing
@app.route("/userDB/openTable/")
def openTable():
	password = request.args.get('p')
	
	if password == ADMIN:
		conn = sqlite3.connect("userDB.db")
		cursor = conn.cursor()
		cursor.execute("CREATE TABLE IF NOT EXISTS user(username TEXT, password TEXT, level INTEGER, session INTEGER);")
		conn.commit()
		conn.close()
		return 'Table opened'
	
	else:
		return 'Access Denied'

# adds user to database
# takes username and password as input
# returns False if user already exists with this username
# otherwise returns True and creates new user
@app.route("/userDB/addUser/")
def addUser():
	username = request.args.get('u')
	password = request.args.get('p')
	inputs = [str(username), str(password), (-1), (-1)]
	
	conn = sqlite3.connect("userDB.db")
	cursor = conn.cursor()
	
	cursor.execute("SELECT username FROM user WHERE username=?", [(username)] )
	temp = cursor.fetchone()
	conn.commit()
	
	if temp is None:
		cursor.execute("INSERT INTO user VALUES ( ?, ?, ?, ?)", inputs)
		conn.commit()
		conn.close()
		return "User added"
	elif temp[0] != username:
		cursor.execute("INSERT INTO user VALUES ( ?, ?, ?, ?)", inputs)
		conn.commit()
		conn.close()
		return "User added"
	else:
		conn.close()
		return "User already exists!"

# deletes user from database
# takes username and password as input
@app.route("/userDB/remUser/")
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
			return "Access Denied"
	
	else:
		conn.close()
		return "User does not exist!"

# compares credentials to user DB for login attempt
# takes username and password as input
@app.route("/userDB/login/")
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
		return "Access Denied"

@app.route("/userDB/logout/")
def logout():
	session = request.args.get('s')
	
	conn = sqlite3.connect("userDB.db")
	cursor = conn.cursor()
	
	cursor.execute("SELECT username FROM user WHERE session=?", [(session)])
	temp = cursor.fetchone()
	conn.commit()
	
	if temp is None:
		conn.close()
		return "You are not currently logged in!"
	
	else:
		cursor.execute("UPDATE user SET session=? WHERE session=?", [(-1), (session)])
		conn.commit()
		conn.close()
		return "Logged out successfully"

# prints the contents of the user database
@app.route("/userDB/printTable/")
def printTable():
	password = request.args.get('p')
	
	if password != ADMIN:
		return "Access Denied"
	else:
		conn = sqlite3.connect("userDB.db")
		cursor = conn.cursor()
		cursor.execute("SELECT * FROM user")
		contents = cursor.fetchall()
		conn.commit()
		conn.close()
		return str(contents)

# deletes the user database
@app.route("/userDB/delTable/")
def delTable():
	password = request.args.get('p')
	
	if password != ADMIN:
		return "Access Denied"
	else:
		conn = sqlite3.connect("userDB.db")
		cursor = conn.cursor()
		cursor.execute("DROP TABLE user")
		conn.commit()
		conn.close
		return "Table Deleted"

# takes username as input
# returns -99 if user does not exist
# otherwise returns user's level
@app.route("/userDB/getLevel/")
def getLevel():
	session = request.args.get('s')
	
	conn = sqlite3.connect("userDB.db")
	cursor = conn.cursor()
	cursor.execute("SELECT level FROM user WHERE session=?", [(session)])
	temp = cursor.fetchone()
	conn.commit()
	conn.close()
	
	if temp is None:
		return -99
	else:
		return temp[0]

# takes username and level as input
# returns False if user does not exist
# otherwise changes level and returns True
@app.route("/userDB/setLevel/")
def setLevel():
	session = request.args.get('s')
	level = request.args.get('l')
	
	conn = sqlite3.connect("userDB.db")
	cursor = conn.cursor()

	cursor.execute("SELECT username FROM user WHERE session=?", [(session)])
	temp = cursor.fetchone()
	conn.commit()
	
	if temp is None:
		conn.close()
		return "Access Denied"
	else:
		cursor.execute("UPDATE user SET level=? WHERE session=?", [(level), (session)])
		conn.commit()
		conn.close()
		return "Level set successfully"
