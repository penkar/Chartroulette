import React from 'react';
import {createChart} from '../chartlogic.js';

class Chart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {current: 0}
	}

	componentDidMount() {
		createChart(this.props.id);
	}

	render() {
		let {id, current} = this.props
		let mount = 'mount'+id, _class = '';
		if(current === id){
			_class = ' current'
		}
		return <div id={mount} className={'chart '+ _class} />
	}
}

export default Chart;
