import React from 'react';
import CurrentStore from '../store/currentstore.js';

class Header extends React.Component{
	constructor(props) {
		super(props);
		this.state = {idx:0}
		this._onChange = this._onChange.bind(this);
	}

	componentDidMount() {
		CurrentStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
		CurrentStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		this.setState({idx: CurrentStore.getIndex()});
	}

	render() {
		return (
			<div className='header'>
				<div>Chart Roulette - Highcharts in React without jQuery</div>
				<p>{this.state.idx + 1} of {this.props.len}</p>
			</div>
		);
	}
}

export default Header
