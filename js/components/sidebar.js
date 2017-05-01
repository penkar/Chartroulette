import React from 'react';
import ChartStore from '../store/chartstore.js'
import CurrentStore from '../store/currentstore.js'

class Sidebar extends React.Component {
	constructor(props) {
		super(props)
		this._click = this._click.bind(this);
		this._onChange = this._onChange.bind(this);
		this._menuItems = this._menuItems.bind(this);
		this.state = {
			store: ChartStore.getAll(),
			current: CurrentStore.getCurrent(),
		}
	}

	componentDidMount() {
		ChartStore.addChangeListener(this._onChange);
		CurrentStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
		ChartStore.removeChangeListener(this._onChange);
		CurrentStore.addChangeListener(this._onChange);
	}

	render() {
		return (
			<div style={{float:'left'}} className='pure-menu custom-restricted-width'>
				<ul className='pure-menu-list'>
					<li key='null' className='pure-menu-heading'>Available Charts</li>
					{this._menuItems()}
				</ul>
			</div>
		);
	}

	_menuItems() {
		let arr = [];
		let {store, current} = this.state;
		return store.map((val, i)=> (
				<li key={i} className={`pure-menu-item${store[i] === current ? ' pure-menu-selected' : '' }`}>
					<a key={i} className='pure-menu-link' onClick={this._click} value={store[i]}>
						{`Chart ${store[i]}`}
					</a>
				</li>
			)
		)
	}

	_click(event) {
		CurrentStore.setCurrent(parseInt(event.target.getAttribute('value')));
	}

	_onChange() {
		this.setState({
			store: ChartStore.getAll(),
			current: CurrentStore.getCurrent()
		});
	}
}

export default Sidebar
