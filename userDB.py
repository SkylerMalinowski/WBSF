import sqlite3

# creates user database if it does not exist already
# otherwise, does nothing
def openTable():
    conn = sqlite3.connect("userDB.db")
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS user(username TEXT, password TEXT, level INTEGER);")
    conn.commit()
    conn.close()
    return

# adds user to database
# takes username and password as input
# returns False if user already exists with this username
# otherwise returns True and creates new user
def addUser(username, password):
    inputs = [(username), (password), (-1)]
    conn = sqlite3.connect("userDB.db")
    cursor = conn.cursor()

    cursor.execute("SELECT username FROM user WHERE username=?", [(username)] )
    temp = cursor.fetchone()
    conn.commit()

    if temp is None:
        cursor.execute("INSERT INTO user VALUES ( ?, ?, ?)", inputs)
        conn.commit()
        conn.close()
        return True
    elif temp[0] != username:
        cursor.execute("INSERT INTO user VALUES ( ?, ?, ?)", inputs)
        conn.commit()
        conn.close()
        return True
    else:
        conn.close()
        return False

# deletes user from database
# takes username as input
# returns False if user does not exist
# otherwise deletes user and returns True
def remUser(username):
    conn = sqlite3.connect("userDB.db")
    cursor = conn.cursor()

    cursor.execute("SELECT username FROM user WHERE username=?", [(username)] )
    temp = cursor.fetchone()
    conn.commit()
    
    if temp is None:
        conn.close()
        return False
    elif temp[0] == username:
        cursor.execute("DELETE FROM user WHERE username=?", [(username)])
        conn.commit()
        conn.close()
        return True
    else:
        conn.close()
        return False

# takes username and password as input
# returns False if invalid credentials or user does not exist
# otherwise returns True
def login(username, password):
    conn = sqlite3.connect("userDB.db")
    cursor = conn.cursor()
    cursor.execute("SELECT password FROM user WHERE username=?", [(username)])
    temp = cursor.fetchone()
    conn.commit()
    conn.close()

    if temp is None:
        return False
    elif temp[0] == password:
        return True
    else:
        return False

# prints the contents of the user database
def printTable():
    conn = sqlite3.connect("userDB.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM user")
    print(cursor.fetchall())
    conn.commit()
    conn.close()
    return

# deletes the user database
def delTable():
    conn = sqlite3.connect("userDB.db")
    cursor = conn.cursor()
    cursor.execute("DROP TABLE user")
    conn.commit()
    conn.close

# takes username as input
# returns -99 if user does not exist
# otherwise returns user's level
def getLevel(username):
    conn = sqlite3.connect("userDB.db")
    cursor = conn.cursor()
    cursor.execute("SELECT level FROM user WHERE username=?", [(username)])
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
def setLevel(username, level):
    conn = sqlite3.connect("userDB.db")
    cursor = conn.cursor()

    cursor.execute("SELECT username FROM user WHERE username=?", [(username)])
    temp = cursor.fetchone()
    conn.commit()
    
    if temp is None:
        conn.close()
        return False
    else:
        cursor.execute("UPDATE user SET level=? WHERE username=?", [(level), (username)])
        conn.commit()
        conn.close()
        return True
