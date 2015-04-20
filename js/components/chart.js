var CLogic = require('../chartlogic.js');

var Chart = React.createClass({
	getInitialState: function(){
		return {
			id:0,
			chartCount:[0]
		}
	},
	displayName: 'Chart',
	render: function(){
		var mount = 'mount'+this.props.id;
		return React.createElement('div', { id: mount, className: 'chart '+this.props.class } );
	},
	componentDidMount: function(){
		CLogic.createChart(this.props.id);
	}// Component did mount is where the Highchart is actually created and essentially half the problem. Since it is created here after being mounted rerenders do not look at the actual content, it just removes charts from the end going forward.
});

module.exports = Chart