var createChart = function(mount, series){
	var series = randomData()
	document[mount] = new Highcharts.Chart({
		chart: { renderTo: mount},
		series,
		title:{text: mount}
	});
}

var randomData = function(){
	var array = [];
	for(var i = 0; i < 15; i++){
		array.push(Math.random()*100)
	}
	var series = [{data:array}]
	return series
}

var scrollFunc = function(current){
	document.getElementsByClassName('current')[0].className = "chart"
	document.getElementById('mount'+current).className = 'chart current'
}