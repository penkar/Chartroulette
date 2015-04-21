var CLogic = require('./chartlogic.js');
var Header = require('./components/header.js');
var Nav = require('./components/nav.js');
var ChartStore = require('./store/chartstore.js');
var ChartContainer = require('./components/chartcontainer.js');

var App = React.createClass({
	displayName: "App",
	getInitialState: function(){
		return({	// Get initial state will start the current view at 0, set the recent and get the charts array into state.
			current: 0,
			next: ChartStore.getLength(),
			_charts: ChartStore.getAll()
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
		var idx = this.state._charts.indexOf(this.state.current)
		return React.createElement('div', {className: 'container'},
			React.createElement(Header, {cur: idx, len: this.state._charts.length}),
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

module.exports = App;