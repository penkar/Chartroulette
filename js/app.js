var CLogic = require('./chartlogic.js');
var Header = require('./components/header.js');
var Nav = require('./components/nav.js');
var ChartContainer = require('./components/chartcontainer.js');
var ChartStore = require('./store/chartstore.js');
var CurrentStore = require('./store/currentstore.js');

var App = React.createClass({
	displayName: "App",
	getInitialState: function(){
		return({	// Get initial state will start the current view at 0, set the recent and get the charts array into state.
			current: 0,
			next: ChartStore.getLength(),
			_charts: ChartStore.getAll()
		});
	},
	componentDidMount: function() {
		ChartStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		ChartStore.removeChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState({
			_charts: ChartStore.getAll(),
			next: CurrentStore.getNext(),
			current: CurrentStore.getCurrent()
		});
	},
	// scroll: function(np){
	// 	var _charts = this.state._charts;
	// 	var current = this.state.current;
	// 	var len = _charts.length;
	// 	var idx = _charts.indexOf(current);
	// 	var current = ((idx + np)+len) % len; // Logic that determines what the current view is in the _charts array and finds the next one.
	// 	this.setState({current: _charts[current]});  // Sets theh current to the new current.
	// 	CLogic.scrollFunc(_charts[current]); // Global function that will select the current view, remove the current class, and add the current class to the new current view. 
	// },
	render: function(){
		var idx = this.state._charts.indexOf(this.state.current)
		return React.createElement('div', {className: 'container'},
			React.createElement(Header, {cur: idx, len: this.state._charts.length}),
			React.createElement(ChartContainer, {
				next: this.state.next
			}),
			React.createElement(Nav, {
				scroll: this.scroll//, //Previous and next are not needed, the scroll function passes a +1 / -1 depending on the direction. 
				// sub: this.sub,
				// add: this.add
			})
		);
	}
});

module.exports = App;