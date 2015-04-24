var ChartStore = require('../store/chartstore.js');
var CurrentStore = require('../store/currentstore.js');

var Sidebar = React.createClass({
	displayName:'Sidebar',
	getInitialState: function(){
		return({
			store: ChartStore.getAll(),
			current: CurrentStore.getCurrent()
		})
	},
	render: function(){
		var arr = [];
		var store = this.state.store
		for(var i = 0, iLen = store.length; i < iLen; i++){
			var sel = ''
			if(store[i] === this.state.current){
				sel = ' pure-menu-selected'
			}
			arr.push(
				React.createElement('li', {className:'pure-menu-item'+sel}, 
					React.createElement('a', {key: store[i], className:'pure-menu-link', onClick:this._click, value: store[i]},
						'Chart '+ store[i]
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
	_click: function(){
		CurrentStore.setCurrent(parseInt(event.target.getAttribute('value')));
	},
	componentDidMount: function() {
		ChartStore.addChangeListener(this._onChange);
		CurrentStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		ChartStore.removeChangeListener(this._onChange);
		CurrentStore.addChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState({
			store: ChartStore.getAll(),
			current: CurrentStore.getCurrent()
		});
	}
})

module.exports = Sidebar;