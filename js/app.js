var CLogic = require('./chartlogic.js');
var Header = require('./components/header.js');
var Nav = require('./components/nav.js');
var Chart = require('./components/chart.js');

var _charts = [0,1,2,3,4,5];

var App = React.createClass({
	displayName: "App",
	getInitialState: function(){
		return({	// Get initial state will start the current view at 0, set the recent and get the charts array into state.
			current: 0,
			next: _charts.length,
			_charts: _charts
		});
	},
	sub: function(){
		// Subtract chart will run the Highcharts destroy method on the current chart, scroll to the next chart, and remove the current chart from the _charts list which is used for scrolling between charts. 
		var current = this.state.current;
		var _charts = this.state._charts;
		var len = _charts.length;
		if(len === 1){
			return false
		};
		var idx = _charts.indexOf(current);
		document['mount'+current].destroy(); //React JS will not rerender the Highcharts correctly. Since you have to create the highchart after its container has been rendered, when the charts rerender they do properly read the highchart. In order to get around this you have to attach the chart globally and delete it through the global scope. 
		current = _charts[(idx + 1)%len];
		_charts.splice(idx,1); // Method will remove current view from available views. 
		this.setState({
			current: current,
			_charts: _charts
		});
		this.scroll(1);
	},
	add: function(){// This method does 3 things: 
		var _charts = this.state._charts;
		var next = this.state.next;
		_charts.push(next);
		this.setState({
			_charts: _charts, //Adds the new index to the list of available charts. 
			next: (next+1), //  Sends the recent state to the chart container which will in turn create a new chart.
			current: next //  Changes the current view to thew newly created chart. 
		});
	},
	scroll: function(np){
		var _charts = this.state._charts;
		var current = this.state.current;
		var len = _charts.length;
		var idx = _charts.indexOf(current);
		var current = ((idx + np)+len) % len; // Logic that determines what the current view is in the _charts array and finds the next one.
		this.setState({current: _charts[current]});  // Sets theh current to the new current.
		CLogic.scrollFunc(_charts[current]); // Global function that will select the current view, remove the current class, and add the current class to the new current view. 
	},
	render: function(){
		return React.createElement('div', {className: 'container'},
			React.createElement(Header, {cur: this.state.current, len: this.state._charts.length}),
			React.createElement(ChartContainer, {
				next: this.state.next
			}),
			React.createElement(Nav, {
				scroll: this.scroll, //Previous and next are not needed, the scroll function passes a +1 / -1 depending on the direction. 
				sub: this.sub,
				add: this.add
			})
		);
	}
});


var ChartContainer = React.createClass({
	displayName: 'ChartContainer',
	getInitialState:function(){
		return ({
			next: this.props.next,
			charts: []
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




module.exports = App;