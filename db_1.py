import sqlite3

conn = sqlite3.connect('database.db')
c = conn.cursor()

#c.execute("CREATE TABLE try (id INTEGER)")
c.execute("INSERT INTO try VALUES (10)")

conn.commit()

val = c.execute("SELECT id FROM try")

print(val.fetchall())