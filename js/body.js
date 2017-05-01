import React from 'react'
import App from './App.js'
import {Sidebar} from './components'
import {render} from 'react-dom'

const Body = () => (
	<div className='body'>
		<Sidebar />
		<App />
	</div>
)

render(
	Body(),
	document.getElementById('mount')
)
