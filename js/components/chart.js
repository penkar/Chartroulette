var CLogic = require('../chartlogic.js');

var Chart = React.createClass({
	displayName: 'Chart',
	getInitialState: function(){
		return ({current: 0})
	},
	render: function(){
		var id = this.props.id
		var mount = 'mount'+id, _class = '';
		if(this.props.current === id){
			_class = ' current'
		}
		return React.createElement('div', { id: mount, className: 'chart ' + _class } );
	},
	componentDidMount: function() {
		CLogic.createChart(this.props.id);
	},
});

module.exports = Chart