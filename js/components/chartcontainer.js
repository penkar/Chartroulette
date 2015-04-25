var Chart = require('./chart.js');
var ChartStore = require('../store/chartstore.js');
var CurrentStore = require('../store/currentstore.js');

var ChartContainer = React.createClass({
	displayName: 'ChartContainer',
	getInitialState:function(){
		return ({
			charts: ChartStore.getAll(),
			current: 0
		});
	},
	render: function(){
		var arr = [];
		var charts = this.state.charts;
		for(var i = 0; i < charts.length; i++){
			var id = charts[i];
			arr.push( React.createElement(Chart, {id: id, key:id, current: this.state.current}));
		}
		return React.createElement('div', {className:'chart-container'}, 
			arr
		)
	},
	componentDidMount: function() {
		ChartStore.addChangeListener(this._onChange);
		CurrentStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		ChartStore.removeChangeListener(this._onChange);
		CurrentStore.removeChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState({
			charts: ChartStore.getAll(),
			current: CurrentStore.getCurrent()
		});
	}
});

module.exports = ChartContainer