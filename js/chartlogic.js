var {Chart} = require('highcharts');

// The Create chart method will mount a Highchart in the component did mount lifecycle event of the react component.
const createChart = function(mount, series){
	var series = [randomData()]
	document['mount'+mount] = new Chart({ //The Chart itself will be available here through the document on the console. You will be able to manipulate the chart and data here.
		chart: {
			renderTo: 'mount'+mount, //The component will mount to a div created in the React component. While you can destroy the chart, you can't destroy the div without messing up the chart orders.
			type: chartTypes()
		},
		series,
		title: {text: 'Chart Number '+ mount}
	});
}

const chartTypes =() => {
	var types = ['area','bar','pie','line']
	return types[Math.floor(Math.random()*types.length)]
}

// Random dummy data for the generic charts.
const randomData =() => {
	var array = [];
	for(var i = 0; i < 15; i++){
		array.push(Math.random()*100)
	}
	var series = {data:array}
	return series
}
export {
	createChart,
	randomData,
}
