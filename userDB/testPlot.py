from io import BytesIO
from flask import Flask, render_template, request, jsonify, make_response
import matplotlib.pyplot as plt
from matplotlib.figure import Figure
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas

app = Flask(__name__)

# main function, initialize web app with IP and port
if __name__ == '__main__':
	app.run(host = "127.0.0.1", port = 5000, debug = True)

# returns a plot as a png
@app.route("/plot/")
def plot():
	
	y = [17, 21, 32, 43, 59]
	x = [1, 2, 3, 4, 5]
	
	fig = Figure()
	axis = fig.add_subplot(1, 1, 1)
	axis.plot(x, y, color='green')
	
	canvas = FigureCanvas(fig)
	png_output = BytesIO()
	canvas.print_png(png_output)
	response = make_response(png_output.getvalue())
	response.headers['Content-Type'] = 'image/png'
	return response
