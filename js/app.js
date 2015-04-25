var Header = require('./components/header.js');
var Nav = require('./components/nav.js');
var ChartContainer = require('./components/chartcontainer.js');
var ChartStore = require('./store/chartstore.js');
var CurrentStore = require('./store/currentstore.js');

var App = React.createClass({
	displayName: "App",
	getInitialState: function(){
		return({
			next: ChartStore.getLength(),
			len: ChartStore.getLength()
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
			len: ChartStore.getLength(),
			next: CurrentStore.getNext()
		});
	},
	render: function(){
		return React.createElement('div', {className: 'container'},
			React.createElement(Header, {len: this.state.len}),
			React.createElement(ChartContainer, {
				next: this.state.next
			}),
			React.createElement(Nav, null)
		);
	}
});

module.exports = App;