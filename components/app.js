var _charts = [0,1]

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
	displayName: 'Chart',
	render: function(){
		var mount = 'mount'+this.props.count;
		console.log(mount);
		return React.createElement('div', { id: mount, className: 'chart '+this.props.class } );
	},
	componentDidMount: function(){
		createChart('mount'+this.props.count);
	}
})

var ChartContainer = React.createClass({
	displayName: 'ChartContainer',
	getInitialState(){
		return ({
			_charts: _charts,
			current: 0
		})
	},
	render: function(){
		var array = [];
		var _charts = this.state._charts
		for(var i = 0, iLen = _charts.length; i < iLen; i++){
			var current = '';
			var curState = this.state.current;
			if(i===curState){
				current = 'current';
			}
			array.push(React.createElement(Chart, {
				class:current,
				count: i 
			}))
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

