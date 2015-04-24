var CLogic = require('../chartlogic.js');
var CurrentStore = require('../store/currentstore.js');

var Chart = React.createClass({
	displayName: 'Chart',
	getInitialState: function(){
		return ({current: 0})
	},
	render: function(){
		var id = this.props.id
		var mount = 'mount'+id, _class = '';
		if(this.state.current === id){
			_class = ' current'
		}
		return React.createElement('div', { id: mount, className: 'chart ' + _class } );
	},
	componentDidMount: function() {
		CLogic.createChart(this.props.id);
		CurrentStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		CurrentStore.removeChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState({
			current: CurrentStore.getCurrent()
		});
	}
});

module.exports = Chart