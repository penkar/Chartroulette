var _charts = [0,1,2,3,4,5];

var App = React.createClass({
	displayName: "App",
	getInitialState: function(){
		return({
			current: 0,
			recent: _charts.length,
			_charts: _charts
		});
	},
	sub: function(){
		var current = this.state.current;
		var _charts = this.state._charts;
		var len = _charts.length;
		var idx = _charts.indexOf(current);
		document['mount'+current].destroy();
		current = _charts[(idx + 1)%len];
		_charts.splice(idx,1);
		this.setState({
			current: current,
			_charts: _charts
		});
		this.scroll(1);
	},
	add: function(){
		var _charts = this.state._charts;
		var recent = _charts.length;
		_charts.push(recent);
		this.setState({
			_charts: _charts,
			recent: recent,
			current: recent
		});
	},
	scroll: function(np){
		var _charts = this.state._charts;
		var current = this.state.current;
		var len = _charts.length;
		var idx = _charts.indexOf(current);
		var current = ((idx + np)+len) % len;
		this.setState({current: _charts[current]});
		scrollFunc(_charts[current]);
	},
	render: function(){
		return React.createElement('div', {className: 'container'},
			React.createElement('p', null, this.state.current+' of '+this.state._charts.length),
			React.createElement(ChartContainer, {
				recent: this.state.recent
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
	getInitialState:function(){
		return ({
			recent: this.props.recent,
			charts: []
		});
	},
	createSingle: function(i){
		var current = '';
		if(!i){
			current = 'current';
		}
		return React.createElement(Chart, {class: current, id: i})
	},
	componentWillMount: function(){
		var array = [];
		var recent = this.props.recent
		for(var i = 0; i < recent; i++){
			array.push( this.createSingle(i) )
		}
		this.setState({charts: array})
	},
	componentWillReceiveProps: function(){
		var recent = this.state.recent;
		var nr = this.props.recent+1;
		var array = this.state.charts;
		for(var i = recent ; i < nr; i++){
			array.push( this.createSingle(i) )
		}
		this.setState({charts: array, recent: nr})
	},
	render: function(){
		return React.createElement('div', {className:'chart-container'}, 
			this.state.charts
		)
	}
});

var Chart = React.createClass({
	getInitialState: function(){
		return {
			id:0,
			chartCount:[0]
		}
	},
	displayName: 'Chart',
	render: function(){
		var mount = 'mount'+this.props.id;
		return React.createElement('div', { id: mount, className: 'chart '+this.props.class } );
	},
	componentDidMount: function(){
		createChart('mount'+this.props.id);
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