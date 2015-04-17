var createChart = function(mount, series){
	var series = randomData()
	var chart = new Highcharts.Chart({
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