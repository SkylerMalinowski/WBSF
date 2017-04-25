********************************************************************************
******************************  HOW TO RUN CODE  *******************************
********************************************************************************

## Windows

1) If Python 3 is not installed, download and install Python 3 from  "https://www.python.org/downloads/"  
2) Download and install the following Python libraries:  

```
> pip install sqlite3
> pip install pandas
> pip install plotly
> pip install googlefinance
> pip install numpy
> pip install pandas_datareader
> pip install flask
> pip install simplejson
> pip install yahoo-finance
> pip install feedparser
> pip install holidays
> pip install datetime
> pip install simplejson
> pip install yahoo-finance
```

3) Download WBSF-master.zip  
4) Extract .zip and rename "WBSF-master" folder to "WBSF"  
5) Download Apache portable from https://sourceforge.net/projects/apache2portable/  
6) Extract the Apache portable and rename the folder to "Apache"  

7) Copy "WBSF\1_Code\Website" into "Apache\htdocs\"  
8) Copy "WBSF\1_Code\index.html" into "Apache\htdocs\"  
9) Copy "WBSF\1_Code\httd.portable.conf" into "Apache\conf\"  
10) Copy "WBSF\1_Code\modules.conf" into "Apache\conf\

11) Make a Plotly Account at "www.plot.ly"  
    https://plot.ly/python/getting-started/  
    and add the api key to your python

12) Open a command prompt and navigate to "WBSF\1_Code\Fetch_&_Plot\"  
13) Run the following commands in the command prompt:  

```
> set FLASK_APP=API.py
> flask run --port 4000 --host=0.0.0.0 
```

14) Open a command prompt and navigate to "WBSF\1_Code\userDB\"  
15) Run the following commands in the command prompt:  

```
> set FLASK_APP=userDB.py
> flask run --port 5000 --host=0.0.0.0 
```

16) Double click to execute "Apache\start.bat"  
17) The website is now hosted and ready to access via localhost, and is  
also accessible via the IP address of the hosting machine to other machines
on the network.

********************************************************************************
******************************  FOLDER STRUCTURE  ******************************
********************************************************************************

/                                               // Root  
|  
+-------+---> 1_Code                            // Code Base  
        |  
        +-------> Fetch_&_Plot                  // Data acquisistion & plotting  
        |  
        +-------+---> userDB                    // User account database  
                |  
                +-------> static                // Picture file resources  
                |  
                +-------> templates             // HTML files  
        |  
        +-------+---> Website                   // Apache Hosted folder  
                |  
                +-------> CascadingStyleSheet   // CSS resource files  
                |  
                +-------> Fetch_&_Plot          // HTML pages with graphs  
                |  
                +-------> Images                // Picture type resource files  
                |  
                +-------> JavaScript            // JS resource files  
                |  
                +-------+---> Learning_System   // Learning System root  
                        |  
                        +-------> Lessons       // Reading material  
                        |  
                        +-------> Quizzes       // Reading comprehension quizzes  
                        |  
                        +-------> VN Lessons    // Visual Novel format lessons  
|  
+-------> 2_Unit_Testing                        // Unit Tests  
|  
+-------> 3_Integration_Testing	                // Integration Tests   
|  
+-------> 4_Data_Collection                     // Data Collection  
|  
+-------+---> 5_Documentation                   // Physical deliverables  
        |  
        +-------> Demo 1                        // Demonstration 1 documents  
        |  
        +-------> Demo 2                        // Demonstration 2 documents  
        |  
        +-------> Final Report                  // Report 3 documents  
	
