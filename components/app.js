var _charts = [0]

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
		return {
			count:0,
			chartCount:[0]
		}
	},
	increment: function(){
		var chartCount = this.state.chartCount;
		createChart('mount'+this.state.count);
		this.setState({
			count: (this.state.count + 1)
		});
		console.log(this);
	},
	displayName: 'Chart',
	render: function(){
		var mount = 'mount'+this.state.count;
		console.log(mount);
		return React.createElement('div', { id: mount, className: 'chart' } );
	},
	componentDidMount: function(){
		this.increment();
	}
})

var ChartContainer = React.createClass({
	displayName: 'ChartContainer',
	getInitialState(){
		return ({_charts: _charts})
	},
	render: function(){
		var array = [];
		var _charts = this.state._charts
		for(var i = 0, iLen = _charts.length; i < iLen; i++){
			array.push(React.createElement(Chart, null))
		}
		return React.createElement('div', {className:'chart-container'}, 
			array
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

