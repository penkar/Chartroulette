var _charts = [0,1,2,3,4,5];

var App = React.createClass({
	displayName: "App",
	getInitialState: function(){
		return({
			current: 0,
			recent: Math.max.apply(Math, _charts),
			_charts: _charts
		});
	},
	sub: function(){

	},
	add: function(){
		var recent = this.state.recent+1;
		var _charts = this.state._charts;
		_charts.push(recent);
		this.setState({
			_charts: _charts,
			recent: recent,
			current: recent
		});
	},
	scroll: function(np){
		var _charts = this.state._charts;
		var len = _charts.length;
		var current = ((this.state.current + np)+len) % len;
		this.setState({current: _charts[current]});
	},
	render: function(){
		return React.createElement('div', {className: 'container'},
			React.createElement(ChartContainer, {
				current: this.state.current,
				_charts: this.state._charts
			}),
			React.createElement(Nav, {
				scroll: this.scroll,
				sub: this.sub,
				add: this.add
			})
		);
	}
});

var ChartContainer = React.createClass({
	displayName: 'ChartContainer',
	render: function(){
		var array = [];
		var _charts = this.props._charts
		// console.log(_charts)
		for(var i = 0, iLen = _charts.length; i < iLen; i++){
			var current = '';
			var curState = this.props.current;
			if(_charts[i]===curState){
				current = 'current';
			}
			array.push(React.createElement(Chart, {
				class:current,
				count: _charts[i]
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
				this.props.add()
				break;
			case 'Sub':
				this.props.sub()
				break;
			case 'Next':
				this.props.scroll(1);
				break;
			default:
		}
	}
});