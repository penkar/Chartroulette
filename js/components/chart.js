var CLogic = require('../chartlogic.js');
var CurrentStore = require('../store/currentstore.js');

var Chart = React.createClass({
	// getInitialState: function(){
	// 	return {
	// 		id:0
	// 	}
	// },
	displayName: 'Chart',
	render: function(){
		var mount = 'mount'+this.props.id;
		return React.createElement('div', { id: mount, className: 'chart '+this.props.class } );
	},
	componentDidMount: function() {
		// CurrentStore.addChangeListener(this._onChange);
		CLogic.createChart(this.props.id);
	}//,
	// componentWillUnmount: function() {
	// 	CurrentStore.removeChangeListener(this._onChange);
	// },
	// _onChange: function(){
	// 	console.log(this.state);
	// 	this.setState({
	// 		current: CurrentStore.getCurrent() 
	// 	});
	// }
});

module.exports = Chart