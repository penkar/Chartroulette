var ChartStore = require('../store/chartstore.js');


var Sidebar = React.createClass({
	displayName:'Sidebar',
	render: function(){
		var arr = [];
		var store = ChartStore.getAll();
		for(var i = 0, iLen = store.length; i < iLen; i++){
			arr.push(React.createElement('li', {className:'pure-menu-item'}, store[i]));
		}
		return React.createElement('div', {className: 'pure-menu custom-restricted-width'},
			React.createElement('ul', {className: 'pure-menu-list'},
				React.createElement('li', {className:"pure-menu-heading"}, 'Available Charts'),
				arr
			)
		)
	}
})

module.exports = Sidebar;