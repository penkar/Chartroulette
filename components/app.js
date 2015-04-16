var _charts = ['a','b','c']

var App = React.createClass({
	displayName: "App",
	scroll: function(np){
		var len = this.state._charts.length;
		var current = ((this.state.current + np)+len) % len;
		this.setState({current: current});
		console.log(this.state);
	},
	getInitialState: function(){
		return({
			current: 0,
			_charts: _charts
		})
	},
	render: function(){
		return React.createElement('div', {className: 'container'},
			React.createElement(ChartContainer, {
				current:this.state.current,
				_charts: this.state._charts
			}),
			React.createElement(Nav, {scroll: this.scroll})
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
		return React.createElement('div', { id: mount, className: 'chart '+this.props.class } );
	},
	componentDidMount: function(){
		createChart('mount'+this.props.count);
	}
})

var ChartContainer = React.createClass({
	displayName: 'ChartContainer',
	render: function(){
		var array = [];
		var _charts = this.props._charts
		for(var i = 0, iLen = _charts.length; i < iLen; i++){
			var current = '';
			var curState = this.props.current;
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
	scroll: function(np){
		this.props.scroll(np);
	},
	render: function(){
		return React.createElement('div', null,
			React.createElement('input', {type:'button', onClick:this.onClick, value: 'Prev'}),
			React.createElement('input', {type:'button', onClick:this.onClick, value: 'Add'}),
			React.createElement('input', {type:'button', onClick:this.onClick, value: 'Sub'}),
			React.createElement('input', {type:'button', onClick:this.onClick, value: 'Next'})
		);
	},
	onClick: function(event){
		switch(event.target.value){
			case 'Prev':
				this.props.scroll(-1);
				break;
			case 'Add':
				break;
			case 'Sub':
				break;
			case 'Next':
				this.props.scroll(1);
				break;
			default:
		}
	}
})

