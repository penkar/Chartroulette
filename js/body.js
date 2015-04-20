var App = require('./app.js');

var Body = React.createClass({
	displayName: 'Body',
	render: function(){
		return(React.createElement(App, null))
	}
})

React.render(
	React.createElement(Body, null),
	document.getElementById('mount')
)