var Chart = require('./chart.js');
var ChartStore = require('../store/chartstore.js');
var CurrentStore = require('../store/currentstore.js');

var ChartContainer = React.createClass({
	displayName: 'ChartContainer',
	getInitialState:function(){
		return ({
			next: CurrentStore.getNext(),
			charts: [],
			current: CurrentStore.getCurrent()
		});
	},
	createSingle: function(i){
		var current = '';
		if(!i){ // On the first run through when the page is generated this will establish chart 0 as the current chart.
			current = 'current';
		};
		return React.createElement(Chart, {class: current, id: i, key:i}); //Method will create a single chart each go around. This way it can be called on the initial render and each time new props are received.
	},
	componentWillMount: function(){
		var array = []; //The first go around this will run and create a new chart from 0 up to recent. 
		var next = this.props.next
		for(var i = 0; i < next; i++){
			array.push( this.createSingle(i) );
		}
		this.setState({charts: array})
	},
	componentWillReceiveProps: function(){ // ALl further updates will run through this functionality which will create new charts from the current recent up to the new recent.
		var next = this.state.next;
		var nr = this.props.next+1;
		var array = this.state.charts;
		for(var i = next ; i < nr; i++){
			array.push( this.createSingle(i) )
		} // Please note, no view are ever destroyed, new ones are just created. The contents will be destroyed through the Highcharts destroy method. However since React and HighCharts don't mesh well it is necessar to keep a div for each previous highchart.
		this.setState({charts: array, next: nr})
	},
	render: function(){
		return React.createElement('div', {className:'chart-container'}, 
			this.state.charts
		)
	}
});

module.exports = ChartContainer