var CurrentStore = require('../store/currentstore.js');


var Header = React.createClass({
	displayName: 'Header',
	getInitialState: function(){
		return ({idx: 0})
	},
	render: function(){
		return React.createElement('div',{className:'header'},
			React.createElement('div', null, 'Chart Roulette - Highcharts in React without jQuery'),
			React.createElement('p', null, (this.state.idx + 1) +' of '+ this.props.len)
		)
	},
	componentDidMount: function() {
		CurrentStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		CurrentStore.removeChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState({idx: CurrentStore.getIndex()});
	}
})

module.exports = Header