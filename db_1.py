'''
Created by Jonatan Yanovsky on 2/19/2017
database prototype 1 - serverless implementation using python and sqlite
'''

import sqlite3

conn = sqlite3.connect('database.db')
c = conn.cursor() # open the database file

''' run this line only once - when you create the database
# creates a table with one column (id)
c.execute("CREATE TABLE try (id INTEGER)")
'''

# insert the value 10 into the database
# running this command over and over along with commit()
# increases the size of the database (adds more rows)
c.execute("INSERT INTO try VALUES (10)")

conn.commit() # save changes to the database

# read a column (id) from database
val = c.execute("SELECT id FROM try")


# print out all rows for that column that were in the database
print(val.fetchall())