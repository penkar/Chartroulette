var CLogic = require('../chartlogic.js');
var CurrentStore = require('../store/currentstore.js');

var Chart = React.createClass({
	displayName: 'Chart',
	render: function(){
		var mount = 'mount'+this.props.id;
		return React.createElement('div', { id: mount, className: 'chart '+this.props.class } );
	},
	componentDidMount: function() {
		// CurrentStore.addChangeListener(this._onChange);
		CLogic.createChart(this.props.id);
	}
});

module.exports = Chart