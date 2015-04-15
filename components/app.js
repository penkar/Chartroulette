

var _charts = []

var App = React.createClass({
	displayName: "App",
	render: function(){
		return React.createElement('div', {className: 'container'},
			React.createElement(ChartContainer, null),
			React.createElement(Nav, null)
		)
	}
})

var Chart = React.createClass({
	getInitialState: function(){
		return {count:0}
	},
	increment: function(){
		this.setState({count: (this.state.count + 1)})
	},
	displayName: 'Chart',
	render: function(){
		var mount = 'mount'+this.state.count;
		this.increment;
		return React.createElement('div', { id: 'mount0', className: 'chart' } )
	},
	componentDidMount: function(){
		createChart('mount0')
	}
})

var ChartContainer = React.createClass({
	displayName: 'ChartContainer',
	render: function(){
		return React.createElement('div', {className:'chart-container'}, 
			React.createElement(Chart, null)
		)
	}
})
var Nav = React.createClass({
	displayName: 'Nav',
	render: function(){
		return React.createElement('div', null,
			React.createElement('input', {type:'button', value: 'Prev'}),
			React.createElement('input', {type:'button', value: 'Add'}),
			React.createElement('input', {type:'button', value: 'Sub'}),
			React.createElement('input', {type:'button', value: 'Next'})
		);
	}
})

