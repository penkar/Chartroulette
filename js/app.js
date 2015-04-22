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
	render: function(){
		var idx = this.state._charts.indexOf(this.state.current)
		return React.createElement('div', {className: 'container'},
			React.createElement(Header, {cur: idx, len: this.state._charts.length}),
			React.createElement(ChartContainer, {
				next: this.state.next
			}),
			React.createElement(Nav, null)
		);
	}
});

module.exports = App;