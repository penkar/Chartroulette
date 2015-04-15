// var chart = new Highcharts.Chart({
//     chart: {
//         renderTo: 'container'
//     },

//     series: [{
//         data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
//     }]

// });

var App = React.createClass({
	displayName: "App",
	render: function(){
		return React.createElement('div', {className: 'container'},
			React.createElement(ChartContainer, null),
			React.createElement(Nav, null)
		)
	}
})

var Chart = React.createClass({
	displayName: 'Chart',
	render: function(){
		return React.createElement(Highcharts.Chart, {
			series: [{
		        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
		    }]			
		})
	}
})

var ChartContainer = React.createClass({
	displayName: 'ChartContainer',
	render: function(){
		return React.createElement('div', {className:'container'}, 
			' '// React.createElement(chart, null)
		)
	}
})
var Nav = React.createClass({
	displayName: 'Nav',
	render: function(){
		return React.createElement('div', null,
			React.createElement('input', {type:'button', value: 'Prev'}),
			React.createElement('input', {type:'button', value: 'Add'}),
			React.createElement('input', {type:'button', value: 'Sub'}),
			React.createElement('input', {type:'button', value: 'Next'})
		);
	}
})

