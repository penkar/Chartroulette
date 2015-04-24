var Chart = require('./chart.js');
var CurrentStore = require('../store/currentstore.js');

var ChartContainer = React.createClass({
	displayName: 'ChartContainer',
	getInitialState:function(){
		return ({
			charts: [],
			next: CurrentStore.getNext(),
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
	render: function(){
		var arr = [];
		for(var i = 0; i < this.state.next; i++){
			arr.push( this.createSingle(i));
		}
		return React.createElement('div', {className:'chart-container'}, 
			arr
		)
	},
	componentDidMount: function() {
		CurrentStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		CurrentStore.removeChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState({
			next: CurrentStore.getNext()
		});
	}
});

module.exports = ChartContainer