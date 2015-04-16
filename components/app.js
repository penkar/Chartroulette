var _charts = ['a','b','c'];

var App = React.createClass({
	displayName: "App",
	scroll: function(np){
		var len = this.state._charts.length;
		var current = ((this.state.current + np)+len) % len;
		this.setState({current: current});
	},
	subtract: function(){
		var charts = this.state._charts;
		var len = charts.length-1;
		var current = this.state.current;
		console.log( charts );
		console.log( len );
		console.log( current	 );
		charts.splice(current,1);
		current = (current + len)%len;
		this.setState({
			current:current,
			_charts: charts
		})
	},
	getInitialState: function(){
		return({
			current: 0,
			_charts: _charts
		});
	},
	render: function(){
		return React.createElement('div', {className: 'container'},
			React.createElement(ChartContainer, {
				current:this.state.current,
				_charts: this.state._charts
			}),
			React.createElement(Nav, {
				scroll: this.scroll,
				subtract: this.subtract
			})
		);
	}
});

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
});

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
});

var Nav = React.createClass({
	displayName: 'Nav',
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
				this.props.subtract()
				break;
			case 'Next':
				this.props.scroll(1);
				break;
			default:
		}
	}
});