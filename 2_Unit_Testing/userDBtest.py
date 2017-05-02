from userDB import app
import unittest
import tempfile
import os
import json

class FlaskTestCase(unittest.TestCase):
	
	def test_reg(self):
		tester = app.test_client(self)
		response = tester.get('/addUser/?u=test&p=test')
		self.assertEqual(response.text, 'true')
	
	def test_loginout(self):
		tester = app.test_client(self)
		response = tester.get('/login/?u=test&p=test')
		cookie = response.text
		response = tester.get('/logout/?s=' + cookie)
		self.assertEqual(response.text, 'true')
	
	def test_quiz(self):
		tester = app.test_client(self)
		response = tester.get('/login/?u=test&p=test')
		cookie = response.text
		response = tester.get('/setQuiz/?s=' + cookie + '&i=1&v=5')
		self.assertEqual(response.text, 'true')
		response = tester.get('/getQuiz/?s=' + cookie + '&i=1')
		self.assertEqual(response.text, '5');
	
	def test_lesson(self):
		tester = app.test_client(self)
		response = tester.get('/login/?u=test&p=test')
		cookie = response.text
		response = tester.get('/setLesson/?s=' + cookie + '&i=1&v=5')
		self.assertEqual(response.text, 'true')
		response = tester.get('/getLesson/?s=' + cookie + '&i=1')
		self.assertEqual(response.text, '5');
	
	def test_placement(self):
		tester = app.test_client(self)
		response = tester.get('/login/?u=test&p=test')
		cookie = response.text
		response = tester.get('/setPlacement/?s=' + cookie + '&v=5')
		self.assertEqual(response.text, 'true')
		response = tester.get('/getPlacement/?s=' + cookie)
		self.assertEqual(response.text, '5');
	
	def test_mode(self):
		tester = app.test_client(self)
		response = tester.get('/login/?u=test&p=test')
		cookie = response.text
		response = tester.get('/setMode/?s=' + cookie + '&v=5')
		self.assertEqual(response.text, 'true')
		response = tester.get('/getMode/?s=' + cookie)
		self.assertEqual(response.text, '5');
	
	def test_portfolio(self):
		tester = app.test_client(self)
		response = tester.get('/login/?u=test&p=test')
		cookie = response.text
		response = tester.get('/addPortfolio/?s=' + cookie + '&v=AAPL')
		self.assertEqual(response.text, 'true')
		response = tester.get('/getPortfolio/?s=' + cookie + '&i=1')
		self.assertEqual(response.text, 'AAPL')
		response = tester.get('/remPortfolio/?s=' + cookie + '&v=AAPL')
		self.assertEqual(response.text, 'true')
		response = tester.get('/remPortfolio/?s=' + cookie + '&v=AAPL')
		self.assertEqual(response.text, 'false')

unittest.main()
