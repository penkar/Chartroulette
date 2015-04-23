# Chartroulette
Highcharts example using React.js and the Highcharts adapter. JQuery is not used in this implementation of Highcharts.

Styling for the page is limited to PureCSS and small stylings. 

Flux dispatchers also utilized in event dispatching.

#Instructions:
1) Navigate to the appropriate folder and run 'git clone https://github.com/penkar/Chartroulette.git'
2) move into the cloned folder and run 'npm install' to install the dependent node dependencies.
3) Run 'npm start' to build the bundle.js file. Afterwards go ahead and open the index.html file to view the Highcharts in action. 

#Further: 
You should be able to add new charts, subtract existing charts, and add data to current charts. Further functionality is available by accessing the charts through the console: document[ 'mount' + chart-number ] 
The Highcharts API is available here: http://api.highcharts.com/highcharts. Using the methods there in you should be able to manipulate the charts as normal. An example of how you might do this is used in the 'Add Data' button. Further details can be found in the chartroulette/js/components/nav.js file, line 34, 35.