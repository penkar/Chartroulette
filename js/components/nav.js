import React from 'react';
import {randomData} from '../chartlogic.js'
import ChartStore from '../store/chartstore.js'
import CurrentStore from '../store/currentstore.js'

class Nav extends React.Component {
	constructor(props) {
		super(props);
		this._onClick = this._onClick.bind(this);
	}

	render() {
		return (
			<div>
				<button onClick={this._onClick} value='Prev' className='pure-button pure-button-primary'>Prev</button>
				<button onClick={this._onClick} value='Add' className='pure-button button-success'>Add</button>
				<button onClick={this._onClick} value='Sub' className='pure-button button-error'>Sub</button>
				<button onClick={this._onClick} value='Add Data' className='pure-button button-success'>Add Data</button>
				<button onClick={this._onClick} value='Next' className='pure-button pure-button-primary'>Next</button>
			</div>
		);
	}

	_onClick(event) {
		var id = document.getElementsByClassName('current')[0].id
		switch(event.target.value){
			case 'Prev':
				return CurrentStore.scroll(-1);
			case 'Add':
				ChartStore.add();
				return CurrentStore.setNext();
			case 'Sub':
				CurrentStore.scroll(-1);
				return ChartStore.sub(id)
			case 'Next':
				return CurrentStore.scroll(1);
			case 'Add Data':
				return document[id].addSeries(randomData());
			default:
				return null;
		}
	}
}
export default Nav
