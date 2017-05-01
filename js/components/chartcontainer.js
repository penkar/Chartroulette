import React from 'react';
import Chart from './Chart'
import ChartStore from '../store/chartstore.js';
import CurrentStore from '../store/currentstore.js';

class ChartContainer extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			charts: ChartStore.getAll(),
			current: 0,
		}
		this._onChange = this._onChange.bind(this);
		this._charts = this._charts.bind(this);
	}

	componentDidMount() {
		ChartStore.addChangeListener(this._onChange);
		CurrentStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
		ChartStore.removeChangeListener(this._onChange);
		CurrentStore.removeChangeListener(this._onChange);
	}

	render() {
		return (
			<div className='chart-container'>
				{ this._charts() }
			</div>
		)
	}

	_charts() {
		let {charts, current} = this.state, arr = [], {next} = this.props;
		for(var i = 0; i < next + 1; i++) {
			arr.push(<Chart id={i} key={i} current={current}/>)
		}
		return arr;
	}

	_onChange() {
		this.setState({
			charts: ChartStore.getAll(),
			current: CurrentStore.getCurrent()
		});
	}
}

export default ChartContainer
