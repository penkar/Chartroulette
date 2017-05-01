import React from 'react'
import {Header, Nav, Chartcontainer,} from './components'
import ChartStore from './store/chartstore.js'
import CurrentStore from './store/currentstore.js'

class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			next: ChartStore.getLength(),
			len: ChartStore.getLength()
		}
		this._onChange = this._onChange.bind(this);
	}

	componentDidMount(){
		ChartStore.addChangeListener(this._onChange);
	}

	componentWillUnmount(){
		ChartStore.removeChangeListener(this._onChange);
	}

	render(){
		return (
			<div className='container'>
				<Header len={this.state.len} />
				<Chartcontainer next={this.state.next} />
				<Nav />
			</div>
		)
	}

	_onChange(){
		this.setState({
			len: ChartStore.getLength(),
			next: CurrentStore.getNext()
		});
	}
}

export default App
