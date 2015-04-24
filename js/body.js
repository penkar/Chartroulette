var App = require('./app.js');
var Sidebar = require('./components/sidebar.js');

var Body = React.createClass({
	displayName: 'Body',
	render: function(){
		return(
			React.createElement('div', {className:'body'},
				React.createElement(Sidebar, null),
				React.createElement(App, null)
			)
		)
	}
})

React.render(
	React.createElement(Body, null),
	document.getElementById('mount')
)