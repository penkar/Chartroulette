var ChartStore = require('../store/chartstore.js');

var Sidebar = React.createClass({
	displayName:'Sidebar',
	getInitialState: function(){
		return({store: ChartStore.getAll()})
	},
	render: function(){
		var arr = [];
		var store = this.state.store
		for(var i = 0, iLen = store.length; i < iLen; i++){
			arr.push(
				React.createElement('li', {className:'pure-menu-item'}, 
					React.createElement('a', {className:'pure-menu-link'},
						store[i]
					)
				)
			)
		}
		return React.createElement('div', {style:{float:'left'}, className: 'pure-menu custom-restricted-width'},
			React.createElement('ul', {className: 'pure-menu-list'},
				React.createElement('li', {className:"pure-menu-heading"}, 'Available Charts'),
				arr
			)
		)
	},
	componentDidMount: function() {
		ChartStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		ChartStore.removeChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState({store: ChartStore.getAll()});
	}
})

module.exports = Sidebar;