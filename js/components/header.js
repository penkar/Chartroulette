var Header = React.createClass({
	displayName: 'Header',
	render: function(){
		var cur = this.props.cur + 1;
		return React.createElement('div',{className:'header'},
			React.createElement('div', null, 'Chart Roulette - Highcharts in React without jQuery'),
			React.createElement('p', {}, cur +' of '+ this.props.len)
		)
	}
})

module.exports = Header